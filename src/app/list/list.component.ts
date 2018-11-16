import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from '../providers/firebase.service';
import { Observable } from 'rxjs';
import { List } from '../models/list';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers/index';
import * as todos from '../actions/list.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  items: any;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.items = this.store.select(fromRoot.getTodos).subscribe(res => console.log(res))
    this.store.dispatch(new todos.Load())
  }

  public add() {
    this.store.dispatch(new todos.Add({title: 'test', isDone: false}));
  }

}
