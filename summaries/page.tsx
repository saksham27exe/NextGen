
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { caseSummarizer, type CaseSummarizerInput, type CaseSummarizerOutput } from '@/ai/flows/case-summarizer';
import { Loader2, Wand2, AlertCircle, FileText } from 'lucide-react';
// Removed import for mockData as it does not exist and we use Dexie now
// import { mockCases } from '@/data/mockData';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next'; // Use react-i18next hook
import { getCaseById } from '@/services/local-case-service'; // Import Dexie service to fetch case
// Removed Case import as it's not directly used after fetching
// import type { Case } from '@/types';

export default function AISummariesPage() {
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const [caseDetails, setCaseDetails] = useState('');
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingCase, setIsFetchingCase] = useState(false); // State for initial case fetching
  const [error, setError] = useState<string | null>(null);
  const [initialCaseNumber, setInitialCaseNumber] = useState<string | null>(null); // Store case number instead of ID
  const { t, i18n } = useTranslation(); // Initialize useTranslation

  // Fetch case data from Dexie if caseNumber is in query params
  useEffect(() => {
    const caseNumberFromQuery = searchParams.get('caseId'); // Parameter is caseNumber
    if (caseNumberFromQuery) {
      setInitialCaseNumber(caseNumberFromQuery);
      setIsFetchingCase(true); // Set loading while fetching case
      setError(null); // Clear previous errors
      getCaseById(caseNumberFromQuery)
        .then(foundCase => {
          if (foundCase) {
            // Format date using i18n locale
            const formatDate = (dateString: string | undefined) => {
              if (!dateString) return t('na');
              try {
                return new Date(dateString).toLocaleDateString(i18n.language, { year: 'numeric', month: 'short', day: 'numeric' });
              } catch (e) { return t('na'); }
            };
            // Construct prefillText using fetched case data and translations
            const prefillText = `Case Title: ${foundCase.title}\nCase Number: ${foundCase.caseNumber}\nDescription: ${foundCase.description}\nPlaintiff: ${foundCase.plaintiff}\nDefendant: ${foundCase.defendant}\nFiling Date: ${formatDate(foundCase.filingDate)}\nStatus: ${t(`status.${foundCase.status}`)}\nCourt: ${foundCase.court}${foundCase.judgeId ? `\nJudge ID: ${foundCase.judgeId}` : ''}${foundCase.urgency ? `\nUrgency: ${t(`urgency.${foundCase.urgency}`)}` : ''}`;
            setCaseDetails(prefillText);
          } else {
            setError(t('page.caseDetail.notFound', { caseId: caseNumberFromQuery })); // Use translated error
            setCaseDetails(''); // Clear details if case not found
          }
        })
        .catch(fetchError => {
          console.error("Error fetching case details for summary:", fetchError);
          setError(t('page.caseDetail.loadError')); // Use translated error
          setCaseDetails(''); // Clear details on error
        })
        .finally(() => {
          setIsFetchingCase(false); // Clear fetching state
        });
    }
  }, [searchParams, t, i18n.language]); // Add i18n.language to dependencies

  const handleSummarize = async () => {
    if (!caseDetails.trim()) {
      setError(t('page.summaries.error.noDetails'));
      return;
    }
    setIsLoading(true); // Set loading for AI summarization
    setError(null);
    setSummary(null);

    try {
      const input: CaseSummarizerInput = { caseDetails };
      const result: CaseSummarizerOutput = await caseSummarizer(input);
      setSummary(result.summary);
    } catch (e) {
      console.error('Error generating summary:', e);
      setError(t('page.summaries.error.generic'));
    } finally {
      setIsLoading(false); // Clear AI summarization loading state
    }
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg text-muted-foreground">{t('page.summaries.loading')}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-10">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold mb-2">{t('toast.accessDenied.title')}</h1>
        <p className="text-muted-foreground mb-6">{t('accessDenied.loginRequired.page', {pageName: t('header.aiSummaries')})}</p>
        <Link href="/login">
          <Button>{t('login.loginButton')}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="text-center mb-10">
        <Wand2 className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold tracking-tight">{t('page.summaries.title')}</h1>
        <p className="text-lg text-muted-foreground mt-2">
          {t('page.summaries.description')}
        </p>
        {initialCaseNumber && (
          <p className="text-sm text-muted-foreground mt-1">
            {t('page.summaries.caseDetailsPrefilled', {caseId: initialCaseNumber})}{' '}
            <Link href={`/cases/${initialCaseNumber}`} className="underline hover:text-primary">
              {t('viewCaseLinkText', { caseId: initialCaseNumber })}
            </Link>.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-6 w-6 text-primary" />
              {t('page.summaries.enterCaseDetailsTitle')}
            </CardTitle>
            <CardDescription>
              {t('page.summaries.enterCaseDetailsDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             {isFetchingCase && ( // Show loading indicator while fetching case details
                <div className="flex items-center justify-center min-h-[100px]">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-3 text-muted-foreground">{t('page.summaries.fetchingCase')}</span>
                </div>
             )}
             {!isFetchingCase && error && !caseDetails && ( // Show fetch error if fetching failed and no details loaded
                 <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>{t('error.genericTitle')}</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                 </Alert>
             )}
            <div>
              <Label htmlFor="case-details" className="text-base">{t('page.summaries.caseTextLabel')}</Label>
              <Textarea
                id="case-details"
                value={caseDetails}
                onChange={(e) => setCaseDetails(e.target.value)}
                placeholder={t('page.summaries.caseTextPlaceholder')}
                className="min-h-[300px] text-sm leading-relaxed border-input focus:border-primary"
                rows={15}
                aria-label={t('page.summaries.caseTextLabel')}
                disabled={isFetchingCase} // Disable textarea while fetching
              />
            </div>
            <Button onClick={handleSummarize} disabled={isLoading || isFetchingCase || !caseDetails.trim()} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('page.summaries.generatingButton')}
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  {t('page.summaries.generateButton')}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wand2 className="mr-2 h-6 w-6 text-primary" />
              {t('page.summaries.aiSummaryTitle')}
            </CardTitle>
            <CardDescription>
              {t('page.summaries.aiSummaryDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[300px] flex flex-col">
             {error && !isLoading && !summary && !isFetchingCase && ( // Show AI generation error only if not loading and not fetching
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{t('error.genericTitle')}</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {isLoading && !summary && ( // Show loading indicator for AI generation
              <div className="flex-grow flex flex-col items-center justify-center text-muted-foreground">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-lg">{t('page.summaries.generatingButton')}</p>
              </div>
            )}
            {summary && ( // Display summary if available
              <div className="prose prose-sm max-w-none dark:prose-invert p-4 bg-muted/30 rounded-md flex-grow overflow-auto">
                <p className="whitespace-pre-line text-sm leading-relaxed">{summary}</p>
              </div>
            )}
            {!isLoading && !summary && !error && !isFetchingCase && ( // Show placeholder if not loading, no summary, no error, and not fetching case
              <div className="flex-grow flex flex-col items-center justify-center text-center text-muted-foreground">
                <FileText className="h-12 w-12 mb-4" />
                <p className="text-lg">{t('page.summaries.resultsPlaceholderTitle')}</p>
                <p className="text-sm">{t('page.summaries.resultsPlaceholderDescription')}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

