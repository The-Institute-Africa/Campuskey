import API from '@/api/api';

export const fetchDashboardStats = async () => {
  const response = await API.get("/landlord/dashboard/stats");
  return response.data;
};


export const fetchPropertyBySlug = async (slug) => {
  const response = await API.get(`/properties/${slug}`);
  return response.data;
};

export const fetchPropertyByLandlord = async () => {
  const response = await API.get("/landlord/my-properties");
  return response.data;
};

export const addProperty = async (propertyData) => {
  const response = await API.post("/landlord/property/create", propertyData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};



export const editProperty = async (slug, propertyData) => {
  const response = await API.put(`/properties/${slug}`, propertyData);
  return response.data;
};

export const fetchProperties = async () => {
  const response = await API.get("/properties");
  return response.data;
};

export const removeProperty = async (slug) => {
  const response = await API.delete(`/properties/${slug}`);
  return response.data;
};
