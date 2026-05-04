import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine, RiBarChartLine } from "react-icons/ri";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../context/userContext";
import Input from "../../components/Inputs/Input";
import DashbordPreview from "../../components/DashbordPreview";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // Validation
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password.");
      return;
    }
    setError("");
    // Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 relative overflow-hidden font-[Inter,sans-serif]">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20 -translate-y-20 translate-x-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-full blur-3xl opacity-15 translate-y-20 -translate-x-20"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur-3xl opacity-10"></div>

      <div className="flex min-h-screen">
        {/* Left: Login Form */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-md">
            {/* Logo/Title */}
            <div className="mb-12">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Expense Tracker</h1>
              <div className="h-1 w-16 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"></div>
            </div>
            {/* Welcome */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Please enter your details to log in</p>
            </div>
            {/* Form */}
            <form className="space-y-6" onSubmit={handleLogin}>
              {/* Email */}
              <Input
                label="Email Address"
                type="text"
                placeholder="abc@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              {/* Password */}
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              {/* Error */}
              {error && (
                <p className="bg-red-100 border border-red-300 text-red-600 rounded-md px-3 py-2 text-xs text-center animate-shake">{error}</p>
              )}
              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl font-semibold transition-all duration-300 hover:from-purple-700 hover:to-purple-800 hover:shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
              >
                LOGIN
              </button>
            </form>
            {/* Sign Up */}
            <p className="mt-6 text-center text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-purple-600 font-semibold hover:text-purple-700 transition-colors cursor-pointer">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
        {/* Right: Dashboard Preview */}
       <DashbordPreview />
      </div>
    </div>
  );
};

export default Login;
