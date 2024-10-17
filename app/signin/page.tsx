'use client';
import React from "react";
import { LuLoader } from "react-icons/lu";

function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    console.log(email, password);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form className="w-fit p-6 border rounded-xl flex flex-col space-y-3" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Email"
            className="w-full p-3 bg-gray-100 my-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)
            }
            required
          />
        </div >
        <div className="relative">
          <input
            type={visible ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 bg-gray-100 my-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

        </div>
        <button className="w-full p-3 bg-blue-600 text-white rounded">
          {loading ? (
            <>
              <LuLoader className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </>
          ) : (
            "Sign In"
          )}
        </button>


      </form >
    </div >
  );
}

export default SignIn;
