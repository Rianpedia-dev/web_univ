import { redirect } from 'next/navigation';

export default function PenerimaanPage({ params }: { params: { locale: string } }) {
  // Redirect to the first submenu item: penerimaan/pendaftaran-pmb
  redirect(`/${params.locale}/penerimaan/pendaftaran-pmb`);
}