# 📚 DOKUMENTASI PEMBANGUNAN WEBSITE UNIVERSITAS

## 🛠️ TEKNOLOGI & STACK

### Core Technologies
- **Framework**: Next.js 15 (App Router)
- **Styling**: TailwindCSS 3.x
- **ORM**: Drizzle ORM
- **UI Components**: shadcn/ui
- **Database**: PostgreSQL
- **Storage**: Supabase Bucket
- **Containerization**: Docker & Docker Compose
- **Authentication**: Auth.js (NextAuth v5)

### Additional Libraries
```json
{
  "dependencies": {
    "next": "^15.5.0",
    "react": "^18.0.0",
    "drizzle-orm": "^0.29.0",
    "postgres": "^3.4.0",
    "@auth/core": "^0.18.0",
    "next-auth": "^5.0.0-beta",
    "tailwindcss": "^3.4.0",
    "zod": "^3.22.0",
    "react-hook-form": "^7.49.0",
    "lucide-react": "^0.300.0",
    "next-intl": "^3.4.0",
    "next-themes": "^0.2.1",
    "framer-motion": "^10.16.0",
    "react-intersection-observer": "^9.5.3",
    "class-variance-authority": "^0.7.0"
  }
}
```

## ✨ FITUR UTAMA WEBSITE

### 1. 🌍 MULTILINGUAL (Bahasa Indonesia - English)

#### Implementasi
- **Library**: next-intl untuk i18n
- **Toggle**: Switcher di navbar (ID/EN flag icons)
- **Storage**: Cookie untuk menyimpan preferensi bahasa
- **Fallback**: Default ke Bahasa Indonesia

#### Struktur Folder
```
/messages
  ├── id.json  # Bahasa Indonesia
  └── en.json  # English
```

#### Contoh Konfigurasi
```typescript
// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['id', 'en'],
  defaultLocale: 'id',
  localePrefix: 'as-needed'
});

// Usage di component
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('HomePage');
  return <h1>{t('title')}</h1>;
}
```

#### Konten yang Diterjemahkan
✅ Semua menu navigasi  
✅ Heading & sub-heading  
✅ Button & CTA text  
✅ Form labels & validation  
✅ Error messages  
✅ Footer content  
✅ Meta description (SEO)  
⚠️ Konten dinamis (berita, pengumuman) - optional bilingual input

### 2. 🎨 THEME SYSTEM (Light, Dark, System)

#### Implementasi
- **Library**: next-themes untuk theme management
- **Options**:
  - ☀️ Light Mode (Default)
  - 🌙 Dark Mode
  - 💻 System (Follow OS preference)
- **Toggle**: Dropdown/toggle button di navbar
- **Storage**: LocalStorage untuk persist preferensi
- **Smooth Transition**: CSS transition untuk perubahan theme

#### Konfigurasi
```typescript
// providers/theme-provider.tsx
import { ThemeProvider } from 'next-themes';

export function Providers({ children }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

// Component usage
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
    </select>
  );
}
```

#### Color Palette
**Light Mode:**
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --accent: 210 40% 96.1%;
  --border: 214.3 31.8% 91.4%;
}
```

**Dark Mode:**
```css
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  --primary-foreground: 222.2 47.4% 11.2%;
  --secondary: 217.2 32.6% 17.5%;
  --accent: 217.2 32.6% 17.5%;
  --border: 217.2 32.6% 17.5%;
}
```

### 3. 📱 RESPONSIVE DESIGN (Desktop & Mobile)

#### Breakpoints TailwindCSS
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'sm': '640px',   // Mobile landscape
      'md': '768px',   // Tablet
      'lg': '1024px',  // Desktop
      'xl': '1280px',  // Large desktop
      '2xl': '1536px', // Extra large
    }
  }
}
```

#### Responsive Strategy
- **Mobile First Approach**
- Default styling untuk mobile (320px+)
- Progressive enhancement untuk tablet & desktop
- Touch-friendly interface (min 44x44px touch targets)

#### Adaptive Components:

| Component | Mobile | Desktop |
|-----------|---------|----------|
| Navigation | Hamburger menu | Horizontal navbar |
| Hero Section | Single column | Full-width dengan parallax |
| Card Grid | 1 column | 3-4 columns |
| Tables | Horizontal scroll | Full display |
| Sidebar | Bottom drawer | Fixed sidebar |
| Images | Stacked | Side-by-side |

#### Testing Devices:
- 📱 Mobile: iPhone SE (375px), iPhone 14 (390px), Android (360px)
- 📱 Tablet: iPad Mini (768px), iPad Pro (1024px)
- 💻 Desktop: 1366px, 1920px, 2560px

### 4. 🎯 USER FRIENDLY INTERFACE

#### UX Best Practices

**A. Navigation**
✅ Sticky navbar untuk akses cepat  
✅ Breadcrumb untuk orientasi  
✅ Search bar yang visible  
✅ Mega menu untuk kategori banyak  
✅ Quick links di footer  
✅ Back to top button  

**B. Accessibility (WCAG 2.1 Level AA)**
✅ Contrast ratio minimal 4.5:1  
✅ Keyboard navigation (Tab, Enter, Esc)  
✅ Focus indicators yang jelas  
✅ Alt text untuk semua gambar  
✅ ARIA labels untuk screen readers  
✅ Skip to content link  
✅ Form validation dengan error messages  

**C. Performance**
⚡ Page load < 3 detik  
⚡ Image optimization (WebP, lazy loading)  
⚡ Code splitting & dynamic imports  
⚡ Caching strategy  
⚡ Skeleton loading untuk data fetch  

**D. Interaction Design**
✨ Hover effects pada interactive elements  
✨ Loading indicators (spinners, progress bars)  
✨ Toast notifications untuk feedback  
✨ Smooth scrolling  
✨ Pagination yang clear  
✨ Empty states dengan CTA  

**E. Content Readability**
📖 Font size minimal 16px (body text)  
📖 Line height 1.5-1.8  
📖 Max content width 65-75 karakter  
📖 Hierarchy yang jelas (H1-H6)  
📖 White space yang cukup  

### 5. 🚀 FUTURISTIC/WEB3 STYLING

#### Design System

**A. Color Scheme - Cyber/Tech Inspired**
```css
/* Primary Palette */
--cyber-blue: #00f0ff;      /* Neon blue */
--electric-purple: #b376ff; /* Electric purple */
--neon-green: #39ff14;      /* Neon green */
--dark-bg: #0a0e27;         /* Deep space blue */
--darker-bg: #050816;       /* Near black */
--accent-pink: #ff006e;     /* Hot pink */

/* Gradients */
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--gradient-cyber: linear-gradient(135deg, #00f0ff 0%, #b376ff 100%);
--gradient-neon: linear-gradient(90deg, #39ff14 0%, #00f0ff 100%);
```

**B. Typography - Modern & Tech**
```css
/* Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');

body {
  font-family: 'Inter', sans-serif;
}

h1, h2, h3 {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  letter-spacing: -0.02em;
}

code, .monospace {
  font-family: 'JetBrains Mono', monospace;
}
```

**C. Visual Effects**

**Glassmorphism (Frosted Glass)**
```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

/* Dark mode variant */
.dark .glass-card {
  background: rgba(10, 14, 39, 0.7);
  border: 1px solid rgba(0, 240, 255, 0.2);
}
```

**Neon Glow Effects**
```css
.neon-button {
  color: #00f0ff;
  border: 2px solid #00f0ff;
  text-shadow: 0 0 10px #00f0ff;
  box-shadow: 
    0 0 5px #00f0ff,
    0 0 20px #00f0ff,
    inset 0 0 10px rgba(0, 240, 255, 0.2);
  transition: all 0.3s ease;
}

.neon-button:hover {
  background: #00f0ff;
  color: #0a0e27;
  box-shadow: 
    0 0 20px #00f0ff,
    0 0 40px #00f0ff,
    0 0 60px #00f0ff;
}
```

**Holographic/Iridescent Effects**
```css
.holographic {
  background: linear-gradient(
    45deg,
    #ff006e,
    #00f0ff,
    #b376ff,
    #39ff14
  );
  background-size: 300% 300%;
  animation: gradient-shift 3s ease infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

**D. Animations & Micro-interactions**

**Framer Motion Examples**

```typescript
// Fade In Up
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  {content}
</motion.div>

// Parallax Scroll
<motion.div
  style={{ y: useTransform(scrollY, [0, 300], [0, -50]) }}
>
  {content}
</motion.div>

// Hover Scale
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400 }}
>
  Click Me
</motion.button>

// Stagger Children
<motion.div
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }}
>
  {items.map(item => (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

**E. Component Styling Examples**

**Hero Section - Futuristic**
```tsx
<section className="relative min-h-screen bg-darker-bg overflow-hidden">
  {/* Animated background grid */}
  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
  
  {/* Gradient orbs */}
  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/30 rounded-full blur-3xl animate-pulse" />
  <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/30 rounded-full blur-3xl animate-pulse delay-1000" />
  
  {/* Content */}
  <div className="relative z-10 container mx-auto px-4 pt-32">
    <motion.h1 
      className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-cyber"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      Welcome to Future University
    </motion.h1>
    
    <motion.p 
      className="text-xl text-gray-300 mt-6 max-w-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      Shaping tomorrow's leaders with cutting-edge technology
    </motion.p>
    
    <motion.button
      className="mt-8 px-8 py-4 neon-button rounded-full font-semibold"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Explore Programs →
    </motion.button>
  </div>
</section>
```

**Card Design - Glassmorphism**
```tsx
<div className="group glass-card p-6 hover:scale-105 transition-all duration-300">
  {/* Gradient border on hover */}
  <div className="absolute inset-0 rounded-2xl bg-gradient-cyber opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10" />
  
  <div className="flex items-center gap-4 mb-4">
    <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
      <Icon className="text-white" />
    </div>
    <h3 className="text-xl font-semibold">Program Studi</h3>
  </div>
  
  <p className="text-gray-300 text-sm">
    Discover our innovative programs designed for the future
  </p>
  
  <button className="mt-4 text-cyber-blue hover:text-white transition-colors flex items-center gap-2">
    Learn More 
    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
  </button>
</div>
```

**Navigation - Futuristic**
```tsx
<nav className="fixed top-0 w-full z-50 glass-card border-b border-white/10">
  <div className="container mx-auto px-4">
    <div className="flex items-center justify-between h-16">
      {/* Logo with glow */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-cyber flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.5)]">
          <span className="text-white font-bold text-xl">U</span>
        </div>
        <span className="text-xl font-bold">University</span>
      </div>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        {menuItems.map(item => (
          <a 
            href={item.href}
            className="text-gray-300 hover:text-cyber-blue transition-colors relative group"
          >
            {item.label}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-cyber group-hover:w-full transition-all duration-300" />
          </a>
        ))}
      </div>
      
      {/* Theme & Language Toggles */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <LanguageToggle />
        <button className="neon-button px-6 py-2 rounded-full text-sm">
          Apply Now
        </button>
      </div>
    </div>
  </div>
</nav>
```

**F. Additional Web3/Futuristic Elements**
- 🔷 Geometric patterns: Hexagons, triangles, circuit boards
- ⚡ Particle effects: Floating particles dengan Three.js
- 🌐 3D elements: Rotating 3D models dengan Three.js/React Three Fiber
- 🔮 Morphing shapes: SVG morphing animations
- 📊 Data visualization: Animated charts & graphs
- 🎭 Scroll-triggered animations: Fade, slide, scale
- 💫 Cursor effects: Custom cursor dengan trail effect
- 🎪 Loading screens: Futuristic loading animations

## 🔐 SISTEM AUTENTIKASI

### Auth.js Configuration

#### 2 Role System

* **Public User**

  * Akses: *Read-Only*
  * Permissions:

    * Melihat semua konten publik
    * Tidak perlu login dan buat Akun
    * Akses halaman informasi
    * Download materi publik

* **Admin**

  * Akses: *Full Control*
  * Permissions:

    * Login dengan kredensial
    * CRUD semua konten
    * Akses dashboard admin
    * Upload media
    * Moderasi komentar 

#### Authentication Flow
```
graph LR
    A[User] --> B{Login?}
    B -->|No| C[Public Access]
    B -->|Yes| D{Credentials Valid?}
    D -->|No| E[Error Message]
    D -->|Yes| F{Role Check}
    F -->|Admin| G[Admin Dashboard]
    F -->|User| C
```

## 📄 STRUKTUR HALAMAN PUBLIC WEBSITE UNIVERSITY

## 🏠 HOME

**Isi yang tampil:**
- Slider utama
- Kata sambutan Rektor
- Berita terbaru (3–5 artikel)
- Upcoming events slider
- Pengumuman penting (running ticker)
- Testimoni alumni/mahasiswa
- Partner logo (carousel)

---

## 📚 PROFIL

### Sub-Menu:
#### 1. Profil Universitas
**Isi yang tampil:**
- Logo Universitas
- Statistik kampus (counter)
- Sejarah kampus
- Visi, Misi, dan Tujuan
- Nilai-nilai universitas

#### 2. Akreditasi
**Isi yang tampil:**
- Akreditasi Universitas (sertifikat)
- Akreditasi tiap prodi
- Penghargaan nasional/internasional

#### 3. Struktur Organisasi
**Isi yang tampil:**
- Susunan pimpinan universitas
- Bagan struktur organisasi
- Tugas dan fungsi unit kerja

#### 4. Kontak & Lokasi
**Isi yang tampil:**
- Alamat lengkap
- Peta Google Maps interaktif
- Nomor telepon & email
- Jam operasional
- Social media links

---

## 📚 AKADEMIK

### Sub-Menu:

#### 1. Program Studi
**Isi yang tampil:**
- Daftar semua prodi (S1, S2, D3)
- Deskripsi prodi
- Akreditasi prodi
- Prospek karir
- Dosen pengampu
- Fasilitas laboratorium
- Kurikulum ringkas

#### 2. Fakultas
**Isi yang tampil:**
- Daftar fakultas
- Profil fakultas
- Dekanat (Dekan & Wakil Dekan)
- Prodi di bawah fakultas
- Fasilitas fakultas
- Kontak fakultas
- Struktur kurikulum per prodi
- RPS (file download)

#### 3. Kalender Akademik
**Isi yang tampil:**
- Kalender interaktif
- Jadwal penting (UTS, UAS, Wisuda)
- Event akademik

#### 4. Fasilitas Kampus
**Isi yang tampil:**
- Laboratorium
- Perpustakaan
- Ruang kelas
- Fasilitas olahraga
- Asrama mahasiswa
- Klinik kesehatan

---

## 🎓 PENERIMAAN

### Sub-Menu:

#### 1. Pendaftaran PMB
**Isi yang tampil:**
- Alur pendaftaran
- Timeline pendaftaran
- Form pendaftaran (atau link)
- Jalur masuk yang tersedia
- Kontak helpdesk PMB
- Pertanyaan umum (FAQ) PMB

#### 2. Kelas
**Isi yang tampil:**
- Kelas Reguler
- Kelas Karyawan
- Persyaratan
- Kuota
- Jadwal
- Tahapan seleksi

#### 3. Biaya Pendidikan
**Isi yang tampil:**
- Tabel UKT/SPP per prodi
- Uang pangkal
- Biaya lain-lain

#### 4. Beasiswa
**Isi yang tampil:**
- Beasiswa KIP Kuliah
- Syarat & cara daftar
- Timeline beasiswa

---

## 📰 BERITA & MEDIA

### Sub-Menu:

#### 1. Berita
**Isi yang tampil:**
- Berita terbaru
- Kategori berita
- Detail artikel lengkap
- Artikel terkait

#### 2. Pengumuman
**Isi yang tampil:**
- Pengumuman penting
- Filter kategori
- Lampiran file download
- Status pengumuman (urgent/penting)

#### 3. Events
**Isi yang tampil:**
- Kalender event kampus
- List event
- Detail event:
  - Poster
  - Waktu & tempat
  - Pendaftaran event
  - Penyelenggara
  - Jenis kegiatan (seminar, workshop, perlombaan, dll)
  - Deskripsi singkat
  - Narasumber/pembicara
  - Kuota peserta
  - Biaya pendaftaran (jika ada)
  - Status kegiatan (akan datang, sedang berlangsung, selesai)

#### 4. Galeri
**Isi yang tampil:**
- Foto kegiatan
- Video kampus
- Dokumentasi event

---

## 👥 KEMAHASISWAAN

### Sub-Menu:

#### 1. Layanan Mahasiswa
**Isi yang tampil:**
- Layanan administrasi
- Bimbingan konseling
- Layanan karir

#### 2. UKM & Organisasi
**Isi yang tampil:**
- Daftar UKM
- Organisasi kemahasiswaan
- Kegiatan dan program

#### 3. Prestasi Mahasiswa
**Isi yang tampil:**
- Prestasi akademik
- Prestasi non-akademik
- Penghargaan mahasiswa

---

## 🤝 KERJA SAMA

### Sub-Menu:

#### 1. Partnership
**Isi yang tampil:**
- Daftar partner
- MOU/MOA
- Kerja sama industri
- Kerja sama institusi

---

## 📊 DASHBOARD (ADMIN)

**Fitur khusus admin:**
- Statistik kunjungan
- Manajemen konten
- Manajemen berita
- Manajemen pengguna
- Laporan aktivitas