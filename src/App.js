import React from 'react'
import TodoList from './Component/TodoList';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './Component/TodoList';


const store = createStore(rootReducer);
const App = () => {

  return (
    <div>
        
        <Provider store={store}>
          <TodoList/>
        </Provider>
    </div>
  )
}

export default App