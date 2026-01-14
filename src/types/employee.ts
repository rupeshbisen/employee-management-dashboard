export interface Employee {
  id: string;
  fullName: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string; // ISO date string
  profileImage: string; // base64 or URL
  state: string;
  isActive: boolean;
}
