export const resolveRedirectPath = (user) => {
  const role = user.roles?.[0];
  const status = user.accountStatus;


  if (status === "SUSPENDED") {
    return "/access-denied";
  }

  if (role === "ROLE_LANDLORD") {
    if (status === "UNVERIFIED") return "/landlord/profile";
    if (status === "VERIFIED" || status === "PENDING") return "/landlord";
  }

  if (role === "ROLE_STUDENT") {
    return user.hasStudentProfile
      ? "/student"
      : "/student/profile";
  }

  // fallback
  return "/login";
};
