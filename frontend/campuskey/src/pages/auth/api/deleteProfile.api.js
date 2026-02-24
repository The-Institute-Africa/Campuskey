import API from '@/api/api'
export const deleteAccount = async () => {
  try {
    const response = await API.delete(`delete-profile`); // no ID in URL
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete account" };
  }
};