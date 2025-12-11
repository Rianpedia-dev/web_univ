import { redirect } from 'next/navigation';

export default function KerjasamaPage({ params }: { params: { locale: string } }) {
  // Redirect to the first submenu item: kerjasama/partnership
  redirect(`/${params.locale}/kerjasama/partnership`);
}