import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Daftar locale yang didukung
  locales: ['id', 'en'],
  // Default locale saat tidak bisa mendeteksi
  defaultLocale: 'id',
  // Opsi untuk prefix locale
  localePrefix: 'as-needed' // atau 'always', 'never', 'matching-locale'
});

export const config = {
  // Matcher untuk menentukan path mana yang akan dihandle oleh middleware
  matcher: [
    // Tidak menangani API routes, static files, atau next files
    '/((?!api|_next/static|_next/image|images|favicon.ico|manifest.webmanifest|sw.js).*)',
  ],
};