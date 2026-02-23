import { Question } from '@/types/sol';

export const questionBank: Question[] = [
  // VUS.2 - Early America
  {
    id: 'vus2-1', standardId: 'VUS.2', text: 'What was the primary economic motivation for English colonization of Virginia?',
    options: ['Religious freedom', 'Gold and economic profit', 'Military expansion', 'Scientific exploration'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'Think about what investors in the Virginia Company wanted — profit was the driving force behind Jamestown.'
  },
  {
    id: 'vus2-2', standardId: 'VUS.2', text: 'Place these events in chronological order: 1) Founding of Jamestown, 2) Arrival of Mayflower, 3) Columbus reaches the Americas, 4) Roanoke Colony disappears.',
    options: ['3, 4, 1, 2', '1, 2, 3, 4', '3, 1, 4, 2', '4, 3, 2, 1'],
    correctIndex: 0, errorCategory: 'sequence',
    strategyTip: 'Build a mental timeline: Columbus 1492 → Roanoke 1587 → Jamestown 1607 → Plymouth 1620.'
  },
  {
    id: 'vus2-3', standardId: 'VUS.2', text: 'Based on the description of a settlement surrounded by swampland with high mortality rates, which colony is being described?',
    options: ['Plymouth', 'Jamestown', 'Massachusetts Bay', 'Pennsylvania'],
    correctIndex: 1, errorCategory: 'stimulus',
    strategyTip: 'When analyzing a description of a place, look for geographic clues. Swampland and disease point to the Chesapeake region.'
  },
  // VUS.4 - Revolution
  {
    id: 'vus4-1', standardId: 'VUS.4', text: 'Who was the primary author of the Declaration of Independence?',
    options: ['Benjamin Franklin', 'John Adams', 'Thomas Jefferson', 'George Washington'],
    correctIndex: 2, errorCategory: 'memorization',
    strategyTip: 'Remember the Committee of Five — Jefferson was chosen as the primary writer because of his eloquent writing style.'
  },
  {
    id: 'vus4-2', standardId: 'VUS.4', text: 'Which sequence correctly shows the path to independence?',
    options: [
      'Stamp Act → Boston Massacre → Tea Party → Lexington & Concord',
      'Tea Party → Stamp Act → Boston Massacre → Lexington & Concord',
      'Boston Massacre → Stamp Act → Tea Party → Lexington & Concord',
      'Stamp Act → Tea Party → Boston Massacre → Lexington & Concord'
    ],
    correctIndex: 0, errorCategory: 'sequence',
    strategyTip: 'Think cause-and-effect: each act of resistance escalated tensions. Stamp Act (1765) → Massacre (1770) → Tea Party (1773) → battles (1775).'
  },
  {
    id: 'vus4-3', standardId: 'VUS.4', text: 'A document states "all men are created equal" and lists grievances against a king. What is this document\'s primary purpose?',
    options: ['Establish a new government structure', 'Justify separation from Britain', 'Create a bill of rights', 'Propose a peace treaty'],
    correctIndex: 1, errorCategory: 'stimulus',
    strategyTip: 'When analyzing a document excerpt, identify who wrote it, who the audience is, and what action it calls for.'
  },
  // VUS.7 - Civil War
  {
    id: 'vus7-1', standardId: 'VUS.7', text: 'Who served as the commanding general of the Confederate Army?',
    options: ['Ulysses S. Grant', 'Robert E. Lee', 'Stonewall Jackson', 'William Sherman'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'Associate key leaders with their sides: Lee and Jackson → Confederacy; Grant and Sherman → Union.'
  },
  {
    id: 'vus7-2', standardId: 'VUS.7', text: 'Which battle is considered the turning point of the Civil War?',
    options: ['Fort Sumter', 'Antietam', 'Gettysburg', 'Appomattox'],
    correctIndex: 2, errorCategory: 'memorization',
    strategyTip: 'Turning points change the momentum of a war. After Gettysburg (1863), the Confederacy was on the defensive.'
  },
  {
    id: 'vus7-3', standardId: 'VUS.7', text: 'Put these Civil War events in order: 1) Emancipation Proclamation, 2) Fort Sumter, 3) Gettysburg, 4) Appomattox.',
    options: ['2, 1, 3, 4', '1, 2, 3, 4', '2, 3, 1, 4', '3, 2, 1, 4'],
    correctIndex: 0, errorCategory: 'sequence',
    strategyTip: 'Fort Sumter starts the war (1861), Emancipation (1863 Jan), Gettysburg (1863 July), Appomattox ends it (1865).'
  },
  // VUS.9 - Gilded Age
  {
    id: 'vus9-1', standardId: 'VUS.9', text: 'Which businessman was known as the "King of Steel"?',
    options: ['John D. Rockefeller', 'Andrew Carnegie', 'J.P. Morgan', 'Cornelius Vanderbilt'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'Match the tycoon to their industry: Carnegie = Steel, Rockefeller = Oil, Vanderbilt = Railroads.'
  },
  {
    id: 'vus9-2', standardId: 'VUS.9', text: 'A political cartoon shows a giant octopus with tentacles wrapped around the Capitol, railroads, and banks. What concept does this represent?',
    options: ['Labor unions gaining power', 'Monopolies controlling government and industry', 'Immigration restrictions', 'Progressive reforms succeeding'],
    correctIndex: 1, errorCategory: 'stimulus',
    strategyTip: 'In political cartoons, look for symbols of power. An octopus with many tentacles = control over many areas. Who or what has too much power?'
  },
  // VUS.10 - Progressive Era
  {
    id: 'vus10-1', standardId: 'VUS.10', text: 'Which muckraker exposed the unsanitary conditions of the meatpacking industry?',
    options: ['Ida Tarbell', 'Upton Sinclair', 'Jacob Riis', 'Lincoln Steffens'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'Connect each muckraker to their cause: Sinclair = meat, Tarbell = Standard Oil, Riis = tenements, Steffens = political corruption.'
  },
  {
    id: 'vus10-2', standardId: 'VUS.10', text: 'A photograph shows children working in a textile factory, some appearing younger than 10. Which reform movement would use this image?',
    options: ['Temperance movement', 'Women\'s suffrage', 'Child labor reform', 'Trust-busting'],
    correctIndex: 2, errorCategory: 'stimulus',
    strategyTip: 'Photos were powerful tools for reform. Ask: Who is suffering? What injustice is shown? Who would use this image to push for change?'
  },
  {
    id: 'vus10-3', standardId: 'VUS.10', text: 'Place these Progressive reforms in order: 1) 19th Amendment, 2) Pure Food and Drug Act, 3) 17th Amendment, 4) Federal Reserve Act.',
    options: ['2, 3, 4, 1', '1, 2, 3, 4', '3, 4, 2, 1', '2, 4, 3, 1'],
    correctIndex: 0, errorCategory: 'sequence',
    strategyTip: 'Pure Food & Drug Act (1906) → 17th Amendment (1913) → Federal Reserve (1913) → 19th Amendment (1920).'
  },
  // VUS.12 - WWII
  {
    id: 'vus12-1', standardId: 'VUS.12', text: 'What event directly caused the United States to enter World War II?',
    options: ['Invasion of Poland', 'Fall of France', 'Attack on Pearl Harbor', 'Battle of Britain'],
    correctIndex: 2, errorCategory: 'memorization',
    strategyTip: 'The US maintained neutrality until a direct attack. Pearl Harbor (Dec 7, 1941) was the trigger.'
  },
  {
    id: 'vus12-2', standardId: 'VUS.12', text: 'Order these WWII events: 1) D-Day, 2) Pearl Harbor, 3) Atomic bombs dropped, 4) Battle of Midway.',
    options: ['2, 4, 1, 3', '1, 2, 3, 4', '2, 1, 4, 3', '4, 2, 1, 3'],
    correctIndex: 0, errorCategory: 'sequence',
    strategyTip: 'Pearl Harbor (1941) → Midway (1942) → D-Day (1944) → Atomic bombs (1945). Build the timeline by theater.'
  },
  // VUS.14 - Civil Rights
  {
    id: 'vus14-1', standardId: 'VUS.14', text: 'Which Supreme Court case declared "separate but equal" unconstitutional in public schools?',
    options: ['Plessy v. Ferguson', 'Brown v. Board of Education', 'Marbury v. Madison', 'Miranda v. Arizona'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'Plessy (1896) established "separate but equal." Brown (1954) overturned it. Know the pair!'
  },
  {
    id: 'vus14-2', standardId: 'VUS.14', text: 'A photograph shows a group of Black students being escorted by federal troops into a school while angry crowds protest. What event is depicted?',
    options: ['Montgomery Bus Boycott', 'Little Rock Nine', 'March on Washington', 'Greensboro Sit-ins'],
    correctIndex: 1, errorCategory: 'stimulus',
    strategyTip: 'Look for context clues: federal troops + school integration = Little Rock Nine (1957). The presence of soldiers shows federal enforcement of desegregation.'
  },
  {
    id: 'vus14-3', standardId: 'VUS.14', text: 'Put these civil rights events in order: 1) Civil Rights Act, 2) Brown v. Board, 3) March on Washington, 4) Voting Rights Act.',
    options: ['2, 3, 1, 4', '1, 2, 3, 4', '2, 1, 3, 4', '3, 2, 4, 1'],
    correctIndex: 0, errorCategory: 'sequence',
    strategyTip: 'Brown (1954) → March on Washington (1963) → Civil Rights Act (1964) → Voting Rights Act (1965).'
  },
];

// Generate additional practice questions for the adaptive feedback loop
export function generatePracticeQuestions(
  failedQuestion: Question,
  allQuestions: Question[]
): Question[] {
  // Find questions with the same error category and similar standard
  const relatedQuestions = allQuestions.filter(
    q => q.id !== failedQuestion.id && q.errorCategory === failedQuestion.errorCategory
  );

  // Also include questions from the same standard
  const sameStandard = allQuestions.filter(
    q => q.id !== failedQuestion.id && q.standardId === failedQuestion.standardId
  );

  // Combine and deduplicate, prioritizing same standard + same error type
  const combined = [...new Map(
    [...sameStandard, ...relatedQuestions].map(q => [q.id, q])
  ).values()];

  return combined.slice(0, 5);
}
