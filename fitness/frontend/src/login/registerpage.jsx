import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


const registerpage=()=>{
    const [mail, setmail] = useState("");
    const [name, setname] = useState("");
    const [password, setpassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const navigate = useNavigate();
  
    async function onformsubmit(e) {
      e.preventDefault();
      try {
        const response = await fetch(`http://localhost:3000/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name,mail, password }),
        });
  
        const data = await response.json();
        if (response.ok) {
          navigate("/personal-details");
          console.log("Response Data:", data);
        } else {
          alert("Register failed: " + data.message);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
        alert("An error occurred. Please try again.");
      }
    }
    return(
       <div className="min-h-screen flex items-center justify-center bg-white relative">
      <div className="absolute top-6 left-14">
        <img
          src="/registerleft.png"
          alt="Left Illustration"
          className="m-4 ml-50 w-3/5 "
        />
      </div>
      <div className="absolute bottom-0 right-0">
        <img
          src="/registerright.png"
          alt="Right Illustration"
          className="m-4 mr-3 w-3/5"
        />
      </div>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold text-green-600 text-center">
          FitMeal Partner
        </h3>
        <h5 className="text-lg text-center text-gray-600">Create an Account</h5>
        <form onSubmit={onformsubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={mail}
              onChange={(e) => setmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
    )
}

export default registerpage;