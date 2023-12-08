import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, distinctUntilChanged, map, Observable, startWith } from 'rxjs';
import { PageTitleDirective } from '../../page-title/page-title.directive';
import { IconDirective } from '../../icon/icon.directive';
import { RouterLink } from '@angular/router';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';
import { AsyncPipe } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Animator, AnimatorService } from '../animator.service';
import { pencilSquare, plusCircle } from '../../bootstrap-icons/bootstrap-icons';
import { ConsentComponent } from '../consent/consent.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnimatorEditionModalComponent } from '../animator-edition-modal/animator-edition-modal.component';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'dn-animators',
  standalone: true,
  imports: [
    PageTitleDirective,
    IconDirective,
    RouterLink,
    LoadingSpinnerComponent,
    AsyncPipe,
    ReactiveFormsModule,
    ConsentComponent
  ],
  templateUrl: './animators.component.html',
  styleUrls: ['./animators.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimatorsComponent {
  animators$: Observable<Array<Animator>>;

  searchControl = this.fb.control('');

  icons = {
    add: plusCircle,
    edit: pencilSquare
  };

  constructor(
    private animatorService: AnimatorService,
    private fb: NonNullableFormBuilder,
    private modalService: NgbModal,
    private toastService: ToastService
  ) {
    const filter$ = this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value),
      map(f => f.trim()),
      distinctUntilChanged()
    );
    this.animators$ = combineLatest([animatorService.list(), filter$]).pipe(
      map(([animators, filter]) => this.filterAnimators(animators, filter))
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
