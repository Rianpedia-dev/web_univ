import { redirect } from 'next/navigation';

export default async function PenerimaanPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Redirect to the first submenu item: penerimaan/pendaftaran-pmb
  redirect(`/${locale}/penerimaan/pendaftaran-pmb`);
}