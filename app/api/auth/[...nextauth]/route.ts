import { dbClient } from "@/utils/db"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {compare, hash} from 'bcryptjs'

const SALTS = 8

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                console.log(credentials)
                console.log('password', await hash('alumno', 8))
                const  user = await dbClient.user.findUnique({
                    where: {username: credentials!.email}
                })
                if (!user) {
                    console.log('el usuario no existe')
                    throw new Error('Las credenciales son erroneas')
                }
                const match = await compare(credentials!.password, user.password)
                if (!match) {
                    console.log('la contraseña no coincide', credentials!.password)
                    throw new Error('Las credenciales son erroneas')
                }
                return {
                    id: user.id,
                    name: user.username,
                    email: user.username
                }
                /*
                // Add logic here to look up the user from the credentials supplied
                const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }*/
            }
        })
    ],
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}