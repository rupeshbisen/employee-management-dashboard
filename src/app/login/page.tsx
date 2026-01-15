'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setAuthenticated, isAuthenticated } from '@/utils/storage';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Mock authentication: any username/password works
    setTimeout(() => {
      if (username && password) {
        setAuthenticated(true);
        router.push('/dashboard');
      } else {
        setError('Please enter both username and password');
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-purple-600 via-pink-500 to-orange-400">
      {/* Content */}
      <div className="flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg mb-2">
              Welcome Back
            </h1>
            <p className="text-lg sm:text-xl text-white text-opacity-95 drop-shadow">
              Employee Management System
            </p>
          </div>

          {/* Login Card */}
          <div className="rounded-2xl bg-white bg-opacity-98 backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Card Header */}
            <div className="border-b border-gray-200 bg-linear-to-r from-purple-50 to-pink-50 px-4 py-3">
              <h2 className="text-center text-2xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Sign In
              </h2>
            </div>

            {/* Form */}
            <form className="space-y-6 p-6" onSubmit={handleLogin}>
              {/* Username Field */}
              <div className="group">
                <label
                  className="mb-3 block text-sm font-semibold text-gray-700"
                  htmlFor="username"
                >
                  Username
                </label>
                <div className="relative">
                  <svg
                    className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 transition group-focus-within:text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  <input
                    autoComplete="username"
                    className="w-full rounded-xl border-2 border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-900 placeholder-gray-400 transition duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled={isLoading}
                    id="username"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    type="text"
                    value={username}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <label
                  className="mb-3 block text-sm font-semibold text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <svg
                    className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 transition group-focus-within:text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  <input
                    autoComplete="current-password"
                    className="w-full rounded-xl border-2 border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-900 placeholder-gray-400 transition duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled={isLoading}
                    id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="rounded-xl bg-red-50 p-4 ring-1 ring-red-200">
                  <div className="flex gap-3">
                    <svg
                      className="h-5 w-5 shrink-0 text-red-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        clipRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        fillRule="evenodd"
                      />
                    </svg>
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                </div>
              )}

              {/* Login Button */}
              <button
                className="group relative w-full overflow-hidden rounded-xl bg-linear-to-r from-purple-600 to-pink-600 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
                type="submit"
              >
                <div className="relative flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <svg
                        className="h-5 w-5 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          className="opacity-25"
                        />
                        <path
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          fill="currentColor"
                          className="opacity-75"
                        />
                      </svg>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In Now</span>
                      <svg
                        className="h-5 w-5 transition group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Footer */}
            <div className="border-t border-gray-200 bg-linear-to-r from-purple-50 to-pink-50 px-8 py-4 text-center">
              <p className="text-xs text-gray-600">
                Demo Credentials: Use any username and password
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-linear-to-br from-white to-purple-50 backdrop-blur-md p-3 sm:p-4 text-center border border-white border-opacity-40 shadow-lg">
              <svg
                className="mx-auto mb-2 h-5 w-5 sm:h-6 sm:w-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              <p className="text-xs sm:text-sm font-bold text-gray-800">
                Secure
              </p>
            </div>
            <div className="rounded-xl bg-linear-to-br from-white to-pink-50 backdrop-blur-md p-3 sm:p-4 text-center border border-white border-opacity-40 shadow-lg">
              <svg
                className="mx-auto mb-2 h-5 w-5 sm:h-6 sm:w-6 text-pink-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              <p className="text-xs sm:text-sm font-bold text-gray-800">Fast</p>
            </div>
            <div className="rounded-xl bg-linear-to-br from-white to-orange-50 backdrop-blur-md p-3 sm:p-4 text-center border border-white border-opacity-40 shadow-lg">
              <svg
                className="mx-auto mb-2 h-5 w-5 sm:h-6 sm:w-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              <p className="text-xs sm:text-sm font-bold text-gray-800">
                Reliable
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
