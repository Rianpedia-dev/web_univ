import {
  getRawEducationCosts,
  getPublishedScholarships,
  getPublishedStudyPrograms,
  getPublishedAdmissionClasses,
  getPublishedAdmissionPathways
} from "@/lib/db";
import BiayaPendidikanView from "./BiayaPendidikanView";

export const dynamic = 'force-dynamic';

export default async function BiayaPendidikanPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  // Fetch all necessary data on the server
  const [
    educationCostsData,
    scholarshipsData,
    studyPrograms,
    admissionClasses,
    admissionPathways
  ] = await Promise.all([
    getRawEducationCosts(),
    getPublishedScholarships(),
    getPublishedStudyPrograms(),
    getPublishedAdmissionClasses(),
    getPublishedAdmissionPathways()
  ]);

  return (
    <BiayaPendidikanView
      initialEducationCosts={educationCostsData as any}
      scholarships={scholarshipsData as any}
      studyPrograms={studyPrograms}
      admissionClasses={admissionClasses}
      admissionPathways={admissionPathways}
      locale={locale}
    />
  );
}
