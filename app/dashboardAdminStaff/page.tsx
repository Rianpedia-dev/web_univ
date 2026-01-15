"use client"

import * as React from "react"
import { useState, useEffect, useCallback } from "react"
import {
    Database,
    Users,
    GraduationCap,
    Megaphone,
    Calendar,
    Image,
    Newspaper,
    Handshake,
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
    DollarSign,
    Home,
    Menu,
    BarChart3,
    ChevronLeft,
    ChevronRight
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { uploadFile, getPublicUrl } from "@/lib/storage"
import { VisitorCounter } from "@/components/visitor-counter"
import { ThemeToggle } from "@/components/theme-toggle"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
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
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

// Separate config for Chat Questions (used in custom Home view)
const chatFrequentQuestionsConfig = {
    label: "Pertanyaan Chatbot",
    description: "Daftar pertanyaan yang sering diajukan ke chatbot",
    fields: [
        { key: "question", label: "Pertanyaan", type: "text", required: true },
        { key: "lastAskedAt", label: "Terakhir Ditanyakan", type: "datetime", required: false },
    ],
}

// Table configurations with metadata - LIMITED FOR ADMIN STAFF
const tableConfigurations = {
    // Home Module - Beranda
    home: {
        label: "Beranda",
        icon: Home,
        color: "text-rose-500",
        tables: {
            overview: {
                label: "Dashboard",
                description: "Ringkasan aktivitas dan pertanyaan chatbot",
                fields: [],
            },
        },
    },
    // Student Services Module - Kemahasiswaan
    studentServices: {
        label: "Kemahasiswaan",
        icon: Users,
        color: "text-amber-500",
        tables: {
            studentOrganizations: {
                label: "Organisasi Mahasiswa",
                description: "Daftar organisasi mahasiswa",
                viewMode: "grid",
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
                    { key: "logo", label: "Logo Organisasi", type: "image", bucket: "images" },
                    { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
                ],
            },
            studentAchievements: {
                label: "Prestasi Mahasiswa",
                description: "Prestasi mahasiswa",
                viewMode: "grid",
                fields: [
                    { key: "studentName", label: "Nama Mahasiswa", type: "text", required: true },
                    { key: "studentId", label: "NIM", type: "text", required: true },
                    { key: "studyProgramId", label: "Program Studi", type: "select", referenceTable: "studyPrograms", referenceLabel: "name", required: true },
                    { key: "title", label: "Judul Prestasi", type: "text", required: true },
                    { key: "description", label: "Deskripsi", type: "textarea" },
                    { key: "achievementType", label: "Jenis", type: "select", options: ["non_academic", "competition", "community_service", "other"], required: true },
                    { key: "image", label: "Foto Prestasi", type: "image", bucket: "images" },
                    { key: "achievementLevel", label: "Tingkat", type: "select", options: ["local", "regional", "national", "international"], required: true },
                    { key: "achievementCategory", label: "Kategori", type: "select", options: ["first", "second", "third", "champion", "participation", "other"], required: true },
                    { key: "eventName", label: "Nama Kegiatan", type: "text", required: true },
                    { key: "eventDate", label: "Tanggal Kegiatan", type: "datetime", required: true },
                    { key: "organizer", label: "Penyelenggara", type: "text", required: true },
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
        },
    },
    // News & Media Module - Berita & Media
    newsMedia: {
        label: "Berita & Media",
        icon: Newspaper,
        color: "text-purple-500",
        tables: {
            events: {
                label: "Event",
                description: "Daftar event dan kegiatan",
                viewMode: "grid",
                fields: [
                    { key: "categoryId", label: "Kategori", type: "select", referenceTable: "eventCategories", referenceLabel: "name", required: true },
                    { key: "title", label: "Judul", type: "text", required: true },
                    { key: "description", label: "Deskripsi", type: "text", required: true },
                    { key: "content", label: "Konten", type: "textarea" },
                    { key: "poster", label: "Gambar Kegiatan/Ilustrasi", type: "image", bucket: "images" },
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
            news: {
                label: "Berita",
                description: "Artikel berita",
                viewMode: "grid",
                fields: [
                    { key: "categoryId", label: "Kategori", type: "select", referenceTable: "newsCategories", referenceLabel: "name", required: true },
                    { key: "title", label: "Judul", type: "text", required: true },
                    { key: "slug", label: "Slug", type: "text", required: true },
                    { key: "content", label: "Konten", type: "textarea", required: true },
                    { key: "excerpt", label: "Ringkasan", type: "textarea" },
                    { key: "featuredImage", label: "Gambar Utama", type: "image", bucket: "images" },
                    { key: "authorName", label: "Nama Penulis", type: "text" },
                    { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
                    { key: "publishedAt", label: "Tanggal Publikasi", type: "datetime" },
                ],
            },
            galleryMedia: {
                label: "Galeri",
                description: "Foto dan video dalam galeri",
                viewMode: "grid",
                fields: [
                    { key: "title", label: "Judul", type: "text", required: true },
                    { key: "description", label: "Deskripsi", type: "textarea" },
                    { key: "mediaType", label: "Tipe Media", type: "select", options: ["image", "video"], required: true },
                    { key: "filePath", label: "File Gambar (untuk tipe Image)", type: "image", bucket: "images", showWhen: { field: "mediaType", value: "image" } },
                    { key: "filePath", label: "URL Video YouTube (untuk tipe Video)", type: "text", showWhen: { field: "mediaType", value: "video" } },
                    { key: "isPublic", label: "Publik", type: "boolean" },
                    { key: "isFeatured", label: "Unggulan", type: "boolean" },
                ],
            },
        },
    },
    // Admissions Module - Biaya Pendidikan
    educationCost: {
        label: "Biaya Pendidikan",
        icon: DollarSign,
        color: "text-green-500",
        tables: {
            educationCosts: {
                label: "Biaya Pendidikan",
                description: "Daftar biaya pendidikan",
                mobileViewMode: "table",
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
        },
    },
    // PMB Module
    pmb: {
        label: "PMB",
        icon: ClipboardList,
        color: "text-cyan-500",
        tables: {
            admissionStaff: {
                label: "Tim PMB",
                description: "Kelola data tim penerimaan mahasiswa baru",
                viewMode: "grid",
                fields: [
                    { key: "name", label: "Nama", type: "text", required: true },
                    { key: "position", label: "Jabatan", type: "text", required: true },
                    { key: "image", label: "Foto", type: "image", bucket: "images" },
                    { key: "whatsapp", label: "WhatsApp", type: "text" },
                    { key: "email", label: "Email", type: "email" },
                    { key: "order", label: "Urutan", type: "number" },
                    { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
                ],
            },
            admissionBrochures: {
                label: "Brosur Pendaftaran",
                description: "Kelola file brosur pendaftaran (PDF)",
                fields: [
                    { key: "title", label: "Judul Brosur", type: "text", required: true },
                    { key: "description", label: "Deskripsi", type: "textarea" },
                    { key: "fileUrl", label: "File PDF Brosur", type: "file", bucket: "documents", required: true },
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
                    { key: "registrationLink", label: "Link Pendaftaran", type: "text" },
                    { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
                ],
            },
            admissionRequirements: {
                label: "Syarat Pendaftaran",
                description: "Kelola syarat pendaftaran untuk mahasiswa murni dan transisi",
                fields: [
                    { key: "type", label: "Jenis Mahasiswa", type: "select", options: ["murni", "transisi"], required: true },
                    { key: "content", label: "Syarat", type: "text", required: true },
                    { key: "order", label: "Urutan", type: "number" },
                    { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
                ],
            },
            testimonials: {
                label: "Testimoni",
                description: "Kelola testimoni alumni dan mahasiswa",
                viewMode: "grid",
                fields: [
                    { key: "name", label: "Nama", type: "text", required: true },
                    { key: "role", label: "Peran/Jabatan", type: "text", required: true },
                    { key: "content", label: "Isi Testimoni", type: "textarea", required: true },
                    { key: "image", label: "Foto", type: "image", bucket: "images" },
                    { key: "rating", label: "Rating (1-5)", type: "number" },
                    { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
                ],
            },
        },
    },
    // Partnerships Module - Riset & Kerjasama
    partnerships: {
        label: "Riset & Kerjasama",
        icon: Handshake,
        color: "text-teal-500",
        tables: {
            journals: {
                label: "Jurnal Ilmiah",
                description: "Kelola publikasi jurnal ilmiah dan riset",
                viewMode: "grid",
                fields: [
                    { key: "title", label: "Judul Artikel", type: "text", required: true },
                    { key: "authors", label: "Penulis", type: "text", required: true },
                    { key: "journalName", label: "Nama Jurnal", type: "text", required: true },
                    { key: "journalAbbr", label: "Singkatan Jurnal", type: "text" },
                    { key: "year", label: "Tahun", type: "text", required: true },
                    { key: "volume", label: "Volume", type: "text" },
                    { key: "number", label: "Nomor", type: "text" },
                    { key: "keywords", label: "Kata Kunci (Koma-terpisah)", type: "text" },
                    { key: "imageUrl", label: "Gambar Sampul", type: "image", bucket: "images" },
                    { key: "link", label: "Link Jurnal (URL)", type: "text" },
                    { key: "pdfUrl", label: "File PDF Jurnal", type: "file", bucket: "documents" },
                    { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
                ],
            },
            partners: {
                label: "Mitra",
                description: "Daftar mitra kerjasama",
                viewMode: "grid",
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
                    { key: "logo", label: "Logo Mitra", type: "image", bucket: "images" },
                    { key: "agreementNumber", label: "Nomor MOU/MOA", type: "text" },
                    { key: "agreementFile", label: "File MOU/Kerjasama", type: "file", bucket: "documents" },
                    { key: "startDate", label: "Tanggal Mulai", type: "datetime" },
                    { key: "endDate", label: "Tanggal Selesai", type: "datetime" },
                    { key: "isActive", label: "Aktif", type: "boolean" },
                    { key: "objectives", label: "Tujuan", type: "textarea" },
                    { key: "coordinator", label: "Koordinator", type: "text" },
                    { key: "partnershipStatus", label: "Status", type: "select", options: ["active", "inactive", "expired", "pending"] },
                    { key: "isPublished", label: "Dipublikasikan", type: "boolean" },
                ],
            },
        },
    },
};

type FieldConfig = {
    key: string
    label: string
    type: "text" | "textarea" | "number" | "email" | "datetime" | "boolean" | "select" | "image" | "file"
    required?: boolean
    options?: string[]
    referenceTable?: string
    referenceLabel?: string
    bucket?: string
    showWhen?: { field: string; value: string }
}

type TableConfig = {
    label: string
    description: string
    fields: FieldConfig[]
    isStatsOnly?: boolean
    viewMode?: "table" | "grid"
    mobileViewMode?: "table" | "card"
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
            {fields.map((field, fieldIndex) => {
                // Check showWhen condition - skip rendering if condition not met
                if (field.showWhen) {
                    const conditionValue = data[field.showWhen.field];
                    if (conditionValue !== field.showWhen.value) {
                        return null;
                    }
                }

                return (
                    <div key={`${field.key}-${fieldIndex}`} className="grid gap-2">
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
                        ) : field.type === "image" || field.type === "file" ? (
                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <Input
                                        id={field.key}
                                        type="text"
                                        value={data[field.key] || ""}
                                        onChange={(e) => onChange(field.key, e.target.value)}
                                        placeholder={`Masukkan URL atau unggah ${field.label.toLowerCase()}`}
                                        className="flex-1"
                                    />
                                    <div className="relative">
                                        <input
                                            type="file"
                                            id={`file-${field.key}`}
                                            className="hidden"
                                            accept={field.type === "image" ? "image/*" : "application/pdf"}
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0]
                                                if (!file) return

                                                const loadingToast = toast.loading(`Mengunggah ${field.label}...`)
                                                try {
                                                    const bucket = field.bucket || (field.type === "image" ? "images" : "documents")
                                                    const folder = field.key
                                                    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
                                                    const path = `${folder}/${fileName}`

                                                    const uploadedPath = await uploadFile(file, bucket, path)
                                                    const publicUrl = getPublicUrl(bucket, uploadedPath)

                                                    onChange(field.key, publicUrl)
                                                    toast.success(`${field.label} berhasil diunggah`, { id: loadingToast })
                                                } catch (error: any) {
                                                    console.error("Upload error:", error)
                                                    toast.error(`Gagal mengunggah: ${error.message || "Terjadi kesalahan"}`, { id: loadingToast })
                                                }
                                            }}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => document.getElementById(`file-${field.key}`)?.click()}
                                            className="gap-2"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Unggah
                                        </Button>
                                    </div>
                                </div>

                                {data[field.key] && field.type === "image" && (
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

                                {data[field.key] && field.type === "file" && (
                                    <div className="flex items-center gap-2 p-2 rounded-lg border border-white/10 bg-white/5">
                                        <FileText className="w-4 h-4 text-primary" />
                                        <span className="text-xs truncate flex-1">{data[field.key].split('/').pop()}</span>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            asChild
                                        >
                                            <a href={data[field.key]} target="_blank" rel="noopener noreferrer">
                                                Lihat
                                            </a>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ) : null}
                    </div>
                )
            })}
        </div>
    )
}

// Data Table View Component
const DataTableView = ({
    tableName,
    tableConfig,
    onRefresh,
    readOnly = false,
    hideSearch = false,
    onCountChange,
}: {
    tableName: string
    tableConfig: TableConfig
    onRefresh: () => void
    readOnly?: boolean
    hideSearch?: boolean
    onCountChange?: (count: number) => void
}) => {
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    // Form & Dialog States
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [editingItem, setEditingItem] = useState<any>(null)
    const [viewContent, setViewContent] = useState<string | null>(null)
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [formData, setFormData] = useState<any>({})
    const [submitting, setSubmitting] = useState(false)

    const [refLookups, setRefLookups] = useState<Record<string, Record<string, string>>>({})

    // Fetch reference data
    useEffect(() => {
        const fetchRefData = async () => {
            setRefLookups({})
            const newLookups: Record<string, Record<string, string>> = {}

            const refFields = tableConfig.fields.filter(f => f.type === 'select' && f.referenceTable)

            await Promise.all(refFields.map(async (field) => {
                try {
                    const res = await fetch(`/api/admin/${field.referenceTable}`)
                    const json = await res.json()
                    if (json.data) {
                        const map: Record<string, string> = {}
                        json.data.forEach((item: any) => {
                            map[item.id] = item[field.referenceLabel || 'name']
                        })
                        newLookups[field.key] = map
                    }
                } catch (error) {
                    console.error(`Error fetching reference for ${field.key}:`, error)
                }
            }))
            setRefLookups(newLookups)
        }
        fetchRefData()
    }, [tableConfig])

    const fetchData = useCallback(async () => {
        setLoading(true)
        try {
            const res = await fetch(`/api/admin/${tableName}`)
            const json = await res.json()
            if (json.data) {
                setData(json.data)
                onCountChange?.(json.data.length)
            }
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            setLoading(false)
        }
    }, [tableName, onCountChange])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const getDisplayValue = (item: any, field: FieldConfig) => {
        const rawValue = item[field.key]
        if (field.type === 'select' && field.referenceTable && refLookups[field.key]) {
            return refLookups[field.key][rawValue] || rawValue || '-'
        }
        if ((field.type as string) === 'datetime') {
            if (!rawValue) return '-'
            return new Date(rawValue).toLocaleDateString("id-ID", {
                day: 'numeric', month: 'long', year: 'numeric',
                ...(field.type === 'datetime' && { hour: '2-digit', minute: '2-digit' })
            })
        }
        if (typeof rawValue === 'boolean') return rawValue ? 'Ya' : 'Tidak'

        // Return placeholder for empty values
        if (rawValue === null || rawValue === undefined || rawValue === '') {
            return '-'
        }

        return rawValue
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        setCurrentPage(1)
    }

    const filteredData = data.filter((item) =>
        Object.values(item).some((val) =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
    )

    const totalPages = Math.ceil(filteredData.length / itemsPerPage)
    const paginatedData = tableConfig.viewMode === "grid"
        ? filteredData
        : filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    const handleDelete = async () => {
        if (!deleteId) return
        try {
            const res = await fetch(`/api/admin/${tableName}?id=${deleteId}`, { method: "DELETE" })
            if (res.ok) {
                fetchData()
                onRefresh()
            } else {
                alert("Gagal menghapus data")
            }
        } catch (error) {
            console.error("Error deleting item:", error)
        } finally {
            setDeleteId(null)
        }
    }

    const handleSave = async () => {
        setSubmitting(true)
        try {
            const url = `/api/admin/${tableName}`
            const method = editingItem ? "PUT" : "POST"
            const body = editingItem ? { ...formData, id: editingItem.id } : formData

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            })
            const json = await res.json()

            if (!res.ok) {
                alert(json.error || "Gagal menyimpan data")
            } else {
                fetchData()
                onRefresh()
                setIsAddOpen(false)
                setIsEditOpen(false)
                setEditingItem(null)
                setFormData({})
            }
        } catch (error) {
            console.error("Error saving:", error)
            alert("Terjadi kesalahan sistem")
        } finally {
            setSubmitting(false)
        }
    }

    const openAddDialog = () => {
        setFormData({})
        setEditingItem(null)
        setIsAddOpen(true)
    }

    const openEditDialog = (item: any) => {
        setEditingItem(item)
        setFormData({ ...item })
        setIsEditOpen(true)
    }

    if (tableConfig.isStatsOnly) {
        return <VisitorCounter />
    }

    return (
        <div className="space-y-4">
            <div className={`flex flex-col sm:flex-row gap-4 ${hideSearch ? 'justify-end' : 'justify-between'}`}>
                {!hideSearch && (
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Cari data..." value={searchTerm} onChange={handleSearch} className="pl-8" />
                    </div>
                )}
                <div className="flex gap-2 w-full sm:w-auto">
                    <Button variant="outline" size="icon" onClick={() => fetchData()}>
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                    {!readOnly && (
                        <Button onClick={openAddDialog} className="flex-1 sm:flex-none">
                            <Plus className="mr-2 h-4 w-4" /> Tambah
                        </Button>
                    )}
                </div>
            </div>

            {/* Mobile Card View (Only for standard tables) */}
            <div className={cn("lg:hidden space-y-4", (tableConfig.viewMode === "grid" || tableConfig.mobileViewMode === "table") && "hidden")}>
                {loading ? (
                    <Card className="bg-background/40 border-white/10 p-8 flex justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground/50" />
                    </Card>
                ) : paginatedData.length === 0 ? (
                    <Card className="bg-background/40 border-white/10 p-8 text-center text-muted-foreground">
                        Tidak ada data
                    </Card>
                ) : (
                    paginatedData.map((item) => (
                        <Card key={item.id} className="bg-background/40 border-white/10 overflow-hidden">
                            <CardContent className="p-4 space-y-3">
                                {tableConfig.fields.map((field, index) => (
                                    <div key={`${field.key}-${index}`} className="flex flex-col gap-1 border-b border-white/5 pb-2 last:border-0 last:pb-0">
                                        <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest opacity-60">
                                            {field.label}
                                        </span>
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="text-sm font-medium">
                                                {getDisplayValue(item, field)}
                                            </div>
                                            {(field.key === 'answer' || field.key === 'content') && item[field.key] && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-7 px-2 text-[9px] font-bold bg-white/5 hover:bg-white/10 border-white/10 transition-all uppercase"
                                                    onClick={() => setViewContent(item[field.key])}
                                                >
                                                    Lihat
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                            {!readOnly && (
                                <CardFooter className="p-3 bg-white/[0.02] border-t border-white/5 flex justify-end gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => openEditDialog(item)} className="h-8 gap-1 text-[10px] font-bold uppercase tracking-wider">
                                        <Pencil className="h-3 w-3" /> Edit
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-8 gap-1 text-[10px] font-bold uppercase tracking-wider text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => setDeleteId(item.id)}>
                                        <Trash2 className="h-3 w-3" /> Hapus
                                    </Button>
                                </CardFooter>
                            )}
                        </Card>
                    ))
                )}
            </div>

            {/* Desktop Table/Grid View */}
            {tableConfig.viewMode === "grid" ? (
                <div className="grid grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, i) => (
                            <Card key={i} className="bg-background/40 border-white/10 p-4 space-y-4">
                                <Skeleton className="h-32 w-full rounded-lg" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-3 w-1/2" />
                                </div>
                            </Card>
                        ))
                    ) : paginatedData.length === 0 ? (
                        <div className="col-span-full h-40 flex items-center justify-center text-muted-foreground bg-background/20 rounded-xl border border-dashed border-white/10">
                            Tidak ada data
                        </div>
                    ) : (
                        paginatedData.map((item) => (
                            <Card
                                key={item.id}
                                className="group relative bg-background/40 border-white/10 hover:border-blue-500/50 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer overflow-hidden shadow-sm hover:shadow-blue-500/10"
                                onClick={() => openEditDialog(item)}
                            >
                                <CardContent className="p-3 sm:p-5 flex flex-col items-center text-center space-y-2 sm:space-y-4">
                                    {/* Logo/Photo Container */}
                                    <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500 shadow-inner">
                                        {tableName === 'studentOrganizations' ? (
                                            item.logo ? (
                                                <img src={item.logo} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="text-2xl sm:text-4xl font-bold text-white/10 uppercase">{item.name?.charAt(0)}</div>
                                            )
                                        ) : tableName === 'studentAchievements' ? (
                                            item.image ? (
                                                <img src={item.image} alt={item.studentName} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="text-2xl sm:text-4xl font-bold text-white/10 uppercase">{item.studentName?.charAt(0)}</div>
                                            )
                                        ) : tableName === 'events' ? (
                                            item.poster ? (
                                                <img src={item.poster} alt={item.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="text-2xl sm:text-4xl font-bold text-white/10 uppercase">{item.title?.charAt(0)}</div>
                                            )
                                        ) : tableName === 'news' ? (
                                            item.featuredImage ? (
                                                <img src={item.featuredImage} alt={item.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="text-2xl sm:text-4xl font-bold text-white/10 uppercase">{item.title?.charAt(0)}</div>
                                            )
                                        ) : tableName === 'galleryMedia' ? (
                                            item.mediaType === 'image' && item.filePath ? (
                                                <img src={item.filePath} alt={item.title} className="w-full h-full object-cover" />
                                            ) : item.mediaType === 'video' ? (
                                                <div className="relative w-full h-full bg-slate-800 flex items-center justify-center">
                                                    <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                                                        <div className="w-0 h-0 border-t-4 border-t-transparent border-l-8 border-l-white border-b-4 border-b-transparent ml-1" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-2xl sm:text-4xl font-bold text-white/10 uppercase">{item.title?.charAt(0)}</div>
                                            )
                                        ) : tableName === 'admissionStaff' || tableName === 'testimonials' ? (
                                            item.image ? (
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="text-2xl sm:text-4xl font-bold text-white/10 uppercase">{item.name?.charAt(0)}</div>
                                            )
                                        ) : tableName === 'journals' ? (
                                            item.imageUrl ? (
                                                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-contain" />
                                            ) : (
                                                <div className="text-2xl sm:text-4xl font-bold text-white/10 uppercase">{item.title?.charAt(0)}</div>
                                            )
                                        ) : tableName === 'partners' ? (
                                            item.logo ? (
                                                <img src={item.logo} alt={item.name} className="w-full h-full object-contain p-2" />
                                            ) : (
                                                <div className="text-2xl sm:text-4xl font-bold text-white/10 uppercase">{item.name?.charAt(0)}</div>
                                            )
                                        ) : (
                                            <div className="text-2xl sm:text-4xl font-bold text-white/10 uppercase">?</div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="space-y-1 w-full flex flex-col items-center">
                                        <h3 className="font-bold text-[10px] sm:text-lg leading-tight group-hover:text-blue-400 transition-colors line-clamp-2 min-h-[1.5rem] sm:min-h-[2.5rem] flex items-center justify-center">
                                            {tableName === 'studentOrganizations' ? item.name : item.title || item.studentName || item.name}
                                        </h3>

                                        {tableName === 'studentAchievements' && (
                                            <div className="flex flex-col items-center gap-0.5 opacity-60">
                                                <span className="text-[9px] sm:text-xs font-medium tracking-wider uppercase">{item.studentId}</span>
                                                <span className="text-[8px] sm:text-[10px] font-bold text-blue-400 uppercase tracking-tight">
                                                    {getDisplayValue(item, tableConfig.fields.find(f => f.key === 'studyProgramId')!)}
                                                </span>
                                            </div>
                                        )}

                                        {tableName === 'events' && (
                                            <div className="flex flex-col items-center gap-1 w-full mt-1">
                                                {item.registrationUrl && (
                                                    <span className="text-[8px] sm:text-[10px] text-blue-400 truncate max-w-full px-2 italic opacity-80">
                                                        {item.registrationUrl}
                                                    </span>
                                                )}
                                                <Badge variant="outline" className={`text-[8px] uppercase tracking-[0.2em] font-black border-none py-0 px-2 ${item.status === 'ongoing' ? 'bg-green-500/20 text-green-500' :
                                                    item.status === 'upcoming' ? 'bg-blue-500/20 text-blue-500' :
                                                        item.status === 'completed' ? 'bg-gray-500/20 text-gray-500' :
                                                            'bg-red-500/20 text-red-500'
                                                    }`}>
                                                    {item.status || 'draft'}
                                                </Badge>
                                            </div>
                                        )}

                                        {tableName === 'news' && (
                                            <div className="flex items-center gap-2 opacity-60 mt-1">
                                                <Users className="h-3 w-3" />
                                                <span className="text-[9px] sm:text-xs font-medium uppercase tracking-wider">{item.authorName || 'Admin'}</span>
                                            </div>
                                        )}

                                        {tableName === 'admissionStaff' && (
                                            <div className="flex items-center gap-2 mt-1 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                                <span className="text-[9px] sm:text-[10px] font-bold text-green-500 uppercase tracking-tight">{item.whatsapp || 'No WA'}</span>
                                            </div>
                                        )}

                                        {tableName === 'testimonials' && (
                                            <div className="flex items-center gap-1 mt-1">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <div key={i} className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${i < (item.rating || 0) ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-white/10'}`} />
                                                ))}
                                                <span className="text-[9px] sm:text-[10px] font-black text-amber-500 ml-1">{item.rating || 0}/5</span>
                                            </div>
                                        )}

                                        {tableName === 'journals' && (
                                            <div className="mt-1">
                                                <span className="text-[8px] sm:text-[10px] font-bold text-blue-400 uppercase tracking-tighter line-clamp-1 italic px-2">
                                                    {item.journalName}
                                                </span>
                                            </div>
                                        )}

                                        {tableName === 'partners' && (
                                            <div className="mt-1">
                                                <Badge variant="outline" className="text-[8px] uppercase tracking-widest font-black border-white/10 bg-white/5 py-0 px-2">
                                                    {item.category}
                                                </Badge>
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 w-full pt-2" onClick={(e) => e.stopPropagation()}>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1 h-9 rounded-lg border-white/10 bg-white/5 hover:bg-white/10 text-[11px] font-bold uppercase tracking-wider gap-2"
                                            onClick={() => openEditDialog(item)}
                                        >
                                            <Pencil className="h-3.5 w-3.5" /> Edit
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-9 w-9 rounded-lg border-white/10 bg-white/5 hover:bg-red-500/20 hover:text-red-500 hover:border-red-500/30 transition-all p-0 shrink-0"
                                            onClick={() => setDeleteId(item.id)}
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                </CardContent>

                                {/* Hover Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            </Card>
                        ))
                    )}
                </div>
            ) : (
                <div className={cn(
                    "rounded-md border overflow-x-auto w-full custom-scrollbar",
                    tableConfig.mobileViewMode === "table" ? "block" : "hidden lg:block"
                )}>
                    {tableConfig.mobileViewMode === "table" && (
                        <div className="lg:hidden bg-blue-500/10 text-blue-400 text-[9px] font-bold uppercase tracking-widest py-1.5 px-3 border-b border-white/5 flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" />
                            Geser ke samping untuk melihat detail tabel
                        </div>
                    )}
                    <style jsx>{`
                        .custom-scrollbar::-webkit-scrollbar {
                            height: 6px;
                            display: block !important;
                        }
                        .custom-scrollbar::-webkit-scrollbar-track {
                            background: rgba(255, 255, 255, 0.02);
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb {
                            background: rgba(255, 255, 255, 0.1);
                            border-radius: 10px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                            background: rgba(255, 255, 255, 0.2);
                        }
                    `}</style>
                    <Table className={cn(tableConfig.mobileViewMode === "table" && "min-w-[800px] lg:min-w-full")}>
                        <TableHeader className="bg-background/40">
                            <TableRow className="hover:bg-transparent border-b-2 border-white/10">
                                {tableConfig.fields.map((field, index) => (
                                    <TableHead
                                        key={`${field.key}-${index}`}
                                        className={cn(
                                            "whitespace-nowrap font-bold text-[10px] uppercase tracking-wider text-muted-foreground py-4",
                                            index < tableConfig.fields.length - (readOnly ? 0 : 1) && "border-r border-white/5"
                                        )}
                                    >
                                        {field.label}
                                    </TableHead>
                                ))}
                                {!readOnly && <TableHead className="w-[100px] font-bold text-[10px] uppercase tracking-wider text-muted-foreground py-4">Aksi</TableHead>}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={tableConfig.fields.length + (readOnly ? 0 : 1)} className="h-24 text-center">
                                        <div className="flex justify-center items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground/50" />
                                            <span className="text-sm text-muted-foreground">Memuat data...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : paginatedData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={tableConfig.fields.length + (readOnly ? 0 : 1)} className="h-24 text-center">
                                        Tidak ada data
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedData.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-white/[0.02] border-b border-white/5 transition-colors">
                                        {tableConfig.fields.map((field, index) => (
                                            <TableCell
                                                key={`${field.key}-${index}`}
                                                className={cn(
                                                    "whitespace-nowrap max-w-[200px] py-4",
                                                    index < tableConfig.fields.length - (readOnly ? 0 : 1) && "border-r border-white/5"
                                                )}
                                                title={String(item[field.key])}
                                            >
                                                <div className="flex items-center justify-between gap-4">
                                                    <div className="truncate flex-1 text-sm">
                                                        {getDisplayValue(item, field)}
                                                    </div>
                                                    {(field.key === 'answer' || field.key === 'content') && item[field.key] && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-6 px-2 text-[9px] font-bold bg-white/5 hover:bg-white/10 border-none transition-all uppercase"
                                                            onClick={() => setViewContent(item[field.key])}
                                                        >
                                                            Lihat
                                                        </Button>
                                                    )}
                                                </div>
                                            </TableCell>
                                        ))}
                                        {!readOnly && (
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(item)}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => setDeleteId(item.id)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}

            {/* Pagination Controls */}
            {tableConfig.viewMode !== "grid" && totalPages > 1 && (
                <div className="flex items-center justify-between px-2 py-4 border-t border-white/5 bg-black/20 rounded-b-lg">
                    <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest opacity-60">
                        Halaman {currentPage} dari {totalPages}
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-3 text-[10px] font-bold uppercase tracking-widest bg-white/5 border-white/10 hover:bg-white/10 transition-all disabled:opacity-30"
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-3 w-3 mr-1" /> Prev
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-3 text-[10px] font-bold uppercase tracking-widest bg-white/5 border-white/10 hover:bg-white/10 transition-all disabled:opacity-30"
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                        >
                            Next <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                    </div>
                </div>
            )}

            {/* View Modal */}
            <Dialog open={!!viewContent} onOpenChange={(open) => !open && setViewContent(null)}>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Detail Jawaban Chatbot</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 whitespace-pre-wrap text-sm leading-relaxed">
                        {viewContent}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Dialogs */}
            {
                !readOnly && (
                    <>
                        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                            <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader><DialogTitle>Tambah {tableConfig.label}</DialogTitle></DialogHeader>
                                <DynamicForm fields={tableConfig.fields} data={formData} onChange={(key, value) => setFormData((prev: any) => ({ ...prev, [key]: value }))} />
                                <DialogFooter className="mt-4 gap-2 sm:gap-0">
                                    <Button variant="outline" onClick={() => setIsAddOpen(false)}>Batal</Button>
                                    <Button onClick={handleSave} disabled={submitting}>{submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Simpan"}</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                            <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader><DialogTitle>Edit {tableConfig.label}</DialogTitle></DialogHeader>
                                <DynamicForm fields={tableConfig.fields} data={formData} onChange={(key, value) => setFormData((prev: any) => ({ ...prev, [key]: value }))} />
                                <DialogFooter className="mt-4 gap-2 sm:gap-0">
                                    <Button variant="outline" onClick={() => setIsEditOpen(false)}>Batal</Button>
                                    <Button onClick={handleSave} disabled={submitting}>{submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Simpan"}</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Hapus Data?</AlertDialogTitle>
                                    <AlertDialogDescription>Tindakan ini tidak dapat dibatalkan.</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">Hapus</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </>
                )
            }
        </div >
    )
}

// Visitor Stats Component - Using style from StatCard.tsx (Connected to Real Visitor Data)
function VisitorStatsView() {
    const [trendData, setTrendData] = useState<{ name: string, visitors: number }[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTrends = async () => {
            try {
                const res = await fetch("/api/analytics/visitor-trends")
                const json = await res.json()
                if (json.data) {
                    setTrendData(json.data)
                }
            } catch (error) {
                console.error("Error fetching visitor trends:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchTrends()
    }, [])

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 items-stretch">
            {/* Real-time Counter */}
            <div className="lg:col-span-1 flex flex-col items-center justify-center p-3 rounded-2xl bg-white/[0.03] border border-white/10 shadow-inner">
                <div className="transform scale-110 mb-1">
                    <VisitorCounter />
                </div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black opacity-50">Total Traffic</p>
            </div>

            {/* StatCard Style Chart */}
            <div className="lg:col-span-3 h-[180px] w-full p-2 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col">
                <div className="flex items-center gap-1 mb-1 px-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-70">
                        Tren Pengunjung {new Date().getFullYear()}
                    </span>
                </div>
                <div className="flex-1 flex items-center justify-start overflow-hidden min-h-[140px]">
                    {loading ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground/20" />
                        </div>
                    ) : (
                        <div style={{ width: `${Math.max((trendData.length / 12) * 100, 100)}%`, minWidth: '100%' }} className="h-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={trendData} margin={{ left: -30, right: 10, top: 10, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 9, fill: '#666' }}
                                        interval={0}
                                    />
                                    <YAxis hide />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                        contentStyle={{
                                            backgroundColor: '#18181b',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '8px',
                                            fontSize: '10px'
                                        }}
                                        labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                                    />
                                    <Bar
                                        dataKey="visitors"
                                        fill="url(#colorVisitors)"
                                        radius={[4, 4, 0, 0]}
                                        barSize={window?.innerWidth < 640 ? 12 : 24}
                                        animationDuration={1500}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// Main Dashboard Page
export default function AdminStaffDashboardPage() {
    const [activeModule, setActiveModule] = useState<string>("home")
    const [activeTable, setActiveTable] = useState<string>("visitorStats")
    const [openModules, setOpenModules] = useState<string[]>(["home"])
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [itemCount, setItemCount] = useState(0)

    // Set default table when module changes
    useEffect(() => {
        const moduleConfig = tableConfigurations[activeModule as keyof typeof tableConfigurations] as ModuleConfig
        if (moduleConfig) {
            const firstTable = Object.keys(moduleConfig.tables)[0]
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
        <div className="flex flex-col lg:flex-row h-full gap-2 lg:gap-6 p-2 lg:p-6">
            {/* Mobile Header with Hamburger Menu */}
            <div className="lg:hidden flex items-center justify-between mb-1 px-1">
                <div className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    <span className="font-semibold">Admin Staff</span>
                </div>
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[280px] p-0">
                        <SheetHeader className="p-4 border-b">
                            <div className="flex items-center justify-between">
                                <SheetTitle className="flex items-center gap-2">
                                    <Database className="h-5 w-5" />
                                    Admin Staff Panel
                                </SheetTitle>
                                <ThemeToggle />
                            </div>
                        </SheetHeader>
                        <ScrollArea className="h-[calc(100vh-80px)]">
                            <div className="p-4 space-y-2">
                                {Object.entries(tableConfigurations).map(([moduleKey, module]) => {
                                    const ModuleIcon = (module as ModuleConfig).icon
                                    const isOpen = openModules.includes(moduleKey)
                                    const isActive = activeModule === moduleKey
                                    const tables = Object.entries((module as ModuleConfig).tables)
                                    const hasSingleTable = tables.length === 1

                                    // Jika hanya punya 1 submenu, render tanpa dropdown
                                    if (hasSingleTable) {
                                        const [tableKey] = tables[0]
                                        return (
                                            <Button
                                                key={moduleKey}
                                                variant={isActive ? "secondary" : "ghost"}
                                                className="w-full justify-start gap-3 h-11"
                                                onClick={() => {
                                                    setActiveModule(moduleKey)
                                                    setActiveTable(tableKey)
                                                    setMobileMenuOpen(false)
                                                }}
                                            >
                                                <ModuleIcon className={`h-4 w-4 ${(module as ModuleConfig).color}`} />
                                                {(module as ModuleConfig).label}
                                            </Button>
                                        )
                                    }

                                    // Render dengan dropdown untuk modul dengan multiple tables
                                    return (
                                        <Collapsible
                                            key={moduleKey}
                                            open={isOpen}
                                        >
                                            <div className="flex items-center w-full">
                                                <Button
                                                    variant={isActive ? "secondary" : "ghost"}
                                                    className="flex-1 justify-start gap-3 h-11"
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
                                                {tables.map(([tableKey, table]) => (
                                                    <Button
                                                        key={tableKey}
                                                        variant={activeTable === tableKey && isActive ? "secondary" : "ghost"}
                                                        className="w-full justify-start text-sm h-10 px-4"
                                                        onClick={() => {
                                                            setActiveModule(moduleKey)
                                                            setActiveTable(tableKey)
                                                            setMobileMenuOpen(false)
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
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar - Hidden on mobile */}
            <aside className="hidden lg:block w-72 shrink-0">
                <Card className="sticky top-4">
                    <CardHeader className="pb-3 px-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Database className="h-5 w-5 text-blue-500" />
                                <CardTitle className="text-lg">Admin Staff</CardTitle>
                            </div>
                            <ThemeToggle />
                        </div>
                        <CardDescription className="mt-1.5">
                            Kelola data kampus (akses terbatas)
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ScrollArea className="h-[calc(100vh-250px)]">
                            <div className="p-4 space-y-2">
                                {Object.entries(tableConfigurations).map(([moduleKey, module]) => {
                                    const ModuleIcon = (module as ModuleConfig).icon
                                    const isOpen = openModules.includes(moduleKey)
                                    const isActive = activeModule === moduleKey
                                    const tables = Object.entries((module as ModuleConfig).tables)
                                    const hasSingleTable = tables.length === 1

                                    // Jika hanya punya 1 submenu, render tanpa dropdown
                                    if (hasSingleTable) {
                                        const [tableKey] = tables[0]
                                        return (
                                            <Button
                                                key={moduleKey}
                                                variant={isActive ? "secondary" : "ghost"}
                                                className="w-full justify-start gap-2"
                                                onClick={() => {
                                                    setActiveModule(moduleKey)
                                                    setActiveTable(tableKey)
                                                }}
                                            >
                                                <ModuleIcon className={`h-4 w-4 ${(module as ModuleConfig).color}`} />
                                                {(module as ModuleConfig).label}
                                            </Button>
                                        )
                                    }

                                    // Render dengan dropdown untuk modul dengan multiple tables
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
                                                {tables.map(([tableKey, table]) => (
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

            {/* Main Content Area */}
            <div className="flex-1 bg-background/50 backdrop-blur-sm border rounded-lg lg:rounded-xl overflow-hidden flex flex-col shadow-sm">




                <ScrollArea className="flex-1">
                    <div className="p-2 lg:p-4 pb-20 lg:pb-6">
                        {activeModule === 'home' ? (
                            <Card className="overflow-hidden border-none shadow-sm bg-card/30">
                                <CardContent className="p-0">
                                    {/* Stats Section */}
                                    <div className="pt-0 pb-4 px-3 sm:px-6 border-b bg-gradient-to-br from-background/50 to-transparent">
                                        <div className="flex items-center gap-2 mb-2 text-[11px] font-black text-muted-foreground uppercase tracking-[0.3em]">
                                            <Users className="h-4 w-4 text-blue-500" />
                                            Analitik Pengunjung
                                        </div>
                                        <VisitorStatsView />
                                    </div>

                                    {/* Questions Section */}
                                    <div className="p-4 sm:p-8">
                                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                                            <div className="flex items-center gap-2 text-[11px] font-black text-muted-foreground uppercase tracking-[0.3em]">
                                                <Megaphone className="h-4 w-4 text-blue-500" />
                                                Interaksi Chatbot Terbaru
                                            </div>
                                            <Badge variant="outline" className="text-[9px] bg-blue-500/5 text-blue-500 border-blue-500/20 hidden sm:flex">
                                                Live Updates
                                            </Badge>
                                        </div>

                                        <div className="rounded-lg lg:rounded-xl border bg-background/40 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/20">
                                            <DataTableView
                                                tableName="chatMessages"
                                                tableConfig={{
                                                    label: "Pertanyaan Chatbot",
                                                    description: "Daftar semua pertanyaan yang diajukan ke chatbot",
                                                    fields: [
                                                        { key: "content", label: "Pertanyaan", type: "text", required: true },
                                                        { key: "answer", label: "Jawaban", type: "text", required: false },
                                                        { key: "createdAt", label: "Waktu Ditanyakan", type: "datetime", required: false },
                                                    ],
                                                }}
                                                readOnly={true}
                                                hideSearch={true}
                                                onRefresh={() => { }}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : activeTable && currentTable ? (
                            <Card className="border-none shadow-none bg-transparent">
                                <CardHeader className="px-0 pt-0">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <CardTitle className="text-xl">{currentTable.label}</CardTitle>
                                                <CardDescription>{currentTable.description}</CardDescription>
                                            </div>
                                            <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 border-blue-500/20 px-3 py-1 font-black text-sm rounded-full">
                                                {itemCount}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="px-0">
                                    <DataTableView
                                        tableName={activeTable}
                                        tableConfig={currentTable}
                                        onRefresh={() => { }}
                                        onCountChange={setItemCount}
                                    />
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[50vh] text-center text-muted-foreground">
                                <Database className="h-12 w-12 mb-4 opacity-20" />
                                <p>Pilih menu di sidebar untuk mengelola data</p>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}
