
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { legalResearchAssistant, type LegalResearchInput, type LegalResearchOutput } from '@/ai/flows/legal-research-flow';
import { LegalResearchInputSchema } from '@/ai/schemas/legal-research';
import { Loader2, Library, Search, FileText, AlertCircle, MessageSquare } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useTranslation } from 'react-i18next'; // Use react-i18next hook

export default function LegalResearchPage() {
  const { user, loading: authLoading } = useAuth();
  const [researchResult, setResearchResult] = useState<LegalResearchOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation(); // Initialize useTranslation

  // Keep Zod schema simple, translate errors in UI
  const form = useForm<LegalResearchInput>({
    resolver: zodResolver(LegalResearchInputSchema),
    defaultValues: {
      researchTopic: '',
      caseContext: '',
    },
  });

  const onSubmit: SubmitHandler<LegalResearchInput> = async (data) => {
    setIsLoading(true);
    setError(null);
    setResearchResult(null);

    try {
      const result = await legalResearchAssistant(data);
      setResearchResult(result);
    } catch (e) {
      console.error('Error performing legal research:', e);
      setError(t('page.legalResearch.error.generic'));
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg text-muted-foreground">{t('page.legalResearch.loading')}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-10">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold mb-2">{t('toast.accessDenied.title')}</h1>
        <p className="text-muted-foreground mb-6">{t('accessDenied.loginRequired.page', { pageName: t('header.legalResearch') })}</p>
        <Link href="/login">
          <Button>{t('login.loginButton')}</Button>
        </Link>
      </div>
    );
  }

  // Translate Zod error messages
   const getErrorMessage = (fieldError: typeof form.formState.errors.researchTopic) => {
     if (!fieldError) return undefined;
     // Assuming the only validation is min(1) from the schema
     if (fieldError.type === 'too_small' || fieldError.type === 'invalid_string' && fieldError.message?.includes('cannot be empty')) {
       return t('page.legalResearch.error.topicRequired');
     }
     return t('signup.error.generic'); // Generic fallback
   };
   const topicErrorMessage = getErrorMessage(form.formState.errors.researchTopic);


  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="text-center mb-10">
        <Library className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold tracking-tight">{t('page.legalResearch.title')}</h1>
        <p className="text-lg text-muted-foreground mt-2">
          {t('page.legalResearch.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-6 w-6 text-primary" />
              {t('page.legalResearch.queryTitle')}
            </CardTitle>
            <CardDescription>
              {t('page.legalResearch.queryDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="researchTopic" className="text-base font-medium">{t('page.legalResearch.topicLabel')}</Label>
                <Input
                  id="researchTopic"
                  {...form.register('researchTopic')}
                  placeholder={t('page.legalResearch.topicPlaceholder')}
                  className={`mt-1 ${topicErrorMessage ? 'border-destructive' : 'border-input focus:border-primary'}`}
                  aria-invalid={!!topicErrorMessage}
                  aria-describedby={topicErrorMessage ? "topic-error" : undefined}
                />
                {topicErrorMessage && (
                  <p id="topic-error" className="text-sm text-destructive mt-1">{topicErrorMessage}</p>
                )}
              </div>
              <div>
                <Label htmlFor="caseContext" className="text-base font-medium">{t('page.legalResearch.contextLabel')}</Label>
                <Textarea
                  id="caseContext"
                  {...form.register('caseContext')}
                  placeholder={t('page.legalResearch.contextPlaceholder')}
                  className="min-h-[150px] text-sm leading-relaxed mt-1 border-input focus:border-primary"
                  rows={5}
                  aria-label={t('page.legalResearch.contextLabel')} // Add aria-label
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('page.legalResearch.researchingButton')}
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    {t('page.legalResearch.performResearchButton')}
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-6 w-6 text-primary" />
              {t('page.legalResearch.resultsTitle')}
            </CardTitle>
            <CardDescription>
              {t('page.legalResearch.resultsDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[400px] flex flex-col">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{t('error.genericTitle')}</AlertTitle> {/* Use generic error title */}
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {isLoading && !researchResult && (
              <div className="flex-grow flex flex-col items-center justify-center text-muted-foreground">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-lg">{t('page.legalResearch.researchingButton')}</p>
              </div>
            )}
            {researchResult && (
              <Accordion type="multiple" collapsible className="w-full space-y-4">
                {researchResult.relevantCaseLaw && researchResult.relevantCaseLaw.length > 0 && (
                  <AccordionItem value="case-law" className="border rounded-lg">
                    <AccordionTrigger className="px-4 py-3 text-lg font-semibold hover:no-underline">
                      {t('page.legalResearch.relevantCaseLaw', { count: researchResult.relevantCaseLaw.length })}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 space-y-3">
                      {researchResult.relevantCaseLaw.map((item, index) => (
                        <Card key={`case-${index}`} className="bg-muted/30">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-md">{item.caseName}</CardTitle>
                            <CardDescription className="text-xs">{item.citation}</CardDescription>
                          </CardHeader>
                          <CardContent className="text-sm">
                            {/* AI results likely won't be translated unless AI model supports it */}
                            <p className="whitespace-pre-line leading-relaxed">{item.summary}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                )}

                {researchResult.relevantStatutes && researchResult.relevantStatutes.length > 0 && (
                  <AccordionItem value="statutes" className="border rounded-lg">
                    <AccordionTrigger className="px-4 py-3 text-lg font-semibold hover:no-underline">
                      {t('page.legalResearch.relevantStatutes', { count: researchResult.relevantStatutes.length })}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 space-y-3">
                      {researchResult.relevantStatutes.map((item, index) => (
                        <Card key={`statute-${index}`} className="bg-muted/30">
                           <CardHeader className="pb-2">
                            <CardTitle className="text-md">{item.statuteName}</CardTitle>
                            <CardDescription className="text-xs">{item.citation}</CardDescription>
                          </CardHeader>
                          <CardContent className="text-sm">
                            {/* AI results likely won't be translated unless AI model supports it */}
                            <p className="whitespace-pre-line leading-relaxed">{item.summary}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                )}

                {researchResult.legalAnalysis && (
                  <AccordionItem value="legal-analysis" className="border rounded-lg">
                    <AccordionTrigger className="px-4 py-3 text-lg font-semibold hover:no-underline">{t('page.legalResearch.legalAnalysis')}</AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                       <Card className="bg-muted/30">
                          <CardContent className="text-sm pt-4">
                             {/* AI results likely won't be translated unless AI model supports it */}
                            <p className="whitespace-pre-line leading-relaxed">{researchResult.legalAnalysis}</p>
                          </CardContent>
                        </Card>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            )}
            {!isLoading && !researchResult && !error && (
              <div className="flex-grow flex flex-col items-center justify-center text-center text-muted-foreground">
                <MessageSquare className="h-12 w-12 mb-4" />
                <p className="text-lg">{t('page.legalResearch.resultsPlaceholderTitle')}</p>
                <p className="text-sm">{t('page.legalResearch.resultsPlaceholderDescription')}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
