
'use client';

import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

export default function Footer() {
  const { t } = useTranslation();
  const [year, setYear] = useState(new Date().getFullYear());

  // This useEffect is technically not needed for `new Date().getFullYear()`
  // unless you want it to update exactly on Jan 1st without a page reload.
  // For simplicity and avoiding hydration issues, direct usage is fine,
  // but keeping useEffect as it avoids hydration mismatches if the year *could* change.
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);


  return (
    <footer className="py-6 text-center text-sm text-muted-foreground border-t">
      {t('footer.copyright', { year: String(year) })}
    </footer>
  );
}
