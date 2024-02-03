import { useState, useEffect } from 'react'

export default function New({ }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    let newTodos = JSON.parse(localStorage.getItem('todo_lists')) || []
    newTodos[newTodos.length] = {
      name: value,
      tasks:[],
    }
    localStorage.setItem('todo_lists', JSON.stringify(newTodos))
  };

  return (
    <form className="flex-row flex justify-center w-full my-2 p-4 backdrop-blur"
      onSubmit={handleSubmit}
      >
      <input
        type="text"
        className="w-full bg-gray-600 bg-opacity-50 border-none p-2 rounded-md text-white"
        onChange={e => {
          setValue(e.target.value)
        }}
      />
      <h3 className="text-lg p-2">
        Name
      </h3>
    </form>
  );
}

