import { redirect } from 'next/navigation';

export default async function KemahasiswaanPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Redirect to the first submenu item: kemahasiswaan/layanan-mahasiswa
  redirect(`/${locale}/kemahasiswaan/layanan-mahasiswa`);
}