import API from "./axios";

// Public - get all service categories (used in booking form dropdown)
export const getAllServices = () => API.get("/services");

// Admin - create a new service category
export const createService = (data) => API.post("/services", data);

// Admin - delete a service category
export const deleteService = (id) => API.delete(`/services/${id}`);
