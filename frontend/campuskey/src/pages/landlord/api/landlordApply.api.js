import API from '@/api/api';

export const applyLandlord = async (formData) => {
  try {
    const response = await API.post(
      '/landlord/apply',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { message: 'Landlord application failed' }
    );
  }
};
