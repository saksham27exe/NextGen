
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useLocale } from '@/contexts/LocaleContext'; // Use our custom hook
import { useTranslation } from 'react-i18next'; // Use directly from react-i18next

export default function LanguageToggle() {
  const { locale, setLocale, supportedLanguages, isInitializing } = useLocale();
  const { t } = useTranslation();

  if (isInitializing) {
    // Optionally render a placeholder or skeleton while loading
    return <Button variant="outline" size="icon" disabled><Globe className="h-5 w-5 animate-pulse" /></Button>;
  }

  const currentLanguage = supportedLanguages.find(lang => lang.code === locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label={t('languageToggle.selectLanguage')}>
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuRadioGroup value={locale} onValueChange={setLocale}>
          {supportedLanguages.map((lang) => (
            <DropdownMenuRadioItem key={lang.code} value={lang.code}>
              {lang.englishName} ({lang.name})
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
