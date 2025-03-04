import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { combineLatest, distinctUntilChanged, map, startWith } from 'rxjs';
import { PageTitleDirective } from '../../page-title/page-title.directive';
import { IconDirective } from '../../icon/icon.directive';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Animator, AnimatorService } from '../animator.service';
import { ConsentComponent } from '../consent/consent.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnimatorEditionModalComponent } from '../animator-edition-modal/animator-edition-modal.component';
import { ToastService } from '../../toast/toast.service';
import { toSignal } from '@angular/core/rxjs-interop';
import * as icons from '../../icon/icons';

@Component({
  selector: 'dn-animators',
  imports: [
    PageTitleDirective,
    IconDirective,
    LoadingSpinnerComponent,
    ReactiveFormsModule,
    ConsentComponent
  ],
  templateUrl: './animators.component.html',
  styleUrls: ['./animators.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimatorsComponent {
  private modalService = inject(NgbModal);
  private toastService = inject(ToastService);

  animators: Signal<Array<Animator> | undefined>;

  searchControl = inject(NonNullableFormBuilder).control('');

  icons = icons;

  constructor() {
    const animatorService = inject(AnimatorService);

    const filter$ = this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value),
      map(f => f.trim()),
      distinctUntilChanged()
    );
    this.animators = toSignal(
      combineLatest([animatorService.list(), filter$]).pipe(
        map(([animators, filter]) => this.filterAnimators(animators, filter))
      )
    );
  }

  clearSearch() {
    this.searchControl.reset();
  }

  private filterAnimators(animators: Array<Animator>, filter: string): Array<Animator> {
    const lowercaseFilter = filter.toLowerCase();
    return animators.filter(animator => animator.name.toLowerCase().includes(lowercaseFilter));
  }

  editAnimator(animator: Animator) {
    const modalRef = this.modalService.open(AnimatorEditionModalComponent, {
      fullscreen: 'sm'
    });
    (modalRef.componentInstance as AnimatorEditionModalComponent).prepareForUpdate(animator);
    modalRef.closed.subscribe(() => this.toastService.success(`L'animateur a été modifié`));
  }

  createAnimator() {
    const modalRef = this.modalService.open(AnimatorEditionModalComponent, {
      fullscreen: 'sm'
    });
    (modalRef.componentInstance as AnimatorEditionModalComponent).prepareForCreation();
    modalRef.closed.subscribe(() => this.toastService.success(`L'animateur a été créé`));
  }
}
