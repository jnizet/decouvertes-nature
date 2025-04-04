import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationErrorsComponent } from 'ngx-valdemort';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CurrentActivityService } from '../current-activity.service';
import { ActivityPicture, ActivityService } from '../activity.service';
import { DownloadablePicture } from '../activity-pictures/activity-pictures.component';
import { Spinner } from '../../shared/spinner';
import { first, forkJoin, Observable, Subscriber, switchMap } from 'rxjs';
import { StorageService } from '../../storage.service';
import { SpinningIconComponent } from '../../shared/spinning-icon/spinning-icon.component';
import * as icons from '../../icon/icons';
import { FormControlValidationDirective } from '../../validation/form-control-validation.directive';

const MAX_PICTURE_SIZE = 800;

type ViewModel =
  | {
      mode: 'create';
      file: File;
      pictureUrl: string;
    }
  | {
      mode: 'update';
      editedPicture: DownloadablePicture;
      pictureUrl: string;
    };

@Component({
  selector: 'dn-activity-picture-edition-modal',
  imports: [
    ReactiveFormsModule,
    ValidationErrorsComponent,
    SpinningIconComponent,
    FormControlValidationDirective
  ],
  templateUrl: './activity-picture-edition-modal.component.html',
  styleUrls: ['./activity-picture-edition-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityPictureEditionModalComponent {
  private activeModal = inject(NgbActiveModal);
  private storageService = inject(StorageService);
  private currentActivityService = inject(CurrentActivityService);
  private activityService = inject(ActivityService);

  vm = signal<ViewModel | undefined>(undefined);

  form = inject(NonNullableFormBuilder).group({
    legend: ['', Validators.required],
    credit: ['', Validators.required]
  });

  saving = new Spinner();

  icons = icons;

  prepareForCreation(file: File) {
    this.vm.set({
      mode: 'create',
      file: file,
      pictureUrl: URL.createObjectURL(file)
    });
  }

  prepareForUpdate(picture: DownloadablePicture) {
    this.vm.set({
      mode: 'update',
      editedPicture: picture,
      pictureUrl: picture.thumbnailDownloadUrl
    });
    this.form.setValue({
      legend: picture.legend,
      credit: picture.credit
    });
  }

  save() {
    const vm = this.vm();
    if (!this.form.valid || !vm) {
      return;
    }

    const formValue = this.form.getRawValue();

    const activity$ = this.currentActivityService.activity$.pipe(first());
    if (vm.mode === 'create') {
      const path = this.storageService.generateUniquePath('activities/', '.jpg');
      let thumbnailPath = path;

      const thumbnail$ = this.resizePicture(vm.file);

      thumbnail$
        .pipe(
          switchMap(thumbnailOrNull => {
            if (thumbnailOrNull) {
              thumbnailPath = this.storageService.generateUniquePath('activities/', '.jpg');
              return forkJoin([
                this.storageService.upload(path, vm.file),
                this.storageService.upload(thumbnailPath, thumbnailOrNull)
              ]);
            } else {
              return this.storageService.upload(path, vm.file);
            }
          }),
          switchMap(() => activity$),
          switchMap(activity => {
            const newPicture: ActivityPicture = {
              path,
              thumbnailPath,
              legend: formValue.legend,
              credit: formValue.credit
            };
            return this.activityService.updatePictures(activity.id, [
              ...(activity.pictures ?? []),
              newPicture
            ]);
          }),
          this.saving.spinUntilFinalization()
        )
        .subscribe(() => this.activeModal.close());
    } else if (vm.mode === 'update') {
      activity$
        .pipe(
          switchMap(activity => {
            const picture: ActivityPicture = {
              ...vm.editedPicture,
              legend: formValue.legend,
              credit: formValue.credit
            };
            return this.activityService.updatePictures(
              activity.id,
              (activity.pictures ?? []).map(p => (p.path === picture.path ? picture : p))
            );
          }),
          this.saving.spinUntilFinalization()
        )
        .subscribe(() => this.activeModal.close());
    }
  }

  cancel() {
    this.activeModal.dismiss();
  }

  private resizePicture(file: File): Observable<Blob | null> {
    return new Observable((observer: Subscriber<Blob | null>) => {
      const img = document.createElement('img');
      this.readFile(file, image => {
        img.src = image;
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width <= MAX_PICTURE_SIZE && height <= MAX_PICTURE_SIZE) {
            observer.next(null);
            observer.complete();
            return;
          }

          if (width > height) {
            if (width > MAX_PICTURE_SIZE) {
              height *= MAX_PICTURE_SIZE / width;
              width = MAX_PICTURE_SIZE;
            }
          } else {
            if (height > MAX_PICTURE_SIZE) {
              width *= MAX_PICTURE_SIZE / height;
              height = MAX_PICTURE_SIZE;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d')!;
          ctx.drawImage(img, 0, 0, width, height);

          const blobCallback = (blob: Blob | null) => {
            // this is necessary because Zone.js doesn't patch canvas anymore: see https://github.com/angular/angular/issues/30939
            observer.next(blob!);
            observer.complete();
          };

          canvas.toBlob(blobCallback, 'image/jpeg', 0.8);
        };
      });
    });
  }

  private readFile(file: File, callback: (image: string) => any) {
    const reader = new FileReader();
    reader.onload = () => callback(reader.result as string);
    reader.readAsDataURL(file);
  }
}
