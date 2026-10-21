import API from '@/api/api';

export const getMyProfile = async () => (await API.get('/profile/me')).data;
export const updateMyProfile = async (profile) => (await API.put('/profile/me', profile)).data;
export const getRelatedProfile = async (role, id) => (
  await API.get(`/profile/${role === 'STUDENT' ? 'students' : 'landlords'}/${id}`)
).data;
export const setAccountState = async (action) => API.post(`/account/${action}`);
