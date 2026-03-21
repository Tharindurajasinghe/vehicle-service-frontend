import API from "./axios";

// Public - customer submits a booking
export const createBooking = (data) => API.post("/bookings", data);

// Admin - get all bookings with optional filters
export const getAllBookings = (params) => API.get("/bookings", { params });

// Admin - get dashboard stats
export const getDashboardStats = () => API.get("/bookings/stats");

// Admin - update booking status
export const updateBookingStatus = (id, status) =>
  API.put(`/bookings/${id}/status`, { status });

// Admin - delete a booking
export const deleteBooking = (id) => API.delete(`/bookings/${id}`);
