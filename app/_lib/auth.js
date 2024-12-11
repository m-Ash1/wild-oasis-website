import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  // awl ma el matcher bysht8l b run el callback deh
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const guest = await getGuest(user.email);
        if (!guest) {
          await createGuest({
            email: user.email,
            fullName: user.name,
          });
        }
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
    async session({ session }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id
      return session;
    },
  },

  // el path ely byt3ml feh sign in w sign out
  pages: {
    signIn: "/login",
    // signOut: "/signout",
  },
};

export const {
  signIn,
  signOut,
  auth,
  handlers: { GET, POST },
} = NextAuth(authConfig);
