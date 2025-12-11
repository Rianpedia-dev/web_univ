import { redirect } from 'next/navigation';

// Redirect dari root ke locale default
export default function RootPage() {
  redirect('/id'); // Ganti dengan locale default yang diinginkan
}