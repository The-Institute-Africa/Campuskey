import API from '@/api/api';

export const createLandlord = async (
  name,
  contact,
  idNumber,
  address
) => {
  try {
    const response = await API.post('/landlord/create', {
      name,
      contact,
      idNumber,
      address
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Landlord creation failed' };
  }
};

