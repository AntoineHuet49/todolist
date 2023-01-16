import React from 'react';
import TodoList from './components/todoList/index';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import Login from './components/login';


function App() {
  return (
    <div className='bg-[#FFE6A7] h-screen m-0 font-sans'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/todolist' element={<TodoList />} />
      </Routes>
    </div>
  )
}

export default App;