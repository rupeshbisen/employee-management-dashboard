import { Employee } from '@/types/employee';

const EMPLOYEES_KEY = 'employees';
const AUTH_KEY = 'isAuthenticated';

export const getEmployees = (): Employee[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(EMPLOYEES_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveEmployees = (employees: Employee[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(employees));
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(AUTH_KEY) === 'true';
};

export const setAuthenticated = (auth: boolean) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_KEY, auth.toString());
};

// Mock initial data
export const initializeMockData = () => {
  const existing = getEmployees();
  if (existing.length === 0) {
    const mockEmployees: Employee[] = [
      {
        id: '1',
        fullName: 'John Doe',
        gender: 'Male',
        dob: '1990-01-01',
        profileImage: '', // placeholder
        state: 'California',
        isActive: true,
      },
      {
        id: '2',
        fullName: 'Jane Smith',
        gender: 'Female',
        dob: '1985-05-15',
        profileImage: '',
        state: 'New York',
        isActive: false,
      },
    ];
    saveEmployees(mockEmployees);
  }
};
