import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

// A reusable Input component with a label and password visibility toggle
const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className={
            `w-full ${type === 'password' ? 'pr-12' : 'pr-4'} pl-4 py-4 bg-white/70 backdrop-blur-sm border border-purple-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/80 text-gray-900`
          }
          value={value}
          onChange={onChange}
        />
        {/* Password visibility toggle */}
        {type === "password" && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
            tabIndex={-1}
          >
            {showPassword ? (
              <FaRegEye className="text-gray-400 w-5 h-5 hover:text-purple-500 transition-colors" />
            ) : (
              <FaRegEyeSlash className="text-gray-400 w-5 h-5 hover:text-purple-500 transition-colors" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
