export interface RegisterRequest {
  email: string
  password: string
  name: string
  surname: string
}
export interface RegisterResponse {
  message: string
  status: number
  data: TokenData
}

export interface TokenData {
  accessToken: string
  expiration: string
  refreshToken: string
}

export type LoginRequest = {
  email: string;
  password: string;
};
 

export interface GetTenantInfoResponse {
  id: number
  email: string
  password: string
  name: string
  surname: string
  tenantInfos: TenantInfo[]
}

export interface TenantInfo {
  id: number
  slug: string
  domain: string
  title: string
  aliasId: string
  connectionString: string
}
