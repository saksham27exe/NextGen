
'use client';
import type { SVGProps } from 'react';
import { Scale } from 'lucide-react'; // Or any other relevant icon like Gavel
import { useTranslation } from 'react-i18next';

const NextgenEcourtLogo = (props: SVGProps<SVGSVGElement>) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-2" aria-label={t('logo.ariaLabel')}>
      <Scale className="h-8 w-8 text-primary" /> {/* Or Gavel icon */}
      <span className="text-2xl font-semibold text-foreground">
        Nextgen-<span className="text-primary">Ecourt</span> {/* App name might not need translation here, but aria-label does */}
      </span>
    </div>
  );
};

export default NextgenEcourtLogo;
