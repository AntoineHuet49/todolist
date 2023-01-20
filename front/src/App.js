import React from 'react';
import TodoList from './components/todoList/index';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import Subscribe from './components/subscribe';
import Login from './components/login';
import PrivateRoutes from './utils/privateRoutes';


function App() {
  return (
    <div className='bg-[#FFE6A7] h-screen m-0 font-sans'>
      <Routes>
        <Route path='/' element={<Subscribe />} />
        <Route path='/login' element={<Login />} />

        <Route element={<PrivateRoutes />} >
          <Route path='/todolist' element={<TodoList />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;