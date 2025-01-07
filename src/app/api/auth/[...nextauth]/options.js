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
          const userExists = await UserModel.findOne({ email });
          if (userExists) {
            return userExists;
          }

          const user = await UserModel.create({
            email: email,
            name: name,
          });

          return user;
        } catch (error) {
          console.log(error);
        }
      }

      return user;
    },
  },
};
