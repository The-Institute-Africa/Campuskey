import API from '@/api/api'
const placeholderImage = "https://images.unsplash.com/photo-1595872018818-97555653a011";

export const fetchProperties = async () => {
  const response = await API.get("public/properties");
  return response.data;
}

export const fetchPropertyBySlug = async (slug, token) => {
  try {
    const response = await API.get(`public/property/${slug}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.data) {
      throw new Error('Property not found');
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching property with slug "${slug}":`, error);
    throw error.response?.data || new Error('Network or server error');
  }
};

export const fetchPropertyById = async (id, token) => {
  try {
    const response = await API.get(`public/property/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.data) {
      throw new Error('Property not found');
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching property with slug "${id}":`, error);
    // Optional: customize error message
    throw error.response?.data || new Error('Network or server error');
  }
};


export const fetchPropertyAmenities = async (property) => {
  if (property?.amenities) return property.amenities;
  const response = await API.get("/public/amenities");
  return response.data;
}

export const fetchPropertyUtilities = async () => {
  const response = await API.get("/public/utilities");
  return response.data;
}

export const getPropertyImageUrl = (property) => {
  const imageUrl = property?.images?.[0]?.imageUrl;
  if (!imageUrl) return placeholderImage;
  if (/^https?:\/\//i.test(imageUrl)) return imageUrl;
  const apiOrigin = new URL(import.meta.env.VITE_API_URL || window.location.origin, window.location.origin).origin;
  return new URL(imageUrl, apiOrigin).toString();
};

export const fetchPropertyRules = async () => {
  const response = await API.get("/public/rules");
  return response.data;
}

export const fetchPropertyVideos = async (slug, token) => {
  const response = await API.get(`/public/properties/${slug}/videos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}


export const fetchPropertyImages = async (slug, token) => {
  const response = await API.get(`/public/properties/${slug}/images`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}
