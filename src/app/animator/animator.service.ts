import { inject, Injectable } from '@angular/core';
import {
  collection,
  CollectionReference,
  collectionSnapshots,
  doc,
  docSnapshots,
  Firestore,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where
} from '@angular/fire/firestore';
import { defer, first, map, Observable, of, switchMap } from 'rxjs';

export type AnimatorCommand = Omit<Animator, 'id'>;
export type UpdateAnimatorCommand = Omit<AnimatorCommand, 'name'>;

export type Consent = 'YES' | 'NO' | 'UNKNOWN';

export interface Animator {
  id: string;
  name: string;
  emailConsent?: Consent;
  phoneConsent?: Consent;
}

@Injectable({
  providedIn: 'root'
})
export class AnimatorService {
  private animatorCollection = collection(
    inject(Firestore),
    'animators'
  ) as CollectionReference<Animator>;

  list(): Observable<Array<Animator>> {
    return collectionSnapshots(query(this.animatorCollection, orderBy('name'))).pipe(
      map(animatorSnapshots => animatorSnapshots.map(s => ({ ...s.data(), id: s.id })))
    );
  }

  suggest(text: string): Observable<Array<Animator>> {
    const query = text.toLowerCase();
    return this.list().pipe(
      first(),
      map(animators => {
        const result = new Set<Animator>();
        const exactAnimators = animators.filter(a => a.name.toLowerCase() === query);
        exactAnimators.forEach(a => result.add(a));
        const closeAnimators = animators
          .filter(a => a.name.toLowerCase().includes(query) && !exactAnimators.includes(a))
          .sort((a1, a2) => (a1.name < a2.name ? -1 : a1.name > a2.name ? 1 : 0));
        closeAnimators.forEach(a => result.add(a));
        return [...result].slice(0, 10);
      })
    );
  }

  get(id: string): Observable<Animator> {
    return docSnapshots(doc(this.animatorCollection, id)).pipe(
      map(animatorSnapshot => ({ ...animatorSnapshot.data()!, id: animatorSnapshot.id }))
    );
  }

  getByName(name: string): Observable<Animator | null> {
    return collectionSnapshots(query(this.animatorCollection, where('name', '==', name))).pipe(
      map(animatorsnapshots => animatorsnapshots[0] ?? null),
      map(animatorSnapshot =>
        animatorSnapshot ? { ...animatorSnapshot.data(), id: animatorSnapshot.id } : null
      )
    );
  }

  getByNameOrCreate(name: string): Observable<Animator> {
    return this.getByName(name).pipe(
      switchMap(animator => {
        return animator
          ? of(animator)
          : this.create({
              name,
              emailConsent: 'UNKNOWN',
              phoneConsent: 'UNKNOWN'
            });
      })
    );
  }

  create(command: AnimatorCommand) {
    const document = doc(this.animatorCollection);
    const animator: Animator = {
      ...command,
      id: document.id
    };
    return defer(() => setDoc(document, animator)).pipe(map(() => animator));
  }

  update(id: string, command: UpdateAnimatorCommand): Observable<void> {
    return defer(() =>
      updateDoc(doc(this.animatorCollection, id), {
        ...command,
        id
      })
    );
  }
}
