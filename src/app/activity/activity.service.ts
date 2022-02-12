import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  doc,
  docData,
  Firestore,
  orderBy,
  query,
  setDoc,
  where
} from '@angular/fire/firestore';
import { EMPTY, first, from, map, mapTo, Observable, switchMap, tap } from 'rxjs';
import { LocalDate, LocalTime } from '../shared/types';

export interface Activity {
  id: string;
  type: string;
  title: string;
  animator: string;
  description: string;
  maxNumberOfParticipants: number | null;
  paymentRequired: boolean;
  price: number | null;
  startDate: LocalDate;
  startTime: LocalTime;
  endDate: LocalDate;
  endTime: LocalTime;
  location: string;
  intercommunality: string;
  appointmentLocation: string;
  roomToBook: string | null;
  bookingMandatory: boolean;
  membersOnly: boolean;
  accessible: boolean;
  labels: Array<string>;
  associatedOrganizations: Array<string>;
  comment: string;
}

export interface ActivityType {
  readonly key: string;
  readonly label: string;
  readonly example?: string;
}

export type ActivityCommand = Omit<Activity, 'id'>;

export interface Animator {
  name: string;
}

export const ALL_ACTIVITY_TYPES: ReadonlyArray<ActivityType> = [
  {
    key: 'PROSPECTION',
    label: 'Prospection',
    example: "comptage d'une colonie de moineaux friquets"
  },
  {
    key: 'SORTIE_DECOUVERTE',
    label: 'Sortie découverte',
    example: 'initiation aux chants des oiseaux'
  },
  {
    key: 'JOURNEE_DECOUVERTE',
    label: 'Journée découverte',
    example: 'circuit des étangs'
  },
  {
    key: 'JOURNEE_OBSERVATION',
    label: "Journée d'observation",
    example: 'comptage ODJ'
  },
  {
    key: 'VISITE_REFUGE',
    label: "Visite d'un refuge LPO"
  },
  {
    key: 'ATELIER',
    label: 'Atelier'
  },
  {
    key: 'CONFERENCE',
    label: 'Conférence'
  },
  {
    key: 'GRAND_RENDEZ_VOUS',
    label: 'Grand rendez-vous',
    example: 'Assemblée territoriale de la délégation Loire'
  }
];

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private activityCollection: CollectionReference<Activity>;
  private animatorCollection: CollectionReference<Animator>;

  constructor(private firestore: Firestore) {
    this.activityCollection = collection(firestore, 'activities') as CollectionReference<Activity>;
    this.animatorCollection = collection(firestore, 'animators') as CollectionReference<Animator>;
  }

  findAll(): Observable<Array<Activity>> {
    return collectionData(query(this.activityCollection, orderBy('startDate', 'desc')));
  }

  create(command: ActivityCommand): Observable<Activity> {
    const document = doc(this.activityCollection);
    const activity: Activity = {
      ...command,
      id: document.id
    };
    return from(setDoc(document, activity))
      .pipe(mapTo(activity))
      .pipe(tap(() => this.addAnimatorIfNecessary(command.animator)));
  }

  update(id: string, command: ActivityCommand): Observable<void> {
    return from(setDoc(doc(this.activityCollection, id), { ...command, id }));
  }

  suggestAnimators(text: string): Observable<Array<string>> {
    const query = text.toLowerCase();
    return collectionData(this.animatorCollection).pipe(
      first(),
      map(animators =>
        animators
          .filter(a => a.name.toLowerCase().includes(query))
          .map(a => a.name)
          .sort()
          .slice(0, 10)
      )
    );
  }

  get(id: string): Observable<Activity> {
    return docData(doc(this.activityCollection, id));
  }

  private addAnimatorIfNecessary(name: string) {
    collectionData(query(this.animatorCollection, where('name', '==', name)))
      .pipe(
        first(),
        switchMap(animators => {
          if (animators.length === 0) {
            const document = doc(this.animatorCollection);
            const animator: Animator = {
              name
            };
            return from(setDoc(document, animator));
          } else {
            return EMPTY;
          }
        })
      )
      .subscribe();
  }
}
