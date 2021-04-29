const BASE_URL = 'http://localhost:9898/api/';
export const LOGIN_URL = BASE_URL + 'p/login';
export const REGISTER_URL = BASE_URL + 'p/register';
export const WHO_AM_I = BASE_URL + 'user/whoami';
export const POTHOLE_UPLOAD = BASE_URL + 'user/record/upload';
export const MY_RECORDS = BASE_URL + 'user/record/myrecords';
export const APPLY_CONTRACTOR = BASE_URL + 'user/contractor/apply';

// Admin
export const CONTRACTORS_APPLICATIONS =
  BASE_URL + 'admin/contractor/applications';
export const APPROVE_CONTRACTOR = BASE_URL + 'admin/contractor/approve/';

// Contractor
export const OPEN_CONTRACTS = BASE_URL + 'contractor/clusters';
export const APPLY_BID = BASE_URL + 'contractor/bid/apply/';
export const CHECK_CONTRACT = BASE_URL + 'contractor/bid/';
