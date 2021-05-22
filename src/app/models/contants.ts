import { environment } from '../../environments/environment';

const BASE_URL = environment.apiUrl + 'api/';
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
export const ALL_BIDS = BASE_URL + 'admin/bids';
export const ALL_CONTRACTS = BASE_URL + 'admin/contracts';
export const GET_USER_INFO = BASE_URL + 'admin/user/';
export const APPROVE_BID = BASE_URL + 'admin/bid/approve/';
export const ALL_USERS = BASE_URL + 'admin/users';

// Contractor
export const OPEN_CONTRACTS = BASE_URL + 'contractor/clusters';
export const APPLY_BID = BASE_URL + 'contractor/bid/apply/';
export const CHECK_CONTRACT = BASE_URL + 'contractor/bid/';
export const MY_BIDS = BASE_URL + 'contractor/bids';
export const MY_CONTRACTS = BASE_URL + 'contractor/mycontracts';
export const UPDATE_STATUS = BASE_URL + 'contractor/contract/';
