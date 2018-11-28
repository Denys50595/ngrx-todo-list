import { Component, OnInit, Input } from '@angular/core';
import { List } from '../models/list';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers/index';
import * as todos from '../actions/list.actions';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { database } from 'firebase';

interface FormControls {
  [key: string]: AbstractControl;
}

interface ListFormControls extends FormControls {
  [key: string]: AbstractControl;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public todoForm: FormGroup;
  public formControls: ListFormControls
  public items: Observable<List[]>;
  public selectItem: any;
  public validationMessages: any;

  constructor(private store: Store<fromRoot.State>, private toastr: ToastrService) {
    this.items = this.store.select(fromRoot.getTodos);
    this.store.dispatch(new todos.Load());

    this.validationMessages = {
      title: 'Please enter what needs to be done!',
    };
  }

  ngOnInit() {
    this.todoForm = new FormGroup({
      title: new FormControl(null, Validators.compose([Validators.required])),
      isDone: new FormControl(null)
    });

    this.formControls = <ListFormControls>this.todoForm.controls;
  }

  public isInvalidControl(control: string) {
    return (this.formControls[control].invalid && this.formControls[control].dirty);
  }

  public getFormControlClass(control: string) {
    const formControl = this.formControls[control];
    return {
      'has-error': formControl.dirty && formControl.invalid,
      'has-success': formControl.dirty && formControl.valid
    }
  }

  public onSelect(item): void {
    this.selectItem = item;
    this.todoForm.get('title').setValue(this.selectItem.title);
  }

  public addItem() {
    if (!this.todoForm.valid) {
      Object.keys(this.formControls).forEach(key => {
        this.todoForm.get(key).markAsDirty();
      });
    } else {
      const data = {
        title: this.todoForm.get('title').value,
        isDone: false
      }
      this.store.dispatch(new todos.Add(data));
      this.todoForm.get('title').reset();
      this.toastr.success("Item successfully added");
    }
  }

  public updateItem() {
    if (!this.selectItem) {
      this.toastr.info('Please select the item to update!');
    } else {
      this.store.dispatch(new todos.Edit(this.selectItem.id, this.todoForm.value));
      this.selectItem = null;
      this.todoForm.get('title').reset();
      this.toastr.success("Item successfully updated");
    }
  }

  public removeItem() {
    if (!this.selectItem) {
      this.toastr.info('Please select the item to remove!');
    } else {
      this.store.dispatch(new todos.Remove(this.selectItem.id));
      this.selectItem = null;
      this.todoForm.get('title').reset();
      this.toastr.success("Item successfully removed");
    }
  }

}
