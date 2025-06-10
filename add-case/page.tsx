
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2, PlusCircle, Upload } from 'lucide-react';
import type { Case, CaseStatus, DocumentUpload } from '@/types';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { addCase as saveCaseToDb } from '@/services/local-case-service'; // Import the Dexie service function

// Available roles for assignment - No longer used for dropdowns, kept for reference maybe
// const assignableRoles: Exclude<UserRole, 'CourtOfficial'>[] = ['Lawyer', 'Plaintiff', 'Defendant', 'Judge'];
const caseStatuses: CaseStatus[] = ['Pending', 'Filed', 'Investigation', 'In Progress', 'Hearing', 'Judgement', 'Resolved', 'Appealed', 'On Hold', 'Closed'];
const caseUrgencies: Case['urgency'][] = ['Low', 'Medium', 'High'];

// Max file size (e.g., 5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ['application/pdf'];

// Validation schema using Zod - updated to include optional document upload
const addCaseSchemaFactory = (t: Function) => z.object({
  title: z.string().min(5, { message: t('page.addCase.error.titleMin') }),
  description: z.string().min(10, { message: t('page.addCase.error.descriptionMin') }),
  caseNumber: z.string().regex(/^[A-Z0-9-]+$/, { message: t('page.addCase.error.caseNumberFormat') }).min(1, {message: t('page.addCase.error.caseNumberRequired')}),
  court: z.string().min(3, { message: t('page.addCase.error.courtMin') }),
  plaintiffName: z.string().min(2, { message: t('page.addCase.error.plaintiffNameMin') }),
  defendantName: z.string().min(2, { message: t('page.addCase.error.defendantNameMin') }),
  status: z.enum(caseStatuses as [string, ...string[]], { required_error: t('page.addCase.error.statusRequired') }),
  urgency: z.enum(caseUrgencies as [string, ...string[]], { required_error: t('page.addCase.error.urgencyRequired') }),
  assignedPlaintiffEmail: z.string().email({ message: t('page.addCase.error.plaintiffEmailFormat') }).min(1, { message: t('page.addCase.error.plaintiffEmailRequired') }),
  assignedDefendantEmail: z.string().email({ message: t('page.addCase.error.defendantEmailFormat') }).min(1, { message: t('page.addCase.error.defendantEmailRequired') }),
  assignedJudgeEmail: z.string().email({ message: t('page.addCase.error.judgeEmailFormat') }).optional().or(z.literal('')),
  assignedLawyerEmail: z.string().email({ message: t('page.addCase.error.lawyerEmailFormat') }).optional().or(z.literal('')),
  document: z
    .custom<FileList>((val) => val instanceof FileList, t('page.addCase.error.documentInvalid'))
    .optional()
    .refine((files) => !files || files.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE, t('page.addCase.error.documentSize', { maxSize: MAX_FILE_SIZE / 1024 / 1024 }))
    .refine((files) => !files || files.length === 0 || ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), t('page.addCase.error.documentType')),
});

type AddCaseFormValues = z.infer<ReturnType<typeof addCaseSchemaFactory>>;

export default function AddCasePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addCaseSchema = addCaseSchemaFactory(t);

  const form = useForm<AddCaseFormValues>({
    resolver: zodResolver(addCaseSchema),
    defaultValues: {
      title: '',
      description: '',
      caseNumber: '',
      court: '',
      plaintiffName: '',
      defendantName: '',
      status: 'Filed',
      urgency: 'Medium',
      assignedPlaintiffEmail: '',
      assignedDefendantEmail: '',
      assignedJudgeEmail: '',
      assignedLawyerEmail: '',
      document: undefined,
    },
  });

  // Redirect if user is not a Court Official or not logged in
  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'CourtOfficial')) {
      toast({
        variant: "destructive",
        title: t('toast.accessDenied.title'),
        description: t('page.addCase.accessDenied'),
      });
      router.push('/');
    }
  }, [user, authLoading, router, toast, t]);

  // --- Case Addition using Dexie ---
  const onSubmit = async (data: AddCaseFormValues) => {
    setError(null);
    setIsSubmitting(true);

    if (!user || user.role !== 'CourtOfficial') {
      setError(t('page.addCase.accessDenied'));
      setIsSubmitting(false);
      return;
    }

    const now = new Date().toISOString();
    let uploadedDocument: DocumentUpload | undefined = undefined;

    // Handle file upload
    const file = data.document?.[0];
    if (file) {
        try {
            console.log(`[AddCase] Processing file: ${file.name}, Size: ${file.size}, Type: ${file.type}`);
            // Create a Blob URL (TEMPORARY - only valid for the current browser session)
            const blobUrl = URL.createObjectURL(file);
            console.log(`[AddCase] Created Blob URL: ${blobUrl}`);

            uploadedDocument = {
                name: file.name,
                url: blobUrl, // Use the temporary Blob URL for local demo
                uploadedAt: now,
                uploadedBy: user.id, // User email
                fileType: file.type,
            };
            // Removed Blob URL warning toast

        } catch (fileError) {
            console.error("Error processing file:", fileError);
            setError(t('page.addCase.error.documentProcessing'));
            setIsSubmitting(false);
            return;
        }
    }

    // Construct the case object matching the Case type
    const newCase: Case = {
      caseNumber: data.caseNumber,
      title: data.title,
      status: data.status,
      court: data.court,
      judgeId: data.assignedJudgeEmail || undefined,
      plaintiff: data.plaintiffName,
      plaintiffId: data.assignedPlaintiffEmail,
      defendant: data.defendantName,
      defendantId: data.assignedDefendantEmail,
      lawyerIds: data.assignedLawyerEmail ? [data.assignedLawyerEmail] : [],
      addedBy: user.id,
      filingDate: now,
      lastUpdate: now,
      description: data.description,
      urgency: data.urgency,
      documents: uploadedDocument ? [uploadedDocument] : [], // Add document if uploaded
      judgeNotes: [],
      orders: [],
    };

    console.log("Attempting to save case to Dexie:", newCase);

    try {
      const savedCaseNumber = await saveCaseToDb(newCase);

      toast({
        title: t('page.addCase.successTitle'),
        description: t('page.addCase.successDescription.saved', { caseNumber: savedCaseNumber }),
      });

      form.reset(); // Reset form after successful submission
    } catch (err: any) {
       console.error("Error saving case:", err);
       if (err.message === 'CASE_NUMBER_EXISTS' && err.caseNumber) {
           const errorMessage = t('page.addCase.error.caseNumberDuplicate', { caseNumber: err.caseNumber });
           setError(errorMessage);
           form.setError('caseNumber', { type: 'manual', message: errorMessage });
       } else {
           setError(t('error.genericTitle'));
           toast({
               variant: "destructive",
               title: t('error.genericTitle'),
               description: err.message || t('error.genericTitle'),
           });
       }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render Loading or Access Denied states
  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg text-muted-foreground">{t('page.addCase.loadingPage')}</p>
      </div>
    );
  }

  if (!user || user.role !== 'CourtOfficial') {
    return (
      <div className="text-center py-10">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold mb-2">{t('toast.accessDenied.title')}</h1>
        <p className="text-muted-foreground">{t('page.addCase.accessDenied')}</p>
         <Link href="/" className="mt-4 inline-block">
             <Button variant="outline">{t('page.caseDetail.backToDashboard')}</Button>
         </Link>
      </div>
    );
  }

  // Helper function to get translated error message
  const getError = (fieldName: keyof AddCaseFormValues) => {
      const error = form.formState.errors[fieldName];
      if (!error) return undefined;

      // Handle file input errors
       if (fieldName === 'document') {
           // Use the specific message from Zod refine or custom check
           return error.message;
       }

      // Handle email format errors
      if (fieldName === 'assignedPlaintiffEmail' || fieldName === 'assignedDefendantEmail' || fieldName === 'assignedJudgeEmail' || fieldName === 'assignedLawyerEmail') {
          if (error?.type === 'invalid_string') return t(`page.addCase.error.${fieldName}Format`);
          if (error?.type === 'too_small') return t(`page.addCase.error.${fieldName}Required`);
      }
       // Case number format or required or manual error (duplicate)
      if (fieldName === 'caseNumber') {
          // The manual error set by onSubmit will already be translated by the time it's set.
          if (error?.type === 'manual') return error.message;
          if (error?.type === 'invalid_string') return t(`page.addCase.error.caseNumberFormat`);
          if (error?.type === 'too_small') return t(`page.addCase.error.caseNumberRequired`);
      }
      // Generic fallback or other specific errors
      return error.message || t('signup.error.generic');
  };


  return (
    <div className="container mx-auto py-8 px-4 md:px-6 max-w-4xl">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight flex items-center">
            <PlusCircle className="mr-3 h-8 w-8 text-primary" />
            {t('page.addCase.title')}
          </CardTitle>
          <CardDescription>
            {t('page.addCase.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
           {error && !form.formState.errors.caseNumber && ( // Hide general error if it's a duplicate case number error
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{t('error.genericTitle')}</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Case Details Section */}
            <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
              <h3 className="text-lg font-semibold mb-2 text-primary">{t('page.addCase.section.details')}</h3>
              {/* Title */}
              <div>
                <Label htmlFor="title">{t('page.addCase.label.title')}</Label>
                <Input id="title" {...form.register('title')} placeholder={t('page.addCase.placeholder.title')} className={getError('title') ? 'border-destructive' : ''} />
                {getError('title') && <p className="text-sm text-destructive mt-1">{getError('title')}</p>}
              </div>

              {/* Case Number */}
               <div>
                <Label htmlFor="caseNumber">{t('page.addCase.label.caseNumber')}</Label>
                <Input id="caseNumber" {...form.register('caseNumber')} placeholder={t('page.addCase.placeholder.caseNumber')} className={getError('caseNumber') ? 'border-destructive' : ''} />
                 {getError('caseNumber') && <p className="text-sm text-destructive mt-1">{getError('caseNumber')}</p>}
                 <p className="text-xs text-muted-foreground mt-1">{t('page.addCase.hint.caseNumber')}</p>
              </div>

              {/* Court */}
              <div>
                <Label htmlFor="court">{t('page.addCase.label.court')}</Label>
                <Input id="court" {...form.register('court')} placeholder={t('page.addCase.placeholder.court')} className={getError('court') ? 'border-destructive' : ''} />
                {getError('court') && <p className="text-sm text-destructive mt-1">{getError('court')}</p>}
              </div>

               {/* Status */}
                <div>
                  <Label htmlFor="status">{t('page.addCase.label.status')}</Label>
                  <Select onValueChange={(value) => form.setValue('status', value as CaseStatus, { shouldValidate: true })} defaultValue={form.getValues('status')}>
                      <SelectTrigger id="status" className={getError('status') ? 'border-destructive' : ''}>
                        <SelectValue placeholder={t('page.addCase.placeholder.status')} />
                      </SelectTrigger>
                      <SelectContent>
                        {caseStatuses.map(status => (
                          <SelectItem key={status} value={status}>{t(`status.${status}`)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                 {getError('status') && <p className="text-sm text-destructive mt-1">{getError('status')}</p>}
                </div>

                {/* Urgency */}
                <div>
                  <Label htmlFor="urgency">{t('page.addCase.label.urgency')}</Label>
                    <Select onValueChange={(value) => form.setValue('urgency', value as Case['urgency'], { shouldValidate: true })} defaultValue={form.getValues('urgency')}>
                      <SelectTrigger id="urgency" className={getError('urgency') ? 'border-destructive' : ''}>
                          <SelectValue placeholder={t('page.addCase.placeholder.urgency')} />
                      </SelectTrigger>
                      <SelectContent>
                          {caseUrgencies.map(urgency => (
                          <SelectItem key={urgency!} value={urgency!}>{t(`urgency.${urgency}`)}</SelectItem>
                          ))}
                      </SelectContent>
                      </Select>
                    {getError('urgency') && <p className="text-sm text-destructive mt-1">{getError('urgency')}</p>}
                </div>

                {/* Description */}
                <div>
                    <Label htmlFor="description">{t('page.addCase.label.description')}</Label>
                    <Textarea id="description" {...form.register('description')} placeholder={t('page.addCase.placeholder.description')} rows={4} className={getError('description') ? 'border-destructive' : ''} />
                    {getError('description') && <p className="text-sm text-destructive mt-1">{getError('description')}</p>}
                </div>
            </div>

            {/* Parties & Assignment Section */}
             <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
               <h3 className="text-lg font-semibold mb-2 text-primary">{t('page.addCase.section.parties')}</h3>
                {/* Plaintiff Name */}
               <div>
                 <Label htmlFor="plaintiffName">{t('page.addCase.label.plaintiffName')}</Label>
                 <Input id="plaintiffName" {...form.register('plaintiffName')} placeholder={t('page.addCase.placeholder.plaintiffName')} className={getError('plaintiffName') ? 'border-destructive' : ''} />
                 {getError('plaintiffName') && <p className="text-sm text-destructive mt-1">{getError('plaintiffName')}</p>}
               </div>
                {/* Assign Plaintiff Email */}
               <div>
                 <Label htmlFor="assignedPlaintiffEmail">{t('page.addCase.label.assignPlaintiffEmail')}</Label>
                 <Input id="assignedPlaintiffEmail" type="email" {...form.register('assignedPlaintiffEmail')} placeholder={t('page.addCase.placeholder.assignPlaintiffEmail')} className={getError('assignedPlaintiffEmail') ? 'border-destructive' : ''} />
                 {getError('assignedPlaintiffEmail') && <p className="text-sm text-destructive mt-1">{getError('assignedPlaintiffEmail')}</p>}
               </div>
                {/* Defendant Name */}
                <div>
                 <Label htmlFor="defendantName">{t('page.addCase.label.defendantName')}</Label>
                 <Input id="defendantName" {...form.register('defendantName')} placeholder={t('page.addCase.placeholder.defendantName')} className={getError('defendantName') ? 'border-destructive' : ''} />
                 {getError('defendantName') && <p className="text-sm text-destructive mt-1">{getError('defendantName')}</p>}
               </div>
                {/* Assign Defendant Email */}
                <div>
                 <Label htmlFor="assignedDefendantEmail">{t('page.addCase.label.assignDefendantEmail')}</Label>
                 <Input id="assignedDefendantEmail" type="email" {...form.register('assignedDefendantEmail')} placeholder={t('page.addCase.placeholder.assignDefendantEmail')} className={getError('assignedDefendantEmail') ? 'border-destructive' : ''} />
                 {getError('assignedDefendantEmail') && <p className="text-sm text-destructive mt-1">{getError('assignedDefendantEmail')}</p>}
               </div>
               {/* Assign Judge Email */}
                <div>
                 <Label htmlFor="assignedJudgeEmail">{t('page.addCase.label.assignJudgeEmail')} ({t('optional')})</Label>
                 <Input id="assignedJudgeEmail" type="email" {...form.register('assignedJudgeEmail')} placeholder={t('page.addCase.placeholder.assignJudgeEmail')} className={getError('assignedJudgeEmail') ? 'border-destructive' : ''} />
                 {getError('assignedJudgeEmail') && <p className="text-sm text-destructive mt-1">{getError('assignedJudgeEmail')}</p>}
               </div>
                {/* Assign Lawyer Email */}
                 <div>
                 <Label htmlFor="assignedLawyerEmail">{t('page.addCase.label.assignLawyerEmail')} ({t('optional')})</Label>
                 <Input id="assignedLawyerEmail" type="email" {...form.register('assignedLawyerEmail')} placeholder={t('page.addCase.placeholder.assignLawyerEmail')} className={getError('assignedLawyerEmail') ? 'border-destructive' : ''} />
                 {getError('assignedLawyerEmail') && <p className="text-sm text-destructive mt-1">{getError('assignedLawyerEmail')}</p>}
               </div>
            </div>

             {/* Document Upload Section */}
            <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
              <h3 className="text-lg font-semibold mb-2 text-primary">{t('page.addCase.section.documents')}</h3>
              <div>
                <Label htmlFor="document">{t('page.addCase.label.documentUpload')} ({t('optional')})</Label>
                <Input
                    id="document"
                    type="file"
                    accept="application/pdf" // Accept only PDF files
                    {...form.register('document')}
                    className={`mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 ${getError('document') ? 'border-destructive' : ''}`}
                />
                 {getError('document') && <p className="text-sm text-destructive mt-1">{getError('document')}</p>}
                <p className="text-xs text-muted-foreground mt-1">{t('page.addCase.hint.documentUpload', { maxSize: MAX_FILE_SIZE / 1024 / 1024 })}</p>
              </div>
            </div>


            <CardFooter className="flex justify-end pt-6">
              <Button type="submit" disabled={isSubmitting} className="text-lg px-6 py-3">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {t('page.addCase.submittingButton')}
                  </>
                ) : (
                  <>
                    <PlusCircle className="mr-2 h-5 w-5" />
                    {t('page.addCase.submitButton')}
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

    
