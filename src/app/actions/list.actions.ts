import { Action } from '@ngrx/store';

export enum ListActionTypes {
  Load = '[List] Load',
  Add = '[List] Add',
  AddSuccess = '[List] Add Success',
  AddFailure = '[List] Add Failed',
  Remove = '[List] Remove',
  Edit = '[List] Edit',
  LoadSuccess = '[List] Load Success',
  LoadFailure = '[List] Load Failed'
}

export class Load implements Action {
  readonly type = ListActionTypes.Load;
}

export class Add implements Action {
    readonly type = ListActionTypes.Add;

    constructor(public payload: any) {}
}

export class AddSuccess implements Action {
    readonly type = ListActionTypes.AddSuccess;

    constructor(public payload: any) {}
}

export class AddFailure implements Action {
  readonly type = ListActionTypes.AddFailure;

  constructor(public payload: any ) {}
}

export class Remove implements Action {
    readonly type = ListActionTypes.Remove;

    constructor(public id: string) {}
}

export class Edit implements Action {
    readonly type = ListActionTypes.Edit;

    constructor(public id: string, public payload: any) {}
}


export class LoadSuccess implements Action {
    readonly type = ListActionTypes.LoadSuccess;

    constructor(public payload: any) {}
}

export class LoadFailure implements Action {
    readonly type = ListActionTypes.LoadFailure;

    constructor(public payload: any) {}
}

export type ListActions = Load
  | Add
  | AddSuccess
  | AddFailure
  | Remove
  | Edit
  | LoadSuccess
  | LoadFailure;

