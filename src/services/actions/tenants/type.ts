export interface TenantRequest {
  id: number
  slug: string
  domain: string
  title: string
  accessToken?: string;
}
export interface TenantResponse {
  id: number,
  slug: string,
  domain: string,
  title: string,
  aliasId: string,
  connectionString: string
}

export interface TenantControlRequest {
  slug: string
}
export interface TenantControlResponse {
  isExist:boolean
}

