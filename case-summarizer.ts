'use server';

/**
 * @fileOverview A case summarization AI agent.
 *
 * - caseSummarizer - A function that handles the case summarization process.
 * - CaseSummarizerInput - The input type for the caseSummarizer function.
 * - CaseSummarizerOutput - The return type for the caseSummarizer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CaseSummarizerInputSchema = z.object({
  caseDetails: z
    .string()
    .describe('The details of the court case, including relevant context.'),
});
export type CaseSummarizerInput = z.infer<typeof CaseSummarizerInputSchema>;

const CaseSummarizerOutputSchema = z.object({
  summary: z.string().describe('A summary of the case including key events, legal arguments, and the final verdict.'),
});
export type CaseSummarizerOutput = z.infer<typeof CaseSummarizerOutputSchema>;

export async function caseSummarizer(input: CaseSummarizerInput): Promise<CaseSummarizerOutput> {
  return caseSummarizerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'caseSummarizerPrompt',
  input: {schema: CaseSummarizerInputSchema},
  output: {schema: CaseSummarizerOutputSchema},
  prompt: `You are an expert legal assistant specializing in summarizing court cases. You will use the case details provided to create a concise summary of the case, including key events, legal arguments, and the final verdict.\n\nCase Details: {{{caseDetails}}}`,
});

const caseSummarizerFlow = ai.defineFlow(
  {
    name: 'caseSummarizerFlow',
    inputSchema: CaseSummarizerInputSchema,
    outputSchema: CaseSummarizerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
