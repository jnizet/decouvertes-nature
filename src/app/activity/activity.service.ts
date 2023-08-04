import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  deleteField,
  doc,
  docData,
  Firestore,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where
} from '@angular/fire/firestore';
import { combineLatest, defer, EMPTY, first, from, map, Observable, switchMap, tap } from 'rxjs';
import { LocalDate, LocalTime } from '../shared/types';
import { AuditUser, CurrentUser, CurrentUserService } from '../current-user.service';

export interface ActivityReport {
  cancelled: boolean;
  numberOfParticipants: number;
  comment: string;
}

export interface Activity {
  id: string;
  type: string;
  title: string;
  animator: string;
  description: string; // can be blank when draft
  minNumberOfParticipants: number | null;
  maxNumberOfParticipants: number | null;
  paymentRequired: boolean;
  price: number | null;
  startDate: LocalDate;
  startTime: LocalTime | null; // can be null when draft
  endDate: LocalDate | null; // can be null when draft
  endTime: LocalTime | null; // can be null when draft
  location: string; // can be blank when draft
  intercommunality: string;
  appointmentLocation: string; // can be blank when draft
  roomToBook: string | null;
  bookingMandatory: boolean;
  membersOnly: boolean;
  accessible: boolean;
  accessibleToChildren: boolean;
  minChildrenAge: number | null;
  labels: Array<string>;
  associatedOrganizations: Array<string>;
  equipments: Array<string>;
  comment: string;
  author: AuditUser;
  lastModifier: AuditUser | null;
  report?: ActivityReport;
  draft: boolean;
}

export interface ActivityType {
  readonly key: string;
  readonly label: string;
  readonly example?: string;
}

export type ActivityCommand = Omit<Activity, 'id'>;
export type ActivityReportCommand = ActivityReport;

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
  },
  {
    key: 'AUTRE',
    label: 'Autre'
  }
];

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private activityCollection: CollectionReference<Activity>;
  private animatorCollection: CollectionReference<Animator>;

  constructor(
    private firestore: Firestore,
    private currentUserService: CurrentUserService
  ) {
    this.activityCollection = collection(firestore, 'activities') as CollectionReference<Activity>;
    this.animatorCollection = collection(firestore, 'animators') as CollectionReference<Animator>;
  }

  findVisible(): Observable<Array<Activity>> {
    return combineLatest([
      this.currentUserService.getCurrentUser(),
      collectionData(query(this.activityCollection, orderBy('startDate', 'desc')))
    ]).pipe(
      map(([currentUser, activities]) =>
        activities.filter(a => this.isActivityVisibleBy(a, currentUser))
      )
    );
  }

  findNonDraft(): Observable<Array<Activity>> {
    return this.findVisible().pipe(map(activities => activities.filter(a => !a.draft)));
  }

  findMine(): Observable<Array<Activity>> {
    return collectionData(
      query(
        this.activityCollection,
        where('author.uid', '==', this.currentUserService.getCurrentAuditUser().uid),
        orderBy('startDate', 'desc')
      )
    );
  }

  create(command: ActivityCommand): Observable<Activity> {
    const document = doc(this.activityCollection);
    const activity: Activity = {
      ...command,
      id: document.id
    };
    return defer(() => setDoc(document, activity))
      .pipe(map(() => activity))
      .pipe(tap(() => this.addAnimatorIfNecessary(command.animator)));
  }

  update(id: string, command: ActivityCommand): Observable<void> {
    return defer(() =>
      setDoc(doc(this.activityCollection, id), {
        ...command,
        id
      })
    );
  }

  updateReport(id: string, command: ActivityReportCommand): Observable<void> {
    const report = command;
    return defer(() =>
      updateDoc(doc(this.activityCollection, id), {
        report
      })
    );
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

  deleteActivity(id: string): Observable<void> {
    return defer(() => deleteDoc(doc(this.activityCollection, id)));
  }

  deleteReport(id: string) {
    return defer(() =>
      updateDoc(doc(this.activityCollection, id), {
        report: deleteField()
      })
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private isActivityVisibleBy(activity: Activity, currentUser: CurrentUser | null): boolean {
    return true;
    // if we go back to hiding drafts not created by the current user unless the user is an admin, change the code here
  }
}
