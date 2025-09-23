import api from "./api";

// --- Auth ---
export async function login(mbl_num: string, password: string) {
  const response = await api.post("/user/login", { mbl_num, password });
  return response.data;
}

// --- Carousel ---
export async function get_all_carousel_images() {
  const response = await api.get("/carousel/getAll");
  return response.data;
}

export async function add_carousel_image(payload: {
  image_key: string;
  is_active?: boolean;
}) {
  const response = await api.post("/carousel/save", payload);
  return response.data;
}

export async function update_carousel_image(
  id: string,
  payload: { image_key: string; image_url: string; active?: boolean }
) {
  const response = await api.put(`/carousel/update/${id}`, payload);
  return response.data;
}

export async function toggle_carousel_status(carousel_id: string) {
  const response = await api.patch(`/carousel/toggle-status/${carousel_id}`);
  return response.data;
}

export async function delete_carousel_image(id: string) {
  const response = await api.delete(`/carousel/delete${id}`);
  return response.data;
}

export async function fetchAds() {
  const response = await api.get('/ads/getall');
  return response.data;
}


export async function saveAd(payload:{
    title: string;
    description?: string;
    image_key: string;
    redirect_url?: string;
    is_active: boolean;
}) {
  const response = await api.post(`/ads/save`, payload);
  return response.data;
}

export async function deleteAd(id: string) {
  const token = await authService.getToken();
  const res = await fetch(`${API_BASE}/ads/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete ad");
}

// --- S3 Upload ---
export async function upload_image_to_s3(file: Blob, filename: string) {
  const formData = new FormData();
  formData.append("ticket_image", file, filename);

  const response = await api.post("/s3/upload-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data; // backend should return { image_key, image_url }
}
