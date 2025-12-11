import { redirect } from 'next/navigation';

export default function BeritaMediaPage({ params }: { params: { locale: string } }) {
  // Redirect to the first submenu item: berita-media/berita
  redirect(`/${params.locale}/berita-media/berita`);
}