import API from '@/api/api'

export const getProfile = async () => {
  try{
    const response = await API.get('username/')
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch profile" };
  }
};

export const updateProfilePassword = async (passwordData) => {
  try {
    const response = await API.put('auth/password', passwordData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update profile" };
  }
};