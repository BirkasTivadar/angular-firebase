import { Component, OnInit } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { UserService } from './service/user.service';

import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-firebase';
  items: Observable<any> = this.userService.all;
  newUser: User = new User();

  // miután kiszerveztük a Service-be, módosítottuk
  // items!: Observable<any>;

  constructor(
    private userService: UserService,

    // miután kiszerveztük a Service-be, már nem kell
    // private firestore: AngularFirestore,
  ) { }

  ngOnInit(): void {
    // miután kiszerveztük a Service-be, ez már nem kell
    // this.items = this.firestore.collection('users').valueChanges({
    //   idField: 'docID'
    // });
  }

  onCreate(user: User): void {
    this.userService.create(user).then(
      resp => alert('New user has been added'),
      err => alert(err.error)
    )
  }

  onUpdate(user: User): void {
    this.userService.update(user).then(
      resp => alert('User has been updated'),
      err => alert(err.error)
    )

  }

  onDelete(user: User): void {
    if (!confirm('Are you sure?')) {
      return;
    }
    this.userService.delete(user).then(
      resp => alert('User has been deleted'),
      err => alert(err.error)
    )
  }
}
