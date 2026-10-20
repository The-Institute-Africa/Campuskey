import API from '@/api/api'

export const CheckProfile = async () => {
  const response = await API.get("auth/me");
  return response.data;
}