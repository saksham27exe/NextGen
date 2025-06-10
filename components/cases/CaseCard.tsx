
'use client';

import type { Case, CaseStatus } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FileText, Gavel, CheckCircle2, AlertCircle, CalendarDays, Scale, Users, Landmark, Search,
  Clock, Activity, PauseCircle, ScrollText, AlertTriangleIcon, Trash2 // Added Trash2
} from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { isValid, parseISO } from 'date-fns';

interface CaseCardProps {
  caseData: Case;
  showDeleteButton?: boolean; // Optional prop to control delete button visibility
  onDelete?: () => void; // Optional callback for delete action
}

const statusIcons: Record<CaseStatus, React.ElementType> = {
  Pending: Clock,
  Filed: FileText,
  Investigation: Search,
  'In Progress': Activity,
  Hearing: Gavel,
  Judgement: ScrollText,
  Resolved: CheckCircle2,
  Appealed: AlertCircle,
  'On Hold': PauseCircle,
  Closed: CheckCircle2,
};

const statusColors: Record<CaseStatus, string> = {
  Pending: 'bg-gray-500/20 text-gray-700 border-gray-500/30',
  Filed: 'bg-blue-500/20 text-blue-700 border-blue-500/30',
  Investigation: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30',
  'In Progress': 'bg-cyan-500/20 text-cyan-700 border-cyan-500/30',
  Hearing: 'bg-purple-500/20 text-purple-700 border-purple-500/30',
  Judgement: 'bg-indigo-500/20 text-indigo-700 border-indigo-500/30',
  Resolved: 'bg-green-500/20 text-green-700 border-green-500/30',
  Appealed: 'bg-orange-500/20 text-orange-700 border-orange-500/30',
  'On Hold': 'bg-pink-500/20 text-pink-700 border-pink-500/30',
  Closed: 'bg-green-700/30 text-green-800 border-green-700/40',
};


export default function CaseCard({ caseData, showDeleteButton = false, onDelete }: CaseCardProps) {
  const { t, i18n } = useTranslation();
  const StatusIcon = statusIcons[caseData.status] || AlertTriangleIcon;
  const statusColorClass = statusColors[caseData.status] || 'bg-gray-500/20 text-gray-700 border-gray-500/30';

  const formatDate = (dateString?: string | Date) => {
    if (!dateString) return t('na');
    let date: Date | null = null;
    try {
      if (typeof dateString === 'string') {
        date = parseISO(dateString);
      } else if (dateString instanceof Date) {
        date = dateString;
      }

      if (date && isValid(date)) {
        return date.toLocaleDateString(i18n.language, { year: 'numeric', month: 'short', day: 'numeric' });
      }
    } catch (e) {
      console.error("Error formatting date:", e);
    }
    return t('na');
  };


  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold text-primary">{caseData.title}</CardTitle>
          <Badge variant="outline" className={`text-sm px-3 py-1 ${statusColorClass}`}>
            <StatusIcon className="mr-2 h-4 w-4" />
            {t(`status.${caseData.status}`)}
          </Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground">{t('caseCard.caseNumber', {caseNumber: caseData.caseNumber})}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 flex-grow">
        <p className="text-sm leading-relaxed line-clamp-3">{caseData.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
            <strong>{t('caseCard.plaintiff')}:</strong><span className="ml-1 truncate" title={caseData.plaintiff}>{caseData.plaintiff}</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
            <strong>{t('caseCard.defendant')}:</strong><span className="ml-1 truncate" title={caseData.defendant}>{caseData.defendant}</span>
          </div>
          <div className="flex items-center">
            <Landmark className="mr-2 h-4 w-4 text-muted-foreground" />
            <strong>{t('caseCard.court')}:</strong><span className="ml-1 truncate" title={caseData.court}>{caseData.court}</span>
          </div>
          {caseData.judgeId && (
            <div className="flex items-center">
              <Scale className="mr-2 h-4 w-4 text-muted-foreground" />
              <strong>{t('caseCard.judge')}:</strong><span className="ml-1 truncate" title={caseData.judge || caseData.judgeId}>{caseData.judge || caseData.judgeId}</span>
            </div>
          )}
          <div className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
            <strong>{t('caseCard.filingDate')}:</strong><span className="ml-1">{formatDate(caseData.filingDate)}</span>
          </div>
          <div className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
            <strong>{t('caseCard.lastUpdate')}:</strong><span className="ml-1">{formatDate(caseData.lastUpdate)}</span>
          </div>
          {caseData.nextHearingDate && (
             <div className="flex items-center text-accent-foreground bg-accent/20 p-2 rounded-md md:col-span-2">
              <CalendarDays className="mr-2 h-4 w-4 text-accent" />
              <strong>{t('caseCard.nextHearing')}:</strong><span className="ml-1 font-semibold">{formatDate(caseData.nextHearingDate)}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-4">
         {/* View Details Button */}
         <Link href={`/cases/${caseData.caseNumber}`} passHref legacyBehavior>
           <Button variant="outline" size="sm" aria-label={t('caseCard.viewDetailsAriaLabel', { caseTitle: caseData.title })}>
             {t('caseCard.viewDetails')}
             <FileText className="ml-2 h-4 w-4" />
           </Button>
         </Link>

         {/* Delete Button (Conditional) */}
         {showDeleteButton && onDelete && (
           <Button
             variant="destructive"
             size="sm"
             onClick={onDelete}
             aria-label={t('caseCard.deleteCaseAriaLabel', { caseTitle: caseData.title })}
           >
             <Trash2 className="mr-2 h-4 w-4" />
             {t('caseCard.deleteButton')}
           </Button>
         )}
      </CardFooter>
    </Card>
  );
}
