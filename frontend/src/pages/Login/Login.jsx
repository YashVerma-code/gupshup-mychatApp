import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, LogIn, Fingerprint } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "./login.css";

export default function Login() {
  const { login, isLoggingIn } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const validateFormValues = () => {
    if (!formData.email) return toast.error("Email is required");
    if (!formData.password) return toast.error("Password is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalide email format");
    if (formData.password.length < 6)
      return toast.error("Password must be atleast 6 character long");

    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    const validate = validateFormValues();
    if (validate === true) {
      login(formData);
    }
  };

  const FloatingOrb = ({ className, delay = 0 }) => (
    <div
      className={`absolute rounded-full bg-gradient-to-r from-blue-400/20 to-cyan-400/20 blur-xl animate-pulse ${className}`}
      style={{
        animationDelay: `${delay}s`,
        animation: `float 6s ease-in-out infinite ${delay}s, pulse 4s ease-in-out infinite`,
      }}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden ">
      {/* Animated Background Elements */}
      <FloatingOrb className="w-72 h-72 -top-36 -left-36" delay={0} />
      <FloatingOrb className="w-96 h-96 -bottom-48 -right-48" delay={2} />
      <FloatingOrb
        className="w-64 h-64 top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2"
        delay={4}
      />

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md ">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-400">
            Sign in to continue chatting with friends
          </p>
        </div>

        {/* Login Form */}
        <div
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="space-y-6">
            {/* Email Field */}
            <div className="relative group">
              <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors group-focus-within:text-blue-400">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                    focusedField === "email" ? "text-blue-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  autoComplete="off"
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/10"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative group">
              <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors group-focus-within:text-blue-400">
                Password
              </label>
              <div className="relative">
                <Lock
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                    focusedField === "password"
                      ? "text-blue-400"
                      : "text-gray-500"
                  }`}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-400 transition-colors duration-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoggingIn}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-6 rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoggingIn ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing In...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </div>
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link to={"/signup"}>
                <span className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 hover:underline">
                  Sign Up
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
