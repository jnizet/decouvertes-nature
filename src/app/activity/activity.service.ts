import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  Firestore,
  orderBy,
  query,
  where
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

type LocalDate = string;
type LocalTime = string;

export interface Activity {
  id: string;
  type: string;
  title: string;
  animator: string;
  description: string;
  startDate: LocalDate;
  endDate: LocalDate;
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private activityCollection: CollectionReference<Activity>;

  constructor(firestore: Firestore) {
    this.activityCollection = collection(firestore, 'activities') as CollectionReference<Activity>;
  }

  findAll(): Observable<Array<Activity>> {
    return collectionData(query(this.activityCollection, orderBy('startDate', 'desc')));
  }
}
