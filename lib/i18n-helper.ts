// lib/i18n-helper.ts

// Data dummy pesan untuk penggantian useTranslations
const messages = {
  id: {
    HomePage: {
      title: "Beranda",
      heroTitle: "Pendidikan Berkualitas untuk Masa Depan Gemilang",
      heroSubtitle: "Universitas unggulan dengan pendidikan berkualitas, fasilitas modern, dan lingkungan akademik yang mendukung kemajuan serta inovasi.",
      ctaButton: "Mulai Perjalananmu",
      watchVideo: "Tonton Video",
      stats: {
        years: "Tahun Berdiri",
        students: "Mahasiswa",
        lecturers: "Dosen",
        programs: "Program Studi"
      },
      rectorMessage: "Kata Sambutan Rektor",
      rectorQuote: "\"Kami berkomitmen untuk menyediakan pendidikan berkualitas tinggi yang mendorong inovasi, kreativitas, dan pengembangan karakter. Dengan fasilitas modern dan dosen berpengalaman, kami siap membentuk generasi muda yang unggul dan berdaya saing global.\"",
      rectorName: "Prof. Dr. Muhammad Arifin, S.T., M.T.",
      rectorTitle: "Rektor Universitas",
      latestNews: "Berita Terbaru",
      viewAll: "Lihat Semua",
      upcomingEvents: "Event Mendatang",
      viewCalendar: "Lihat Kalender",
      testimonials: "Testimoni Mahasiswa & Alumni",
      partners: "Mitra Kami",
      readMore: "Baca selengkapnya"
    },
    Common: {
      home: "Beranda",
      profile: "Profil",
      academics: "Akademik",
      admission: "Penerimaan",
      newsMedia: "Berita & Media",
      studentAffairs: "Kemahasiswaan",
      partnership: "Kerjasama",
      about: "Tentang",
      contact: "Kontak",
      login: "Masuk",
      register: "Daftar",
      logout: "Keluar",
      theme: "Tema",
      language: "Bahasa",
      search: "Cari",
      back: "Kembali",
      next: "Selanjutnya",
      save: "Simpan",
      cancel: "Batal",
      yes: "Ya",
      no: "Tidak",
      close: "Tutup",
      open: "Buka",
      submit: "Kirim",
      reset: "Atur Ulang"
    },
    Navigation: {
      submenus: {
        home: "Beranda",
        profile: "Profil",
        accreditation: "Akreditasi",
        contact: "Kontak",
        studyPrograms: "Program Studi",
        faculties: "Fakultas",
        academicCalendar: "Kalender Akademik",
        admissionForm: "Pendaftaran PMB",
        classes: "Kelas",
        tuitionFees: "Biaya Pendidikan",
        scholarships: "Beasiswa",
        news: "Berita",
        announcements: "Pengumuman",
        events: "Agenda",
        gallery: "Galeri",
        studentServices: "Layanan Mahasiswa",
        studentOrganizations: "UKM & Organisasi",
        studentAchievements: "Prestasi Mahasiswa",
        partners: "Partnership"
      }
    }
  },
  en: {
    HomePage: {
      title: "Home",
      heroTitle: "Quality Education for a Brilliant Future",
      heroSubtitle: "A leading university with quality education, modern facilities, and an academic environment that supports progress and innovation.",
      ctaButton: "Start Your Journey",
      watchVideo: "Watch Video",
      stats: {
        years: "Years Established",
        students: "Students",
        lecturers: "Lecturers",
        programs: "Study Programs"
      },
      rectorMessage: "Rector's Message",
      rectorQuote: "\"We are committed to providing high-quality education that encourages innovation, creativity, and character development. With modern facilities and experienced lecturers, we are ready to shape young generations who are excellent and globally competitive.\"",
      rectorName: "Prof. Dr. Muhammad Arifin, S.T., M.T.",
      rectorTitle: "University Rector",
      latestNews: "Latest News",
      viewAll: "View All",
      upcomingEvents: "Upcoming Events",
      viewCalendar: "View Calendar",
      testimonials: "Student & Alumni Testimonials",
      partners: "Our Partners",
      readMore: "Read More"
    },
    Common: {
      home: "Home",
      profile: "Profile",
      academics: "Academics",
      admission: "Admission",
      newsMedia: "News & Media",
      studentAffairs: "Student Affairs",
      partnership: "Partnership",
      about: "About",
      contact: "Contact",
      login: "Login",
      register: "Register",
      logout: "Logout",
      theme: "Theme",
      language: "Language",
      search: "Search",
      back: "Back",
      next: "Next",
      save: "Save",
      cancel: "Cancel",
      yes: "Yes",
      no: "No",
      close: "Close",
      open: "Open",
      submit: "Submit",
      reset: "Reset"
    },
    Navigation: {
      submenus: {
        home: "Home",
        profile: "Profile",
        accreditation: "Accreditation",
        contact: "Contact",
        studyPrograms: "Study Programs",
        faculties: "Faculties",
        academicCalendar: "Academic Calendar",
        admissionForm: "Admission Form",
        classes: "Classes",
        tuitionFees: "Tuition Fees",
        scholarships: "Scholarships",
        news: "News",
        announcements: "Announcements",
        events: "Events",
        gallery: "Gallery",
        studentServices: "Student Services",
        studentOrganizations: "Student Organizations",
        studentAchievements: "Student Achievements",
        partners: "Partners"
      }
    }
  }
};

// Tipe untuk struktur pesan
type MessageValue = string | Record<string, unknown>;

// Fungsi helper untuk mendapatkan pesan berdasarkan locale
export function getTranslations(locale: string = 'id') {
  return (keyPath: string): string => {
    const keys = keyPath.split('.');
    let result: MessageValue = messages[locale as keyof typeof messages] || messages['id'];

    for (const key of keys) {
      if (result && typeof result === 'object') {
        result = result[key] as MessageValue;
      } else {
        result = keyPath; // Kembalikan key asli jika tidak ditemukan
        break;
      }
    }

    return typeof result === 'string' ? result : keyPath;
  };
}

// Hook sederhana untuk menggantikan useTranslations
export function useTranslations(namespace?: string) {
  // Dapatkan locale dari URL atau default ke 'id'
  const locale = typeof window !== 'undefined'
    ? window.location.pathname.split('/')[1] === 'en' ? 'en' : 'id'
    : 'id';

  const t = getTranslations(locale);

  // Jika namespace disediakan, kembalikan fungsi yang auto-prefix dengan namespace
  if (namespace) {
    return (key: string) => t(`${namespace}.${key}`);
  }

  return t;
}