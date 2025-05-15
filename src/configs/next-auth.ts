import { getServerSession, User, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import AuthService from "@/services/actions/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const authOptions: NextAuthOptions = {
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
        if (credentials) {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }
          const user = await prisma.user.findUnique({
            where: { Email: credentials.email as string, Password: credentials.password as string },
          });
          if (!user || !user.Password) {
            return null;
          }


          return {
            fullName: user.FullName,
            name: user.Name,
            email: user.Email,
            image: user.ProfileImage,
            id: user.Id,
            accessToken: "",
            refreshToken: ""
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
const getSession = () => getServerSession(authOptions)
export { authOptions, getSession }
