import { ChangeDetectionStrategy, Component, inject, Injector, Signal } from '@angular/core';
import { CurrentActivityService } from '../current-activity.service';
import { Activity, ActivityPicture, ActivityService } from '../activity.service';
import { combineLatest, first, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { ConfirmService } from '../../confirm/confirm.service';
import { IconDirective } from '../../icon/icon.directive';
import { Spinner } from '../../shared/spinner';
import { SpinningIconComponent } from '../../shared/spinning-icon/spinning-icon.component';
import { ToastService } from '../../toast/toast.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivityPictureEditionModalComponent } from '../activity-picture-edition-modal/activity-picture-edition-modal.component';
import { StorageService } from '../../storage.service';
import * as icons from '../../icon/icons';
import { toSignal } from '@angular/core/rxjs-interop';

export interface DownloadablePicture extends ActivityPicture {
  thumbnailDownloadUrl: string;
}

interface ViewModel {
  activity: Activity;
  pictures: Array<DownloadablePicture>;
}

@Component({
  selector: 'dn-activity-pictures',
  imports: [IconDirective, SpinningIconComponent],
  templateUrl: './activity-pictures.component.html',
  styleUrls: ['./activity-pictures.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityPicturesComponent {
  private currentActivityService = inject(CurrentActivityService);
  private activityService = inject(ActivityService);
  private storageService = inject(StorageService);
  private confirmService = inject(ConfirmService);
  private modalService = inject(NgbModal);
  private toastService = inject(ToastService);
  private injector = inject(Injector);

  vm: Signal<ViewModel | undefined>;

  icons = icons;

  uploading = new Spinner();

  constructor() {
    const currentActivityService = this.currentActivityService;
    const storageService = this.storageService;

    const pictures$: Observable<Array<DownloadablePicture>> = currentActivityService.activity$.pipe(
      map(activity => activity.pictures ?? []),
      switchMap(pictures =>
        pictures.length
          ? forkJoin(
              pictures.map(picture =>
                storageService.downloadUrl(picture.thumbnailPath).pipe(
                  map(thumbnailDownloadUrl => ({
                    ...picture,
                    thumbnailDownloadUrl
                  }))
                )
              )
            )
          : of([])
      )
    );
    this.vm = toSignal(
      combineLatest({
        pictures: pictures$,
        activity: currentActivityService.activity$
      })
    );
  }

  removePicture(picture: DownloadablePicture) {
    this.confirmService
      .confirm({
        message: `Voulez-vous vraiment enlever cette image de l'activité\u00a0?`
      })
      .pipe(
        switchMap(() => this.currentActivityService.activity$.pipe(first())),
        switchMap(activity => {
          const newPictures = activity.pictures!.filter(p => p.path !== picture.path);
          return this.activityService.updatePictures(activity.id, newPictures);
        })
      )
      .subscribe();
  }

  addPicture(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files![0];
    fileInput.value = '';

    const modalRef = this.openModal();
    (modalRef.componentInstance as ActivityPictureEditionModalComponent).prepareForCreation(file);
    modalRef.closed.subscribe(() =>
      this.toastService.success(`La photo a été ajoutée à l'activité`)
    );
  }

  editPicture(picture: DownloadablePicture) {
    const modalRef = this.openModal();
    (modalRef.componentInstance as ActivityPictureEditionModalComponent).prepareForUpdate(picture);
    modalRef.closed.subscribe(() =>
      this.toastService.success(`Les données de la photo ont été modifiées`)
    );
  }

  private openModal(): NgbModalRef {
    return this.modalService.open(ActivityPictureEditionModalComponent, {
      backdrop: false,
      injector: this.injector,
      fullscreen: 'sm'
    });
  }

  download(picture: DownloadablePicture) {
    this.storageService
      .download(picture.path, picture.path.substring(picture.path.lastIndexOf('/') + 1))
      .subscribe();
  }
}
