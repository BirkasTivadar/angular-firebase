import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  all!: Observable<any>;
  itemsCollection!: AngularFirestoreCollection<any>;

  constructor(
    private firestore: AngularFirestore,
  ) {
    this.itemsCollection = this.firestore.collection('users');
    // this.all = this.firestore.collection('users').valueChanges({
    // a this.firestore.collection('users')-t kiszervezem egy változóba
    this.all = this.itemsCollection.valueChanges({
      idField: 'docID'
    });
  }

  create(doc: any): Promise<any> {
    return this.itemsCollection.add({ ...doc }); // spread operátorral leklónozom az user objektumot egy PlainObject-é 
  }

  update(doc: any): Promise<any> {
    const id = doc.docID;
    delete doc.docID;  // azért szervezem ki, hogy az update-nél ne mentse újra az id-t.
    return this.itemsCollection.doc(id).update({ ...doc });
  }

  delete(doc: any): Promise<any> {
    return this.itemsCollection.doc(doc.docID).delete();
  }
}
