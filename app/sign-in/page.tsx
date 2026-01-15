import { getPublishedUniversityProfile } from "@/lib/db";
import SignInForm from "./sign-in-form";

export const metadata = {
    title: "Sign In - Administration Portal",
    description: "Login page for university administration staff",
};

export default async function SignInPage() {
    const profileData = await getPublishedUniversityProfile();
    const universityProfile = profileData && profileData.length > 0 ? profileData[0] : null;

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-transparent">
            {/* Background elements for premium feel */}

            <div className="relative z-10 w-full flex justify-center">
                <SignInForm
                    universityName={universityProfile?.name}
                    universityLogo={universityProfile?.logo || undefined}
                />
            </div>

            {/* Footer decoration */}
            <div className="absolute bottom-6 left-0 right-0 z-10 text-center">
                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium tracking-[0.2em] uppercase">
                    &copy; {new Date().getFullYear()} {universityProfile?.shortName || "UR"} Powered by {universityProfile?.name?.replace("Universitas ", "") || "Rianpedia"}
                </p>
            </div>
        </div>
    );
}
