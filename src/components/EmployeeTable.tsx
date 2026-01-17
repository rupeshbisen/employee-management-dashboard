'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Employee } from '@/types/employee';
import { getEmployees, saveEmployees } from '@/utils/storage';
import EmployeeForm from './EmployeeForm';
import DeleteConfirmationModal from './DeleteConfirmationModal';

interface EmployeeTableProps {
  searchTerm: string;
  genderFilter: string;
  statusFilter: string;
}

export default function EmployeeTable({
  genderFilter,
  searchTerm,
  statusFilter,
}: EmployeeTableProps) {
  const [employees, setEmployees] = useState<Employee[]>(getEmployees());
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deletingEmployee, setDeletingEmployee] = useState<Employee | null>(
    null
  );

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.fullName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGender = genderFilter === '' || emp.gender === genderFilter;
    const matchesStatus =
      statusFilter === '' ||
      (statusFilter === 'active' ? emp.isActive : !emp.isActive);
    return matchesSearch && matchesGender && matchesStatus;
  });

  const handleDeleteClick = (employee: Employee) => {
    setDeletingEmployee(employee);
  };

  const handleDeleteConfirm = () => {
    if (deletingEmployee) {
      const updated = employees.filter((emp) => emp.id !== deletingEmployee.id);
      setEmployees(updated);
      saveEmployees(updated);
      setDeletingEmployee(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeletingEmployee(null);
  };

  const handleToggleStatus = (id: string) => {
    const updated = employees.map((emp) =>
      emp.id === id ? { ...emp, isActive: !emp.isActive } : emp
    );
    setEmployees(updated);
    saveEmployees(updated);
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const generateShortId = (): string => {
    if (employees.length === 0) return '1';
    // Find the highest numeric ID and increment
    const numericIds = employees
      .map((emp) => {
        const num = parseInt(emp.id, 10);
        return isNaN(num) ? 0 : num;
      })
      .filter((id) => id > 0);
    const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
    return (maxId + 1).toString();
  };

  const handleFormSubmit = (employee: Employee) => {
    let updated;
    if (editingEmployee) {
      updated = employees.map((emp) =>
        emp.id === employee.id ? employee : emp
      );
    } else {
      updated = [...employees, { ...employee, id: generateShortId() }];
    }
    setEmployees(updated);
    saveEmployees(updated);
    setShowForm(false);
    setEditingEmployee(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-lg">
      {/* Header Section */}
      <div className="border-b border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
              Employee List
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Showing {filteredEmployees.length} of {employees.length} employees
            </p>
          </div>
          <div className="no-print flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <button
              className="inline-flex items-center justify-center rounded-lg border border-transparent bg-linear-to-r from-indigo-600 to-indigo-700 px-4 py-2.5 text-sm font-medium text-white transition duration-200 hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-95"
              onClick={handleAdd}
            >
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 4v16m8-8H4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              Add Employee
            </button>
            <button
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 active:scale-95"
              onClick={handlePrint}
            >
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              Print List
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div
        className="overflow-x-auto print:overflow-visible print:w-full"
        id="printable-table"
      >
        {/* Print Only Header */}
        <div className="hidden print:block mb-8 text-center">
          <h1 className="text-3xl font-bold text-black">Employee List</h1>
        </div>
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 sm:px-6">
                ID
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 sm:px-6">
                Profile
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 sm:px-6">
                Name
              </th>
              <th className="hidden px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 md:table-cell print:table-cell sm:px-6">
                Gender
              </th>
              <th className="hidden px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 lg:table-cell print:table-cell sm:px-6">
                DOB
              </th>
              <th className="hidden px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 md:table-cell print:table-cell sm:px-6">
                State
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 sm:px-6">
                Status
              </th>
              <th className="no-print px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 print:hidden sm:px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredEmployees.length === 0 ? (
              <tr>
                <td className="px-4 py-12 text-center sm:px-6" colSpan={8}>
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                    />
                  </svg>
                  <p className="mt-4 font-medium text-gray-700">
                    No employees found
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filter criteria
                  </p>
                </td>
              </tr>
            ) : (
              filteredEmployees.map((employee) => (
                <tr
                  className="transition-colors duration-150 hover:bg-gray-50"
                  key={employee.id}
                >
                  <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-900 sm:px-6">
                    <span
                      className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700"
                      title={`ID: ${employee.id}`}
                    >
                      {employee.id.length <= 3
                        ? employee.id
                        : `#${employee.id.slice(-2)}`}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 sm:px-6">
                    {employee.profileImage ? (
                      <Image
                        alt={employee.fullName}
                        className="h-10 w-10 rounded-full border-2 border-indigo-200 object-cover"
                        height={40}
                        src={employee.profileImage}
                        width={40}
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-indigo-200 bg-linear-to-br from-indigo-300 to-indigo-500">
                        <span className="text-xs font-bold text-white">
                          {employee.fullName
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .toUpperCase()}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-gray-900 sm:px-6">
                    {employee.fullName}
                  </td>
                  <td className="hidden whitespace-nowrap px-4 py-4 text-sm text-gray-600 md:table-cell print:table-cell sm:px-6">
                    {employee.gender}
                  </td>
                  <td className="hidden whitespace-nowrap px-4 py-4 text-sm text-gray-600 lg:table-cell print:table-cell sm:px-6">
                    {new Date(employee.dob).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="hidden whitespace-nowrap px-4 py-4 text-sm text-gray-600 md:table-cell print:table-cell sm:px-6">
                    {employee.state}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 sm:px-6">
                    <button
                      className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-200 ${
                        employee.isActive
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                      onClick={() => handleToggleStatus(employee.id)}
                    >
                      <span className="mr-2 h-2 w-2 rounded-full bg-current" />
                      {employee.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="no-print whitespace-nowrap px-4 py-4 text-sm font-medium print:hidden sm:px-6">
                    <div className="flex gap-2">
                      <button
                        className="inline-flex items-center rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-600 transition duration-200 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-95"
                        onClick={() => handleEdit(employee)}
                        title="Edit employee"
                      >
                        <svg
                          className="mr-1 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                        Edit
                      </button>
                      <button
                        className="inline-flex items-center rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition duration-200 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:scale-95"
                        onClick={() => handleDeleteClick(employee)}
                        title="Delete employee"
                      >
                        <svg
                          className="mr-1 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <EmployeeForm
          employee={editingEmployee}
          onCancel={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      {deletingEmployee && (
        <DeleteConfirmationModal
          employeeName={deletingEmployee.fullName}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
}
