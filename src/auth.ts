import NextAuth from "next-auth"
import {db} from "@/db"
//The prisma adapter automatically uses the models declared in the prisma schema
import { PrismaAdapter } from "@auth/prisma-adapter"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"


const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

//when vi use the process.env object, typescript will asume this is: string | undefined
//So we check if it is defined, or else we throw an error

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    throw new Error("Missing github oauth credentials")
}

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw new Error("Missing google oauth credentials")
}
//Deconstructing the NextAuth object
//The handelers is request handleres
//The auth is the authentication object, and are going to let us know if a user is signed in or not
//The signOut and signIn are going to be called to sign in/out users
export const {handlers:{GET, POST}, auth, signOut, signIn} = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        Github({
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET
        }),
        Google({
            clientId: GOOGLE_CLIENT_ID ,
            clientSecret: GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }) 
    ],
    callbacks: {
        //usally not needed, here we are fixing a bug in nextauth
        async session({session,user}: any) {
            if (session && user) {
                session.user.id = user.id
            }

            return session
        }
    }
})

