"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Car,
  Train,
  Bus,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Zap,
  Shield,
  TrendingUp,
  Lightbulb
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from '@/lib/i18n-helper';

export default function ProfilKontakPage() {
  const t = useTranslations('Navigation.submenus');

  // Data kontak universitas
  const kontak = {
    alamat: "Jl. Pendidikan No. 1, Kota Pendidikan, Indonesia",
    telepon: "(021) 12345678",
    email: "info@university.ac.id",
    website: "www.university.ac.id",
    jamOperasional: "Senin - Jumat: 08:00 - 16:00",
    fax: "(021) 12345679"
  };

  // Data unit di kampus
  const unitKampus = [
    {
      nama: "Rektorat",
      telepon: "(021) 12345680",
      email: "rektorat@university.ac.id",
      jam: "08:00 - 16:00"
    },
    {
      nama: "Akademik",
      telepon: "(021) 12345681",
      email: "akademik@university.ac.id",
      jam: "08:00 - 16:00"
    },
    {
      nama: "Administrasi Umum",
      telepon: "(021) 12345682",
      email: "umum@university.ac.id",
      jam: "08:00 - 16:00"
    },
    {
      nama: "Kemahasiswaan",
      telepon: "(021) 12345683",
      email: "kemahasiswaan@university.ac.id",
      jam: "08:00 - 16:00"
    }
  ];

  // Data akses ke kampus
  const aksesKampus = [
    {
      nama: "Transportasi Umum",
      icon: Bus,
      deskripsi: "Mudah diakses dengan angkutan kota dan bus kota"
    },
    {
      nama: "Stasiun Terdekat",
      icon: Train,
      deskripsi: "Stasiun Pendidikan berjarak 1 km dari kampus"
    },
    {
      nama: "Bandara Terdekat",
      icon: Car,
      deskripsi: "Bandara Internasional berjarak 30 km dari kampus"
    }
  ];

  // Data media sosial
  const mediaSosial = [
    {
      nama: "Facebook",
      icon: Facebook,
      url: "#",
      username: "@universityofficial"
    },
    {
      nama: "Instagram",
      icon: Instagram,
      url: "#",
      username: "@university"
    },
    {
      nama: "Twitter",
      icon: Twitter,
      url: "#",
      username: "@university"
    },
    {
      nama: "YouTube",
      icon: Youtube,
      url: "#",
      username: "Universitas"
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-16 relative z-10">
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
            {t('contact')}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-foreground max-w-2xl mx-auto font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Informasi Kontak dan Lokasi Kampus
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Informasi Kontak */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="glass-card p-6 rounded-2xl border border-white/20 h-full">
              <h2 className="text-xl font-bold mb-6 text-center text-cyber-blue">Kontak Kami</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <MapPin className="w-5 h-5 text-cyber-blue" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Alamat</p>
                    <p className="text-sm text-foreground/70">{kontak.alamat}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Phone className="w-5 h-5 text-electric-purple" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Telepon</p>
                    <p className="text-sm text-foreground/70">{kontak.telepon}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Mail className="w-5 h-5 text-neon-green" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-sm text-foreground/70">{kontak.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Globe className="w-5 h-5 text-accent-pink" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Website</p>
                    <p className="text-sm text-foreground/70">{kontak.website}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Clock className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Jam Operasional</p>
                    <p className="text-sm text-foreground/70">{kontak.jamOperasional}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Phone className="w-5 h-5 text-cyber-blue" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Fax</p>
                    <p className="text-sm text-foreground/70">{kontak.fax}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Peta Lokasi */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="glass-card p-6 rounded-2xl border border-white/20 h-full">
              <h2 className="text-xl font-bold mb-6 text-center text-cyber-blue">Lokasi Kampus</h2>
              <div className="aspect-video bg-gradient-to-br from-cyber-blue/10 to-electric-purple/10 rounded-xl flex items-center justify-center border border-foreground/10">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-cyber-blue mx-auto mb-4" />
                  <p className="text-lg font-semibold text-foreground">Lokasi Kampus</p>
                  <p className="text-foreground/70">Peta Lokasi Kampus Akan Ditampilkan Di Sini</p>
                  <Button className="mt-4 bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                    Lihat Rute
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Unit di Kampus */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-cyber">
            Unit di Kampus
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {unitKampus.map((unit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              >
                <div className="glass-card p-6 rounded-2xl border border-white/20 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300">
                  <h3 className="font-bold text-lg mb-3 text-foreground">{unit.nama}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-cyber-blue" />
                      <span className="text-sm text-foreground/70">{unit.telepon}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-electric-purple" />
                      <span className="text-sm text-foreground/70">{unit.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-neon-green" />
                      <span className="text-sm text-foreground/70">Jam: {unit.jam}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Akses ke Kampus */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Akses ke Kampus
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aksesKampus.map((akses, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              >
                <div className="glass-card p-6 text-center rounded-2xl border border-white/20 hover:shadow-[0_0_30px_rgba(192,132,252,0.1)] transition-all duration-300">
                  <akses.icon className="w-10 h-10 text-electric-purple mx-auto mb-3" />
                  <h3 className="font-semibold mb-2 text-foreground">{akses.nama}</h3>
                  <p className="text-sm text-foreground/70">{akses.deskripsi}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Media Sosial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="glass-card rounded-2xl p-8 border border-white/20"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-foreground">Media Sosial Kampus</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mediaSosial.map((sosial, index) => (
              <motion.a
                key={index}
                href={sosial.url}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.1, duration: 0.5 }}
                className="block"
              >
                <div className="glass-card p-4 text-center rounded-xl border border-white/20 cursor-pointer hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300">
                  <sosial.icon className="w-8 h-8 text-cyber-blue mx-auto mb-2" />
                  <h3 className="font-semibold text-sm text-foreground">{sosial.nama}</h3>
                  <p className="text-xs text-foreground/70">{sosial.username}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}