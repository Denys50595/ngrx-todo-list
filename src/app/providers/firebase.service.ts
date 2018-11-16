import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { List } from '../models/list';
import { map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) { }

  public getTodoList() {
    const collectinoRef = this.firestore.collection('/test-list');
    return collectinoRef.snapshotChanges().pipe(
      map((arr) => {
        return arr.map((snap) => {
          const doc = snap.payload.doc;
          const data = doc.data();
          return data;
        });
      }))
  }

  public getTodo(id: string) {
    const collectinoRef = this.firestore.collection('/test-list');
    return collectinoRef.doc(id).snapshotChanges().pipe(
      map((res: any) => {
        const todo = res.payload.data();
        console.log("1 todo=>", todo)
        return todo;
      })
    )
  }

  public addTodo(todo: List) {
    const collectinoRef = this.firestore.collection('/test-list');
    return collectinoRef.add(todo).then(docRef => {
      return docRef.update({
        id: docRef.id
      });
    });
  }

  public updateTodo(id: string, value: any) {
    const collectinoRef = this.firestore.collection('/test-list');
    return collectinoRef.doc(id).update(value);
  }

  public deleteTodo(id: string) {
    const collectinoRef = this.firestore.collection('/test-list');
    return collectinoRef.doc(id);
  }


}
