import { redirect } from 'next/navigation';

export default async function ProfilPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Redirect to the first submenu item: profil/struktur-organisasi
  redirect(`/${locale}/profil/struktur-organisasi`);
}