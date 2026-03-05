import { Question } from '@/types/sol';

/**
 * Given a "master" question (version 1), generates 4 additional variants (versions 2-5).
 * Each variant tests the same skill and fact but uses different phrasing and distractor order.
 */

// Phrasing templates per error category
const phrasePrefixes: Record<string, string[]> = {
  memorization: [
    'Which of the following best describes',
    'A student studying for the SOL should know that',
    'Which statement is most accurate regarding',
    'According to the Virginia SOL standards,',
  ],
  sequence: [
    'Arrange the following events in chronological order:',
    'Which list shows the correct time order of these events?',
    'Place these historical events from earliest to latest:',
    'What is the proper sequence of these developments?',
  ],
  stimulus: [
    'Based on the source material, which conclusion is best supported?',
    'A historian examining this evidence would most likely conclude that',
    'Which interpretation is most consistent with the evidence presented?',
    'The information provided best supports which of the following?',
  ],
};

function shuffleOptions(options: string[], correctIndex: number, seed: number): { options: string[]; correctIndex: number } {
  const correct = options[correctIndex];
  const indexed = options.map((o, i) => ({ o, i }));
  // Deterministic shuffle based on seed
  const shuffled = [...indexed].sort((a, b) => {
    const ha = ((a.i + seed) * 2654435761) % 100;
    const hb = ((b.i + seed) * 2654435761) % 100;
    return ha - hb;
  });
  const newOptions = shuffled.map(s => s.o);
  const newCorrectIndex = newOptions.indexOf(correct);
  return { options: newOptions, correctIndex: newCorrectIndex };
}

function rephrase(text: string, version: number, category: string): string {
  const prefixes = phrasePrefixes[category] || phrasePrefixes.memorization;
  const prefix = prefixes[(version - 2) % prefixes.length];

  // For sequence questions, keep original structure
  if (category === 'sequence') return `${prefix} ${text.replace(/^(Place|Put|Which sequence|What is the correct order|Arrange)[^:]*:?\\s*/i, '')}`;

  // Extract the core content after common question starters
  const stripped = text
    .replace(/^(Which|What|Who|How|Why|During|The|A |An |In |Based on|One major|By the)\s+/i, '')
    .replace(/\?$/, '');

  return `${prefix} ${stripped}?`;
}

export function generateAllVariants(masterQuestions: Question[]): Question[] {
  const allQuestions: Question[] = [];

  for (const master of masterQuestions) {
    // Version 1 = original
    allQuestions.push({
      ...master,
      templateId: master.id,
      version: 1,
    });

    // Versions 2-5
    for (let v = 2; v <= 5; v++) {
      const { options, correctIndex } = shuffleOptions(master.options, master.correctIndex, v * 7 + master.id.charCodeAt(master.id.length - 1));
      const rephrased = rephrase(master.text, v, master.errorCategory);

      allQuestions.push({
        ...master,
        id: `${master.id}-v${v}`,
        templateId: master.id,
        version: v,
        text: rephrased,
        options,
        correctIndex,
      });
    }
  }

  return allQuestions;
}

/**
 * Select one version per template for a quiz, preferring unseen versions.
 */
export function selectVersionsForQuiz(
  allQuestions: Question[],
  usedVersions: Record<string, number[]>,
): Question[] {
  const templates = new Map<string, Question[]>();
  allQuestions.forEach(q => {
    if (!templates.has(q.templateId)) templates.set(q.templateId, []);
    templates.get(q.templateId)!.push(q);
  });

  const selected: Question[] = [];
  templates.forEach((versions, templateId) => {
    const used = usedVersions[templateId] || [];
    // Prefer unseen versions
    const unseen = versions.filter(q => !used.includes(q.version));
    const pool = unseen.length > 0 ? unseen : versions;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    selected.push(pick);
  });

  return selected;
}
