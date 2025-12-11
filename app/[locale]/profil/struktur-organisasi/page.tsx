"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  GraduationCap,
  BookOpen,
  Award,
  Building2,
  ChevronRight,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Lightbulb
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from '@/lib/i18n-helper';

export default function ProfilStrukturOrganisasiPage() {
  const t = useTranslations('Navigation.submenus');

  // Data struktur organisasi
  const organisasi = {
    rektor: {
      nama: "Prof. Dr. Muhammad Arifin, S.T., M.T.",
      image: "/images/rektor.png",
      jabatan: "Rektor",
      bidang: "Kepemimpinan dan Pengembangan Institusi"
    },
    wakilRektor: [
      {
        nama: "Dr. Siti Aminah, S.E., M.M.",
        image: "/images/wakil-rektor.png",
        jabatan: "Wakil Rektor Bidang Akademik",
        bidang: "Pendidikan dan Kemahasiswaan"
      },
      {
        nama: "Dr. Bambang Prasetyo, S.H., M.H.",
        image: "/images/wakil-rektor.png",
        jabatan: "Wakil Rektor Bidang Administrasi Umum",
        bidang: "Administrasi dan Keuangan"
      },
      {
        nama: "Dr. Rina Kurniawati, S.Si., M.Sc.",
        image: "/images/wakil-rektor.png",
        jabatan: "Wakil Rekor Bidang Kemahasiswaan dan Alumni",
        bidang: "Kemahasiswaan dan Hubungan Alumni"
      },
      {
        nama: "Dr. Agus Santoso, S.T., M.T.",
        image: "/images/wakil-rektor.png",
        jabatan: "Wakil Rektor Bidang Kerjasama dan Teknologi",
        bidang: "Kerjasama dan Teknologi"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4 leading-tight transform transition-all duration-300 hover:scale-105"
            style={{
                background: 'linear-gradient(to right, #10b981, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                WebkitTextStroke: '1px black',
                textShadow: '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(52, 211, 153, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)'
              }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Struktur organisasi
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-foreground max-w-2xl mx-auto font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Struktur Organisasi Universitas
          </motion.p>
        </div>

        {/* Struktur Pimpinan Universitas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-cyber">
            Pimpinan Universitas
          </h2>

          {/* Rektor */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-4 text-center text-cyber-blue">Rektor</h3>
            <div className="glass-card p-6 text-center rounded-2xl border border-white/20">
              <div className="w-24 h-24 rounded-full bg-gradient-cyber flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                <img src={organisasi.rektor.image} alt={organisasi.rektor.jabatan} className="w-full h-full object-cover rounded-full" />
              </div>
              <h4 className="text-xl font-bold mb-1 text-foreground">{organisasi.rektor.nama}</h4>
              <p className="text-lg text-cyber-blue mb-2">{organisasi.rektor.jabatan}</p>
              <p className="text-foreground/70">{organisasi.rektor.bidang}</p>
            </div>
          </div>

          {/* Wakil Rektor */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-center text-electric-purple">Wakil Rektor</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {organisasi.wakilRektor.map((wr, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                >
                  <div className="glass-card p-4 text-center rounded-2xl border border-white/20 h-full hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
                    <div className="w-16 h-16 rounded-full bg-gradient-cyber flex items-center justify-center mx-auto mb-3 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                      <img src={wr.image} alt={wr.jabatan} className="w-full h-full object-cover rounded-full" />
                    </div>
                    <h4 className="font-bold mb-1 text-sm text-foreground">{wr.nama}</h4>
                    <p className="text-xs text-electric-purple mb-1">{wr.jabatan}</p>
                    <p className="text-xs text-foreground/70">{wr.bidang}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}