"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  GraduationCap,
  FileText,
  Settings,
  User,
  Shield,
  BarChart3
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from '@/lib/i18n-helper';
import { getCurrentUser, isAdmin, ROLES } from "@/lib/auth/role";

export default function DashboardPage() {
  // Dalam aplikasi nyata, Anda akan mengambil data pengguna dari server component
  // Untuk saat ini, saya akan menunjukkan contoh tampilan dashboard
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Dashboard Admin
          </motion.h1>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Panel kontrol untuk mengelola konten dan pengguna
          </motion.p>
        </div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 futuristic-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Pengguna</p>
                <p className="text-2xl font-bold">12,580</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 futuristic-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Program Studi</p>
                <p className="text-2xl font-bold">42</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 futuristic-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Konten Baru</p>
                <p className="text-2xl font-bold">142</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/30 dark:to-teal-900/30 futuristic-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Aktif Hari Ini</p>
                <p className="text-2xl font-bold">2,340</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-cyan-500" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Admin Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Tindakan Admin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 text-center bg-white dark:bg-gray-800 border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mx-auto mb-4">
                <User className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Manajemen Pengguna</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Tambah, edit, atau hapus akun pengguna</p>
              <Button variant="outline" className="w-full">
                Kelola Pengguna
              </Button>
            </Card>

            <Card className="p-6 text-center bg-white dark:bg-gray-800 border-l-4 border-l-green-500 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Manajemen Konten</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Tambah, edit, atau hapus konten publik</p>
              <Button variant="outline" className="w-full">
                Kelola Konten
              </Button>
            </Card>

            <Card className="p-6 text-center bg-white dark:bg-gray-800 border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mx-auto mb-4">
                <Settings className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Pengaturan Sistem</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Konfigurasi sistem dan pengaturan umum</p>
              <Button variant="outline" className="w-full">
                Pengaturan
              </Button>
            </Card>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Aktivitas Terbaru</h2>
            <Button variant="outline">
              Lihat Semua
            </Button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Admin baru ditambahkan</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">oleh Super Admin - 2 menit yang lalu</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Berita baru dipublikasikan</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Teknik Informatika - 15 menit yang lalu</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                <User className="w-5 h-5 text-purple-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Pengguna mendaftar</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">John Doe - 30 menit yang lalu</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}