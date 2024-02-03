import { useState, useEffect } from 'react'

let wps = [{link:"lofi_cat.png"}, {link:"night_city.png"}]

function Todo({ todo, index, toggleTodo, removeTodo}) {

  return (
    <div className="py-4 w-full text-wrap" style={{display: todo.exists?"":"none"}}>
      
      <div className="flex flex-row ">
        <span style={{ textDecoration: todo.isCompleted ? "line-through" : "" }} className="font-semibold"> {todo.text}</span>
        <div className="ml-auto">
          {!todo.isCompleted ?
            <input className="mx-3" type="checkbox" name="myCheckbox" onChange={()=>toggleTodo(index)}/> 
            :
            <input className="mx-3 accent-indigo-700" type="checkbox" name="myCheckbox" onChange={()=>toggleTodo(index)}
              defaultChecked={true}/> 
          }
          <button onClick={()=>removeTodo(index)} style={{display: todo.exists?"":"none"}} className="font-bold">
          REMOVE</button>
        </div>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex-row flex justify-center w-full my-2 ">
      <input
        type="text"
        className="w-full bg-gray-600 bg-opacity-50 border-none p-2 rounded-md text-white"
        value={value}
        onChange={e => {
          setValue(e.target.value)
        }}
      />
    </form>
  );
}

function App({todos_, todos_index}) {
  const toggleTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };
  const removeTodo = index =>{
    const newTodos = [...todos]
    newTodos[index].exists = false
    setTodos(newTodos);
  }
  const [todos, setTodos] = useState(todos_.tasks);
  const [todoName, setTodoName] = useState(todos_.name)

  const addTodo = text => {
    const newTodos = [...todos, { text, isCompleted: false, exists: true }];
    setTodos(newTodos);
    // localStorage.setItem('todo_lists', JSON.stringify(newTodos))
  };

  return (
    <div className="p-8">
      <div className="flex flex-col w-full px-16 pt-16 backdrop-blur pb-20  shadow shadow-black rounded-lg">
        <div className="">
          {todos.map((todo, index) => (
            <Todo
              key={index}
              index={index}
              todo={todo}
              toggleTodo={toggleTodo}
              removeTodo={removeTodo}
            />
          ))}
        </div>
        <TodoForm addTodo={addTodo} />
      </div>
      <div className="absolute fixed bottom-2 right-2 p-4 text-white font-extrabold rounded-md backdrop-blur">
          <input className="bg-gray-600 bg-opacity-50 rounded-lg p-2" value={todoName} onChange={e=>{
            setTodoName(e.target.value)
              let newTodos = JSON.parse(localStorage.getItem('todo_lists')) || []
              console.log(newTodos)
              newTodos[todos_index].name = e.target.value
              localStorage.setItem('todo_lists', JSON.stringify(newTodos))
            
          }}/>
          <button className="px-4">UwU</button>
      </div>
    </div>
  )
}

export default App
