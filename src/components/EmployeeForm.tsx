'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Employee } from '@/types/employee';

interface EmployeeFormProps {
  employee: Employee | null;
  onSubmit: (employee: Employee) => void;
  onCancel: () => void;
}

const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

export default function EmployeeForm({
  employee,
  onCancel,
  onSubmit,
}: EmployeeFormProps) {
  const [formData, setFormData] = useState<Omit<Employee, 'id'>>({
    fullName: '',
    gender: 'Male',
    dob: '',
    profileImage: '',
    state: '',
    isActive: true,
  });
  const [imagePreview, setImagePreview] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (employee) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(employee);
      setImagePreview(employee.profileImage);
    }
  }, [employee]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setFormData({ ...formData, profileImage: result });
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.state) newErrors.state = 'State is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ ...formData, id: employee?.id || '' });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto backdrop-blur-sm bg-black bg-opacity-30 p-4 sm:p-0"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onCancel();
        }
      }}
    >
      <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 rounded-t-3xl bg-linear-to-r from-purple-600 to-pink-600 px-6 py-6 sm:px-8 sm:py-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                {employee ? 'Edit Employee' : 'Add Employee'}
              </h3>
              <p className="mt-1 text-sm text-white text-opacity-90">
                {employee
                  ? 'Update employee information'
                  : 'Add a new employee to your system'}
              </p>
            </div>
            <button
              className="ml-auto inline-flex rounded-full bg-white bg-opacity-20 p-1.5 text-white hover:bg-opacity-30 transition"
              onClick={onCancel}
              type="button"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Form Content */}
        <form className="space-y-6 p-6 sm:p-8" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label
              className="mb-2 block text-sm font-semibold text-gray-700"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
              id="fullName"
              name="fullName"
              onChange={handleChange}
              placeholder="Enter full name"
              type="text"
              value={formData.fullName}
            />
            {errors.fullName && (
              <p className="mt-2 flex items-center text-sm text-red-500">
                <svg
                  className="mr-1 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    clipRule="evenodd"
                    d="M18.101 12.93a1 1 0 00-1.414-1.414L10 18.586l-6.687-6.687a1 1 0 00-1.414 1.414L8.586 20 10 21.414l8.101-8.484z"
                    fillRule="evenodd"
                  />
                </svg>
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Gender and DOB */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Gender */}
            <div>
              <label
                className="mb-2 block text-sm font-semibold text-gray-700"
                htmlFor="gender"
              >
                Gender
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 transition duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                id="gender"
                name="gender"
                onChange={handleChange}
                value={formData.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div>
              <label
                className="mb-2 block text-sm font-semibold text-gray-700"
                htmlFor="dob"
              >
                Date of Birth
              </label>
              <input
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                id="dob"
                name="dob"
                onChange={handleChange}
                type="date"
                value={formData.dob}
              />
              {errors.dob && (
                <p className="mt-2 flex items-center text-sm text-red-500">
                  <svg
                    className="mr-1 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      clipRule="evenodd"
                      d="M18.101 12.93a1 1 0 00-1.414-1.414L10 18.586l-6.687-6.687a1 1 0 00-1.414 1.414L8.586 20 10 21.414l8.101-8.484z"
                      fillRule="evenodd"
                    />
                  </svg>
                  {errors.dob}
                </p>
              )}
            </div>
          </div>

          {/* Profile Image */}
          <div>
            <label
              className="mb-2 block text-sm font-semibold text-gray-700"
              htmlFor="profileImage"
            >
              Profile Image
            </label>
            <div className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition duration-200 hover:border-purple-500 hover:bg-purple-50">
              <input
                accept="image/*"
                className="hidden"
                id="profileImage"
                onChange={handleImageChange}
                type="file"
              />
              <label className="cursor-pointer" htmlFor="profileImage">
                <div className="space-y-2">
                  {imagePreview ? (
                    <div className="flex justify-center">
                      <Image
                        alt="Preview"
                        className="rounded-full border-4 border-purple-200 object-cover"
                        height={100}
                        src={imagePreview}
                        width={100}
                      />
                    </div>
                  ) : (
                    <>
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h24a4 4 0 004-4V20m-14-8l-4-4m0 0l-4 4m4-4v12m8 0a4 4 0 11-8 0 4 4 0 018 0z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                      <p className="text-sm text-gray-600">
                        Click to upload image
                      </p>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* State */}
          <div>
            <label
              className="mb-2 block text-sm font-semibold text-gray-700"
              htmlFor="state"
            >
              State
            </label>
            <select
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 transition duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
              id="state"
              name="state"
              onChange={handleChange}
              value={formData.state}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="mt-2 flex items-center text-sm text-red-500">
                <svg
                  className="mr-1 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    clipRule="evenodd"
                    d="M18.101 12.93a1 1 0 00-1.414-1.414L10 18.586l-6.687-6.687a1 1 0 00-1.414 1.414L8.586 20 10 21.414l8.101-8.484z"
                    fillRule="evenodd"
                  />
                </svg>
                {errors.state}
              </p>
            )}
          </div>

          {/* Active Status */}
          <div className="rounded-lg bg-linear-to-r from-purple-50 to-pink-50 p-4 border border-purple-200">
            <label className="flex cursor-pointer items-center">
              <input
                checked={formData.isActive}
                className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                name="isActive"
                onChange={handleChange}
                type="checkbox"
              />
              <span className="ml-3 text-sm font-medium text-gray-700">
                Mark as Active
              </span>
            </label>
            <p className="mt-2 text-xs text-gray-600">
              {formData.isActive
                ? 'Employee is active'
                : 'Employee is inactive'}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 border-t border-gray-200 pt-6">
            <button
              className="flex-1 rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 transition duration-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              onClick={onCancel}
              type="button"
            >
              Cancel
            </button>
            <button
              className="flex-1 rounded-lg border border-transparent bg-linear-to-r from-purple-600 to-pink-600 px-4 py-2.5 text-sm font-medium text-white transition duration-200 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              type="submit"
            >
              {employee ? 'Update Employee' : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
