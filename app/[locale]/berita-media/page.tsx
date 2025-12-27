import { redirect } from 'next/navigation';

export default async function BeritaMediaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Redirect to the first submenu item: berita-media/berita
  redirect(`/${locale}/berita-media/berita`);
}