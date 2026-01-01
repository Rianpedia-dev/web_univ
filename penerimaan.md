
---

## 🌐 **Struktur Menu Penerimaan – FINAL FIX (Frontend Publik)**

### **Menu Utama: `Penerimaan`**

*(Dropdown – hanya 4 submenu)*

1. **Pendaftaran PMB**
2. **jenis Kelas**
3. **Biaya Pendidikan**
4. **Beasiswa**

❌ Tidak ada menu **Jalur Masuk**
❌ Tidak ada menu **Gelombang**
✔️ Keduanya tampil **di halaman Pendaftaran PMB**

---

## 1️⃣ **Pendaftaran PMB** (Portal Informasi + Redirect)

📌 **Halaman pusat informasi penerimaan**

### A. Informasi Umum PMB

* Sambutan singkat PMB
* Tahun Akademik (misal: 2026/2027)
* Alur Pendaftaran (Step-by-step)
* Syarat umum pendaftaran
* Kontak & FAQ singkat

---

### B. Informasi Jalur Masuk

📍 *Hanya informasi, bukan form*

Contoh tampilan:

* **Jalur Reguler**
  Deskripsi singkat & syarat utama

* **Jalur Prestasi**
  Minimal nilai / piagam

* **Jalur RPL**
  Pengalaman kerja

> Jalur yang ditampilkan **hanya yang aktif** (dikontrol admin)

---

### C. Informasi Jenis Kelas

* Reguler Pagi
* Reguler Sore
* Kelas Karyawan
* Online / Hybrid

Ditampilkan sebagai **ringkasan** (detail lengkap ada di menu **Kelas**)

---

### D. Informasi Gelombang Pendaftaran

📅 **Otomatis berdasarkan tanggal sistem**

Contoh:

> **Gelombang 1**
> 1 Januari – 31 Maret 2026
> 🟢 *Sedang Dibuka*

> **Gelombang 2**
> 1 April – 30 Juni 2026
> ⚪ *Belum Dibuka*

---

### E. Tombol Aksi Utama

🔘 **`Daftar Sekarang`**

➡️ **Redirect ke Google Form**

* Link diatur oleh **Admin**
* Bisa berbeda per:

  * Tahun akademik
  * Gelombang
  * Jalur masuk (opsional)

Jika:

* ❌ Tidak ada gelombang aktif
  → Tombol nonaktif / muncul pesan *“Pendaftaran belum dibuka”*

---

## 2️⃣ **jenis Kelas**

📌 Penjelasan lengkap **jenis kelas perkuliahan**

### Isi Halaman:

Untuk setiap kelas:

* Nama Kelas
* Jadwal umum
* Target mahasiswa
* Metode (Offline / Online / Hybrid)
* Keterangan tambahan

---

### ⚙️ Admin (CRUD)

* Tambah jenis kelas
* Edit
* Nonaktifkan
* Hapus (jika aman)

---

## 3️⃣ **Biaya Pendidikan**

📌 Transparansi biaya (tanpa proses pendaftaran)

### Tabel Biaya (Dinamis)

| Program Studi | Jalur Masuk | Jenis Kelas | Uang Pangkal | UKT/Semester |
| ------------- | ----------- | ----------- | ------------ | ------------ |

### Fitur:

* Filter:

  * Program Studi
  * Jalur Masuk
  * Jenis Kelas
* Catatan biaya tambahan

> Biaya berbeda berdasarkan **Prodi × Jalur × Kelas**

---

## 4️⃣ **Beasiswa**

📌 Informasi bantuan biaya

### Isi:

* Nama beasiswa
* Jenis
* Manfaat
* Syarat
* Kuota
* Periode aktif

📎 Catatan:

> *Pendaftaran beasiswa dilakukan bersamaan dengan PMB melalui Google Form.*

---

## 🛠️ Struktur Admin (Ringkas & Realistis)

### **Penerimaan**

* Program Studi
* Jalur Masuk (CRUD)
* Jenis Kelas (CRUD)
* Gelombang Pendaftaran (CRUD)
* Biaya Pendidikan (Relasional)
* Beasiswa
* **Link Google Form PMB**

  * URL
  * Status aktif
  * Tahun akademik
  * Keterangan

---

