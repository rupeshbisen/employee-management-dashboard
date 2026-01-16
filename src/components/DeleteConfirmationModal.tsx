'use client';

import Modal from './Modal';

interface DeleteConfirmationModalProps {
  employeeName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmationModal({
  employeeName,
  onConfirm,
  onCancel,
}: DeleteConfirmationModalProps) {
  return (
    <Modal onClose={onCancel} maxWidth="md">
      {/* Header */}
      <div className="rounded-t-2xl bg-linear-to-r from-red-600 to-red-700 px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="white"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Delete Employee</h3>
              <p className="text-sm text-white text-opacity-90">
                Confirm deletion
              </p>
            </div>
          </div>
          <button
            className="ml-auto inline-flex items-center justify-center rounded-full p-2 text-white hover:bg-opacity-30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
            onClick={onCancel}
            type="button"
            aria-label="Close modal"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="white"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-8 w-8 text-red-600"
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
          </div>
          <h4 className="mb-2 text-lg font-semibold text-gray-900">
            Are you sure?
          </h4>
          <p className="text-sm text-gray-600">
            You are about to delete{' '}
            <span className="font-semibold text-gray-900">{employeeName}</span>.
            This action cannot be undone.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            className="flex-1 rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 transition duration-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className="flex-1 rounded-lg border border-transparent bg-linear-to-r from-red-600 to-red-700 px-4 py-2.5 text-sm font-medium text-white transition duration-200 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={onConfirm}
            type="button"
          >
            Delete Employee
          </button>
        </div>
      </div>
    </Modal>
  );
}
