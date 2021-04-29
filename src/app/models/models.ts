export interface AuthResponse {
  jwt: string;
}

export interface User {
  userId: string;
  username: string;
  password: string;
  email: string;
  roles: string;
  licence: string;
  enabled: boolean;
  authorities: Authority[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
}

export interface Authority {
  authority: string;
}

export interface PotholeRecord {
  lat: string;
  lng: string;
  description: string;
  zipcode: string;
  file: File;
  recordId?: string;
  userId?: string;
  cluster?: Cluster;
  img?: string;
}

export interface Cluster {
  contractorId: string;
  records: PotholeRecord[];
  status: string;
  zipcode: string;
}

export interface Bid {
  bidId?: string;
  contractorId: string;
  clusterId: string;
  bidAmount: string;
  description: string;
  status: string;
}
