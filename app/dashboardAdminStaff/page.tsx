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
    BarChart3
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { uploadFile, getPublicUrl } from "@/lib/storage"
import { VisitorCounter } from "@/components/visitor-counter"

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
}: {
    tableName: string
    tableConfig: TableConfig
    onRefresh: () => void
    readOnly?: boolean
    hideSearch?: boolean
}) => {
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

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
                setTotalPages(Math.ceil(json.data.length / 10))
            }
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            setLoading(false)
        }
    }, [tableName])

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

    const paginatedData = filteredData.slice((currentPage - 1) * 10, currentPage * 10)

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

            <div className="rounded-md border overflow-x-auto">
                <Table>
                    <TableHeader className="bg-background/40">
                        <TableRow className="hover:bg-transparent border-b-2 border-white/10">
                            {tableConfig.fields.map((field, index) => (
                                <TableHead
                                    key={field.key}
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
                                    <Skeleton className="h-4 w-[250px] mx-auto" />
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
                                            key={field.key}
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
                <div className="flex-1 flex items-center justify-start overflow-hidden">
                    {loading ? (
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground/20" />
                    ) : (
                        <div style={{ width: `${(trendData.length / 12) * 100}%`, minWidth: '64px' }} className="h-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={trendData} margin={{ left: -10, right: 0, top: 0, bottom: 0 }}>
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
                                        tick={{ fontSize: 10, fill: '#888' }}
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
                                        radius={[6, 6, 0, 0]}
                                        barSize={24}
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
        <div className="flex flex-col lg:flex-row h-full gap-4 lg:gap-6 p-4 lg:p-6">
            {/* Mobile Header with Hamburger Menu */}
            <div className="lg:hidden flex items-center justify-between mb-2">
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
                            <SheetTitle className="flex items-center gap-2">
                                <Database className="h-5 w-5" />
                                Admin Staff Panel
                            </SheetTitle>
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
                                                className="w-full justify-start gap-2"
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
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Database className="h-5 w-5" />
                            Admin Staff Panel
                        </CardTitle>
                        <CardDescription>
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
            <div className="flex-1 bg-background/50 backdrop-blur-sm border rounded-xl overflow-hidden flex flex-col shadow-sm">
                {/* Mobile Toolbar */}
                <div className="lg:hidden p-4 border-b flex items-center justify-between bg-card">
                    <h2 className="font-semibold text-lg flex items-center gap-2">
                        {currentModule?.icon && <currentModule.icon className={cn("h-5 w-5", currentModule.color)} />}
                        {currentModule?.label || "Dashboard"}
                    </h2>
                </div>

                {/* Desktop Toolbar */}
                <div className="hidden lg:flex p-6 border-b items-center justify-between bg-card/50">
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            {currentModule?.icon && <currentModule.icon className={cn("h-6 w-6", currentModule.color)} />}
                            {currentModule?.label || "Dashboard"}
                        </h2>
                        <p className="text-muted-foreground mt-1">
                            {activeModule === 'home'
                                ? "Ringkasan aktivitas dan pertanyaan pengunjung"
                                : currentTable?.description || `Kelola data ${currentModule?.label?.toLowerCase()}`
                            }
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="px-3 py-1">
                            Role: Admin Staff
                        </Badge>
                    </div>
                </div>

                <ScrollArea className="flex-1">
                    <div className="p-2 lg:p-4 pb-20 lg:pb-6">
                        {activeModule === 'home' ? (
                            <Card className="overflow-hidden border-none shadow-sm bg-card/30">
                                <CardContent className="p-0">
                                    {/* Stats Section */}
                                    <div className="pt-0 pb-4 px-6 border-b bg-gradient-to-br from-background/50 to-transparent">
                                        <div className="flex items-center gap-2 mb-1 text-[11px] font-black text-muted-foreground uppercase tracking-[0.3em]">
                                            <Users className="h-4 w-4 text-blue-500" />
                                            Analitik Pengunjung
                                        </div>
                                        <VisitorStatsView />
                                    </div>

                                    {/* Questions Section */}
                                    <div className="p-8">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center gap-2 text-[11px] font-black text-muted-foreground uppercase tracking-[0.3em]">
                                                <Megaphone className="h-4 w-4 text-blue-500" />
                                                Interaksi Chatbot Terbaru
                                            </div>
                                            <Badge variant="outline" className="text-[9px] bg-blue-500/5 text-blue-500 border-blue-500/20">
                                                Live Updates
                                            </Badge>
                                        </div>

                                        <div className="rounded-xl border bg-background/40 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/20">
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
                                        <div>
                                            <CardTitle className="text-xl">{currentTable.label}</CardTitle>
                                            <CardDescription>{currentTable.description}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="px-0">
                                    <DataTableView
                                        tableName={activeTable}
                                        tableConfig={currentTable}
                                        onRefresh={() => { }}
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
