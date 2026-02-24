import API from "@/api/api";

export const projectSendVerification = async ({
  propertyId,
  file,
  token,
}) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await API.post(
    `/landlord/${propertyId}/submit`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};



