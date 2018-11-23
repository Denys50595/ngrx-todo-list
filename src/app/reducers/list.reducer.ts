import * as todos from '../actions/list.actions';
import { List } from '../models/list';

export interface State {
  todos: Array<List>;
}

const initialState: State = {
  todos: []
};

export function reducer(state = initialState, action: todos.ListActions): State {
  console.log(action)
  switch (action.type) {
    case todos.ListActionTypes.LoadSuccess:
      return { ...state, todos: action.payload }

    case todos.ListActionTypes.LoadFailure:
      return {
        ...state
      };

    case todos.ListActionTypes.Add:
      return {
        ...state
      };

    case todos.ListActionTypes.AddSuccess:
      const addTodoSuccess = state.todos.concat({
        id: action.payload.id,
        isDone: action.payload.isDone,
        title: action.payload.title,
      })
      return {
        ...state,
        todos: addTodoSuccess
      };

    case todos.ListActionTypes.Edit:
      const editTodo = state.todos.map(item => {
        if (item.id === action.id) {
          return { ...item, ...action.payload }
        }
        return item;
      })
      return {
        ...state,
        todos: editTodo
      };

    case todos.ListActionTypes.Remove:
      const deleteTodo = state.todos.filter(item => {
        return item.id !== action.id;
      })
      return {
        ...state,
        todos: deleteTodo
      };

    default:
      return state;
  }
}
