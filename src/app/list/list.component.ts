import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from '../providers/firebase.service';
import { Observable } from 'rxjs';
import { List } from '../models/list';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers/index';
import * as todos from '../actions/list.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public todoForm: FormGroup;
  public items: any;
  public selectItem: any;

  constructor(private store: Store<fromRoot.State>) {
    this.items = this.store.select(fromRoot.getTodos)
    this.store.dispatch(new todos.Load())
  }

  ngOnInit() {
    this.todoForm = new FormGroup({
      title: new FormControl(null, Validators.compose([Validators.required])),
      isDone: new FormControl(false)
    });
    console.log(this.todoForm.value)
  }

  public onSelect(item): void {
    this.selectItem = item;
    this.todoForm.get('title').setValue(this.selectItem.title);
    console.log(item);
  }

  public addItem() {
    this.store.dispatch(new todos.Add(this.todoForm.value));
    this.ngOnInit();
  }

  public updateItem() {
    this.store.dispatch(new todos.Edit(this.selectItem.id, this.todoForm.value));
    this.ngOnInit();
  }

  public removeItem() {
    this.store.dispatch(new todos.Remove(this.selectItem.id));
    this.ngOnInit();
  }

}
