import { redirect } from 'next/navigation';

export default function ProfilPage({ params }: { params: { locale: string } }) {
  // Redirect to the first submenu item: profil/struktur-organisasi
  redirect(`/${params.locale}/profil/struktur-organisasi`);
}