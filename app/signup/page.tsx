'use client';
import { FormEvent, useState } from "react";
import React from "react";
import axios, { AxiosError } from "axios";
import { LuLoader2 } from "react-icons/lu";
// import { Boxes } from "@/components/Boxes";



function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    console.log(name, email, password);
    try {
      const response = await axios.post('/api/signup', { email, password });
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      const axiosError = error as AxiosError<{ success: boolean, message: string }>;
      alert(axiosError.response?.data.message || "Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">


      <form className="flex flex-col space-y-3 rounded-xl border-2 p-4" onSubmit={handleSubmit}>
        <h1 className=" flex justify-center items-center  text-black font-bold font-serif text-3xl ">Register
          {/* <br />
          <br />
          <p className="text-blue-600"> A todo Application </p> */}
        </h1>
        {/* <p className="text-blue-500 flex justify-center items-center">A todo Application</p> */}
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
          className="w-full p-3 bg-blue-600 text-white rounded flex items- justify-center"
        >
          {
            loading ?
              <LuLoader2 className="animate-spin" />
              :
              <span>Sign Up</span>
          }
        </button>
        <p>
          Don't have an Account?
          <br />
          <a href="/SignUp" className="text-blue-600 hover:underline">
            {" "}
            Create a new Account{" "}
          </a>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
