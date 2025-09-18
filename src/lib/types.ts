export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  mbl_num: string;
  is_verified: boolean;
  roles_id: string;
  total_earnings: string;
  is_active: boolean;
  is_blocked: boolean;
  created_date: string;
  ratingAsUser?: number | null; // Optional fields from old structure
  ratingAsTransporter?: number | null; // Optional fields from old structure
}

export interface Notification {
  id: string;
  message: string;
  timestamp: Date;
}

export interface CarouselImage {
    id: number;
    src: string;
    alt: string;
    hint: string;
    active: boolean;
}

export interface Ad extends CarouselImage {
    client: string;
    description?: string;
    link?: string;
}
