import { betterAuth } from "better-auth";

// Konfigurasi auth dasar tanpa database untuk menghindari edge runtime error
export const auth = betterAuth({
    // Tidak menggunakan database untuk menghindari error edge runtime
    emailAndPassword: {
        enabled: true,
    },
    web3: {
        enabled: false,
    },
    user: {
        // Tambahkan role ke dalam model user
        additionalFields: {
            role: {
                type: "string",
                default: "public"
            }
        }
    }
});