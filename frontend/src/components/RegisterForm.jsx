import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "@tanstack/react-router";
import { registerUser } from "../api/user.api.js";
import { login } from "../store/slice/authSlice.js";

const RegisterForm = ({ state }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await registerUser(name, email, password);
      setLoading(false);

      dispatch(login(data.user));
      navigate({ to: "/dashboard" });
    } catch (err) {
      setLoading(false);
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-2xl rounded-2xl px-8 py-8 border border-gray-200"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4 leading-snug">
          Create an Account
        </h2>
        <p className="text-center text-gray-500 mb-6 text-xs leading-tight">
          Fill in your details to get started
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm animate-pulse">
            {error}
          </div>
        )}

        {/* Full Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md transform transition-all duration-200 ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02]"
          }`}
        >
          {loading ? (
            <span className="animate-pulse">Creating Account...</span>
          ) : (
            "Create Account"
          )}
        </button>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => state(true)}
              className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors duration-200"
            >
              Sign in
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
