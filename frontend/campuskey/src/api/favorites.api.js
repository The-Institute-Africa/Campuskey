import API from '@/api/api';

export const getFavorites = async () => {
  const response = await API.get('/student/favorites');
  return response.data;
};

export const addFavorite = async (propertyId) => {
  await API.post(`/student/favorites/${propertyId}`);
};

export const removeFavorite = async (propertyId) => {
  await API.delete(`/student/favorites/${propertyId}`);
};
