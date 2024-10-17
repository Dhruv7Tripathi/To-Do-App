'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { form } from "framer-motion/client";
import { LuLoader2 } from "react-icons/lu";
import DarkModeToggle from "@/components/ui/DarkModetoggle";

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
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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
  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/todos", newTodo);
      setTodos([...todos, response.data]);
      setNewTodo({ whatToDo: "", whenToDo: "", note: "" });
    } catch (error) {
      console.error("Error adding new todo:", error);
    }
  };

  return (
    <>
      <form className="flex flex-col space-y-3 rounded-xl border-2 p-4" onSubmit={handleSubmit}>
        <div className=" absolute top-5 left-5">
          <DarkModeToggle />
          <input type="search"
            placeholder="🔍 search.."
            value={searchTerm}
            onChange={handleSearch}
            className="w-10 h-10 p-2 border border-gray-300 rounded-full focus:outline-none transition-all duration-300 ease-in-out hover:w-48 hover:rounded-xl" />
          {/* <button type="submit" className="border p-1 h-4 w-8 text-sm rounded justify-end text-left" >
            🔍
          </button> */}
        </div>

      </form>

      <div className="min-h-screen flex justify-center items-center">

        <form onSubmit={handleSubmit}>
          <div className="">
            <label className="font-bold border-l-amber-50">What To Do:</label>
            <input
              type="text"
              value={newTodo.whatToDo}
              onChange={(e) =>
                setNewTodo({ ...newTodo, whatToDo: e.target.value })
              }
              className="w-full p-3 bg-gray-100 my-2 rounded"
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
              className="w-full p-3 bg-gray-100 my-2 rounded"
              required
            />
          </div>
          <div>
            <label>Leave a Note:</label>
            <input
              type="text"
              value={newTodo.note}
              onChange={(e) => setNewTodo({ ...newTodo, note: e.target.value })}
              className="w-full p-3 bg-gray-100 my-2 rounded"
            />
          </div>
          <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded flex items- justify-center">
            {
              loading ?
                <LuLoader2 className="animate-spin" />
                :
                <span>Add to do</span>
            }
          </button>
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
    </>
  );
};

export default Todo;
