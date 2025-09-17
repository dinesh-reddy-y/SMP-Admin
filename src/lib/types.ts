export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Guest';
  createdAt: string;
  ratingAsUser: number | null;
  ratingAsTransporter: number | null;
  earnings: number;
}

export interface Notification {
  id: string;
  message: string;
  timestamp: Date;
}
