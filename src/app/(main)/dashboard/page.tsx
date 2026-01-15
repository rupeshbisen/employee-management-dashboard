'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  isAuthenticated,
  initializeMockData,
  getEmployees,
} from '@/utils/storage';
import EmployeeTable from '@/components/EmployeeTable';

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
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mb-10">
        <h2 className="mb-6 text-lg font-semibold text-gray-900 sm:text-xl">
          Quick Overview
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-md transition duration-200 hover:shadow-lg sm:p-8">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                  <svg
                    className="h-6 w-6 text-indigo-600"
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
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Employees
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {totalEmployees}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md transition duration-200 hover:shadow-lg sm:p-8">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <svg
                    className="h-6 w-6 text-green-600"
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
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Employees
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {activeEmployees}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md transition duration-200 hover:shadow-lg sm:p-8">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                  <svg
                    className="h-6 w-6 text-red-600"
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
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Inactive Employees
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
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
