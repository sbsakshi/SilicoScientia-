// app/login/page.tsx
'use client'; // Needed for useState and event handlers

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'; // Using lucide-react for icons

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // create the form data object
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      const response = await fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        credentials: 'include', // Include cookies if you're using sessions
        body: formData,
      });
  
      const data = await response.json();
      console.log('Response:', data); // Log the response for debugging
      if (response.ok) {
        // You can store JWT or redirect user here
        localStorage.setItem("token", data.token);
        console.log('Login success:', data);
        alert('Login successful!');
        // Optional: redirect to home/dashboard
        // window.location.href = '/ToolsPage';
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong while logging in.');
    }
  };
  

  return (
    // Main container with full-screen background image
    <div
      className="relative min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/login.jpeg')" }} // Set background image here
    >
      {/* Blur Overlay - positioned absolutely to cover the background */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-xs"></div> {/* Adjust bg-black/20 for darkness */}

      {/* Form container with semi-transparent background */}
      <div className="relative z-10 w-full max-w-md rounded-xl bg-white/90 p-8 shadow-xl border border-gray-200/50"> {/* Add relative and z-10 to bring form to front */}
        {/* Optional: Add your logo here */}
        {/* <img src="/logo.svg" alt="Company Logo" className="mx-auto h-10 w-auto mb-6" /> */}
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to access the discovery platform
        </p>

        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email or Phone
            </label>
            <div className="mt-2 relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-2.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 transition duration-150 ease-in-out bg-white/70" // Slightly transparent input bg
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="font-semibold text-teal-600 hover:text-teal-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2 relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <LockKeyhole className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-2.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 transition duration-150 ease-in-out bg-white/70" // Slightly transparent input bg
                placeholder="••••••••"
              />
              <button
                 type="button"
                 onClick={() => setShowPassword(!showPassword)}
                 className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                 aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                 {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                 ) : (
                    <Eye className="h-5 w-5" />
                 )}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between">
             <div className="flex items-center">
               <input
                 id="remember-me"
                 name="remember-me"
                 type="checkbox"
                 checked={rememberMe}
                 onChange={(e) => setRememberMe(e.target.checked)}
                 className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-600 bg-white/70" // Slightly transparent checkbox bg
               />
               <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                 Remember me
               </label>
             </div>
          </div>

          {/* Sign In Button */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 transition duration-150 ease-in-out"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Optional: Sign Up Link */}
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <Link
            href="/signup" // Create this page later
            className="font-semibold leading-6 text-teal-600 hover:text-teal-500"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}