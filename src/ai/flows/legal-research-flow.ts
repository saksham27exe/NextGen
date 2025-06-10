'use server';
/**
 * @fileOverview A legal research assistant AI agent.
 * This file defines the Genkit flow for performing legal research.
 * It exports the `legalResearchAssistant` function and its associated input/output types.
 * The Zod schemas (LegalResearchInputSchema, LegalResearchOutputSchema) are defined and imported from '@/ai/schemas/legal-research.ts'.
 *
 * Exports:
 * - legalResearchAssistant: (input: LegalResearchInput) => Promise<LegalResearchOutput>
 * - LegalResearchInput: type
 * - LegalResearchOutput: type
 */

import { ai } from '@/ai/genkit';
import {
  LegalResearchInputSchema,
  LegalResearchOutputSchema,
  type LegalResearchInput,
  type LegalResearchOutput,
} from '@/ai/schemas/legal-research';

// Export the types as per the guideline
export type { LegalResearchInput, LegalResearchOutput };

export async function legalResearchAssistant(
  input: LegalResearchInput
): Promise<LegalResearchOutput> {
  return legalResearchAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'legalResearchAssistantPrompt',
  input: { schema: LegalResearchInputSchema },
  output: { schema: LegalResearchOutputSchema },
  prompt: `You are an expert legal research assistant. Your task is to provide comprehensive legal research based on the user's query.

Research Topic: {{{researchTopic}}}

{{#if caseContext}}
Case Context: {{{caseContext}}}
Please tailor your research to be relevant to this specific case context.
{{/if}}

Identify and provide:
1.  Relevant Case Law: Include the case name, full citation, and a brief summary of its relevance to the research topic.
2.  Relevant Statutes: Include the statute name/number, full citation, and a brief summary of its relevance.
3.  Legal Analysis: Provide a concise analysis synthesizing the findings from case law and statutes, directly addressing the research topic and incorporating the case context if provided.

Focus on accuracy and relevance. Ensure citations are in a standard legal format.
`,
});

const legalResearchAssistantFlow = ai.defineFlow(
  {
    name: 'legalResearchAssistantFlow',
    inputSchema: LegalResearchInputSchema,
    outputSchema: LegalResearchOutputSchema,
  },
  async (input: LegalResearchInput) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('No output from AI model for legal research.');
    }
    return output;
  }
);
