import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { user, session, account, verification } from "@/db/schema/auth";

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET,
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user,
            session,
            account,
            verification,
        },
    }),
    emailAndPassword: {
        enabled: true,
        // Disable sign up - admin akun dibuat melalui script
        // Public user tidak perlu membuat akun
        autoSignIn: false,
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day (update session every day)
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60, // 5 minutes
        },
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                default: "public"
            }
        }
    },
    trustedOrigins: [
        process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
    ],
});