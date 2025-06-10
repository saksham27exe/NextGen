
export interface Language {
  code: string;
  name: string; // Native name
  englishName: string; // English name for display in toggle
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', englishName: 'English' },
  { code: 'hi', name: 'हिन्दी', englishName: 'Hindi' },
  { code: 'es', name: 'Español', englishName: 'Spanish' },
  { code: 'fr', name: 'Français', englishName: 'French' },
  // { code: 'de', name: 'Deutsch', englishName: 'German' }, // Example: Add German if needed
];

export const DEFAULT_LOCALE: Language['code'] = 'en';
