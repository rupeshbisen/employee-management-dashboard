'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Employee } from '@/types/employee';
import { getEmployees, saveEmployees } from '@/utils/storage';
import EmployeeForm from './EmployeeForm';

interface EmployeeTableProps {
  searchTerm: string;
  genderFilter: string;
  statusFilter: string;
}

export default function EmployeeTable({
  searchTerm,
  genderFilter,
  statusFilter,
}: EmployeeTableProps) {
  const [employees, setEmployees] = useState<Employee[]>(getEmployees());
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [showForm, setShowForm] = useState(false);

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

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      const updated = employees.filter((emp) => emp.id !== id);
      setEmployees(updated);
      saveEmployees(updated);
    }
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

  const handleFormSubmit = (employee: Employee) => {
    let updated;
    if (editingEmployee) {
      updated = employees.map((emp) =>
        emp.id === employee.id ? employee : emp
      );
    } else {
      updated = [...employees, { ...employee, id: Date.now().toString() }];
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
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Employees ({filteredEmployees.length})
        </h3>
        <div className="flex space-x-2 no-print">
          <button
            onClick={handleAdd}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Add Employee
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Print List
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Profile
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                DOB
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                State
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {employee.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {employee.profileImage ? (
                    <Image
                      className="h-10 w-10 rounded-full"
                      src={employee.profileImage}
                      alt={employee.fullName}
                      width={40}
                      height={40}
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-600 font-medium">
                        {employee.fullName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .toUpperCase()}
                      </span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {employee.fullName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {employee.gender}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(employee.dob).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {employee.state}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleToggleStatus(employee.id)}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      employee.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {employee.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium no-print">
                  <button
                    onClick={() => handleEdit(employee)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredEmployees.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No employees found.
        </div>
      )}
      {showForm && (
        <EmployeeForm
          employee={editingEmployee}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
