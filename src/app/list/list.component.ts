import { Component, OnInit, Input } from '@angular/core';
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
    this.store.dispatch(new todos.Load());
    this.items = this.store.select(fromRoot.getTodos);
  }

  ngOnInit() {
    this.todoForm = new FormGroup({
      title: new FormControl(null, Validators.compose([Validators.required])),
      isDone: new FormControl(false)
    });
  }

  public onSelect(item): void {
    this.selectItem = item;
    this.todoForm.get('title').setValue(this.selectItem.title);
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
