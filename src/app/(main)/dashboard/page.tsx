'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  isAuthenticated,
  initializeMockData,
  getEmployees,
} from '@/utils/storage';
import EmployeeTable from '@/components/EmployeeTable';
import Loader from '@/components/Loader';

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    } else {
      initializeMockData();
    }
  }, [router]);

  const totalEmployees = getEmployees().length;
  const activeEmployees = getEmployees().filter((emp) => emp.isActive).length;
  const inactiveEmployees = totalEmployees - activeEmployees;

  if (!isAuthenticated()) {
    return <Loader />;
  }

  return (
    <>
      <div className="mb-10">
        <h2 className="mb-6 text-lg font-semibold text-gray-900 sm:text-xl">
          Quick Overview
        </h2>
        <div className="grid grid-cols-3 gap-3 sm:gap-6">
          <div className="rounded-lg bg-white p-3 sm:p-6 shadow-md transition duration-200 hover:shadow-lg sm:rounded-xl">
            <div className="flex flex-col md:flex-row md:gap-4 items-center space-y-2 md:space-y-0 text-center md:text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 sm:h-12 sm:w-12">
                <svg
                  className="h-5 w-5 text-indigo-600 sm:h-6 sm:w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-2a6 6 0 0112 0v2zm0 0h6v-2a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 sm:text-sm">
                  Total Employees
                </p>
                <p className="text-xl font-bold text-gray-900 sm:text-3xl">
                  {totalEmployees}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-3 sm:p-6 shadow-md transition duration-200 hover:shadow-lg sm:rounded-xl">
            <div className="flex flex-col md:flex-row md:gap-4 items-center space-y-2 md:space-y-0 text-center md:text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 sm:h-12 sm:w-12">
                <svg
                  className="h-5 w-5 text-green-600 sm:h-6 sm:w-6"
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
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 sm:text-sm">
                  Active Employees
                </p>
                <p className="text-xl font-bold text-gray-900 sm:text-3xl">
                  {activeEmployees}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-3 sm:p-6 shadow-md transition duration-200 hover:shadow-lg sm:rounded-xl">
            <div className="flex flex-col md:flex-row md:gap-4 items-center space-y-2 md:space-y-0 text-center md:text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 sm:h-12 sm:w-12">
                <svg
                  className="h-5 w-5 text-red-600 sm:h-6 sm:w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 sm:text-sm">
                  Inactive Employees
                </p>
                <p className="text-xl font-bold text-gray-900 sm:text-3xl">
                  {inactiveEmployees}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 rounded-xl bg-white p-6 shadow-md sm:p-8">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Filter & Search
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Search by Name
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search employee..."
              type="text"
              value={searchTerm}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Filter by Gender
            </label>
            <select
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 transition duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setGenderFilter(e.target.value)}
              value={genderFilter}
            >
              <option value="">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Filter by Status
            </label>
            <select
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 transition duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setStatusFilter(e.target.value)}
              value={statusFilter}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <EmployeeTable
        genderFilter={genderFilter}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
      />
    </>
  );
}
