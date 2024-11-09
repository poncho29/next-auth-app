import type { NextAuthConfig } from "next-auth";

import Credentials from "next-auth/providers/credentials"
// import { saltAndHashPassword } from "@/utils/password"
 
export default {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log({ credentials });

        // return {
        //   id: "1",
        //   name: "John Doe",
        //   email: "test@test.com",
        // }

        let user = null
 
        // const pwHash = saltAndHashPassword(credentials.password)
        // user = await getUserFromDb(credentials.email, credentials.password)

        if (credentials?.email !== "test@test.com") {
          console.log("Invalid credentials.");
        } else {
          user = {
            id: "1",
            name: "John Doe",
            email: "test@test.com",
          }
        }

        if (!user) {
          throw new Error("Invalid credentials.")
        }
 
        return user
      },
    }),
  ],
} satisfies NextAuthConfig