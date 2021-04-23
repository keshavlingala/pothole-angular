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
