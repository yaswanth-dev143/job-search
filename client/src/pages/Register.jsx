import React, { useState } from "react";
import first from "../assets/first.png";
import { Link } from "react-router-dom";

const Register = () => {
  // let [Fname, setFname] = useState("");
  // let [Lname, setLname] = useState("");
  // let [email, setemail] = useState("");
  // let [password, setpassword] = useState("");
  let [values, setvalues] = useState({
    Fname: "",
    Lname: "",
    email: "",
    password: "",
  });
  //Onclick action
  let handleChange = (e) => {
    let value = e.target.value;
    setvalues({
      ...values,
      [e.target.name]: value,
    });
  };
  //Form handling
  let handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(values);
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
          <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm mb-2">
                First Name
              </label>
              <input
                required
                type="text"
                name="Fname"
                value={values.Fname}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm mb-2">
                Last Name
              </label>
              <input
                required
                type="text"
                name="Lname"
                value={values.Lname}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm mb-2">
                Email Address
              </label>
              <input
                required
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
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
                value={values.password}
                onChange={handleChange}
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
                Already Register{" "}
                <Link
                  className="hover:underline hover:text-cyan-600 "
                  to="/login"
                >
                  Login
                </Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
