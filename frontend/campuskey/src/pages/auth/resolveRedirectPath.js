export const resolveRedirectPath = (user) => {
  const role = user.roles?.[0];
  const status = user.status?.[0];

  
  if (status === "SUSPENDED") {
    return "/access-denied";
  }

  if (role === "ROLE_LANDLORD") {
    if (status === "UNVERIFIED") return "/landlord/create-profile";
    if (status === "VERIFIED") return "/landlord/dashboard";
    if (status === "PENDING") return "/landlord/dashboard";
  }

  if (role === "ROLE_STUDENT") {
    return user.hasStudentProfile
      ? "/home"
      : "/student/create-profile";
  }

  // fallback
  return "/login";
};
