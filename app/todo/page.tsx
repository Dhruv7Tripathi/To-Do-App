'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Todo {
  _id: string;
  whatToDo: string;
  whenToDo: string;
  note: string;
}

const Todo = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({
    whatToDo: "",
    whenToDo: "",
    note: "",
  });
  useEffect(() => {
    axios
      .get("http://localhost:5000/todos")
      .then((response: any) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/todos", newTodo);
      setTodos([...todos, response.data]);
      setNewTodo({ whatToDo: "", whenToDo: "", note: "" });
    } catch (error) {
      console.error("Error adding new todo:", error);
    }
  };

  return (
    <div className="bg-white p-8 min-h-screen flex justify-center items-center rounded-3xl shadow-md w-96">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        To-Do Application
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="font-bold border-l-amber-50">What To Do:</label>
          <input
            type="text"
            value={newTodo.whatToDo}
            onChange={(e) =>
              setNewTodo({ ...newTodo, whatToDo: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>When To Do:</label>
          <input
            type="date"
            value={newTodo.whenToDo}
            onChange={(e) =>
              setNewTodo({ ...newTodo, whenToDo: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Leave a Note:</label>
          <input
            type="text"
            value={newTodo.note}
            onChange={(e) => setNewTodo({ ...newTodo, note: e.target.value })}
          />
        </div>
        <button type="submit">Add ToDo</button>
      </form>

      {/* <h2>To-Do List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <strong>What:</strong> {todo.whatToDo}, <strong>When:</strong>{" "}
            {new Date(todo.whenToDo).toLocaleDateString()},{" "}
            <strong>Note:</strong> {todo.note}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Todo;
