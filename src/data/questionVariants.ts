import { Question, VersionFormat, VERSION_FORMAT_ORDER } from '@/types/sol';

/**
 * 5-Version System: Each "template group" has exactly 5 versions with specific formats.
 * V1 = Direct Recall, V2 = Quote, V3 = Visual Stimulus, V4 = Diagram/Data, V5 = Timeline/Sequence
 *
 * Questions are authored per-version in questions.ts. This module handles selection logic.
 */

/**
 * Select the appropriate version for a quiz attempt.
 * Rotation Rule: attempt 1 → V1, attempt 2 → V2, ..., attempt 6 → V1
 */
export function getVersionForAttempt(retakeNumber: number): number {
  return ((retakeNumber - 1) % 5) + 1;
}

export function getVersionFormatForAttempt(retakeNumber: number): VersionFormat {
  return VERSION_FORMAT_ORDER[((retakeNumber - 1) % 5)];
}

/**
 * From a pool of all questions, select one per templateId matching the target version.
 * Falls back to any available version if target isn't found.
 */
export function selectVersionsForQuiz(
  allQuestions: Question[],
  targetVersion: number,
): Question[] {
  const templates = new Map<string, Question[]>();
  allQuestions.forEach(q => {
    if (!templates.has(q.templateId)) templates.set(q.templateId, []);
    templates.get(q.templateId)!.push(q);
  });

  const selected: Question[] = [];
  templates.forEach((versions) => {
    const target = versions.find(q => q.version === targetVersion);
    if (target) {
      selected.push(target);
    } else {
      // Fallback: pick V1 or first available
      const fallback = versions.find(q => q.version === 1) || versions[0];
      if (fallback) selected.push(fallback);
    }
  });

  return selected;
}
