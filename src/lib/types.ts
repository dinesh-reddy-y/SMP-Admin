export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Guest';
  createdAt: string;
}

export interface Notification {
  id: string;
  message: string;
  timestamp: Date;
}
