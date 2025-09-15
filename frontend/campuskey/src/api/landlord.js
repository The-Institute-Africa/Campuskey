import API from "./axios";


 // --------------------------API CALLS-------------------------


export const fetchProperties = async () => {
  const response = await API.get("/properties");
  return response.data;
}

export const fetchPropertyBySlug = async (slug, token) => {
  const response = await API.get(`/properties/${slug}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export const addProperty = async (propertyData, token) => {
  const response = await API.post("/properties", propertyData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export const editProperty = async (slug, propertyData, token) => {
  const response = await API.put(`/properties/${slug}`, propertyData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export const removeProperty = async (slug, token) => {
  const response = await API.delete(`/properties/${slug}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export const deleteProperty = async (slug,token) => {

    const response = await fetch(`${BASE_URL}/properties/${slug}`,{
        headers : {Authorization : `Bearer ${token}`},
    });
    return response.data;
}

