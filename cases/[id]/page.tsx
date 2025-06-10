
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
// Dexie/local service imports
import { getCaseById, updateCase } from '@/services/local-case-service'; 

import type { Case, DocumentUpload, JudgeNote, CaseOrder } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft, CalendarDays, FileText, Gavel, Landmark, Scale, User, Users, CheckCircle2, AlertCircle, Search,
  Download, MessageSquare, Clock, Activity, PauseCircle, ScrollText, AlertTriangleIcon, LayoutDashboard, FileSignature,
  UploadCloud, Loader2 
} from 'lucide-react'; 
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { isValid, parseISO, format } from 'date-fns'; // Ensure format is imported
import { enUS, es, fr, hi } from 'date-fns/locale';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const statusIcons: Record<Case['status'], React.ElementType> = {
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

const statusColors: Record<Case['status'], string> = {
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

const dateLocales: { [key: string]: Locale } = {
  en: enUS, es: es, fr: fr, hi: hi,
};

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string | undefined | null;
  highlight?: boolean;
}

const InfoItem = ({ icon: Icon, label, value, highlight }: InfoItemProps) => {
    const { t } = useTranslation(); 
    return (
      <div className={`flex items-start space-x-3 p-3 rounded-md border ${highlight ? 'bg-primary/10 border-primary/30' : 'bg-background'}`}>
        <Icon className={`h-5 w-5 mt-1 flex-shrink-0 ${highlight ? 'text-primary' : 'text-muted-foreground'}`} />
        <div>
          <p className={`text-sm font-medium ${highlight ? 'text-primary font-semibold' : 'text-foreground'}`}>{label}</p>
          <p className={`text-sm ${highlight ? 'text-primary/90' : 'text-muted-foreground'}`}>{value || t('na')}</p>
        </div>
      </div>
    );
};


export default function CaseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const caseNumberParam = params.id as string; 
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();

  // State for new document upload modal
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [documentNameToUpload, setDocumentNameToUpload] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const isCourtOfficial = user?.role === 'CourtOfficial';

  const formatLocalizedDate = (dateInput: string | undefined | null | Date, formatString: string = 'PPP p', options: { locale?: Locale } = {}) => {
    if (!dateInput) return t('na');
    let date: Date | null = null;
    try {
      if (typeof dateInput === 'string') {
        date = parseISO(dateInput);
      } else if (dateInput instanceof Date) {
        date = dateInput;
      }
  
      if (date && isValid(date)) {
        return format(date, formatString, { locale: options.locale || dateLocales[i18n.language] || enUS });
      }
    } catch (e) {
      console.error("Error formatting date:", e, "Input:", dateInput);
    }
    return t('na');
  };


  useEffect(() => {
    const fetchCase = async () => {
      if (!caseNumberParam) {
        setLoading(false);
        return;
      }
      if (!user) {
         setLoading(false);
         return;
      }

      setLoading(true);
      try {
        const foundCase = await getCaseById(caseNumberParam);

        if (foundCase) {
           const isJudge = user.role === 'Judge' && user.id === foundCase.judgeId;
           const isOfficial = user.role === 'CourtOfficial'; 
           const isPlaintiff = user.role === 'Plaintiff' && user.id === foundCase.plaintiffId;
           const isDefendant = user.role === 'Defendant' && user.id === foundCase.defendantId;
           const isLawyer = user.role === 'Lawyer' && foundCase.lawyerIds?.includes(user.id);

           if (isJudge || isOfficial || isPlaintiff || isDefendant || isLawyer) {
             setCaseData(foundCase);
           } else {
             toast({ variant: "destructive", title: t('toast.accessDenied.title'), description: t('page.caseDetail.accessDenied') });
             router.push('/'); 
             setCaseData(null); 
           }
        } else {
          toast({ variant: "destructive", title: t('page.caseDetail.notFoundTitle'), description: t('page.caseDetail.notFound', { caseId: caseNumberParam }) });
          router.push('/'); 
        }
      } catch (error) {
         console.error(`[CaseDetail] Error fetching case ${caseNumberParam} from Dexie:`, error);
         toast({ variant: "destructive", title: t('error.genericTitle'), description: t('page.caseDetail.loadError') });
         router.push('/');
      } finally {
          setLoading(false);
      }
    };

    if (!authLoading && caseNumberParam) {
        if (user) {
            fetchCase();
        } else {
            toast({ variant: "destructive", title: t('toast.accessDenied.title'), description: t('accessDenied.loginRequired.page', { pageName: t('page.caseDetail.pageName') }) });
            router.push('/login');
             setLoading(false);
        }
    }

  }, [caseNumberParam, user, authLoading, router, toast, t, i18n.language]);

  const resetUploadModalStates = () => {
    setIsUploadModalOpen(false);
    setFileToUpload(null);
    setDocumentNameToUpload('');
    setIsUploading(false);
  };

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ACCEPTED_FILE_TYPES = ['application/pdf'];

  const handleUploadNewDocument = async () => {
    if (!caseData || !user || !fileToUpload || !documentNameToUpload.trim()) {
      if (!fileToUpload) {
        toast({ variant: "destructive", title: t('toast.noFileSelected.title'), description: t('toast.noFileSelected.description') });
      }
      if (!documentNameToUpload.trim()) {
        toast({ variant: "destructive", title: t('toast.docNameRequired.title'), description: t('toast.docNameRequired.description') });
      }
      return;
    }

    if (fileToUpload.size > MAX_FILE_SIZE) {
      toast({ variant: "destructive", title: t('error.genericTitle'), description: t('page.addCase.error.documentSize', {maxSize: MAX_FILE_SIZE / 1024 / 1024})});
      return;
    }
    if (!ACCEPTED_FILE_TYPES.includes(fileToUpload.type)) {
      toast({ variant: "destructive", title: t('error.genericTitle'), description: t('page.addCase.error.documentType') });
      return;
    }

    setIsUploading(true);
    try {
      const blobUrl = URL.createObjectURL(fileToUpload);
      const newDocument: DocumentUpload = {
        name: documentNameToUpload.trim(),
        url: blobUrl,
        uploadedAt: new Date().toISOString(),
        uploadedBy: user.id,
        fileType: fileToUpload.type,
      };

      const updatedDocuments = [...(caseData.documents || []), newDocument];
      const updates: Partial<Case> = { documents: updatedDocuments, lastUpdate: new Date().toISOString() };
      await updateCase(caseData.caseNumber, updates);

      setCaseData(prevCaseData => prevCaseData ? { ...prevCaseData, documents: updatedDocuments, lastUpdate: new Date().toISOString() } : null);

      toast({
        title: t('toast.newDocUploadSuccess.title'),
        description: t('toast.newDocUploadSuccess.description', { docName: newDocument.name, caseNumber: caseData.caseNumber }),
      });
      // Removed Blob URL warning toast
      resetUploadModalStates();
    } catch (error: any) {
      console.error("[CaseDetail] Error uploading new document:", error);
      toast({
        variant: "destructive",
        title: t('toast.newDocUploadFailed.title'),
        description: error.message || t('toast.newDocUploadFailed.description'),
      });
    } finally {
      setIsUploading(false);
    }
  };


  if (authLoading || loading) {
    return (
       <div className="space-y-6 animate-pulse max-w-5xl mx-auto p-4 md:p-6">
         <Skeleton className="h-10 w-24 mb-6" />
         <Card>
           <CardHeader className="border-b pb-4 bg-muted/30">
             <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
               <div>
                 <Skeleton className="h-8 w-3/4 mb-2" />
                 <Skeleton className="h-4 w-1/2" />
               </div>
               <Skeleton className="h-10 w-32 rounded-md" />
             </div>
           </CardHeader>
           <CardContent className="pt-6 space-y-8">
             <div>
                <Skeleton className="h-6 w-1/4 mb-3" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-5/6" />
             </div>
             <div>
               <Skeleton className="h-6 w-1/4 mb-3" />
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {[...Array(6)].map((_, i) => (
                   <Skeleton key={i} className="h-16 w-full rounded-md" />
                 ))}
               </div>
             </div>
             <div>
                <Skeleton className="h-6 w-1/4 mb-3" />
                <Skeleton className="h-12 w-full rounded-md mb-3" />
                <Skeleton className="h-12 w-full rounded-md" />
             </div>
              {/* Skeleton for orders */}
             <div>
                <Skeleton className="h-6 w-1/4 mb-3" />
                <Skeleton className="h-12 w-full rounded-md mb-3" />
                <Skeleton className="h-12 w-full rounded-md" />
             </div>
             <div className="mt-8 pt-6 border-t">
               <Skeleton className="h-6 w-1/4 mb-4" />
               <Skeleton className="h-24 w-full rounded-md" />
             </div>
           </CardContent>
           <CardFooter className="bg-muted/30 p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
             <Skeleton className="h-10 w-36 rounded-md" />
             <div className="flex gap-2 flex-wrap justify-center">
                <Skeleton className="h-10 w-28 rounded-md" />
                <Skeleton className="h-10 w-28 rounded-md" />
                <Skeleton className="h-10 w-36 rounded-md" />
             </div>
           </CardFooter>
         </Card>
         <p className="text-center text-muted-foreground">{t('page.caseDetail.loading')}</p>
       </div>
    );
  }

  if (!caseData) {
    return (
        <div className="text-center py-10">
            <AlertTriangleIcon className="mx-auto h-12 w-12 text-destructive mb-4" />
            <h1 className="text-2xl font-semibold mb-2">{t('page.caseDetail.notFoundTitle')}</h1>
            <p className="text-muted-foreground">{t('page.caseDetail.caseNotAvailable')}</p>
            <Link href="/" className="mt-4 inline-block">
                <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" /> {t('page.caseDetail.backToDashboard')}
                </Button>
            </Link>
        </div>
    );
  }

  const StatusIcon = statusIcons[caseData.status] || AlertTriangleIcon;
  const statusColorClass = statusColors[caseData.status] || 'bg-gray-500/20 text-gray-700 border-gray-500/30';
  const isJudgeAssignedToCase = user?.role === 'Judge' && user.id === caseData.judgeId;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6">
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> {t('page.caseDetail.backButton')}
      </Button>

      <Card className="shadow-xl overflow-hidden">
        <CardHeader className="border-b pb-4 bg-muted/30">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <CardTitle className="text-3xl font-bold text-primary">{caseData.title}</CardTitle>
              <CardDescription className="text-md text-muted-foreground mt-1">
                {t('page.caseDetail.caseNumberPrefix', { caseNumber: caseData.caseNumber })}
              </CardDescription>
            </div>
            <Badge variant="outline" className={`text-lg px-4 py-2 rounded-md shrink-0 ${statusColorClass}`}>
              <StatusIcon className="mr-2 h-5 w-5" />
              {t(`status.${caseData.status}`)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-8">
          <Section title={t('page.caseDetail.section.overview')}>
            <p className="text-foreground leading-relaxed whitespace-pre-line">{caseData.description}</p>
          </Section>

          <Section title={t('page.caseDetail.section.details')}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
              <InfoItem icon={Users} label={t('page.caseDetail.info.plaintiff')} value={caseData.plaintiffId} />
              <InfoItem icon={Users} label={t('page.caseDetail.info.defendant')} value={caseData.defendantId} />
              <InfoItem icon={Landmark} label={t('page.caseDetail.info.court')} value={caseData.court} />
              {caseData.judgeId && <InfoItem icon={Scale} label={t('page.caseDetail.info.judge')} value={caseData.judge || caseData.judgeId} />}
              {caseData.urgency && <InfoItem icon={AlertTriangleIcon} label={t('page.caseDetail.info.urgency')} value={t(`urgency.${caseData.urgency}`)} highlight={caseData.urgency === 'High'} />}
              <InfoItem icon={CalendarDays} label={t('page.caseDetail.info.filingDate')} value={formatLocalizedDate(caseData.filingDate, 'PP')} />
              <InfoItem icon={CalendarDays} label={t('page.caseDetail.info.lastUpdated')} value={formatLocalizedDate(caseData.lastUpdate, 'PP p')} />
              {caseData.nextHearingDate && (
                <InfoItem icon={CalendarDays} label={t('page.caseDetail.info.nextHearingDate')} value={formatLocalizedDate(caseData.nextHearingDate, 'PP p')} highlight />
              )}
            </div>
          </Section>

          {caseData.documents && caseData.documents.length > 0 && (
            <Section title={t('page.caseDetail.section.documents')}>
              <div className="space-y-3">
                {caseData.documents.map((doc, index) => (
                  <DocumentItem key={index} doc={doc} formatDate={formatLocalizedDate} />
                ))}
              </div>
            </Section>
          )}
           {(!caseData.documents || caseData.documents.length === 0) && (
             <Section title={t('page.caseDetail.section.documents')}>
                <p className="text-muted-foreground italic">{t('page.caseDetail.noDocuments')}</p>
            </Section>
          )}


          {caseData.judgeNotes && caseData.judgeNotes.length > 0 && (
             <Section title={t('page.caseDetail.section.judgeNotes')}>
              <div className="space-y-3">
                {caseData.judgeNotes.map((note, index) => (
                  <NoteItem key={index} note={note} formatDate={formatLocalizedDate} />
                ))}
              </div>
            </Section>
          )}

          {caseData.orders && caseData.orders.length > 0 && (
            <Section title={t('page.caseDetail.section.orders')}>
              <div className="space-y-3">
                {caseData.orders.map((order, index) => (
                  <OrderItem key={index} order={order} formatDate={formatLocalizedDate} />
                ))}
              </div>
            </Section>
          )}
          {(!caseData.orders || caseData.orders.length === 0) && (
             <Section title={t('page.caseDetail.section.orders')}>
                <p className="text-muted-foreground italic">{t('page.caseDetail.noOrders')}</p>
            </Section>
          )}


          <div className="mt-8 pt-6 border-t">
            <h3 className="text-xl font-semibold mb-4">{t('page.caseDetail.section.timeline')}</h3>
            <div className="text-center text-muted-foreground py-8">
              <CalendarDays className="mx-auto h-12 w-12 mb-2" />
              <p>{t('page.caseDetail.timelineComingSoon')}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
           <Link href={`/summaries?caseId=${caseData.caseNumber}`}>
             <Button className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
               <Search className="mr-2 h-4 w-4" /> {t('page.caseDetail.button.aiSummary')}
             </Button>
           </Link>
           <div className="flex gap-2 flex-wrap justify-center items-center">
            {isJudgeAssignedToCase && (
              <>
                <span className='text-sm text-muted-foreground italic mr-2'>{t('judgeActionsPrompt')}</span>
                <Link href="/judge-dashboard">
                    <Button variant="outline">
                    <LayoutDashboard className="mr-2 h-4 w-4" /> {t('goToJudgeDashboard')}
                    </Button>
                </Link>
              </>
            )}
            {isCourtOfficial && (
                <Button onClick={() => setIsUploadModalOpen(true)} variant="outline">
                    <UploadCloud className="mr-2 h-4 w-4" /> {t('page.caseDetail.button.uploadNewDocument')}
                </Button>
            )}
           </div>
        </CardFooter>
      </Card>

      {/* Upload New Document Modal for Court Official */}
      {caseData && isCourtOfficial && (
        <AlertDialog open={isUploadModalOpen} onOpenChange={(isOpen) => { if (!isOpen) resetUploadModalStates(); else setIsUploadModalOpen(true); }}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('page.caseDetail.modal.uploadNew.title', { caseNumber: caseData.caseNumber })}</AlertDialogTitle>
              <AlertDialogDescription>{t('page.caseDetail.modal.uploadNew.description')}</AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-4 space-y-4">
              <div>
                <Label htmlFor="newDocumentName">{t('page.caseDetail.modal.uploadNew.docNameLabel')}</Label>
                <Input
                  id="newDocumentName"
                  type="text"
                  value={documentNameToUpload}
                  onChange={(e) => setDocumentNameToUpload(e.target.value)}
                  placeholder={t('page.caseDetail.modal.uploadNew.docNamePlaceholder')}
                  disabled={isUploading}
                  aria-label={t('page.caseDetail.modal.uploadNew.docNameLabel')}
                />
              </div>
              <div>
                <Label htmlFor="newFileUpload">{t('page.caseDetail.modal.uploadNew.fileLabel')}</Label>
                <Input
                  id="newFileUpload"
                  type="file"
                  onChange={(e) => setFileToUpload(e.target.files ? e.target.files[0] : null)}
                  disabled={isUploading}
                  accept="application/pdf"
                  aria-label={t('page.caseDetail.modal.uploadNew.fileLabel')}
                />
                {fileToUpload && <p className="text-sm text-muted-foreground mt-1">{t('page.judgeDashboard.modal.upload.fileSelected', { fileName: fileToUpload.name })}</p>}
              </div>
              <p className="text-xs text-muted-foreground">{t('page.addCase.hint.documentUpload', {maxSize: MAX_FILE_SIZE / 1024 / 1024})}</p>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={resetUploadModalStates} disabled={isUploading}>{t('cancel')}</AlertDialogCancel>
              <AlertDialogAction onClick={handleUploadNewDocument} disabled={!fileToUpload || !documentNameToUpload.trim() || isUploading}>
                {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
                {isUploading ? t('page.caseDetail.modal.uploadNew.uploading') : t('page.caseDetail.modal.uploadNew.action')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}

interface SectionProps { title: string; children: React.ReactNode; }
const Section = ({ title, children }: SectionProps) => (
  <div>
    <h3 className="text-xl font-semibold mb-3 border-b pb-2 text-primary">{title}</h3>
    {children}
  </div>
);


interface DocumentItemProps {
  doc: DocumentUpload;
  formatDate: (dateInput: string | Date, formatStr?: string) => string;
}
const DocumentItem = ({ doc, formatDate }: DocumentItemProps) => {
  const { toast } = useToast();
  const { t } = useTranslation(); 

  const handleDownload = () => {
    toast({
      title: t('page.caseDetail.toast.downloadStarted.title'),
      description: t('page.caseDetail.toast.downloadStarted.description', { fileName: doc.name }),
    });
     if(doc.url && doc.url.startsWith('blob:')) {
        window.open(doc.url, '_blank');
     } else {
         toast({ variant: "destructive", title: t('error.genericTitle'), description: t('page.caseDetail.downloadError') });
     }
  };

  return (
    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md border hover:shadow-sm transition-shadow">
      <div className="flex items-center space-x-3 overflow-hidden mr-2">
        <FileText className="h-6 w-6 text-primary flex-shrink-0" />
        <div className="overflow-hidden">
           <p className="text-sm font-medium text-foreground truncate" title={doc.name}>{doc.name}</p>
          <p className="text-xs text-muted-foreground">
             {t('page.caseDetail.docItem.uploadedByOn', { uploader: doc.uploadedBy, date: formatDate(doc.uploadedAt, 'PP')})}
            {doc.fileType && ` (${doc.fileType})`}
          </p>
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={handleDownload} aria-label={t('page.caseDetail.docItem.downloadAriaLabel', { docName: doc.name })}>
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
};

interface NoteItemProps {
  note: JudgeNote;
  formatDate: (dateInput: string | Date, formatStr?: string) => string;
}
const NoteItem = ({ note, formatDate }: NoteItemProps) => {
   const { t } = useTranslation(); 
  return (
  <div className="p-3 bg-muted/50 rounded-md border">
    <p className="text-sm text-foreground whitespace-pre-wrap">{note.text}</p>
    <p className="text-xs text-muted-foreground mt-2">
       {t('page.caseDetail.noteItem.byOn', { author: note.author, date: formatDate(note.date, 'PP p') })}
    </p>
  </div>
)};

interface OrderItemProps {
  order: CaseOrder;
  formatDate: (dateInput: string | Date, formatStr?: string) => string;
}
const OrderItem = ({ order, formatDate }: OrderItemProps) => {
  const { t } = useTranslation();
  return (
    <div className="p-3 bg-primary/5 rounded-md border border-primary/20 shadow-sm">
      <div className="flex items-center mb-1">
        <FileSignature className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
        <p className="text-sm font-semibold text-primary">{t('page.caseDetail.orderItem.title')}</p>
      </div>
      <p className="text-sm text-foreground whitespace-pre-wrap">{order.text}</p>
      <p className="text-xs text-muted-foreground mt-2">
        {t('page.caseDetail.orderItem.passedByOn', { author: order.author, date: formatDate(order.date, 'PP p') })}
      </p>
    </div>
  );
};

