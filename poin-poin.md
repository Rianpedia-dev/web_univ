# Proposal Pengembangan Sistem Informasi Web App Universitas

## 1. Pendahuluan
Dokumen ini berisi rincian fitur, fungsi, dan keunggulan teknis dari sistem Web App Universitas yang dibangun menggunakan teknologi modern (Next.js 14, React, TypeScript) dibandingkan dengan website berbasis CMS (WordPress) standar. Sistem ini dirancang untuk tidak hanya menampilkan informasi, tetapi juga memberikan pengalaman interaktif dan manajemen data akademik yang terstruktur.

## 2. Struktur Menu & Fitur Utama
Sistem ini terdiri dari modul-modul terintegrasi sebagai berikut:

### 🏠 A. Halaman Utama (Beranda)
*   **Hero Section Interaktif**: Tampilan visual modern dengan latar video/gambar dinamis.
*   **Statistik Kampus Real-time**: Jumlah mahasiswa, dosen, dan akreditasi yang dapat diupdate dari dashboard.
*   **Sambutan Rektor**: Slot khusus untuk pesan pimpinan.
*   **Highlight Berita & Event**: Tampilan berita terkini dan agenda kegiatan kampus.
*   **AI Chatbot Assistant**: Asisten virtual "Robot" yang siap menjawab pertanyaan pengunjung 24/7.

### 🏢 B. Profil Universitas
*   **Tentang Kami**: Visi, Misi, Sejarah, dan Nilai-nilai kampus.
*   **Struktur Organisasi**: Bagan interaktif pimpinan dan pejabat kampus.
*   **Akreditasi**: Menampilkan status akreditasi institusi dan sertifikatnya.
*   **Fasilitas & Aksesibilitas**: Informasi gedung, laboratorium, perpustakaan, dan fasilitas ramah disabilitas.
*   **Penghargaan**: Showcase prestasi institusi.

### 🎓 C. Akademik
*   **Program Studi**: Katalog lengkap D3, S1, S2, S3 dengan detail kurikulum, profil lulusan, dan akreditasi per prodi.
*   **Fakultas**: Informasi masing-masing fakultas dan departemen di dalamnya.
*   **Kalender Akademik**: Jadwal kegiatan akademik tahunan yang terstruktur (KRS, Ujian, Wisuda).
*   **Direktori Dosen**: Profil pengajar lengkap dengan bidang keahlian (NIDN integrasi).

### 📝 D. Penerimaan Mahasiswa Baru (PMB)
*   **Info Pendaftaran**: Alur, syarat, dan jadwal pendaftaran.
*   **Jalur Masuk**: Penjelasan jalur Reguler, Prestasi, Beasiswa, dll.
*   **Biaya Pendidikan**: Transparansi rincian biaya kuliah per semester/prodi.
*   **Beasiswa**: Daftar beasiswa yang tersedia beserta kualifikasinya.
*   **Brosur Digital**: Download materi promosi terbaru.

### 📰 E. Berita & Media
*   **Portal Berita**: Manajemen artikel kegiatan kampus.
*   **Agenda/Event**: Kalender kegiatan mendatang.
*   **Galeri Foto/Video**: Dokumentasi kegiatan kampus.

### 🏆 F. Kemahasiswaan & Alumni
*   **Prestasi Mahasiswa**: Showcase juara lomba dan kompetisi.
*   **UKM & Organisasi**: Profil Unit Kegiatan Mahasiswa.
*   **Layanan Mahasiswa**: Info layanan administrasi, konseling, karier.
*   **Tracer Study/Alumni**: (Opsional) Testimoni dan profil alumni sukses.

### 🤝 G. Riset & Kerjasama
*   **Mitra Kerjasama**: Daftar partner industri dan universitas lain.
*   **Jurnal & Publikasi**: Link ke portal jurnal kampus.

---

## 3. Keunggulan Teknis & Solusi Masalah (Web App vs WordPress)

Berikut adalah analisis mengapa Web App ini menjadi solusi yang jauh lebih baik dibandingkan Website WordPress standar:

### 1. Struktur Data Akademik yang Kompleks
*   **Masalah di WordPress**: WordPress didesain untuk blog/artikel. Menampilkan data relasional seperti "Dosen A mengajar di Prodi B, Fakultas C" sangat sulit dan membutuhkan banyak plugin berat yang rentan error.
*   **Solusi Web App**: Menggunakan database relasional (PostgreSQL) yang didesain khusus. Relasi antar data (Fakultas -> Prodi -> Dosen) terjamin integritasnya. Update data di satu tempat otomatis tersinkronisasi di semua halaman.

### 2. Performa & Kecepatan (User Experience)
*   **Masalah di WordPress**: Cenderung lambat karena memuat banyak script plugin yang tidak perlu. Perpindahan halaman membutuhkan reload penuh (loading putih).
*   **Solusi Web App**: Dibangun dengan **Next.js**. Perpindahan halaman instan (SPA - Single Page Application) tanpa reload penuh. Terasa seperti menggunakan aplikasi mobile, meningkatkan citra "Kampus Teknologi Modern".

### 3. Keamanan Sistem
*   **Masalah di WordPress**: Target utama serangan hacker karena populasinya besar. Ketergantungan pada plugin pihak ketiga sering membuka celah keamanan.
*   **Solusi Web App**: Custom-built code. Tidak ada ketergantungan plugin bloatware. Keamanan endpoint API dan database dikontrol penuh oleh tim developernya.

### 4. Integrasi Layanan Cerdas (AI)
*   **Masalah di WordPress**: Chatbot biasanya hanya widget tempelan pihak ketiga yang kaku dan berbayar mahal per bulan.
*   **Solusi Web App**: **Native AI Chatbot** yang terintegrasi langsung dengan database kampus. Bot bisa menjawab "Siapa Dekan Fakultas Teknik?" atau "Berapa biaya masuk Prodi Hukum?" secara akurat karena membaca data internal secara real-time.

### 5. Skalabilitas Jangka Panjang
*   **Masalah di WordPress**: Semakin banyak konten, website semakin berat. Sulit dikembangkan menjadi Sistem Informasi Akademik (SIAKAD) penuh di masa depan.
*   **Solusi Web App**: Arsitektur modular. Website ini bisa dengan mudah dikembangkan (di-scale up) untuk menambahkan fitur Login Mahasiswa, KRS Online, atau Pembayaran SPP di platform yang sama tanpa harus merombak ulang dari nol.

### 6. Tampilan Premium (Aesthetics)
*   **Masalah di WordPress**: Terpaku pada template/tema yang pasaran. Sulit membuat animasi halus (micro-interactions) tanpa memberatkan loading.
*   **Solusi Web App**: Desain **Tailwind CSS** & **Framer Motion** yang custom. Bebas membuat animasi transisi halus, mode gelap/terang (Dark Mode) yang sempurna, dan layout yang 100% unik sesuai identitas kampus.
