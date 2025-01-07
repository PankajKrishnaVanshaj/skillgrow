import connectToDatabase from "@/DataBase/connectdb";
import UserModel from "@/DataBase/models/user";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const { name, email } = user;
        await connectToDatabase();

        try {
          let existingUser = await UserModel.findOne({ email });

          if (existingUser) {
            return true;
          }
          const defaultUsername = email.split("@")[0];

          const newUser = await UserModel.create({
            email,
            name,
            username: defaultUsername,
          });
          return true;
        } catch (error) {
          console.error("Error during sign in:", error);
          return false; // Return false to indicate sign-in failure
        }
      }
      return true; // Default to true for other providers
    },
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await UserModel.findOne({ email: user.email });
        token.id = dbUser._id;
        token.email = dbUser.email;
        token.name = dbUser.name;
        token.username = dbUser.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.username = token.username;

      return session;
    },
  },
};
