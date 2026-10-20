import API from '@/api/api';

export const createBooking = async (propertyId, booking) => {
  const response = await API.post(`/student/bookings/${propertyId}`, booking);
  return response.data;
};

export const getStudentBookings = async () => {
  const response = await API.get('/student/bookings');
  return response.data;
};

export const cancelBooking = async (bookingId) => {
  const response = await API.post(`/student/bookings/${bookingId}/cancel`);
  return response.data;
};

export const getLandlordBookings = async () => {
  const response = await API.get('/landlord/bookings');
  return response.data;
};

export const updateBookingStatus = async (bookingId, status) => {
  const response = await API.put(`/landlord/bookings/${bookingId}/status`, null, {
    params: { status },
  });
  return response.data;
};
