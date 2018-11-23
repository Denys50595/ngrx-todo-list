import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { FirebaseService } from '../providers/firebase.service';
import * as Todos from '../actions/list.actions';
import { mergeMap, map, catchError, exhaustMap, switchMap, tap, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ListEffects {

  @Effect()
  loadTodos$ = this.actions$.ofType(Todos.ListActionTypes.Load)
    .pipe(
      mergeMap(() => {
        return this.todoService.getTodoList()
          .pipe(
            map(res => new Todos.LoadSuccess(res)),
            catchError(error => of(new Todos.LoadFailure(error)))
          );
      }));

  @Effect({ dispatch: false })
  loadFailure$ = this.actions$.ofType(Todos.ListActionTypes.LoadFailure)
    .pipe(
      map((action: Todos.LoadFailure) => action.payload),
      exhaustMap(errors => {
        console.log('Server error: ', errors);
        return of(null);
      })
    );

  @Effect()
  addTodos$ = this.actions$.ofType(Todos.ListActionTypes.Add)
    .pipe(
      map((action: Todos.Add) => action.payload),
      exhaustMap(payload => {
        return this.todoService.addTodo(payload)
          .then(res => new Todos.AddSuccess(res))
          .catch(error => new Todos.AddFailure(error));
      })
    );

  @Effect({ dispatch: false })
  removeTodos$ = this.actions$.ofType<Todos.Remove>(Todos.ListActionTypes.Remove).pipe(
    map((action: Todos.Remove) => {
      return this.todoService.deleteTodo(action.id)
        .then(res => new Todos.LoadSuccess(res))
        .catch(error => of(new Todos.LoadFailure(error)))
    })
  );

  @Effect({ dispatch: false })
  editTodos$ = this.actions$.ofType(Todos.ListActionTypes.Edit)
    .pipe(
      map((action: Todos.Edit) => {
        return this.todoService.updateTodo(action.id, action.payload)
          .then(res => new Todos.LoadSuccess(res))
          .catch(error => of(new Todos.LoadFailure(error)));
      })
    );

  constructor(private actions$: Actions, private todoService: FirebaseService) { }
}
