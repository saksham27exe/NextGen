
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import type { Case, CaseStatus, DocumentUpload, JudgeNote, CaseOrder } from '@/types';
// Dexie/local service imports
import { getCasesByUserId, updateCase, deleteCase as deleteCaseFromDb } from '@/services/local-case-service';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger, // Added AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { format, isValid, parseISO } from 'date-fns';
import { enUS, es, fr, hi } from 'date-fns/locale';
import {
  Gavel, LayoutDashboard, PlusCircle, Edit, Trash2, UploadCloud, MessageSquare, CalendarClock,
  Loader2, Search, ListFilter, ExternalLink, AlertCircle, FileSignature
} from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const availableCaseStatuses: CaseStatus[] = [
  'Pending', 'Filed', 'Investigation', 'In Progress', 'Hearing',
  'Judgement', 'Resolved', 'Appealed', 'On Hold', 'Closed'
];

const dateLocales: { [key: string]: Locale } = {
  en: enUS, es: es, fr: fr, hi: hi,
};

export default function JudgeDashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();

  const [myCases, setMyCases] = useState<Case[]>([]);
  const [originalCases, setOriginalCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<CaseStatus | ''>('');
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [newHearingDate, setNewHearingDate] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [newOrderText, setNewOrderText] = useState('');


  const loadJudgeCases = async () => {
    if (!user || user.role !== 'Judge') {
      setOriginalCases([]);
      setMyCases([]);
      return;
    }
    setIsLoading(true);
    try {
      const judgeCases = await getCasesByUserId(user.id);
      setOriginalCases(judgeCases);
      setMyCases(judgeCases);
    } catch (error) {
      console.error("[JudgeDashboard] Error loading judge cases from Dexie:", error);
      setOriginalCases([]);
      setMyCases([]);
      toast({ variant: "destructive", title: t('error.genericTitle'), description: t('dashboard.error.loadFailed') });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== 'Judge') {
        toast({ variant: "destructive", title: t('toast.accessDenied.title'), description: t('toast.accessDenied.description.judgeDashboard') });
        router.push('/');
      } else {
        loadJudgeCases();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authLoading, router, toast, t, i18n.language]);


   useEffect(() => {
     if (isLoading) return; 

     let filtered = originalCases;

     if (statusFilter !== 'all') {
       filtered = filtered.filter(c => c.status === statusFilter);
     }

     if (searchTerm) {
        const lowerSearch = searchTerm.toLowerCase();
        filtered = filtered.filter(c =>
          c.title.toLowerCase().includes(lowerSearch) ||
          c.caseNumber.toLowerCase().includes(lowerSearch) ||
          (c.plaintiff && c.plaintiff.toLowerCase().includes(lowerSearch)) || // Ensure plaintiff exists
          (c.defendant && c.defendant.toLowerCase().includes(lowerSearch))  // Ensure defendant exists
        );
      }

     setMyCases(filtered);
   }, [statusFilter, searchTerm, originalCases, isLoading]); 


  const formatLocalizedDate = (dateInput: string | undefined | null | Date, formatString: string = 'PPP p') => {
    if (!dateInput) return t('na');
    let date: Date | null = null;
    try {
      if (typeof dateInput === 'string') {
        date = parseISO(dateInput);
      } else if (dateInput instanceof Date) {
         date = dateInput;
      }

       if (date && isValid(date)) {
          return format(date, formatString, { locale: dateLocales[i18n.language] || enUS });
       }
     } catch (e) {
       console.error("Error formatting date:", e, "Input:", dateInput);
     }
     return t('na'); 
  };


  const resetModalStates = () => {
      setIsStatusModalOpen(false);
      setIsNoteModalOpen(false);
      setIsRescheduleModalOpen(false);
      setIsUploadModalOpen(false);
      setIsOrderModalOpen(false);
      setSelectedCase(null);
      setNewStatus('');
      setNewNote('');
      setNewHearingDate('');
      setFileToUpload(null);
      setDocumentName('');
      setNewOrderText('');
      setIsSubmitting(false);
      setIsUploading(false);
    };

  const handleSuccessfulUpdate = (toastTitle: string, toastDescription: string) => {
    toast({ title: toastTitle, description: toastDescription });
    loadJudgeCases(); 
    resetModalStates();
  };

  const handleUpdateStatus = async () => {
    if (selectedCase && newStatus) {
       setIsSubmitting(true);
       try {
           const updates: Partial<Case> = { status: newStatus, lastUpdate: new Date().toISOString() }; 
           await updateCase(selectedCase.caseNumber, updates);
           handleSuccessfulUpdate(
               t('toast.caseUpdated.title'),
               t('toast.caseUpdated.description.status', { caseNumber: selectedCase.caseNumber, status: t(`status.${newStatus}`) })
           );
       } catch (error: any) {
           console.error("[JudgeDashboard] Error updating status:", error);
           toast({ variant: "destructive", title: t('error.genericTitle'), description: error.message || t('toast.updateFailed') });
           setIsSubmitting(false); 
       }
    }
  };

  const handleAddNote = async () => {
    if (selectedCase && newNote.trim() && user) {
       setIsSubmitting(true);
      const note: JudgeNote = {
        text: newNote.trim(),
        date: new Date().toISOString(),
        author: user.name, 
      };
       const updatedNotes = [...(selectedCase.judgeNotes || []), note];
       try {
           const updates: Partial<Case> = { judgeNotes: updatedNotes, lastUpdate: new Date().toISOString() }; 
           await updateCase(selectedCase.caseNumber, updates);
           handleSuccessfulUpdate(
               t('toast.noteAdded.title'),
               t('toast.noteAdded.description', { caseNumber: selectedCase.caseNumber })
           );
       } catch (error: any) {
           console.error("[JudgeDashboard] Error adding note:", error);
           toast({ variant: "destructive", title: t('error.genericTitle'), description: error.message || t('toast.updateFailed') });
           setIsSubmitting(false);
       }
    }
  };

  const handlePassOrder = async () => {
    if (selectedCase && newOrderText.trim() && user) {
      setIsSubmitting(true);
      const order: CaseOrder = {
        text: newOrderText.trim(),
        date: new Date().toISOString(),
        author: user.name, 
      };
      const updatedOrders = [...(selectedCase.orders || []), order];
      try {
        const updates: Partial<Case> = { orders: updatedOrders, lastUpdate: new Date().toISOString() };
        await updateCase(selectedCase.caseNumber, updates);
        handleSuccessfulUpdate(
          t('toast.orderPassed.title'),
          t('toast.orderPassed.description', { caseNumber: selectedCase.caseNumber })
        );
      } catch (error: any) {
        console.error("[JudgeDashboard] Error passing order:", error);
        toast({ variant: "destructive", title: t('error.genericTitle'), description: error.message || t('toast.updateFailed') });
        setIsSubmitting(false);
      }
    }
  };

  const handleRescheduleHearing = async () => {
    if (selectedCase && newHearingDate) {
       setIsSubmitting(true);
      try {
        const parsedDate = new Date(newHearingDate);
        if (!isValid(parsedDate)) throw new Error(t('toast.invalidDate.description'));
        const updates: Partial<Case> = { nextHearingDate: parsedDate.toISOString(), lastUpdate: new Date().toISOString() }; 
        await updateCase(selectedCase.caseNumber, updates);
        handleSuccessfulUpdate(
            t('toast.hearingRescheduled.title'),
            t('toast.hearingRescheduled.description', { caseNumber: selectedCase.caseNumber, date: formatLocalizedDate(parsedDate.toISOString()) })
        );
      } catch (error: any) {
        console.error("Error rescheduling hearing:", error);
        toast({ variant: "destructive", title: t('toast.invalidDate.title'), description: error.message || t('toast.updateFailed') });
         setIsSubmitting(false);
      }
    }
  };

  const handleUploadDocument = async () => {
    if (selectedCase && fileToUpload && documentName.trim() && user) {
        setIsUploading(true);
        setIsSubmitting(true); 
        try {
            const blobUrl = URL.createObjectURL(fileToUpload);
            const newDocument: DocumentUpload = {
                name: documentName.trim(),
                url: blobUrl, 
                uploadedAt: new Date().toISOString(),
                uploadedBy: user.id, 
                fileType: fileToUpload.type,
            };
             const currentDocuments = selectedCase.documents || [];
             const updates: Partial<Case> = { documents: [...currentDocuments, newDocument], lastUpdate: new Date().toISOString() }; 
             await updateCase(selectedCase.caseNumber, updates);
             handleSuccessfulUpdate(
                 t('toast.uploadSuccess.title'),
                 t('toast.uploadSuccess.description', { docName: newDocument.name })
             );
        } catch(error: any) {
             console.error("[JudgeDashboard] Error uploading document:", error);
             toast({ variant: "destructive", title: t('error.genericTitle'), description: error.message || t('toast.uploadFailed') });
             setIsSubmitting(false); 
             setIsUploading(false);
        }
    } else if (!fileToUpload) {
      toast({ variant: "destructive", title: t('toast.noFileSelected.title'), description: t('toast.noFileSelected.description') });
    } else if (!documentName.trim()) {
      toast({ variant: "destructive", title: t('toast.docNameRequired.title'), description: t('toast.docNameRequired.description') });
    }
  };

  const handleDeleteCase = async (caseNumber: string) => {
      if(!caseNumber) return;
      setIsSubmitting(true); 
      try {
          await deleteCaseFromDb(caseNumber); 
          toast({ title: t('toast.caseDeleted.title'), description: t('toast.caseDeleted.description', { caseIdentifier: caseNumber }) });
          loadJudgeCases(); 
          setSelectedCase(null); 
      } catch (error: any) {
          console.error(`[JudgeDashboard] Error deleting case ${caseNumber}:`, error);
          toast({ variant: "destructive", title: t('error.genericTitle'), description: error.message || t('toast.deleteFailed') });
      } finally {
          setIsSubmitting(false); 
      }
  };


  if (authLoading || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-16 w-16 animate-spin text-primary mb-6" />
        <p className="text-xl text-muted-foreground">{t('page.judgeDashboard.loading')}</p>
      </div>
    );
  }

   if (!user || user.role !== 'Judge') {
       return (
           <div className="text-center py-10">
              <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
              <h1 className="text-2xl font-semibold mb-2">{t('toast.accessDenied.title')}</h1>
              <p className="text-muted-foreground">{t('toast.accessDenied.description.judgeDashboard')}</p>
               <Link href="/" className="mt-4 inline-block">
                  <Button variant="outline">{t('page.caseDetail.backToDashboard')}</Button>
              </Link>
           </div>
       );
   }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <LayoutDashboard className="mr-3 h-8 w-8 text-primary" />
          {t('page.judgeDashboard.title')}
        </h1>
         <Button disabled>
            <PlusCircle className="mr-2 h-4 w-4" /> {t('dashboard.addNewCase')} ({t('common.disabled')})
         </Button>
      </div>

       <div className="mb-6 p-4 bg-muted/50 rounded-lg border flex flex-col md:flex-row gap-4 items-center">
         <div className="relative flex-grow w-full md:w-auto">
           <Input
             type="search"
             placeholder={t('page.judgeDashboard.searchPlaceholder')}
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="pl-10 bg-background"
             aria-label={t('page.judgeDashboard.searchPlaceholder')}
           />
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
         </div>
         <div className="flex items-center gap-2 w-full md:w-auto">
           <ListFilter className="h-5 w-5 text-muted-foreground shrink-0" />
           <Select value={statusFilter} onValueChange={setStatusFilter}>
             <SelectTrigger className="w-full md:w-[200px] bg-background" aria-label={t('filterByStatus')}>
               <SelectValue placeholder={t('page.judgeDashboard.filterStatusPlaceholder')} />
             </SelectTrigger>
             <SelectContent>
                <SelectItem value="all">{t('allStatuses')}</SelectItem>
                {availableCaseStatuses.map(status => (
                    <SelectItem key={status} value={status}>
                    {t(`status.${status}`)}
                    </SelectItem>
                ))}
             </SelectContent>
           </Select>
         </div>
       </div>


      {myCases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myCases.map((caseItem) => (
            <Card key={caseItem.caseNumber} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold text-primary">{caseItem.title}</CardTitle>
                   <Link href={`/cases/${caseItem.caseNumber}`} passHref>
                     <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary" aria-label={t('caseCard.viewDetailsAriaLabel', { caseTitle: caseItem.title })}>
                        <ExternalLink className="h-4 w-4"/>
                     </Button>
                   </Link>
                </div>
                <CardDescription className="text-xs text-muted-foreground">
                  {t('caseCard.caseNumber', {caseNumber: caseItem.caseNumber})} | {t('page.judgeDashboard.caseCard.statusPrefix')}<span className="font-medium">{t(`status.${caseItem.status}`)}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm flex-grow">
                <p><strong>{t('caseCard.plaintiff')}:</strong> {caseItem.plaintiff}</p>
                <p><strong>{t('caseCard.defendant')}:</strong> {caseItem.defendant}</p>
                {caseItem.nextHearingDate ? (
                  <p className="text-accent-foreground bg-accent/20 p-1.5 rounded-md">
                    <strong>{t('page.judgeDashboard.caseCard.nextHearingPrefixFull', { date: formatLocalizedDate(caseItem.nextHearingDate, 'PP') })}</strong>
                  </p>
                ) : (
                  <p className="text-muted-foreground italic">
                    {t('page.judgeDashboard.caseCard.noUpcomingHearing')}
                  </p>
                )}
                 <p className="text-xs text-muted-foreground pt-2">{t('page.judgeDashboard.caseCard.lastUpdatedPrefix')} {formatLocalizedDate(caseItem.lastUpdate, 'PP p')}</p>
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-2 pt-4 border-t">
                <Button variant="outline" size="sm" onClick={() => {setSelectedCase(caseItem); setIsStatusModalOpen(true); setNewStatus(caseItem.status)}}>
                  <Edit className="mr-1.5 h-3.5 w-3.5" /> {t('page.judgeDashboard.button.updateStatus')}
                </Button>
                <Button variant="outline" size="sm" onClick={() => {setSelectedCase(caseItem); setIsNoteModalOpen(true); setNewNote('')}}>
                  <MessageSquare className="mr-1.5 h-3.5 w-3.5" /> {t('page.judgeDashboard.button.addNote')}
                </Button>
                <Button variant="outline" size="sm" onClick={() => {
                    setSelectedCase(caseItem);
                    setIsOrderModalOpen(true);
                    setNewOrderText('');
                }}>
                  <FileSignature className="mr-1.5 h-3.5 w-3.5" /> {t('page.judgeDashboard.button.passOrder')}
                </Button>
                <Button variant="outline" size="sm" onClick={() => {
                    setSelectedCase(caseItem);
                    setIsRescheduleModalOpen(true);
                    const existingDate = caseItem.nextHearingDate ? parseISO(caseItem.nextHearingDate) : null;
                    setNewHearingDate(existingDate && isValid(existingDate) ? format(existingDate, "yyyy-MM-dd'T'HH:mm") : '');
                 }}>
                  <CalendarClock className="mr-1.5 h-3.5 w-3.5" /> {t('page.judgeDashboard.button.reschedule')}
                </Button>
                 <Button variant="outline" size="sm" onClick={() => {setSelectedCase(caseItem); setIsUploadModalOpen(true); setDocumentName(''); setFileToUpload(null);}}>
                  <UploadCloud className="mr-1.5 h-3.5 w-3.5" /> {t('page.judgeDashboard.button.upload')}
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" className="col-span-2">
                      <Trash2 className="mr-1.5 h-3.5 w-3.5" /> {t('page.judgeDashboard.button.deleteCase')}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>{t('page.judgeDashboard.modal.delete.title')}</AlertDialogTitle>
                      <AlertDialogDescription>
                        {t('page.judgeDashboard.modal.delete.description.local', { caseIdentifier: caseItem.caseNumber })}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={resetModalStates} disabled={isSubmitting}>{t('cancel')}</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteCase(caseItem.caseNumber)} disabled={isSubmitting}>
                         {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                         {t('page.judgeDashboard.modal.delete.action')}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-card rounded-lg border-2 border-dashed">
          <Gavel className="mx-auto h-20 w-20 text-muted-foreground mb-6" />
          <h2 className="text-2xl font-semibold text-foreground">{t('page.judgeDashboard.noCases.title')}</h2>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            {searchTerm || statusFilter !== 'all'
              ? t('page.judgeDashboard.noCases.description.filtered')
              : t('page.judgeDashboard.noCases.description.empty')}
          </p>
        </div>
      )}

      {/* Modals */}
      {/* Update Status Modal */}
       {selectedCase && (
        <AlertDialog open={isStatusModalOpen} onOpenChange={(isOpen) => { if (!isOpen) resetModalStates(); else setIsStatusModalOpen(true); }}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('page.judgeDashboard.modal.updateStatus.title', { caseNumber: selectedCase.caseNumber })}</AlertDialogTitle>
              <AlertDialogDescription>{t('page.judgeDashboard.modal.updateStatus.description')}</AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-4">
              <Label htmlFor="newStatus">{t('page.judgeDashboard.modal.updateStatus.label')}</Label>
              <Select value={newStatus} onValueChange={(value) => setNewStatus(value as CaseStatus)}>
                <SelectTrigger id="newStatus" aria-label={t('page.judgeDashboard.modal.updateStatus.label')}>
                  <SelectValue placeholder={t('page.judgeDashboard.modal.updateStatus.placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  {availableCaseStatuses.map(status => (
                    <SelectItem key={status} value={status}>{t(`status.${status}`)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={resetModalStates} disabled={isSubmitting}>{t('cancel')}</AlertDialogCancel>
              <AlertDialogAction onClick={handleUpdateStatus} disabled={!newStatus || newStatus === selectedCase.status || isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {t('page.judgeDashboard.modal.updateStatus.action')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

        {/* Add Note Modal */}
        {selectedCase && (
         <AlertDialog open={isNoteModalOpen} onOpenChange={(isOpen) => { if (!isOpen) resetModalStates(); else setIsNoteModalOpen(true); }}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('page.judgeDashboard.modal.addNote.title', { caseNumber: selectedCase.caseNumber })}</AlertDialogTitle>
              <AlertDialogDescription>{t('page.judgeDashboard.modal.addNote.description')}</AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-4">
              <Label htmlFor="newNote">{t('page.judgeDashboard.modal.addNote.label')}</Label>
              <Textarea id="newNote" value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder={t('page.judgeDashboard.modal.addNote.placeholder')} rows={5} />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={resetModalStates} disabled={isSubmitting}>{t('cancel')}</AlertDialogCancel>
              <AlertDialogAction onClick={handleAddNote} disabled={!newNote.trim() || isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {t('page.judgeDashboard.modal.addNote.action')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Pass Order Modal */}
      {selectedCase && (
        <AlertDialog open={isOrderModalOpen} onOpenChange={(isOpen) => { if (!isOpen) resetModalStates(); else setIsOrderModalOpen(true); }}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('page.judgeDashboard.modal.passOrder.title', { caseNumber: selectedCase.caseNumber })}</AlertDialogTitle>
              <AlertDialogDescription>{t('page.judgeDashboard.modal.passOrder.description')}</AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-4">
              <Label htmlFor="newOrderText">{t('page.judgeDashboard.modal.passOrder.label')}</Label>
              <Textarea id="newOrderText" value={newOrderText} onChange={(e) => setNewOrderText(e.target.value)} placeholder={t('page.judgeDashboard.modal.passOrder.placeholder')} rows={6} />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={resetModalStates} disabled={isSubmitting}>{t('cancel')}</AlertDialogCancel>
              <AlertDialogAction onClick={handlePassOrder} disabled={!newOrderText.trim() || isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {t('page.judgeDashboard.modal.passOrder.action')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

       {/* Reschedule Hearing Modal */}
       {selectedCase && (
         <AlertDialog open={isRescheduleModalOpen} onOpenChange={(isOpen) => { if (!isOpen) resetModalStates(); else setIsRescheduleModalOpen(true); }}>
           <AlertDialogContent>
             <AlertDialogHeader>
               <AlertDialogTitle>{t('page.judgeDashboard.modal.reschedule.title', { caseNumber: selectedCase.caseNumber })}</AlertDialogTitle>
               <AlertDialogDescription>
                 {t('page.judgeDashboard.modal.reschedule.currentHearing', { date: formatLocalizedDate(selectedCase.nextHearingDate) || t('page.judgeDashboard.modal.reschedule.currentHearingNotScheduled') })}
               </AlertDialogDescription>
             </AlertDialogHeader>
             <div className="py-4">
               <Label htmlFor="newHearingDate">{t('page.judgeDashboard.modal.reschedule.label')}</Label>
               <Input
                 id="newHearingDate"
                 type="datetime-local"
                 value={newHearingDate}
                 onChange={(e) => setNewHearingDate(e.target.value)}
                 aria-label={t('page.judgeDashboard.modal.reschedule.label')}
               />
             </div>
             <AlertDialogFooter>
                 <AlertDialogCancel onClick={resetModalStates} disabled={isSubmitting}>{t('cancel')}</AlertDialogCancel>
               <AlertDialogAction onClick={handleRescheduleHearing} disabled={!newHearingDate || isSubmitting}>
                 {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                 {t('page.judgeDashboard.modal.reschedule.action')}
               </AlertDialogAction>
             </AlertDialogFooter>
           </AlertDialogContent>
         </AlertDialog>
       )}

      {/* Upload Document Modal */}
       {selectedCase && (
         <AlertDialog open={isUploadModalOpen} onOpenChange={(isOpen) => { if (!isOpen) resetModalStates(); else setIsUploadModalOpen(true); }}>
           <AlertDialogContent>
             <AlertDialogHeader>
               <AlertDialogTitle>{t('page.judgeDashboard.modal.upload.title', { caseNumber: selectedCase.caseNumber })}</AlertDialogTitle>
               <AlertDialogDescription>{t('page.judgeDashboard.modal.upload.description')}</AlertDialogDescription>
             </AlertDialogHeader>
             <div className="py-4 space-y-4">
               <div>
                 <Label htmlFor="documentName">{t('page.judgeDashboard.modal.upload.docNameLabel')}</Label>
                 <Input
                   id="documentName"
                   type="text"
                   value={documentName}
                   onChange={(e) => setDocumentName(e.target.value)}
                   placeholder={t('page.judgeDashboard.modal.upload.docNamePlaceholder')}
                   aria-label={t('page.judgeDashboard.modal.upload.docNameLabel')}
                   disabled={isUploading}
                 />
               </div>
               <div>
                 <Label htmlFor="fileUpload">{t('page.judgeDashboard.modal.upload.fileLabel')}</Label>
                 <Input
                   id="fileUpload"
                   type="file"
                   onChange={(e) => setFileToUpload(e.target.files ? e.target.files[0] : null)}
                   aria-label={t('page.judgeDashboard.modal.upload.fileLabel')}
                   disabled={isUploading}
                   accept="application/pdf" 
                 />
                  {fileToUpload && <p className="text-sm text-muted-foreground mt-1">{t('page.judgeDashboard.modal.upload.fileSelected', { fileName: fileToUpload.name })}</p>}
               </div>
             </div>
             <AlertDialogFooter>
               <AlertDialogCancel onClick={resetModalStates} disabled={isSubmitting || isUploading}>{t('cancel')}</AlertDialogCancel>
               <AlertDialogAction onClick={handleUploadDocument} disabled={!fileToUpload || !documentName.trim() || isSubmitting || isUploading}>
                 {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
                 {isUploading ? t('page.judgeDashboard.button.uploading') : t('page.judgeDashboard.modal.upload.action')}
               </AlertDialogAction>
             </AlertDialogFooter>
           </AlertDialogContent>
         </AlertDialog>
       )}
    </div>
  );
}

