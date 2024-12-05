import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button, message } from "antd";
import { login } from "../services/api";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      message.success("Login successful!");
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/customer");
    } catch (error) {
      message.error(error.message || "Login failed");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 text-left bg-white border px-10 py-20 rounded-3xl">
      <h1 className="text-5xl font-semibold">Welcome!</h1>
      <p className="font-medium text-lg text-gray-600">Welcome back! Please enter your details</p>

      {/* Form */}
      <form className="mt-8" onSubmit={handleLogin}>
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            name="email"
            type="email"
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
            required
          />
        </div>

        {/* Password Input */}
        <div className="mt-4">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            required
          />
        </div>

        {/* Forgot Password */}
        <div>
          <Button type="link" className="mt-4 font-medium text-lg text-red-500">
            Forgot Password
          </Button>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-y-4">
          <Button htmlType="submit" className="py-7 rounded-xl bg-red-500 text-white font-bold">
            Sign in
          </Button>
          <Button className="py-7 rounded-xl font-bold">
            <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Logo" className="w-8 h-8 inline-block" />
            Sign in with Google
          </Button>
        </div>

        {/* Sign Up */}
        <div className="mt-8 flex justify-center items-center">
          <p className="font-medium text-base">Don't have an account?</p>
          <Button type="link" className="text-red-500 font-medium text-base">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
