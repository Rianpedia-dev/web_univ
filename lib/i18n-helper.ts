// i18n helper for client components
// This is a simple wrapper for translations

// Default translations
const translations: Record<string, Record<string, string>> = {
    'Navigation.submenus': {
        contact: 'Kontak',
        profile: 'Profil',
        about: 'Tentang Kami',
        accreditation: 'Akreditasi',
        organization: 'Struktur Organisasi',
        // Add more translations as needed
    }
};

export function useTranslations(namespace: string) {
    return (key: string): string => {
        const namespaceTranslations = translations[namespace];
        if (namespaceTranslations && namespaceTranslations[key]) {
            return namespaceTranslations[key];
        }
        // Return the key if no translation found
        return key;
    };
}
