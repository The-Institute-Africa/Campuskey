import API from '@/api/api'
export const updateProfile = async (profileData) => {
  try {
    const response = await API.put(`update/profile`, profileData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update profile" };
  }
}; 