
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';

// Action types
const TOGGLE_THEME = 'TOGGLE_THEME';
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

// Action creators
const toggleTheme = () => ({ type: TOGGLE_THEME });
const addTodo = (text) => ({ type: ADD_TODO, payload: text });
const removeTodo = (id) => ({ type: REMOVE_TODO, payload: id });
const toggleTodo = (id) => ({ type: TOGGLE_TODO, payload: id });

// Initial state
const initialState = {
  theme: { isDarkMode: false },
  todos: [],
};

// Reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        theme: { isDarkMode: !state.theme.isDarkMode },
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.payload, completed: false },
        ],
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    default:
      return state;
  }
};

// App component
const TodoList = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const todos = useSelector((state) => state.todos);

  const handleAddTodo = (e) => {
    e.preventDefault();
    const text = e.target.elements.todoInput.value;
    if (text.trim()) {
      dispatch(addTodo(text));
      e.target.elements.todoInput.value = '';
    }
  };

  return (
    <div className={isDarkMode ? 'dark-theme' : 'light-theme'}>
      <header>
        <h1>Todo List</h1>
        <button onClick={() => dispatch(toggleTheme())}>
          Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
      </header>

      <form onSubmit={handleAddTodo}>
        <input name="todoInput" type="text" placeholder="Add a new todo..." />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
                
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch(removeTodo(todo.id))}>Remove</button>
            <button
              onClick={() => dispatch(toggleTodo(todo.id))}
              style={{
                backgroundColor: todo.completed ? 'green' : 'gray',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                cursor: 'pointer',
                margin:'5px',
              }}
            >
              {todo.completed ? 'Completed' : 'Mark as Completed'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
export { rootReducer };
