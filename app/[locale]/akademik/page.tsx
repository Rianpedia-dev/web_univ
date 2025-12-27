import { redirect } from 'next/navigation';

export default async function AkademikPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Redirect to the first submenu item: akademik/program-studi
  redirect(`/${locale}/akademik/program-studi`);
}