
'use client';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import type { ChangeEvent, FormEvent } from "react";
import { useTranslation } from 'react-i18next';

interface CaseSearchProps {
  onSearch: (searchTerm: string) => void;
  initialSearchTerm?: string;
}

export default function CaseSearch({ onSearch, initialSearchTerm = '' }: CaseSearchProps) {
  const { t } = useTranslation();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchTerm = formData.get('search') as string;
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-2xl items-center space-x-2 mb-8">
      <Input
        type="search"
        name="search"
        placeholder={t('caseSearch.placeholder')}
        className="flex-grow"
        defaultValue={initialSearchTerm}
        aria-label={t('caseSearch.placeholder')} // Add aria-label for accessibility
      />
      <Button type="submit" variant="outline" size="icon" aria-label={t('caseSearch.buttonLabel')}>
        <Search className="h-5 w-5" />
      </Button>
    </form>
  )
}
