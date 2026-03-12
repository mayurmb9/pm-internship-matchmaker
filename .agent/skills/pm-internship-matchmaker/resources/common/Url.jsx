export const BaseUrl = 'https://api.pminternship.gov.in/v1';

export const Endpoints = {
  LOGIN: '/auth/login',
  VERIFY_OTP: '/auth/verify-otp',
  REGISTER: '/auth/register',
  REFRESH_TOKEN: '/auth/refresh-token',
  LOGOUT: '/auth/logout',
  PROFILE: '/user/profile',
  UPDATE_PROFILE: '/user/update-profile',
  INTERNSHIPS: '/internships',
  INTERNSHIP_DETAIL: '/internships/detail',
  APPLY_INTERNSHIP: '/internships/apply',
  APPLICATION_STATUS: '/applications/status',
  EMPLOYER_DASHBOARD: '/employer/dashboard',
  NOTIFICATIONS: '/notifications',
  AADHAAR_VERIFY: '/verification/aadhaar',
  ELIGIBILITY_CHECK: '/verification/eligibility',
};

export default BaseUrl;
