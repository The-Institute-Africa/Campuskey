import API from '@/api/api'

export const createStudent = async (
  studentName,
  studentNumber,
  studentContact,
  address
) => {
  try {
    const response = await API.post("/student/create", {
      studentName,
      studentNumber,
      studentContact,
      address
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Student creation failed" };
  }
};
