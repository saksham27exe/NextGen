import { z } from 'genkit';

export const CaseLawSchema = z.object({
  caseName: z.string().describe('The name of the court case.'),
  citation: z.string().describe('The legal citation for the case.'),
  summary: z.string().describe('A brief summary of the case relevant to the research topic.'),
});

export const StatuteSchema = z.object({
  statuteName: z.string().describe('The name or number of the statute.'),
  citation: z.string().describe('The legal citation for the statute.'),
  summary: z.string().describe('A brief summary of the statute relevant to the research topic.'),
});

export const LegalResearchInputSchema = z.object({
  researchTopic: z
    .string()
    .min(1, { message: 'Research topic cannot be empty.' })
    .describe('The specific legal topic or question to research.'),
  caseContext: z
    .string()
    .optional()
    .describe(
      'Optional context about a specific case to tailor the research. This could include case facts, party names, or current procedural posture.'
    ),
});
export type LegalResearchInput = z.infer<typeof LegalResearchInputSchema>;

export const LegalResearchOutputSchema = z.object({
  relevantCaseLaw: z
    .array(CaseLawSchema)
    .describe('A list of relevant case law, including citations and summaries.'),
  relevantStatutes: z
    .array(StatuteSchema)
    .describe('A list of relevant statutes, including citations and summaries.'),
  legalAnalysis: z
    .string()
    .describe(
      'A concise legal analysis based on the research, addressing the input topic and context.'
    ),
});
export type LegalResearchOutput = z.infer<typeof LegalResearchOutputSchema>;
