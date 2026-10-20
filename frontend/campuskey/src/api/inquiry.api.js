import API from '@/api/api';

export const createInquiry = async (propertyId, message) => {
  const response = await API.post(`/student/inquiries/${propertyId}`, { message });
  return response.data;
};

export const getStudentInquiries = async () => {
  const response = await API.get('/student/inquiries');
  return response.data;
};

export const closeInquiry = async (inquiryId) => {
  const response = await API.post(`/student/inquiries/${inquiryId}/close`);
  return response.data;
};

export const getLandlordInquiries = async () => {
  const response = await API.get('/landlord/inquiries');
  return response.data;
};

export const respondToInquiry = async (inquiryId, responseText) => {
  const response = await API.post(`/landlord/inquiries/${inquiryId}/response`, {
    response: responseText,
  });
  return response.data;
};
