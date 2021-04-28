const BASE_URL = 'http://localhost:9898/api/';
export const LOGIN_URL = BASE_URL + 'p/login';
export const REGISTER_URL = BASE_URL + 'p/register';
export const WHO_AM_I = BASE_URL + 'user/whoami';
export const POTHOLE_UPLOAD = BASE_URL + 'user/record/upload';
export const MY_RECORDS = BASE_URL + 'user/record/myrecords';
export const APPLY_CONTRACTOR = BASE_URL + 'user/contractor/apply';

// Admin
/*
###
POST http://localhost:9898/api/admin/bid/approve/{{bidid}}

###
GET http://localhost:9898/api/admin/bids

###
GET http://localhost:9898/api/admin/clusters

###
GET http://localhost:9898/api/admin/contractor/applications

###
POST http://localhost:9898/api/admin/contractor/approve/{{username}}

###
GET http://localhost:9898/api/admin/records

###
DELETE http://localhost:9898/api/admin/user/{{username}}

###
GET http://localhost:9898/api/admin/user/{{uuid}}

###
GET http://localhost:9898/api/admin/users
* */
export const CONTRACTORS_APPLICATIONS =
  BASE_URL + 'admin/contractor/applications';
export const APPROVE_CONTRACTOR = BASE_URL + 'admin/contractor/approve/';
