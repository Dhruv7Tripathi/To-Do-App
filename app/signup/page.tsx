'use client';
import { FormEvent, useState } from "react";
import React from "react";
import Button from "@/components/button";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name, email, password);
  };

  return (
    <div>
      <h1>Welcome to Work Place </h1>
      <p>A todo application</p>

      <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 bg-gray-100 my-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-100 my-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-100 my-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded"
        >
          Sign Up
        </button>
        <Button>
          SignUp
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
