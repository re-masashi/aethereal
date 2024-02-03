import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

import App from './App.jsx'
import Navbar from './Nav.jsx'
import New from './New.jsx'
import './index.css'

let todos = JSON.parse(localStorage.getItem('todo_lists')||"[]")

console.log(todos)

if(todos.length==0){
  localStorage.setItem('todo_lists',
    JSON.stringify([{
          name:"get started with aethereal",
          tasks: [
            {
              text: "Study",
              isCompleted: false,
              exists: true,
            },
            {
              text: "Eat",
              isCompleted: false,
              exists: true,
            },
            {
              text: "Explore this really cool todo app",
              isCompleted: false,
              exists: true,
            },
          ]
        }])
  )
}


function TodoWithId() {
  // Get the userId param from the URL.
  let { todoIdx } = useParams();
  return (
    <App todos_={todos[todoIdx]} todos_index={todoIdx}/>
  )
}

todos = JSON.parse(localStorage.getItem('todo_lists'))
console.log(todos)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={
            <App todos_={todos[todos.length-1]} todos_index={todos.length-1}/>
          } />
          <Route path="/todos" element={
            (<div className="px-20 w-full text-wrap" >
                {
                  todos.map((todo, index)=>(
                    <div className="flex flex-row justify-center text-black font-black backdrop-blur p-4" key={index}>
                      <Link className="font-semibold p-4" to={'/todos/'+index}>&lt; {todo.name} &gt;</Link>
                    </div>
                  ))
                }
            </div>)
          } />
          <Route path="/new" element={
            <New/>
          }/>
          <Route path="/todos/:todoIdx" element={<TodoWithId/>}/>
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Router>
    </>
  </React.StrictMode>,
)
