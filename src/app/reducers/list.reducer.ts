import * as todos from '../actions/list.actions';
import { List } from '../models/list';

export interface State {
  todos: Array<List>;
}

const initialState: State = {
  todos: []
};

export function reducer(state = initialState, action: todos.ListActions): State {
  switch (action.type) {
    case todos.ListActionTypes.LoadSuccess:
      return {
        ...state, todos: action.payload
      };
    case todos.ListActionTypes.LoadFailure:
      return {
        ...state
      };
    case todos.ListActionTypes.Add:
      return {
        ...state, todos: [ action.payload ]
      };
    case todos.ListActionTypes.Edit:
      return {
        ...state, todos: [ action.payload ]
      };
    case todos.ListActionTypes.Remove:
      return {
        todos: state.todos.filter(item => {
          return item.id !== action.id;
        })
      };
    default:
      return state;
  }
}
