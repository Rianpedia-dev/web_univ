import { redirect } from 'next/navigation';

export default function AkademikPage({ params }: { params: { locale: string } }) {
  // Redirect to the first submenu item: akademik/program-studi
  redirect(`/${params.locale}/akademik/program-studi`);
}