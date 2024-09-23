import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken:string;
    user: User;
  }
  interface User {
    id:number;
    fullName: string;
    accessToken:string;
    email: string
    name: string
    surname: string
    tenantInfos: TenantInfo[]
  }
  interface TenantInfo {
    id: number
    slug: string
    domain: string
    title: string
    aliasId: string
    connectionString: string
  }
  
}
