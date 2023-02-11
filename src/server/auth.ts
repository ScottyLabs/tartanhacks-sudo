import type { GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type User,
  type DefaultSession,
  type NextAuthOptions,
  type Session,
} from "next-auth";
import { env } from "../env.mjs";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt/types.js";

interface HelixUser {
  _id: string;
  admin: boolean;
  email: string;
}

interface AdminUser extends User {
  admin: boolean;
}

/**
 * Module augmentation for `next-auth` types.
 * Allows us to add custom properties to the `session` object and keep type
 * safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks,
 * etc.
 *
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Email",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "acarnegie@andrew.cmu.edu",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        const authResponse = await fetch(`${env.HELIX_BASE_URL}/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.username,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        if (!authResponse.ok) {
          return null;
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const helixUser = (await authResponse.json()) as HelixUser | null;
        if (helixUser) {
          const user: AdminUser = {
            id: helixUser._id,
            email: helixUser.email,
            admin: helixUser.admin,
          };
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    session: ({ session, token }: { session: Session; token: JWT }) => {
      if (token) {
        session.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the
 * `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 **/
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
