import { User, type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import AuthService from "@/services/actions/auth";


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter Email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        // Validate credentials with your database here
        if (credentials) {
          const res = await AuthService.login({
            email: credentials.email,
            password: credentials.password,
          });
          const resProfileInfo = await AuthService.getProfileInfoClient({
            accessToken: res.data.accessToken,
          });
          return {
            fullName: resProfileInfo.data.fullName,
            name: resProfileInfo.data.userName,
            email: resProfileInfo.data.email,
            image: resProfileInfo.data.profileImage,
            id: resProfileInfo.data.id,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      session.user = {
        fullName: token.fullName as string,
        name: token.name as string,
        id: token.id as number,
        email: token.email,
        image: token.image as string,
        accessToken: token.accessToken as string,
        refreshToken: token.refreshToken as string
      };
      return session;
    },
    async jwt(param) {
      const { token, user, trigger, session } = param;

      if (user) {
        return {
          ...token,
          ...user,
          ...session,
        };
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.AUTH_SECRET!,
};
