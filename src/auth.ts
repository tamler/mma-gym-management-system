import NextAuth from "next-auth"
import Nodemailer from "next-auth/providers/nodemailer"
import { createUser, getUserByEmail } from "@/lib/data/users"
import { FileAdapter } from "@/lib/auth-adapter"
import type { User } from "@/lib/types"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string
      role: 'student' | 'trainer' | 'admin'
    }
  }
}

const authConfig = NextAuth({
  adapter: FileAdapter(),
  providers: [
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env.EMAIL_SERVER_PORT || "465"),
        secure: true, // SSL
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async signIn({ user, email }) {
      if (!user.email) return false
      
      // Check if user exists in our file system
      let existingUser = await getUserByEmail(user.email)
      
      if (!existingUser) {
        // Create new user with default student role
        existingUser = await createUser({
          email: user.email,
          name: user.name || undefined,
          role: 'student', // Default new users to student role
        })
      }
      
      return true
    },
    async session({ session, token }) {
      if (session.user?.email) {
        const user = await getUserByEmail(session.user.email)
        if (user) {
          session.user.id = user.id
          session.user.role = user.role
          session.user.name = user.name
        }
      }
      return session
    },
    async jwt({ token, user }) {
      return token
    },
  },
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
  },
})

export const { handlers, auth, signIn, signOut } = authConfig
export const { GET, POST } = handlers