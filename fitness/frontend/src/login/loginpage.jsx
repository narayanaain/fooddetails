import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Loginpage() {
  const [mail, setmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function onformsubmit(e) {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mail, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log("Response Data:", data);
        navigate("/home");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      setError("An error occurred. Please try again.");
    }
  }

  return (
    <>
      <div className="h-screen w-screen flex gap-40 font-sans bg-white ">
        <img
          src="/image.jpeg"
          alt=""
          className="h-[600px] w-[600px] mt-[10%] ml-20"
        />
        <div className="flex flex-col items-center gap-10 bg-[#ecffed] h-[50%] p-12 rounded-lg shadow-lg mt-[15%]">
          <h1 className="text-5xl font-semibold text-[#008e01]">
            FITMEAL PARTNER
          </h1>
          <h2 className="text-2xl font-semibold text-[#014801]">Login</h2>

          {error && (
            <div className="text-red-500 text-sm mb-4">{error}</div>
          )}

          <form className="flex flex-col gap-12" onSubmit={onformsubmit}>
            <input
              type="text"
              name="mail"
              placeholder="E-mail"
              onChange={(e) => setmail(e.target.value)}
              value={mail}
              className="w-[400px] p-2 rounded bg-[#cfe6cf]"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
              value={password}
              className="w-[400px] p-2 rounded bg-[#cfe6cf]"
            />

            <input
              type="submit"
              value="Login"
              className="bg-[#014801] text-white rounded p-2"
            />
          </form>
          <p>
          Don't have an account? Sign up <Link to="/register">Register</Link>
        </p>
        </div>
      </div>
    </>
  );
}
