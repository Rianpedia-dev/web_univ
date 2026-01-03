"use client"

import * as React from "react"
import { useState, useEffect, useCallback } from "react"
import {
  Database,
  Users,
  GraduationCap,
  Building2,
  Megaphone,
  Calendar,
  Image,
  Newspaper,
  Handshake,
  Building,
  UserCog,
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
  Search,
  ChevronDown,
  Check,
  X,
  Loader2,
  FileText,
  Award,
  BookOpen,
  ClipboardList,
  Send,
  Home,
  Settings
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"

// Table configurations with metadata
const tableConfigurations = {
  // Home Module
  home: {
    label: "Beranda",
    icon: Home,
    color: "text-rose-500",
    tables: {
      testimonials: {
        label: "Testimoni",
        description: "Kelola testimoni alumni dan mahasiswa di halaman beranda",
        fields: [
          { key: "name", label: "Nama", type: "text", required: true },
          { key: "role", label: "Peran/Jabatan", type: "text", required: true },
          { key: "content", label: "Isi Testimoni", type: "textarea", required: true },
          { key: "image", label: "Foto URL", type: "text" },
          { key: "rating", label: "Rating (1-5)", type: "number" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },
      rectorMessages: {
        label: "Sambutan Rektor",
        description: "Kelola kata sambutan rektor di halaman beranda",
        fields: [
          { key: "name", label: "Nama Rektor", type: "text", required: true },
          { key: "position", label: "Jabatan", type: "text", required: true },
          { key: "message", label: "Isi Sambutan", type: "textarea", required: true },
          { key: "photo", label: "Foto URL", type: "text" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },
      homepageStatistics: {
        label: "Statistik Beranda",
        description: "Kelola angka statistik utama di halaman beranda",
        fields: [
          { key: "establishedYear", label: "Tahun Berdiri (Teks)", type: "text", required: true },
          { key: "totalStudents", label: "Jumlah Mahasiswa (Teks)", type: "text", required: true },
          { key: "accreditation", label: "Akreditasi", type: "text", required: true },
          { key: "totalLecturers", label: "Jumlah Dosen (Teks)", type: "text", required: true },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },
      heroSections: {
        label: "Hero Beranda",
        description: "Kelola judul, teks, dan video di bagian atas halaman beranda",
        fields: [
          { key: "title", label: "Judul Utama", type: "text", required: true },
          { key: "subtitle", label: "Sub-judul", type: "textarea", required: true },
          { key: "videoUrl", label: "Video URL (Youtube/Embed)", type: "text" },
          { key: "imageUrl", label: "Background Image URL", type: "text" },
          { key: "buttonText", label: "Teks Tombol", type: "text" },
          { key: "buttonLink", label: "Link Tombol", type: "text" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },
    },
  },
  // Academic Module
  academic: {
    label: "Akademik",
    icon: GraduationCap,
    color: "text-blue-500",
    tables: {
      faculties: {
        label: "Fakultas",
        description: "Daftar fakultas di universitas",
        fields: [
          { key: "name", label: "Nama", type: "text", required: true },
          { key: "slug", label: "Slug", type: "text", required: true },
          { key: "description", label: "Deskripsi", type: "textarea" },
          { key: "dean", label: "Dekan", type: "text" },
          { key: "viceDean", label: "Wakil Dekan", type: "text" },
          { key: "contactEmail", label: "Email", type: "email" },
          { key: "contactPhone", label: "Telepon", type: "text" },
          { key: "address", label: "Alamat", type: "textarea" },
          { key: "accreditation", label: "Akreditasi", type: "select", options: ["A", "B", "C", "Unggul", "Baik"] },
          { key: "logo", label: "Logo Fakultas (URL)", type: "image" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },
      studyPrograms: {
        label: "Program Studi",
        description: "Daftar program studi",
        fields: [
          { key: "facultyId", label: "Fakultas", type: "select", referenceTable: "faculties", referenceLabel: "name", required: true },
          { key: "name", label: "Nama", type: "text", required: true },
          { key: "slug", label: "Slug", type: "text", required: true },
          { key: "description", label: "Deskripsi", type: "textarea" },
          { key: "level", label: "Jenjang", type: "select", options: ["D3", "S1", "S2", "S3"], required: true },
          { key: "accreditation", label: "Akreditasi", type: "select", options: ["A", "B", "C", "Unggul", "Baik"] },
          { key: "headOfProgram", label: "Ketua Program Studi", type: "text" },
          { key: "contactEmail", label: "Email Prodi", type: "text" },
          { key: "contactPhone", label: "Kontak/WhatsApp Prodi", type: "text" },
          { key: "logo", label: "Logo Prodi (URL)", type: "image" },
          { key: "totalStudents", label: "Jumlah Mahasiswa Aktif", type: "number" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },
      careerProspects: {
        label: "Prospek Karir",
        description: "Kelola data prospek karir lulusan di halaman program studi",
        fields: [
          { key: "field", label: "Bidang pekerjaan", type: "text", required: true },
          { key: "minSalary", label: "Gaji Minimal", type: "text", required: true },
          { key: "maxSalary", label: "Gaji Maksimal", type: "text", required: true },
          { key: "unit", label: "Satuan (misal: juta)", type: "text", required: true },
          { key: "order", label: "Urutan Tampilan", type: "number" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },

      academicCalendar: {
        label: "Kalender Akademik",
        description: "Jadwal kegiatan akademik",
        fields: [
          { key: "title", label: "Judul", type: "text", required: true },
          { key: "description", label: "Deskripsi", type: "textarea" },
          { key: "startDate", label: "Tanggal Mulai", type: "datetime", required: true },
          { key: "endDate", label: "Tanggal Selesai", type: "datetime", required: true },

          { key: "academicYear", label: "Tahun Akademik", type: "text", required: true },
          { key: "semester", label: "Semester", type: "select", options: ["Ganjil", "Genap"], required: true },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },
      campusFacilities: {
        label: "Fasilitas Kampus",
        description: "Daftar fasilitas kampus",
        fields: [
          { key: "name", label: "Nama", type: "text", required: true },
          { key: "slug", label: "Slug", type: "text", required: true },
          { key: "description", label: "Deskripsi", type: "textarea" },
          { key: "type", label: "Tipe", type: "select", options: ["laboratory", "library", "classroom", "sports", "dormitory", "health", "other"], required: true },
          { key: "location", label: "Lokasi", type: "text" },
          { key: "capacity", label: "Kapasitas", type: "number" },
          { key: "operatingHours", label: "Jam Operasional", type: "text" },
          { key: "image", label: "Gambar URL", type: "text" },
          { key: "isAvailable", label: "Tersedia", type: "boolean" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },

    },
  },

  // Admissions Module
  admissions: {
    label: "Penerimaan Mahasiswa",
    icon: ClipboardList,
    color: "text-green-500",
    tables: {
      admissionPathways: {
        label: "Jalur Masuk",
        description: "Jalur pendaftaran mahasiswa baru",
        fields: [
          { key: "name", label: "Nama", type: "text", required: true },
          { key: "description", label: "Deskripsi", type: "textarea" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },
      admissionClasses: {
        label: "Kelas Perkuliahan",
        description: "Jenis kelas perkuliahan",
        fields: [
          { key: "name", label: "Nama", type: "text", required: true },
          { key: "slug", label: "Slug", type: "text", required: true },
          { key: "description", label: "Deskripsi", type: "textarea" },
          { key: "type", label: "Tipe", type: "select", options: ["reguler", "executive", "online", "part_time", "full_time"], required: true },
          { key: "schedule", label: "Jadwal", type: "text" },
          { key: "requirements", label: "Persyaratan", type: "textarea" },
          { key: "quota", label: "Kuota", type: "number" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },
      educationCosts: {
        label: "Biaya Pendidikan",
        description: "Daftar biaya pendidikan",
        fields: [
          { key: "studyProgramId", label: "Program Studi", type: "select", referenceTable: "studyPrograms", referenceLabel: "name" },
          { key: "classId", label: "Kelas", type: "select", referenceTable: "admissionClasses", referenceLabel: "name" },
          { key: "pathwayId", label: "Jalur Masuk", type: "select", referenceTable: "admissionPathways", referenceLabel: "name" },
          { key: "costType", label: "Jenis Biaya", type: "select", options: ["registration", "tuition", "other"], required: true },
          { key: "year", label: "Tahun", type: "text", required: true },
          { key: "semester", label: "Semester", type: "select", options: ["Ganjil", "Genap"] },
          { key: "amount", label: "Jumlah", type: "number", required: true },
          { key: "description", label: "Deskripsi", type: "textarea" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },
      scholarships: {
        label: "Beasiswa",
        description: "Daftar beasiswa",
        fields: [
          { key: "name", label: "Nama", type: "text", required: true },
          { key: "slug", label: "Slug", type: "text", required: true },
          { key: "description", label: "Deskripsi", type: "textarea" },
          { key: "eligibility", label: "Kriteria", type: "textarea" },
          { key: "benefits", label: "Manfaat", type: "textarea" },
          { key: "requirements", label: "Persyaratan", type: "textarea" },
          { key: "applicationStart", label: "Mulai Pendaftaran", type: "datetime", required: true },
          { key: "applicationEnd", label: "Akhir Pendaftaran", type: "datetime", required: true },
          { key: "quota", label: "Kuota", type: "number" },
          { key: "amount", label: "Jumlah Bantuan", type: "number" },
          { key: "coverage", label: "Cakupan", type: "select", options: ["full", "partial", "specific"] },
          { key: "provider", label: "Penyedia", type: "text" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },
      admissionWaves: {
        label: "Gelombang Pendaftaran",
        description: "Periode waktu penerimaan mahasiswa baru",
        fields: [
          { key: "name", label: "Nama Gelombang", type: "text", required: true },
          { key: "startDate", label: "Tanggal Mulai", type: "datetime", required: true },
          { key: "endDate", label: "Tanggal Berakhir", type: "datetime", required: true },
          { key: "notes", label: "Catatan Khusus", type: "textarea" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },
      admissionRequirements: {
        label: "Syarat Pendaftaran",
        description: "Kelola syarat umum pendaftaran",
        fields: [
          { key: "content", label: "Syarat", type: "text", required: true },
          { key: "order", label: "Urutan", type: "number" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },
      admissionFaqs: {
        label: "FAQ Pendaftaran",
        description: "Kelola pertanyaan umum pendaftaran",
        fields: [
          { key: "question", label: "Pertanyaan", type: "text", required: true },
          { key: "answer", label: "Jawaban", type: "textarea", required: true },
          { key: "order", label: "Urutan", type: "number" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },
      admissionTimelines: {
        label: "Alur Pendaftaran",
        description: "Kelola tahapan alur pendaftaran",
        fields: [
          { key: "event", label: "Kegiatan", type: "text", required: true },
          { key: "statusLabel", label: "Status (Teks)", type: "text", required: true },
          { key: "iconName", label: "Nama Icon Lucide", type: "text" },
          { key: "order", label: "Urutan", type: "number" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },

    },
  },

  // News & Media Module
  newsMedia: {
    label: "Berita & Media",
    icon: Newspaper,
    color: "text-purple-500",
    tables: {
      newsCategories: {
        label: "Kategori Berita",
        description: "Kategori untuk berita",
        fields: [
          { key: "name", label: "Nama", type: "text", required: true },
          { key: "slug", label: "Slug", type: "text", required: true },
          { key: "description", label: "Deskripsi", type: "textarea" },
        ],
      },
      news: {
        label: "Berita",
        description: "Artikel berita",
        fields: [
          { key: "categoryId", label: "Kategori", type: "select", referenceTable: "newsCategories", referenceLabel: "name", required: true },
          { key: "title", label: "Judul", type: "text", required: true },
          { key: "slug", label: "Slug", type: "text", required: true },
          { key: "content", label: "Konten", type: "textarea", required: true },
          { key: "excerpt", label: "Ringkasan", type: "textarea" },
          { key: "featuredImage", label: "Gambar Utama", type: "text" },
          { key: "viewCount", label: "Jumlah Dilihat", type: "number" },
          { key: "authorName", label: "Nama Penulis", type: "text" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
          { key: "publishedAt", label: "Tanggal Publikasi", type: "datetime" },
        ],
      },
    },
  },

  // Events Module
  events: {
    label: "Event & Kegiatan",
    icon: Calendar,
    color: "text-cyan-500",
    tables: {
      eventCategories: {
        label: "Kategori Event",
        description: "Kategori untuk event",
        fields: [
          { key: "name", label: "Nama", type: "text", required: true },
          { key: "slug", label: "Slug", type: "text", required: true },
          { key: "description", label: "Deskripsi", type: "textarea" },
        ],
      },
      events: {
        label: "Event",
        description: "Daftar event dan kegiatan",
        fields: [
          { key: "categoryId", label: "Kategori", type: "select", referenceTable: "eventCategories", referenceLabel: "name", required: true },
          { key: "title", label: "Judul", type: "text", required: true },
          { key: "description", label: "Deskripsi", type: "text", required: true },
          { key: "content", label: "Konten", type: "textarea" },
          { key: "poster", label: "Poster URL", type: "text" },
          { key: "startDate", label: "Tanggal Mulai", type: "datetime", required: true },
          { key: "endDate", label: "Tanggal Selesai", type: "datetime" },
          { key: "location", label: "Lokasi", type: "text", required: true },
          { key: "organizer", label: "Penyelenggara", type: "text", required: true },
          { key: "targetAudience", label: "Target Peserta", type: "text" },
          { key: "maxParticipants", label: "Jumlah Maksimal Peserta", type: "number" },
          { key: "registrationUrl", label: "Link Pendaftaran", type: "text" },
          { key: "registrationFee", label: "Biaya Registrasi", type: "text" },
          { key: "status", label: "Status", type: "select", options: ["upcoming", "ongoing", "completed", "cancelled"] },
          { key: "isFeatured", label: "Unggulan", type: "boolean" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },

    },
  },

  // Gallery Module
  galleries: {
    label: "Galeri",
    icon: Image,
    color: "text-pink-500",
    tables: {
      galleryCategories: {
        label: "Kategori Galeri",
        description: "Kategori untuk galeri",
        fields: [
          { key: "name", label: "Nama", type: "text", required: true },
          { key: "slug", label: "Slug", type: "text", required: true },
          { key: "description", label: "Deskripsi", type: "textarea" },
        ],
      },
      galleryMedia: {
        label: "Media Galeri",
        description: "Foto dan video dalam galeri",
        fields: [
          { key: "categoryId", label: "Kategori", type: "select", referenceTable: "galleryCategories", referenceLabel: "name" },
          { key: "title", label: "Judul", type: "text", required: true },
          { key: "description", label: "Deskripsi", type: "textarea" },
          { key: "filePath", label: "Url Image/vidio", type: "text", required: true },
          { key: "mediaType", label: "Tipe Media", type: "select", options: ["image", "video"], required: true },
          { key: "isPublic", label: "Publik", type: "boolean" },
          { key: "isFeatured", label: "Unggulan", type: "boolean" },
        ],
      },
    },
  },

  // Partnerships Module
  partnerships: {
    label: "Kerjasama",
    icon: Handshake,
    color: "text-teal-500",
    tables: {
      partners: {
        label: "Mitra",
        description: "Daftar mitra kerjasama",
        fields: [
          { key: "name", label: "Nama Mitra", type: "text", required: true },
          { key: "slug", label: "Slug", type: "text", required: true },
          { key: "description", label: "Deskripsi", type: "textarea" },
          { key: "type", label: "Jenis Mitra", type: "select", options: ["domestic", "international"], required: true },
          { key: "category", label: "Kategori", type: "select", options: ["technology", "business", "health", "education", "industry", "government", "other"], required: true },
          { key: "country", label: "Negara", type: "text" },
          { key: "city", label: "Kota", type: "text" },
          { key: "contactPerson", label: "Kontak Person", type: "text" },
          { key: "contactEmail", label: "Email", type: "email" },
          { key: "website", label: "Website", type: "text" },
          { key: "logo", label: "Logo URL", type: "text" },

          { key: "agreementNumber", label: "Nomor MOU/MOA", type: "text" },
          { key: "agreementFile", label: "File MOU (URL)", type: "text" },
          { key: "startDate", label: "Tanggal Mulai", type: "datetime" },
          { key: "endDate", label: "Tanggal Selesai", type: "datetime" },
          { key: "isActive", label: "Aktif", type: "boolean" },
          { key: "objectives", label: "Tujuan", type: "textarea" },
          { key: "coordinator", label: "Koordinator", type: "text" },

          { key: "partnershipStatus", label: "Status", type: "select", options: ["active", "inactive", "expired", "pending"] },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },
      partnershipDocuments: {
        label: "Dokumen Kerjasama",
        description: "Dokumen-dokumen kerjasama",
        fields: [
          { key: "partnerId", label: "Mitra", type: "select", referenceTable: "partners", referenceLabel: "name", required: true },
          { key: "title", label: "Judul", type: "text", required: true },
          { key: "documentType", label: "Jenis Dokumen", type: "select", options: ["agreement", "report", "certificate", "proposal", "other"], required: true },
          { key: "fileName", label: "Nama File", type: "text", required: true },
          { key: "filePath", label: "Path File", type: "text", required: true },
          { key: "mimeType", label: "Tipe MIME", type: "text" },
        ],
      },
      journals: {
        label: "Jurnal Ilmiah",
        description: "Kelola publikasi jurnal ilmiah dan riset",
        fields: [
          { key: "title", label: "Judul Artikel", type: "text", required: true },
          { key: "authors", label: "Penulis", type: "text", required: true },
          { key: "journalName", label: "Nama Jurnal", type: "text", required: true },
          { key: "journalAbbr", label: "Singkatan Jurnal", type: "text" },
          { key: "year", label: "Tahun", type: "text", required: true },
          { key: "volume", label: "Volume", type: "text" },
          { key: "number", label: "Nomor", type: "text" },
          { key: "keywords", label: "Kata Kunci (Koma-terpisah)", type: "text" },
          { key: "imageUrl", label: "URL Gambar", type: "text" },
          { key: "link", label: "Link Jurnal (URL)", type: "text" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },
    },
  },

  // University Profile Module
  profiles: {
    label: "Profil Universitas",
    icon: Building,
    color: "text-indigo-500",
    tables: {
      universityProfiles: {
        label: "Profil Universitas",
        description: "Informasi utama profil universitas",
        fields: [
          { key: "name", label: "Nama", type: "text", required: true },
          { key: "slug", label: "Slug", type: "text", required: true },
          { key: "shortName", label: "Nama Singkat", type: "text" },
          { key: "vision", label: "Visi", type: "textarea" },
          { key: "mission", label: "Misi", type: "textarea" },
          { key: "values", label: "Nilai", type: "textarea" },
          { key: "history", label: "Sejarah", type: "textarea" },
          { key: "logo", label: "Logo URL", type: "image" },
          { key: "establishedYear", label: "Tahun Berdiri", type: "number" },
          { key: "motto", label: "Moto", type: "text" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },
      universityLogoMeanings: {
        label: "Makna Logo",
        description: "Elemen dan makna logo universitas",
        fields: [
          { key: "element", label: "Elemen Logo", type: "text", required: true },
          { key: "meaning", label: "Makna", type: "textarea", required: true },
          { key: "image", label: "Gambar Elemen (URL)", type: "image" },
          { key: "order", label: "Urutan", type: "number" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },
      campusStatistics: {
        label: "Statistik Kampus",
        description: "Data statistik kampus",
        fields: [
          { key: "year", label: "Tahun", type: "number", required: true },
          { key: "totalStudents", label: "Total Mahasiswa", type: "number" },
          { key: "totalStudyPrograms", label: "Total Program Studi", type: "number" },
          { key: "accreditation", label: "Akreditasi", type: "text" },
          { key: "internationalPartners", label: "Mitra Industri/Internasional", type: "number" },
          { key: "totalUndergraduate", label: "Mahasiswa S1", type: "number" },
          { key: "totalGraduate", label: "Mahasiswa Pascasarjana", type: "number" },
          { key: "totalEmployees", label: "Total Pegawai", type: "number" },
          { key: "totalFaculties", label: "Total Fakultas", type: "number" },
          { key: "totalFacilities", label: "Total Fasilitas", type: "number" },
          { key: "researchProjects", label: "Proyek Riset", type: "number" },
          { key: "patents", label: "Jumlah Paten", type: "number" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },
      universityAccreditations: {
        label: "Akreditasi Universitas",
        description: "Data akreditasi universitas",
        fields: [
          { key: "name", label: "Nama Institusi", type: "text", required: true },
          { key: "accreditationNumber", label: "Nomor Akreditasi", type: "text" },
          { key: "accreditationLevel", label: "Tingkat", type: "select", options: ["A", "B", "C", "Unggul", "Baik", "Baik Sekali"], required: true },
          { key: "accreditationDate", label: "Tanggal Akreditasi", type: "datetime" },
          { key: "accreditationExpired", label: "Tanggal Kadaluarsa", type: "datetime" },
          { key: "documentFile", label: "File Dokumen", type: "text" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },
      contactInformation: {
        label: "Informasi Kontak",
        description: "Informasi kontak kampus",
        fields: [
          { key: "type", label: "Tipe", type: "select", options: ["main_campus", "branch_campus", "administrative_office", "other"], required: true },
          { key: "name", label: "Nama", type: "text" },
          { key: "address", label: "Alamat", type: "textarea", required: true },
          { key: "city", label: "Kota", type: "text", required: true },
          { key: "province", label: "Provinsi", type: "text", required: true },
          { key: "postalCode", label: "Kode Pos", type: "text" },
          { key: "phone", label: "Telepon", type: "text" },
          { key: "email", label: "Email", type: "email" },
          { key: "website", label: "Website", type: "text" },
          { key: "mapUrl", label: "URL Peta", type: "text" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },
      organizationalStructures: {
        label: "Struktur Organisasi",
        description: "Struktur organisasi universitas",
        fields: [
          { key: "title", label: "Judul", type: "text", required: true },
          { key: "slug", label: "Slug", type: "text", required: true },
          { key: "description", label: "Deskripsi", type: "textarea" },
          { key: "structureFile", label: "File Struktur", type: "text" },
          { key: "effectiveDate", label: "Tanggal Berlaku", type: "datetime" },
          { key: "isCurrent", label: "Struktur Saat Ini", type: "boolean" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },


      organizationalEmployees: {
        label: "Pegawai & Struktur Organisasi",
        description: "Daftar pegawai dan jabatan dalam struktur organisasi",
        fields: [
          { key: "structureId", label: "Struktur Organisasi", type: "select", referenceTable: "organizationalStructures", referenceLabel: "title", required: true },
          { key: "parentId", label: "Atasan", type: "select", referenceTable: "organizationalEmployees", referenceLabel: "name" },
          { key: "name", label: "Nama Pegawai", type: "text", required: true },
          { key: "nip", label: "NIP", type: "text" },
          { key: "nidn", label: "NIDN", type: "text" },
          { key: "positionName", label: "Nama Jabatan", type: "text", required: true },
          { key: "positionLevel", label: "Tingkat jabatan", type: "number", required: true },
          { key: "positionOrder", label: "Urutan", type: "number" },
          { key: "period", label: "Masa Jabatan", type: "text" },
          { key: "photo", label: "Foto URL", type: "text" },
          { key: "description", label: "Deskripsi", type: "textarea" },
          { key: "responsibilities", label: "Tanggung Jawab", type: "textarea" },
          { key: "authority", label: "Wewenang", type: "textarea" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },
      universityAwards: {
        label: "Penghargaan Universitas",
        description: "Kelola data penghargaan dan rekognisi universitas",
        fields: [
          { key: "year", label: "Tahun", type: "text", required: true },
          { key: "title", label: "Nama Penghargaan", type: "text", required: true },
          { key: "provider", label: "Lembaga Pemberi", type: "text", required: true },
          { key: "level", label: "Tingkat (Nasional/Inter)", type: "text", required: true },
          { key: "order", label: "Urutan Tampilan", type: "number" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },
      campusAccessibilities: {
        label: "Aksesibilitas Kampus",
        description: "Sarana transportasi menuju kampus",
        fields: [
          { key: "name", label: "Nama Transportasi", type: "text", required: true },
          { key: "icon", label: "Ikon Lucide (misal: Bus, Train)", type: "text", required: true },
          { key: "description", label: "Deskripsi", type: "textarea", required: true },
          { key: "order", label: "Urutan", type: "number" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },
      socialMediaLinks: {
        label: "Media Sosial",
        description: "Tautan media sosial universitas",
        fields: [
          { key: "platform", label: "Platform", type: "text", required: true },
          { key: "icon", label: "Ikon Lucide (misal: Instagram, Facebook)", type: "text", required: true },
          { key: "url", label: "URL", type: "text", required: true },
          { key: "username", label: "Username", type: "text" },
          { key: "order", label: "Urutan", type: "number" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },
    },
  },

  // Student Services Module
  studentServices: {
    label: "Layanan Mahasiswa",
    icon: UserCog,
    color: "text-amber-500",
    tables: {
      studentServices: {
        label: "Layanan Mahasiswa",
        description: "Daftar layanan untuk mahasiswa",
        fields: [
          { key: "name", label: "Nama", type: "text", required: true },
          { key: "slug", label: "Slug", type: "text", required: true },
          { key: "description", label: "Deskripsi", type: "textarea" },
          { key: "type", label: "Tipe", type: "select", options: ["administrative", "counseling", "career", "digital", "satisfaction"], required: true },
          { key: "requirements", label: "Persyaratan", type: "textarea" },
          { key: "procedure", label: "Prosedur", type: "textarea" },
          { key: "processingTime", label: "Waktu Proses", type: "text" },
          { key: "fee", label: "Biaya", type: "number" },
          { key: "isOnline", label: "Online", type: "boolean" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
          { key: "contactName", label: "Kontak Person", type: "text" },
          { key: "contactEmail", label: "Email Kontak", type: "email" },
        ],
      },
      studentOrganizations: {
        label: "Organisasi Mahasiswa",
        description: "Daftar organisasi mahasiswa",
        fields: [
          { key: "name", label: "Nama", type: "text", required: true },
          { key: "description", label: "Deskripsi", type: "textarea" },
          { key: "objectives", label: "Tujuan Organisasi", type: "textarea" },
          { key: "leader", label: "Ketua Organisasi", type: "text" },
          { key: "memberCount", label: "Jumlah Anggota", type: "text" },
          { key: "contactEmail", label: "Email Kontak", type: "email" },
          { key: "contactPhone", label: "WhatsApp/Telepon", type: "text" },
          { key: "registrationLink", label: "Link Bergabung", type: "text" },
          { key: "isRegistrationOpen", label: "Status Pendaftaran Terbuka", type: "boolean" },
          { key: "logo", label: "Logo URL", type: "image" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },
      studentAchievements: {
        label: "Prestasi Mahasiswa",
        description: "Prestasi mahasiswa",
        fields: [
          { key: "studentName", label: "Nama Mahasiswa", type: "text", required: true },
          { key: "studentId", label: "NIM", type: "text", required: true },
          { key: "studyProgramId", label: "Program Studi", type: "select", referenceTable: "studyPrograms", referenceLabel: "name", required: true },
          { key: "title", label: "Judul Prestasi", type: "text", required: true },
          { key: "description", label: "Deskripsi", type: "textarea" },
          { key: "achievementType", label: "Jenis", type: "select", options: ["non_academic", "competition", "community_service", "other"], required: true },
          { key: "image", label: "Foto Prestasi (URL)", type: "text" },
          { key: "achievementLevel", label: "Tingkat", type: "select", options: ["local", "regional", "national", "international"], required: true },
          { key: "achievementCategory", label: "Kategori", type: "select", options: ["first", "second", "third", "champion", "participation", "other"], required: true },
          { key: "eventName", label: "Nama Kegiatan", type: "text", required: true },
          { key: "eventDate", label: "Tanggal Kegiatan", type: "datetime", required: true },
          { key: "organizer", label: "Penyelenggara", type: "text", required: true },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },
      studentServiceContacts: {
        label: "Kontak Layanan",
        description: "Kelola kontak layanan mahasiswa (Telepon, Email, Lokasi)",
        fields: [
          { key: "type", label: "Tipe", type: "select", options: ["phone", "email", "location"], required: true },
          { key: "icon", label: "Ikon Lucide (misal: Phone, Mail, MapPin)", type: "text", required: true },
          { key: "title", label: "Judul", type: "text", required: true },
          { key: "value", label: "Nilai Utama", type: "text", required: true },
          { key: "description", label: "Keterangan Tambahan", type: "text" },
          { key: "order", label: "Urutan", type: "number" },
          { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
        ],
      },
    },
  },
};

type FieldConfig = {
  key: string
  label: string
  type: "text" | "textarea" | "number" | "email" | "datetime" | "boolean" | "select"
  required?: boolean
  options?: string[]
  referenceTable?: string
  referenceLabel?: string
}

type TableConfig = {
  label: string
  description: string
  fields: FieldConfig[]
}

type ModuleConfig = {
  label: string
  icon: any
  color: string
  tables: Record<string, TableConfig>
}

// Dynamic Form Component
function DynamicForm({
  fields,
  data,
  onChange,
}: {
  fields: FieldConfig[]
  data: Record<string, any>
  onChange: (key: string, value: any) => void
}) {
  const [refOptions, setRefOptions] = useState<Record<string, { value: string, label: string }[]>>({})
  const [loadingRefs, setLoadingRefs] = useState<Record<string, boolean>>({})

  useEffect(() => {
    fields.forEach(async (field) => {
      if (field.referenceTable && !refOptions[field.key] && !loadingRefs[field.key]) {
        setLoadingRefs(prev => ({ ...prev, [field.key]: true }))
        try {
          const response = await fetch(`/api/admin/${field.referenceTable}`)
          const result = await response.json()
          if (result.data) {
            const options = result.data.map((item: any) => ({
              value: item.id,
              label: item[field.referenceLabel || 'name'] || item.title || item.name || item.id
            }))
            setRefOptions(prev => ({ ...prev, [field.key]: options }))
          }
        } catch (error) {
          console.error(`Error fetching refs for ${field.key}:`, error)
        } finally {
          setLoadingRefs(prev => ({ ...prev, [field.key]: false }))
        }
      }
    })
  }, [fields, refOptions, loadingRefs])

  return (
    <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
      {fields.map((field) => (
        <div key={field.key} className="grid gap-2">
          <Label htmlFor={field.key} className="flex items-center gap-1">
            {field.label}
            {field.required && <span className="text-red-500">*</span>}
          </Label>

          {field.type === "text" || field.type === "email" ? (
            <Input
              id={field.key}
              type={field.type}
              value={data[field.key] || ""}
              onChange={(e) => onChange(field.key, e.target.value)}
              placeholder={`Masukkan ${field.label.toLowerCase()}`}
            />
          ) : field.type === "textarea" ? (
            <Textarea
              id={field.key}
              value={data[field.key] || ""}
              onChange={(e) => onChange(field.key, e.target.value)}
              placeholder={`Masukkan ${field.label.toLowerCase()}`}
              rows={3}
            />
          ) : field.type === "number" ? (
            <Input
              id={field.key}
              type="number"
              value={data[field.key] || ""}
              onChange={(e) => onChange(field.key, e.target.value ? Number(e.target.value) : "")}
              placeholder={`Masukkan ${field.label.toLowerCase()}`}
            />
          ) : field.type === "datetime" ? (
            <Input
              id={field.key}
              type="datetime-local"
              value={data[field.key] ? new Date(data[field.key]).toISOString().slice(0, 16) : ""}
              onChange={(e) => onChange(field.key, e.target.value ? new Date(e.target.value).toISOString() : "")}
            />
          ) : field.type === "boolean" ? (
            <div className="flex items-center space-x-2">
              <Switch
                id={field.key}
                checked={data[field.key] || false}
                onCheckedChange={(checked) => onChange(field.key, checked)}
              />
              <Label htmlFor={field.key} className="text-sm text-muted-foreground">
                {data[field.key] ? "Ya" : "Tidak"}
              </Label>
            </div>
          ) : field.type === "select" ? (
            <Select
              value={data[field.key] || ""}
              onValueChange={(value) => onChange(field.key, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={loadingRefs[field.key] ? "Loading..." : `Pilih ${field.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options ? (
                  field.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))
                ) : refOptions[field.key] ? (
                  refOptions[field.key].map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))
                ) : null}
              </SelectContent>
            </Select>
          ) : field.type === "image" ? (
            <div className="space-y-3">
              <Input
                id={field.key}
                type="text"
                value={data[field.key] || ""}
                onChange={(e) => onChange(field.key, e.target.value)}
                placeholder={`Masukkan URL gambar untuk ${field.label.toLowerCase()}`}
              />
              {data[field.key] && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center group">
                  <img
                    src={data[field.key]}
                    alt="Preview"
                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Gambar+Tidak+Ditemukan'
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    Preview
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}

// Table Data Component
function DataTableView({
  tableName,
  tableConfig,
  onRefresh,
}: {
  tableName: string
  tableConfig: TableConfig
  onRefresh: () => void
}) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [saving, setSaving] = useState(false)
  const [refData, setRefData] = useState<Record<string, Record<string, string>>>({})

  // Fetch reference data for labels
  useEffect(() => {
    tableConfig.fields.forEach(async (field) => {
      if (field.referenceTable && !refData[field.key]) {
        try {
          const response = await fetch(`/api/admin/${field.referenceTable}`)
          const result = await response.json()
          if (result.data) {
            const mapping: Record<string, string> = {}
            result.data.forEach((item: any) => {
              mapping[item.id] = item[field.referenceLabel || 'name'] || item.title || item.name || item.id
            })
            setRefData(prev => ({ ...prev, [field.key]: mapping }))
          }
        } catch (error) {
          console.error(`Error fetching refs for ${field.key}:`, error)
        }
      }
    })
  }, [tableConfig.fields, refData])

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/${tableName}`)
      const result = await response.json()
      if (result.data) {
        setData(result.data)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      toast.error("Gagal memuat data")
    } finally {
      setLoading(false)
    }
  }, [tableName])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleCreate = async () => {
    setSaving(true)
    try {
      const response = await fetch(`/api/admin/${tableName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success("Data berhasil ditambahkan")
        setIsCreateOpen(false)
        setFormData({})
        fetchData()
      } else {
        const error = await response.json()
        toast.error(`${error.error}${error.details ? ": " + error.details : ""}` || "Gagal menambahkan data")
      }
    } catch (error) {
      toast.error("Gagal menambahkan data")
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = async () => {
    setSaving(true)
    try {
      const response = await fetch(`/api/admin/${tableName}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, id: selectedItem.id }),
      })

      if (response.ok) {
        toast.success("Data berhasil diperbarui")
        setIsEditOpen(false)
        setSelectedItem(null)
        setFormData({})
        fetchData()
      } else {
        const error = await response.json()
        toast.error(`${error.error}${error.details ? ": " + error.details : ""}` || "Gagal memperbarui data")
      }
    } catch (error) {
      toast.error("Gagal memperbarui data")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/${tableName}?id=${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Data berhasil dihapus")
        fetchData()
      } else {
        const error = await response.json()
        toast.error(`${error.error}${error.details ? ": " + error.details : ""}` || "Gagal menghapus data")
      }
    } catch (error) {
      toast.error("Gagal menghapus data")
    }
  }

  const openEditDialog = (item: any) => {
    setSelectedItem(item)
    setFormData({ ...item })
    setIsEditOpen(true)
  }

  const handleFormChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  // Filter data based on search
  const filteredData = data.filter((item) => {
    if (!searchTerm) return true
    const searchLower = searchTerm.toLowerCase()

    // Check raw values
    const hasMatchInValues = Object.entries(item).some(([key, value]) => {
      // If it's a reference field, also check the label in refData
      const fieldConfig = tableConfig.fields.find(f => f.key === key)
      if (fieldConfig?.referenceTable) {
        const label = refData[key]?.[String(value)]
        if (label?.toLowerCase().includes(searchLower)) return true
      }
      return String(value).toLowerCase().includes(searchLower)
    })

    return hasMatchInValues
  })

  // Get display columns: Filter out long/technical fields for a cleaner table view
  const displayFields = tableConfig.fields
    .filter(f => !["content", "slug", "description", "requirements", "procedure", "vision", "mission", "history"].includes(f.key))
    .filter(f => f.type !== "textarea")
    .slice(0, 6)

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari data..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full sm:w-64"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button size="sm" onClick={() => setFormData({})}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Data
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Tambah {tableConfig.label}</DialogTitle>
                <DialogDescription>
                  Isi form di bawah untuk menambahkan data baru
                </DialogDescription>
              </DialogHeader>
              <DynamicForm
                fields={tableConfig.fields}
                data={formData}
                onChange={handleFormChange}
              />
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Batal
                </Button>
                <Button onClick={handleCreate} disabled={saving}>
                  {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Simpan
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>Total: {data.length} data</span>
        {searchTerm && <span>Ditemukan: {filteredData.length} data</span>}
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <ScrollArea className="w-full">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-12">#</TableHead>
                {displayFields.map((field) => (
                  <TableHead key={field.key}>{field.label}</TableHead>
                ))}
                <TableHead className="w-32 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={displayFields.length + 2}
                    className="text-center py-8 text-muted-foreground"
                  >
                    {searchTerm ? "Tidak ada data yang cocok" : "Belum ada data"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    {displayFields.map((field) => (
                      <TableCell key={field.key}>
                        {field.type === "boolean" ? (
                          <Badge variant={item[field.key] ? "default" : "secondary"}>
                            {item[field.key] ? "Ya" : "Tidak"}
                          </Badge>
                        ) : field.type === "datetime" && item[field.key] ? (
                          <div className="text-[10px] text-muted-foreground">
                            {new Date(item[field.key]).toLocaleDateString("id-ID", { day: '2-digit', month: 'short', year: 'numeric' })}
                          </div>
                        ) : (field.key === "amount" || field.key.toLowerCase().includes("fee") || field.key.toLowerCase().includes("salary")) ? (
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            {new Intl.NumberFormat('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                              maximumFractionDigits: 0
                            }).format(Number(item[field.key] || 0))}
                          </span>
                        ) : field.referenceTable ? (
                          <span className="max-w-[150px] truncate block text-xs font-medium text-cyber-blue">
                            {refData[field.key]?.[item[field.key]] || (item[field.key] ? String(item[field.key]).slice(0, 8) + '...' : "-")}
                          </span>
                        ) : (
                          <span className="max-w-[150px] truncate block text-xs">
                            {String(item[field.key] || "-")}
                          </span>
                        )}
                      </TableCell>
                    ))}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(item)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus Data?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tindakan ini tidak dapat dibatalkan. Data akan dihapus secara permanen.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(item.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit {tableConfig.label}</DialogTitle>
            <DialogDescription>
              Perbarui data yang dipilih
            </DialogDescription>
          </DialogHeader>
          <DynamicForm
            fields={tableConfig.fields}
            data={formData}
            onChange={handleFormChange}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleEdit} disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Logo Quick Manager Component
function LogoQuickManager() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/admin/universityProfiles');
      const result = await response.json();
      if (result.data && result.data.length > 0) {
        setProfile(result.data[0]);
        setLogoUrl(result.data[0].logo || "");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdateLogo = async () => {
    if (!profile) return;
    setSaving(true);
    try {
      const response = await fetch('/api/admin/universityProfiles', {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...profile, logo: logoUrl, id: profile.id }),
      });

      if (response.ok) {
        toast.success("Logo universitas berhasil diperbarui");
        fetchProfile();
      } else {
        toast.error("Gagal memperbarui logo");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat menyimpan logo");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return null;

  return (
    <Card className="mb-8 border-dashed border-2 bg-muted/30">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyber-blue/10 flex items-center justify-center">
            <Settings className="w-4 h-4 text-cyber-blue" />
          </div>
          <div>
            <CardTitle className="text-base">Logo Utama Universitas</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">Update logo utama yang akan muncul di semua halaman profil</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-32 h-32 rounded-2xl bg-white/5 border border-white/10 p-4 flex items-center justify-center overflow-hidden shrink-0">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo Preview" className="max-w-full max-h-full object-contain" />
            ) : (
              <div className="text-[10px] text-muted-foreground text-center">No Logo</div>
            )}
          </div>
          <div className="flex-1 w-full space-y-3">
            <div className="grid gap-2">
              <Label htmlFor="logoUrl" className="text-xs">URL Logo Universitas</Label>
              <div className="flex gap-2">
                <Input
                  id="logoUrl"
                  placeholder="Masukkan URL logo universitas (contoh: /images/logo.png)"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handleUpdateLogo}
                  disabled={saving || !logoUrl || logoUrl === profile?.logo}
                  className={cn(
                    "shrink-0 px-6",
                    logoUrl !== profile?.logo && !saving
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {saving ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Menyimpan...</>
                  ) : (
                    "Simpan Logo"
                  )}
                </Button>
              </div>
            </div>
            {logoUrl !== profile?.logo && logoUrl && (
              <p className="text-[10px] text-blue-400 animate-pulse font-medium">
                * Ada perubahan yang belum disimpan. Klik "Simpan Logo" untuk menerapkan.
              </p>
            )}
            <p className="text-[10px] text-muted-foreground italic">
              * Perubahan pada logo ini akan berdampak pada elemen visual utama di halaman profil.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Main Dashboard Page
export default function AdminDashboardPage() {
  const [activeModule, setActiveModule] = useState<string>("academic")
  const [activeTable, setActiveTable] = useState<string>("")
  const [openModules, setOpenModules] = useState<string[]>(["academic"])

  // Set default table when module changes
  useEffect(() => {
    const module = tableConfigurations[activeModule as keyof typeof tableConfigurations] as ModuleConfig
    if (module) {
      const firstTable = Object.keys(module.tables)[0]
      setActiveTable(firstTable)
    }
  }, [activeModule])

  const toggleModule = (moduleName: string) => {
    setOpenModules((prev) =>
      prev.includes(moduleName)
        ? prev.filter((m) => m !== moduleName)
        : [...prev, moduleName]
    )
  }

  const currentModule = tableConfigurations[activeModule as keyof typeof tableConfigurations] as ModuleConfig
  const currentTable = currentModule?.tables[activeTable]

  return (
    <div className="flex flex-col lg:flex-row h-full gap-6 p-4 lg:p-6">
      {/* Sidebar */}
      <aside className="w-full lg:w-72 shrink-0">
        <Card className="sticky top-4">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Database className="h-5 w-5" />
              Database Manager
            </CardTitle>
            <CardDescription>
              Kelola semua data database
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-250px)]">
              <div className="p-4 space-y-2">
                {Object.entries(tableConfigurations).map(([moduleKey, module]) => {
                  const ModuleIcon = (module as ModuleConfig).icon
                  const isOpen = openModules.includes(moduleKey)
                  const isActive = activeModule === moduleKey

                  return (
                    <Collapsible
                      key={moduleKey}
                      open={isOpen}
                    >
                      <div className="flex items-center w-full">
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className="flex-1 justify-start gap-2"
                          onClick={() => {
                            setActiveModule(moduleKey)
                            if (!isOpen) toggleModule(moduleKey)
                          }}
                        >
                          <ModuleIcon className={`h-4 w-4 ${(module as ModuleConfig).color}`} />
                          {(module as ModuleConfig).label}
                        </Button>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 shrink-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleModule(moduleKey)
                            }}
                          >
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                            />
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent className="pl-6 pt-1 space-y-1">
                        {Object.entries((module as ModuleConfig).tables).map(([tableKey, table]) => (
                          <Button
                            key={tableKey}
                            variant={activeTable === tableKey && isActive ? "secondary" : "ghost"}
                            size="sm"
                            className="w-full justify-start text-sm"
                            onClick={() => {
                              setActiveModule(moduleKey)
                              setActiveTable(tableKey)
                            }}
                          >
                            {(table as TableConfig).label}
                          </Button>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  )
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <Card className="h-full">
          <CardHeader className="border-b">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {currentModule && (
                    <currentModule.icon className={`h-5 w-5 ${currentModule.color}`} />
                  )}
                  {currentTable?.label || "Pilih tabel"}
                </CardTitle>
                <CardDescription>
                  {currentTable?.description || "Pilih tabel dari sidebar untuk mengelola data"}
                </CardDescription>
              </div>
              <Badge variant="outline" className="w-fit">
                {activeTable}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {activeTable === "universityLogoMeanings" && (
              <LogoQuickManager />
            )}
            {currentTable ? (
              <DataTableView
                tableName={activeTable}
                tableConfig={currentTable}
                onRefresh={() => { }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Database className="h-12 w-12 mb-4 opacity-50" />
                <p>Pilih tabel dari sidebar untuk mulai mengelola data</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
