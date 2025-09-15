import API from "./axios";
const placeholderImage = "https://images.unsplash.com/photo-1595872018818-97555653a011";

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

export const fetchPropertyAmenities = async (property) => {
  if (property?.amenities && property.amenities.length > 0) {
    return `${BASE_URL}${property.amenities}`;
  }
}

export const fetchPropertyUtilities = async () => {
  const response = await API.get("/utilities");
  return response.data;
}

export const getPropertyImageUrl = (property) => {

  if (!property?.pictures || property.pictures.length === 0) return placeholderImage;
  return `${BASE_URL}${property.pictures[0].imageUrl}`;
};

export const fetchPropertyRules = async () => {
  const response = await API.get("/rules");
  return response.data;
}

export const fetchPropertyVideos = async (slug, token) => {
  const response = await API.get(`/properties/${slug}/videos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}


export const fetchPropertyImages = async (slug, token) => {
  const response = await API.get(`/properties/${slug}/images`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}