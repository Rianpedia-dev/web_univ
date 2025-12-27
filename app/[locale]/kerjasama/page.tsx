import { redirect } from 'next/navigation';

export default async function KerjasamaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Redirect to the first submenu item: kerjasama/partnership
  redirect(`/${locale}/kerjasama/partnership`);
}