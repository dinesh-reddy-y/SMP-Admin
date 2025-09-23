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

// Update CarouselImage type to match API response
export interface CarouselImage {
  id: string;
  image_key: string;
  image_url: string;
  is_active: boolean;
  is_deleted: boolean;
  created_by: string;
  created_date: string;
  modified_by: string;
  modified_date: string;
};

export interface Ad extends CarouselImage {
    title: string;
    client: string;
    description?: string;
    redirect_url?: string;
}
