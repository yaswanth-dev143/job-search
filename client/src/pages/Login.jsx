import React, { useState } from "react";
import { Link } from "react-router-dom";
import first from "../assets/first.png";

const Login = () => {
  let [val, setval] = useState({
    email: " ",
    password: " ",
  });

  let handleChangelog = (e) => {
    let vals = e.target.value;
    setval({
      ...val,
      [e.target.name]: vals,
    });
  };

  //Form handling
  let handleSubmitlog = (e) => {
    e.preventDefault();
    try {
      console.log(val);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="h-screen w-full flex justify-center items-center ">
        <div className="w-[60%] h-screen sm:items-center sm:justify-center hidden sm:flex">
          <img src={first} />
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4">Log In</h1>
          <form className="space-y-4" onSubmit={handleSubmitlog}>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm mb-2">
                Email Address
              </label>
              <input
                required
                type="email"
                name="email"
                value={val.email}
                onChange={handleChangelog}
                autoComplete="off"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm mb-2">
                Password
              </label>
              <input
                required
                type="password"
                name="password"
                value={val.password}
                onChange={handleChangelog}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
              >
                Submit
              </button>
              <p>
                Don't have an account{" "}
                <Link
                  className="hover:underline hover:text-cyan-600 "
                  to="/register"
                >
                  Create
                </Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
