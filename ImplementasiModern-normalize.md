

---

### ✅ **Implementasi `modern-normalize` di Next.js (App Router)**

> 📌 Kenapa `modern-normalize`?  
> Lebih ringan, fokus pada *modern browsers* (termasuk Firefox & Edge terbaru), dan kompatibel penuh dengan Next.js (termasuk SSR). Cocok untuk web kampus Anda yang ingin tampil konsisten.

---

**Langkah 1: Install Paket**
Buka terminal di folder proyek Anda, lalu jalankan:

```bash
npm install modern-normalize
```

---

**Langkah 2: Impor di Root Layout**
Buka file layout utama:  
➡️ `app/layout.tsx` *(atau `app/layout.jsx` jika pakai JS)*

Tambahkan impor **di paling atas**, sebelum komponen apa pun:

```tsx
// app/layout.tsx
import 'modern-normalize/modern-normalize.css'; // ← baris ini WAJIB paling atas

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // CSS kustom Anda (harus diimpor SETELAH normalize)

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Website Kampus',
  description: 'Website resmi kampus',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
```

> ⚠️ **PENTING**:  
> - `modern-normalize.css` harus diimpor **sebelum** `./globals.css` dan font.  
> - Ini memastikan *reset/normalize* diterapkan dulu, baru gaya kustom Anda menimpa jika perlu.

---

**Langkah 3: Verifikasi (Opsional tapi Disarankan)**
1. Jalankan ulang dev server:
   ```bash
   npm run dev
   ```
2. Buka web di:
   - Chrome → catat tampilan
   - Firefox → bandingkan
3. Periksa di DevTools (F12) → tab **Elements** → cari `<body>` atau elemen `<h1>`, `<p>`:
   - Pastikan tidak ada `margin: 8px` default (bawaan browser) yang mengganggu.
   - Semua elemen seharusnya punya `box-sizing: border-box` (jika Anda tambahkan di `globals.css` — lihat tips di bawah ✅).

---

**Tips Tambahan untuk Hasil Optimal**
Agar lebih *future-proof* dan konsisten:

1. Tambahkan `box-sizing: border-box` global di `globals.css`:
```css
/* app/globals.css */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Opsional: reset margin/padding tambahan */
html, body {
  margin: 0;
  padding: 0;
}
```

2. Pastikan font konsisten (Firefox kadang render font beda):
```css
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

3. Jika pakai Tailwind:
Anda **tidak perlu** `modern-normalize` — karena Tailwind sudah menyertakan **Preflight** (normalize + best practices). Cukup pastikan:
- Tidak ada konflik dengan `globals.css`.
- Di `tailwind.config.js`, jangan nonaktifkan `preflight`.

---

**Alternatif: Gunakan `@universe/reset` (Lebih Ringan & Modern)**
Jika ingin *ultra-minimal*, coba:
```bash
npm install @universe/reset
```
Lalu di `layout.tsx`:
```tsx
import '@universe/reset';
```
→ Hanya 169 bytes, zero-dependency, support semua browser modern.

---

Kalau setelah ini masih ada perbedaan di Firefox/Edge, **kemungkinan besar disebabkan oleh:**
- Penggunaan `:focus-visible` (Firefox butuh polyfill)
- `scrollbar-*` CSS (hanya didukung penuh di Chrome)
- Flex/Grid *edge case*
