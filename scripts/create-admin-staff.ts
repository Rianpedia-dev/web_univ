import 'dotenv/config';
import { auth } from '../lib/auth';
import { db } from '../db';
import { user, account, session, verification } from '../db/schema/auth';
import { eq } from 'drizzle-orm';

async function createAdminStaffUser() {
    console.log('🚀 Membuat akun admin staff menggunakan better-auth API...\n');

    const email = 'adminstaff@gmail.com';
    const password = 'Adminstaff!23';
    const name = 'Admin Staff Kampus';
    const role = 'adminstaff';

    try {
        // Hapus user lama jika ada
        const existingUser = await db.select().from(user).where(eq(user.email, email)).limit(1);

        if (existingUser.length > 0) {
            console.log('⚠️  User dengan email ini sudah ada, menghapus...');
            await db.delete(session).where(eq(session.userId, existingUser[0].id));
            await db.delete(account).where(eq(account.userId, existingUser[0].id));
            await db.delete(verification).where(eq(verification.identifier, email));
            await db.delete(user).where(eq(user.id, existingUser[0].id));
            console.log('🗑️  User lama dihapus\n');
        }

        // Gunakan better-auth API untuk membuat user
        // Ini akan menggunakan hash password yang benar
        const result = await auth.api.signUpEmail({
            body: {
                name: name,
                email: email,
                password: password,
                role: role
            }
        });

        console.log('Result:', result);

        if (result.user) {
            // Update role menjadi adminstaff
            await db.update(user)
                .set({ role: role, emailVerified: true })
                .where(eq(user.email, email));

            console.log('✅ Akun admin staff berhasil dibuat!\n');
            console.log('📧 Email:', email);
            console.log('🔑 Password:', password);
            console.log('👤 Name:', name);
            console.log('🎭 Role:', role);
            console.log('\n🎉 Sekarang Anda bisa login dengan akun ini!');
            console.log('📍 Dashboard: /dashboardAdminStaff');
        } else {
            console.error('❌ Gagal membuat user:', result);
        }

    } catch (error) {
        console.error('❌ Error membuat akun admin staff:', error);
        process.exit(1);
    }

    process.exit(0);
}

createAdminStaffUser();
