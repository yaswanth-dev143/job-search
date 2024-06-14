import React, { useState } from "react";
import first from "../assets/first.png";
import { Await, Link } from "react-router-dom";
import InputFrom from "../components/InputForm";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { axios } from "axios";

const Register = () => {
  let [Fname, setFname] = useState("");
  let [Lname, setLname] = useState("");
  let [email, setemail] = useState("");
  let [password, setpassword] = useState("");

  //hooks
  const dispatch = useDispatch();
  //Form handling
  let handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(Fname, Lname, email, password);
      dispatch(showLoading());
      const { data } = axios.post("/api/v1/auth/register", {
        Fname,
        Lname,
        email,
        password,
      });
      dispatch(hideLoading());
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
            <InputFrom
              htmlFor="name"
              labelText={"First Name"}
              type={"text"}
              value={Fname}
              handleChange={(e) => setFname(e.target.value)}
              name="FirstName"
            />
            <InputFrom
              htmlFor="lastName"
              labelText={"Last Name"}
              type={"text"}
              value={Lname}
              handleChange={(e) => setLname(e.target.value)}
              name="lastName"
            />
            <InputFrom
              htmlFor="email"
              labelText={"Email"}
              type={"email"}
              value={email}
              handleChange={(e) => setemail(e.target.value)}
              name="email"
            />
            <InputFrom
              htmlFor="password"
              labelText={"Password"}
              type={"password"}
              value={password}
              handleChange={(e) => setpassword(e.target.value)}
              name="password"
            />

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
