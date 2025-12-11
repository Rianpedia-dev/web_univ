import { redirect } from 'next/navigation';

export default function KemahasiswaanPage({ params }: { params: { locale: string } }) {
  // Redirect to the first submenu item: kemahasiswaan/layanan-mahasiswa
  redirect(`/${params.locale}/kemahasiswaan/layanan-mahasiswa`);
}