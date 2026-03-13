import { Question } from '@/types/sol';

/**
 * VUS.14 — World War II
 * 15 unique templates × 5 versions = 75 questions
 *
 * Templates:
 *  1. Pearl Harbor (vus14-1) — already in main bank
 *  2. Rise of Totalitarianism (vus14-2)
 *  3. US Isolationism / Neutrality Acts (vus14-3)
 *  4. D-Day / Normandy Invasion (vus14-4)
 *  5. The Holocaust (vus14-5)
 *  6. Atomic Bomb — Hiroshima & Nagasaki (vus14-6)
 *  7. Marshall Plan (vus14-7)
 *  8. Home Front — Rosie the Riveter (vus14-8)
 *  9. Battle of Midway — Pacific Turning Point (vus14-9)
 * 10. Nuremberg Trials (vus14-10)
 * 11. Japanese American Internment (vus14-11)
 * 12. Lend-Lease Act (vus14-12)
 * 13. Battle of the Bulge (vus14-13)
 * 14. V-E Day / V-J Day (vus14-14)
 * 15. GI Bill of Rights (vus14-15)
 */

export const vus14Questions: Question[] = [

  // ===========================
  // Template 2: Rise of Totalitarianism
  // Core concept: Totalitarian dictators (Hitler, Mussolini, Stalin) rose to power in the 1920s–1930s
  // ===========================
  {
    id: 'vus14-2-v1', templateId: 'vus14-2', version: 1, versionFormat: 'direct',
    standardId: 'VUS.14', text: 'Which type of government is characterized by a single-party dictatorship that controls every aspect of citizens\' lives?',
    options: ['Democracy', 'Totalitarianism', 'Federalism', 'Republicanism'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'Totalitarianism = total control. One party, one leader, no individual freedom.',
    genAlphaTip: 'Total control = totalitarianism. The government runs EVERYTHING. No freedom at all. 🔒',
  },
  {
    id: 'vus14-2-v2', templateId: 'vus14-2', version: 2, versionFormat: 'quote',
    standardId: 'VUS.14', text: 'This statement reflects which form of government?',
    options: ['Constitutional monarchy', 'Totalitarianism', 'Representative democracy', 'Confederation'],
    correctIndex: 1, errorCategory: 'stimulus',
    quote: 'Everything within the state, nothing outside the state, nothing against the state.',
    quoteSource: 'Benito Mussolini, 1925',
    strategyTip: '"Everything within the state, nothing outside" = the state controls all = totalitarianism.',
    genAlphaTip: 'Mussolini said the state IS everything. That\'s totalitarianism in one sentence. No choices, no freedom. 🚫',
  },
  {
    id: 'vus14-2-v3', templateId: 'vus14-2', version: 3, versionFormat: 'visual',
    standardId: 'VUS.14', text: 'This image illustrates which political system that emerged in Europe during the 1930s?',
    options: ['Democracy', 'Communism only', 'Totalitarianism', 'Feudalism'],
    correctIndex: 2, errorCategory: 'stimulus',
    imageDescription: 'A propaganda poster from 1930s Europe showing a towering figure of a dictator gazing over rows of uniformed soldiers marching in perfect formation. Citizens watch from the sides, all wearing identical armbands. Banners display a single party symbol. No opposition signs are visible anywhere.',
    strategyTip: 'One leader towering over everyone, uniformed masses, single party symbol, no dissent = totalitarianism.',
    genAlphaTip: 'One giant leader, everyone in uniform, one party symbol, zero opposition. That\'s totalitarianism visualized. 👁️',
  },
  {
    id: 'vus14-2-v4', templateId: 'vus14-2', version: 4, versionFormat: 'diagram',
    standardId: 'VUS.14', text: 'Which form of government is described by this list?',
    options: ['Democracy', 'Totalitarianism', 'Monarchy', 'Theocracy'],
    correctIndex: 1, errorCategory: 'stimulus',
    diagramData: {
      type: 'list',
      listItems: [
        'Single-party dictatorship',
        'State controls economy, media, and education',
        'Secret police suppress opposition',
        'Citizens have no individual rights',
      ],
    },
    strategyTip: 'Single party + state controls everything + secret police + no rights = totalitarianism.',
    genAlphaTip: 'One party, state controls all, secret police, no rights. Every bullet point screams totalitarianism. 📋🔒',
  },
  {
    id: 'vus14-2-v5', templateId: 'vus14-2', version: 5, versionFormat: 'timeline',
    standardId: 'VUS.14', text: 'The rise of Adolf Hitler to power in Germany belongs at which position?',
    options: ['1', '2', '3', '4'],
    correctIndex: 1, errorCategory: 'sequence',
    timelineData: [
      { year: 1922, label: 'Mussolini takes power in Italy' },
      { year: 1933, label: '?', highlight: true },
      { year: 1939, label: 'Germany invades Poland' },
      { year: 1941, label: 'US enters WWII' },
    ],
    strategyTip: 'Mussolini (1922) → Hitler (1933) → WWII starts (1939) → US enters (1941).',
    genAlphaTip: 'Mussolini first (1922), then Hitler (1933), then war. Know the dictator timeline. 📅',
  },

  // ===========================
  // Template 3: US Isolationism / Neutrality Acts
  // Core concept: The US passed Neutrality Acts in the 1930s to avoid involvement in foreign wars
  // ===========================
  {
    id: 'vus14-3-v1', templateId: 'vus14-3', version: 1, versionFormat: 'direct',
    standardId: 'VUS.14', text: 'The Neutrality Acts of the 1930s were designed to —',
    options: ['expand US military power', 'keep the US out of foreign wars', 'form alliances with European democracies', 'increase trade with Japan'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'The Neutrality Acts banned arms sales and loans to warring nations to avoid being drawn into another war.',
    genAlphaTip: 'After WWI, America said "never again." The Neutrality Acts were the "stay out of it" laws. 🚫⚔️',
  },
  {
    id: 'vus14-3-v2', templateId: 'vus14-3', version: 2, versionFormat: 'quote',
    standardId: 'VUS.14', text: 'This statement reflects which US foreign policy of the 1930s?',
    options: ['Containment', 'Isolationism', 'Imperialism', 'Dollar diplomacy'],
    correctIndex: 1, errorCategory: 'stimulus',
    quote: 'We shun political commitments which might entangle us in foreign wars. The peace, the freedom, and the security of ninety percent of the population of the world is being jeopardized by the remaining ten percent.',
    quoteSource: 'President Franklin D. Roosevelt, Quarantine Speech (1937)',
    strategyTip: '"Shun political commitments that might entangle us" = isolationism. Avoid foreign conflicts.',
    genAlphaTip: 'FDR talking about staying out of other people\'s problems. That\'s isolationism — the vibe of the 1930s. 🏠',
  },
  {
    id: 'vus14-3-v3', templateId: 'vus14-3', version: 3, versionFormat: 'visual',
    standardId: 'VUS.14', text: 'This cartoon illustrates which US foreign policy position?',
    options: ['Imperialism', 'Containment', 'Isolationism', 'Manifest Destiny'],
    correctIndex: 2, errorCategory: 'stimulus',
    imageDescription: 'A political cartoon from the late 1930s showing Uncle Sam sitting behind a tall brick wall labeled "NEUTRALITY ACTS." On the other side of the wall, European nations are engulfed in flames and explosions. Uncle Sam has his arms crossed and is wearing earplugs.',
    strategyTip: 'Uncle Sam behind a wall labeled "Neutrality Acts" while Europe burns = isolationism.',
    genAlphaTip: 'Uncle Sam behind a wall, earplugs in, Europe on fire. That\'s isolationism in one image. 🧱🔥',
  },
  {
    id: 'vus14-3-v4', templateId: 'vus14-3', version: 4, versionFormat: 'diagram',
    standardId: 'VUS.14', text: 'Which US foreign policy is described by this list?',
    options: ['Imperialism', 'Containment', 'Isolationism', 'Interventionism'],
    correctIndex: 2, errorCategory: 'stimulus',
    diagramData: {
      type: 'list',
      listItems: [
        'Neutrality Acts banned arms sales to warring nations',
        'US avoided military alliances with European countries',
        'Public opinion strongly opposed involvement in foreign wars',
        'Congress rejected membership in the League of Nations',
      ],
    },
    strategyTip: 'Banned arms sales, avoided alliances, opposed foreign wars, rejected League = isolationism.',
    genAlphaTip: 'No arms sales, no alliances, no foreign wars, no League of Nations. The US was fully checked out. Isolationism. 🏠',
  },
  {
    id: 'vus14-3-v5', templateId: 'vus14-3', version: 5, versionFormat: 'timeline',
    standardId: 'VUS.14', text: 'The passage of the first Neutrality Act belongs at which position?',
    options: ['1', '2', '3', '4'],
    correctIndex: 1, errorCategory: 'sequence',
    timelineData: [
      { year: 1919, label: 'Senate rejects League of Nations' },
      { year: 1935, label: '?', highlight: true },
      { year: 1939, label: 'WWII begins in Europe' },
      { year: 1941, label: 'Pearl Harbor attack' },
    ],
    strategyTip: 'League rejected (1919) → Neutrality Act (1935) → WWII begins (1939) → Pearl Harbor (1941).',
    genAlphaTip: 'No League → Neutrality Acts → War starts → Pearl Harbor. US tried to stay out but couldn\'t. 📅',
  },

  // ===========================
  // Template 4: D-Day / Normandy Invasion
  // Core concept: The Allied invasion of Normandy (June 6, 1944) was the turning point in the European theater
  // ===========================
  {
    id: 'vus14-4-v1', templateId: 'vus14-4', version: 1, versionFormat: 'direct',
    standardId: 'VUS.14', text: 'The Allied invasion of Normandy on June 6, 1944 is significant because it —',
    options: ['ended the war in the Pacific', 'opened a second front in Europe against Germany', 'resulted in the fall of the Soviet Union', 'led to the creation of the United Nations'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'D-Day opened a western front, forcing Germany to fight on two sides (east: Soviets, west: Allies).',
    genAlphaTip: 'D-Day opened a second front. Germany had to fight west AND east. Game over for the Nazis. ⚔️🏖️',
  },
  {
    id: 'vus14-4-v2', templateId: 'vus14-4', version: 2, versionFormat: 'quote',
    standardId: 'VUS.14', text: 'This order was issued before which military operation?',
    options: ['Battle of Midway', 'D-Day invasion of Normandy', 'Battle of the Bulge', 'Bombing of Hiroshima'],
    correctIndex: 1, errorCategory: 'stimulus',
    quote: 'You are about to embark upon the Great Crusade, toward which we have striven these many months. The eyes of the world are upon you.',
    quoteSource: 'General Dwight D. Eisenhower, Order of the Day (June 6, 1944)',
    strategyTip: '"Great Crusade" + Eisenhower + June 6, 1944 = D-Day invasion of Normandy.',
    genAlphaTip: 'Eisenhower calling it the "Great Crusade" on June 6, 1944. That\'s D-Day. The biggest invasion ever. 🎖️',
  },
  {
    id: 'vus14-4-v3', templateId: 'vus14-4', version: 3, versionFormat: 'visual',
    standardId: 'VUS.14', text: 'This photograph depicts which World War II military operation?',
    options: ['Battle of Midway', 'D-Day invasion', 'Battle of Iwo Jima', 'Battle of the Bulge'],
    correctIndex: 1, errorCategory: 'stimulus',
    imageDescription: 'A black-and-white photograph from June 1944 showing American soldiers wading through chest-deep water from landing craft toward a heavily fortified beach in France. Explosions send sand and water into the air. Steel obstacles line the beach. Cliffs overlook the landing zone.',
    strategyTip: 'Soldiers wading to a French beach + landing craft + June 1944 + fortified beach = D-Day (Normandy).',
    genAlphaTip: 'Soldiers in the water, landing craft, French beach, June 1944. That\'s D-Day. The most iconic WWII invasion. 🏖️⚔️',
  },
  {
    id: 'vus14-4-v4', templateId: 'vus14-4', version: 4, versionFormat: 'diagram',
    standardId: 'VUS.14', text: 'Which military operation best completes this diagram?',
    options: ['Battle of Stalingrad', 'D-Day invasion of Normandy', 'Battle of Midway', 'Bombing of Dresden'],
    correctIndex: 1, errorCategory: 'stimulus',
    diagramData: {
      type: 'flow',
      flowSteps: ['Allies build massive invasion force in Britain', '?', 'Germany forced to fight on two fronts'],
    },
    strategyTip: 'Build-up in Britain → [invasion] → two-front war for Germany. D-Day opened the western front.',
    genAlphaTip: 'Troops gather in Britain → ??? → Germany fights east AND west. D-Day was the invasion that made it happen. 🔄',
  },
  {
    id: 'vus14-4-v5', templateId: 'vus14-4', version: 5, versionFormat: 'timeline',
    standardId: 'VUS.14', text: 'The D-Day invasion of Normandy belongs at which position?',
    options: ['1', '2', '3', '4'],
    correctIndex: 1, errorCategory: 'sequence',
    timelineData: [
      { year: 1942, label: 'Battle of Stalingrad begins' },
      { year: 1944, label: '?', highlight: true },
      { year: 1944, label: 'Battle of the Bulge' },
      { year: 1945, label: 'V-E Day' },
    ],
    strategyTip: 'Stalingrad (1942-43) → D-Day (June 1944) → Bulge (Dec 1944) → V-E Day (May 1945).',
    genAlphaTip: 'Stalingrad → D-Day → Bulge → V-E Day. D-Day was June 1944. Lock it in. 📅',
  },

  // ===========================
  // Template 5: The Holocaust
  // Core concept: The systematic murder of 6 million Jews by Nazi Germany
  // ===========================
  {
    id: 'vus14-5-v1', templateId: 'vus14-5', version: 1, versionFormat: 'direct',
    standardId: 'VUS.14', text: 'The Holocaust was the systematic persecution and murder of approximately 6 million —',
    options: ['political prisoners', 'Allied soldiers', 'European Jews', 'German dissidents'],
    correctIndex: 2, errorCategory: 'memorization',
    strategyTip: 'The Holocaust specifically targeted European Jews for extermination under Nazi policy.',
    genAlphaTip: 'The Holocaust = the systematic murder of 6 million European Jews by the Nazis. Know this number. 6 million. 💔',
  },
  {
    id: 'vus14-5-v2', templateId: 'vus14-5', version: 2, versionFormat: 'quote',
    standardId: 'VUS.14', text: 'This account describes which event of World War II?',
    options: ['The Blitz on London', 'The Holocaust', 'The Bataan Death March', 'The firebombing of Tokyo'],
    correctIndex: 1, errorCategory: 'stimulus',
    quote: 'They came with their trucks in the night. Entire families were loaded and taken to the camps. We never saw them again. Six million of our people — gone.',
    quoteSource: 'Holocaust survivor testimony, recorded 1946',
    strategyTip: '"Families taken to camps" + "six million" + "never saw them again" = the Holocaust.',
    genAlphaTip: 'Families taken to camps, 6 million gone. This is a Holocaust survivor testimony. Never forget. 💔',
  },
  {
    id: 'vus14-5-v3', templateId: 'vus14-5', version: 3, versionFormat: 'visual',
    standardId: 'VUS.14', text: 'This photograph documents evidence of which World War II atrocity?',
    options: ['Bombing of Pearl Harbor', 'The Holocaust', 'Japanese internment camps', 'The Blitz'],
    correctIndex: 1, errorCategory: 'stimulus',
    imageDescription: 'A black-and-white photograph from 1945 showing the gates of a concentration camp with the words "ARBEIT MACHT FREI" (Work Makes You Free) in iron letters above the entrance. Barbed wire fences stretch in both directions. Emaciated survivors in striped uniforms stand behind the fence.',
    strategyTip: '"Arbeit Macht Frei" + concentration camp gates + striped uniforms + barbed wire = Holocaust.',
    genAlphaTip: '"Arbeit Macht Frei" on the gates, barbed wire, striped uniforms. This is a Holocaust concentration camp. 🕯️',
  },
  {
    id: 'vus14-5-v4', templateId: 'vus14-5', version: 4, versionFormat: 'diagram',
    standardId: 'VUS.14', text: 'Which World War II event is described by this sequence?',
    options: ['The Blitz', 'The Holocaust', 'Japanese internment', 'The Manhattan Project'],
    correctIndex: 1, errorCategory: 'stimulus',
    diagramData: {
      type: 'flow',
      flowSteps: ['Nuremberg Laws strip Jews of citizenship', 'Kristallnacht — organized violence against Jews', 'Concentration and death camps established'],
    },
    strategyTip: 'Nuremberg Laws → Kristallnacht → death camps = the escalation of the Holocaust.',
    genAlphaTip: 'Laws → violence → death camps. The Holocaust escalated in stages. Each step was worse. 📉💔',
  },
  {
    id: 'vus14-5-v5', templateId: 'vus14-5', version: 5, versionFormat: 'timeline',
    standardId: 'VUS.14', text: 'Kristallnacht ("Night of Broken Glass") belongs at which position?',
    options: ['1', '2', '3', '4'],
    correctIndex: 1, errorCategory: 'sequence',
    timelineData: [
      { year: 1935, label: 'Nuremberg Laws passed' },
      { year: 1938, label: '?', highlight: true },
      { year: 1942, label: '"Final Solution" begins' },
      { year: 1945, label: 'Camps liberated' },
    ],
    strategyTip: 'Nuremberg Laws (1935) → Kristallnacht (1938) → Final Solution (1942) → liberation (1945).',
    genAlphaTip: 'Laws (1935) → Kristallnacht (1938) → Final Solution (1942) → liberation (1945). Timeline of horror. 📅',
  },

  // ===========================
  // Template 6: Atomic Bomb — Hiroshima & Nagasaki
  // Core concept: President Truman ordered atomic bombs dropped on Japan to end WWII
  // ===========================
  {
    id: 'vus14-6-v1', templateId: 'vus14-6', version: 1, versionFormat: 'direct',
    standardId: 'VUS.14', text: 'President Truman\'s decision to use atomic weapons against Japan was primarily intended to —',
    options: ['punish Japan for Pearl Harbor', 'demonstrate power to the Soviet Union', 'end the war quickly and avoid a costly land invasion', 'destroy Japan\'s navy'],
    correctIndex: 2, errorCategory: 'memorization',
    strategyTip: 'Truman chose the bomb to end the war quickly and avoid the massive casualties of invading Japan.',
    genAlphaTip: 'Truman dropped the bomb to end the war ASAP and skip a land invasion that would\'ve cost millions of lives. 💣',
  },
  {
    id: 'vus14-6-v2', templateId: 'vus14-6', version: 2, versionFormat: 'quote',
    standardId: 'VUS.14', text: 'This statement justifies which wartime decision?',
    options: ['Invasion of Normandy', 'Firebombing of Tokyo', 'Use of atomic bombs on Japan', 'Entry into the Korean War'],
    correctIndex: 2, errorCategory: 'stimulus',
    quote: 'Having found the bomb, we have used it. We have used it to shorten the agony of war, in order to save the lives of thousands and thousands of young Americans.',
    quoteSource: 'President Harry S. Truman, Radio Address (August 9, 1945)',
    strategyTip: '"Found the bomb, used it" + "shorten the agony of war" + "save lives" = justification for atomic bombs.',
    genAlphaTip: 'Truman said he used the bomb to end the war faster and save American lives. That was his justification. 🎙️💣',
  },
  {
    id: 'vus14-6-v3', templateId: 'vus14-6', version: 3, versionFormat: 'visual',
    standardId: 'VUS.14', text: 'This photograph depicts the result of which wartime decision?',
    options: ['Firebombing of Dresden', 'Atomic bombing of Hiroshima', 'Battle of Okinawa', 'Bombing of London'],
    correctIndex: 1, errorCategory: 'stimulus',
    imageDescription: 'An aerial photograph from August 1945 showing a massive mushroom cloud rising tens of thousands of feet above a Japanese city. The cloud is bright white at the top with a dark column of debris below. The surrounding city has been flattened for miles in every direction.',
    strategyTip: 'Mushroom cloud + Japanese city + August 1945 + total destruction = atomic bombing of Hiroshima.',
    genAlphaTip: 'Mushroom cloud over a Japanese city, August 1945. That\'s the atomic bomb on Hiroshima. World-changing moment. ☁️💣',
  },
  {
    id: 'vus14-6-v4', templateId: 'vus14-6', version: 4, versionFormat: 'diagram',
    standardId: 'VUS.14', text: 'Which event best completes this diagram?',
    options: ['Battle of Midway', 'Invasion of Okinawa', 'Atomic bombings of Hiroshima and Nagasaki', 'Firebombing of Tokyo'],
    correctIndex: 2, errorCategory: 'stimulus',
    diagramData: {
      type: 'flow',
      flowSteps: ['Japan refuses to surrender unconditionally', '?', 'Japan announces unconditional surrender'],
    },
    strategyTip: 'Japan refuses → [devastating action] → Japan surrenders. The atomic bombs forced the surrender.',
    genAlphaTip: 'Won\'t surrender → ??? → surrenders. The atomic bombs were what finally ended it. 💣🏳️',
  },
  {
    id: 'vus14-6-v5', templateId: 'vus14-6', version: 5, versionFormat: 'timeline',
    standardId: 'VUS.14', text: 'The atomic bombing of Hiroshima belongs at which position?',
    options: ['1', '2', '3', '4'],
    correctIndex: 2, errorCategory: 'sequence',
    timelineData: [
      { year: 1944, label: 'D-Day invasion' },
      { year: 1945, label: 'V-E Day (May)' },
      { year: 1945, label: '?', highlight: true },
      { year: 1945, label: 'Japan surrenders (Sept)' },
    ],
    strategyTip: 'D-Day (1944) → V-E Day (May 1945) → Hiroshima (Aug 1945) → Japan surrenders (Sept 1945).',
    genAlphaTip: 'D-Day → Europe wins → Hiroshima → Japan surrenders. The bomb came AFTER Europe was already done. 📅',
  },

  // ===========================
  // Template 7: Marshall Plan
  // Core concept: The US provided economic aid to rebuild Western Europe after WWII
  // ===========================
  {
    id: 'vus14-7-v1', templateId: 'vus14-7', version: 1, versionFormat: 'direct',
    standardId: 'VUS.14', text: 'The Marshall Plan was designed to —',
    options: ['create a military alliance against the Soviet Union', 'rebuild the economies of Western European nations', 'establish the United Nations', 'provide aid to Asian countries'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'The Marshall Plan (1948) gave $13 billion in economic aid to rebuild war-torn Western Europe.',
    genAlphaTip: 'Marshall Plan = the US spent billions to rebuild Europe after WWII. Help them recover so communism doesn\'t spread. 💰🏗️',
  },
  {
    id: 'vus14-7-v2', templateId: 'vus14-7', version: 2, versionFormat: 'quote',
    standardId: 'VUS.14', text: 'This proposal became known as the —',
    options: ['Truman Doctrine', 'Marshall Plan', 'Eisenhower Doctrine', 'Monroe Doctrine'],
    correctIndex: 1, errorCategory: 'stimulus',
    quote: 'It is logical that the United States should do whatever it is able to do to assist in the return of normal economic health in the world, without which there can be no political stability and no assured peace.',
    quoteSource: 'Secretary of State George C. Marshall, Harvard University (1947)',
    strategyTip: '"Assist in return of economic health" + Marshall + Harvard speech = Marshall Plan.',
    genAlphaTip: 'Marshall at Harvard saying "let\'s rebuild Europe\'s economy." That speech became the Marshall Plan. 🎓💰',
  },
  {
    id: 'vus14-7-v3', templateId: 'vus14-7', version: 3, versionFormat: 'visual',
    standardId: 'VUS.14', text: 'This poster promotes which US postwar program?',
    options: ['Lend-Lease Act', 'Marshall Plan', 'GI Bill', 'New Deal'],
    correctIndex: 1, errorCategory: 'stimulus',
    imageDescription: 'A colorful 1948 propaganda poster showing a prosperous European city being rebuilt. American and European flags fly side by side. Workers construct new buildings while ships unload supplies at a harbor. Text reads "FOR EUROPEAN RECOVERY — SUPPLIED BY THE UNITED STATES OF AMERICA."',
    strategyTip: '"European Recovery" + "Supplied by the United States" + rebuilding = Marshall Plan.',
    genAlphaTip: '"European Recovery" poster, US supplies, rebuilding cities. That\'s the Marshall Plan in action. 🇺🇸🇪🇺',
  },
  {
    id: 'vus14-7-v4', templateId: 'vus14-7', version: 4, versionFormat: 'diagram',
    standardId: 'VUS.14', text: 'Which postwar program best completes this diagram?',
    options: ['Truman Doctrine', 'Marshall Plan', 'NATO', 'United Nations'],
    correctIndex: 1, errorCategory: 'stimulus',
    diagramData: {
      type: 'flow',
      flowSteps: ['Europe devastated by WWII', '?', 'Western European economies recover and resist communism'],
    },
    strategyTip: 'Europe devastated → [aid program] → economies recover. The Marshall Plan provided the economic aid.',
    genAlphaTip: 'Europe wrecked → ??? → Europe recovers. The Marshall Plan was the economic rescue mission. 🏗️',
  },
  {
    id: 'vus14-7-v5', templateId: 'vus14-7', version: 5, versionFormat: 'timeline',
    standardId: 'VUS.14', text: 'The Marshall Plan belongs at which position?',
    options: ['1', '2', '3', '4'],
    correctIndex: 1, errorCategory: 'sequence',
    timelineData: [
      { year: 1945, label: 'WWII ends' },
      { year: 1948, label: '?', highlight: true },
      { year: 1949, label: 'NATO formed' },
      { year: 1950, label: 'Korean War begins' },
    ],
    strategyTip: 'WWII ends (1945) → Marshall Plan (1948) → NATO (1949) → Korea (1950).',
    genAlphaTip: 'War ends → Marshall Plan → NATO → Korea. Postwar moves in order. 📅',
  },

  // ===========================
  // Template 8: Home Front — Rosie the Riveter
  // Core concept: Women entered the workforce in large numbers during WWII
  // ===========================
  {
    id: 'vus14-8-v1', templateId: 'vus14-8', version: 1, versionFormat: 'direct',
    standardId: 'VUS.14', text: 'During World War II, women contributed to the war effort primarily by —',
    options: ['serving in combat overseas', 'working in factories and defense plants', 'leading military strategy', 'negotiating peace treaties'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'With men fighting overseas, women filled factory and defense plant jobs — symbolized by "Rosie the Riveter."',
    genAlphaTip: 'Men went to fight, women ran the factories. Rosie the Riveter was the symbol. Women built the weapons that won the war. 💪🔧',
  },
  {
    id: 'vus14-8-v2', templateId: 'vus14-8', version: 2, versionFormat: 'quote',
    standardId: 'VUS.14', text: 'This slogan was used to encourage women to —',
    options: ['vote in elections', 'join the military', 'work in wartime factories', 'support rationing efforts'],
    correctIndex: 2, errorCategory: 'stimulus',
    quote: 'We Can Do It!',
    quoteSource: 'War Production Co-ordinating Committee poster, 1943',
    strategyTip: '"We Can Do It!" is the iconic Rosie the Riveter slogan encouraging women to work in factories.',
    genAlphaTip: '"We Can Do It!" = Rosie the Riveter. Women stepping up to work in factories during the war. Iconic. 💪',
  },
  {
    id: 'vus14-8-v3', templateId: 'vus14-8', version: 3, versionFormat: 'visual',
    standardId: 'VUS.14', text: 'This poster was created to encourage which wartime effort?',
    options: ['Military enlistment', 'Women working in factories', 'Food rationing', 'War bond purchases'],
    correctIndex: 1, errorCategory: 'stimulus',
    imageDescription: 'A famous wartime poster showing a woman wearing a red bandana and blue work shirt, flexing her bicep. She has a determined expression. The background is bright yellow with the words "We Can Do It!" in a speech bubble above her.',
    strategyTip: 'Woman flexing + work clothes + "We Can Do It!" = Rosie the Riveter, encouraging women in factories.',
    genAlphaTip: 'Woman flexing, red bandana, "We Can Do It!" That\'s Rosie the Riveter. Most famous poster of WWII. 💪🇺🇸',
  },
  {
    id: 'vus14-8-v4', templateId: 'vus14-8', version: 4, versionFormat: 'diagram',
    standardId: 'VUS.14', text: 'Based on this data, what change occurred during World War II?',
    options: ['Women lost factory jobs', 'Women entered the workforce in large numbers', 'Military enlistment declined', 'Immigration increased sharply'],
    correctIndex: 1, errorCategory: 'stimulus',
    diagramData: {
      type: 'table',
      tableHeaders: ['Year', 'Women in Workforce (millions)'],
      tableRows: [
        ['1940', '12.0'],
        ['1943', '18.5'],
        ['1945', '19.3'],
      ],
      tableCaption: 'US Women in the Labor Force',
    },
    strategyTip: 'Women in workforce went from 12 million (1940) to 19.3 million (1945) = massive increase during WWII.',
    genAlphaTip: '12 million → 19.3 million. Women went from sidelines to running the factories. The numbers don\'t lie. 📊💪',
  },
  {
    id: 'vus14-8-v5', templateId: 'vus14-8', version: 5, versionFormat: 'timeline',
    standardId: 'VUS.14', text: 'The peak of women\'s wartime factory employment belongs at which position?',
    options: ['1', '2', '3', '4'],
    correctIndex: 2, errorCategory: 'sequence',
    timelineData: [
      { year: 1941, label: 'US enters WWII' },
      { year: 1942, label: 'War production ramps up' },
      { year: 1944, label: '?', highlight: true },
      { year: 1945, label: 'War ends, men return' },
    ],
    strategyTip: 'Women\'s factory employment peaked in 1944 when war production was at its highest.',
    genAlphaTip: 'Peak factory employment = 1944. War production maxed out before the war ended. Then men came home. 📅',
  },

  // ===========================
  // Template 9: Battle of Midway
  // Core concept: Midway was the turning point in the Pacific Theater
  // ===========================
  {
    id: 'vus14-9-v1', templateId: 'vus14-9', version: 1, versionFormat: 'direct',
    standardId: 'VUS.14', text: 'The Battle of Midway (1942) was significant because it —',
    options: ['ended the war in Europe', 'was the turning point in the Pacific Theater', 'resulted in the US invasion of Japan', 'led to the alliance with the Soviet Union'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'Midway (June 1942) destroyed Japan\'s carrier fleet and shifted the Pacific war in favor of the Allies.',
    genAlphaTip: 'Midway was the Pacific turning point. Japan lost 4 aircraft carriers and never recovered. GG. ⚓🔥',
  },
  {
    id: 'vus14-9-v2', templateId: 'vus14-9', version: 2, versionFormat: 'quote',
    standardId: 'VUS.14', text: 'This assessment describes which World War II battle?',
    options: ['Battle of the Coral Sea', 'Battle of Midway', 'Battle of Guadalcanal', 'Battle of Leyte Gulf'],
    correctIndex: 1, errorCategory: 'stimulus',
    quote: 'In the space of five minutes, three of Japan\'s finest carriers were reduced to burning wrecks. The tide of the Pacific war had turned.',
    quoteSource: 'US Navy historical account of the battle, June 1942',
    strategyTip: '"Three carriers destroyed in five minutes" + "tide turned" + Pacific = Battle of Midway.',
    genAlphaTip: 'Three carriers destroyed in 5 minutes, tide turned in the Pacific. That\'s Midway. Speed run destruction. ⚓💥',
  },
  {
    id: 'vus14-9-v3', templateId: 'vus14-9', version: 3, versionFormat: 'visual',
    standardId: 'VUS.14', text: 'This photograph depicts which World War II naval battle?',
    options: ['Battle of the Atlantic', 'Battle of Midway', 'Attack on Pearl Harbor', 'Battle of Leyte Gulf'],
    correctIndex: 1, errorCategory: 'stimulus',
    imageDescription: 'An aerial photograph from June 1942 showing a Japanese aircraft carrier engulfed in flames and listing heavily in the central Pacific Ocean. American dive-bombers are visible overhead. Escort ships attempt to move away from the burning carrier. Thick black smoke trails across the ocean surface.',
    strategyTip: 'Japanese carrier on fire + American planes + June 1942 + central Pacific = Battle of Midway.',
    genAlphaTip: 'Japanese carrier burning, American planes overhead, June 1942. That\'s Midway. Japan\'s navy never recovered. 🔥⚓',
  },
  {
    id: 'vus14-9-v4', templateId: 'vus14-9', version: 4, versionFormat: 'diagram',
    standardId: 'VUS.14', text: 'Which battle best completes this diagram?',
    options: ['Pearl Harbor', 'Battle of Midway', 'Battle of Guadalcanal', 'Battle of Iwo Jima'],
    correctIndex: 1, errorCategory: 'stimulus',
    diagramData: {
      type: 'flow',
      flowSteps: ['Japan dominates the Pacific after Pearl Harbor', '?', 'Allied forces begin island-hopping campaign'],
    },
    strategyTip: 'Japan dominant → [turning point] → Allies go on offense. Midway was the turning point.',
    genAlphaTip: 'Japan winning → ??? → Allies start island-hopping. Midway flipped the script. 🔄⚓',
  },
  {
    id: 'vus14-9-v5', templateId: 'vus14-9', version: 5, versionFormat: 'timeline',
    standardId: 'VUS.14', text: 'The Battle of Midway belongs at which position?',
    options: ['1', '2', '3', '4'],
    correctIndex: 1, errorCategory: 'sequence',
    timelineData: [
      { year: 1941, label: 'Pearl Harbor' },
      { year: 1942, label: '?', highlight: true },
      { year: 1944, label: 'Battle of Leyte Gulf' },
      { year: 1945, label: 'Atomic bombs dropped' },
    ],
    strategyTip: 'Pearl Harbor (1941) → Midway (1942) → Leyte Gulf (1944) → atomic bombs (1945).',
    genAlphaTip: 'Pearl Harbor → Midway → Leyte Gulf → atomic bombs. Pacific war timeline. 📅',
  },

  // ===========================
  // Template 10: Nuremberg Trials
  // Core concept: Nazi leaders were tried for war crimes and crimes against humanity
  // ===========================
  {
    id: 'vus14-10-v1', templateId: 'vus14-10', version: 1, versionFormat: 'direct',
    standardId: 'VUS.14', text: 'The Nuremberg Trials were significant because they —',
    options: ['ended the war in Europe', 'divided Germany into occupation zones', 'established that individuals could be held accountable for war crimes', 'created the United Nations'],
    correctIndex: 2, errorCategory: 'memorization',
    strategyTip: 'Nuremberg established the precedent that "following orders" was not a defense for committing atrocities.',
    genAlphaTip: 'Nuremberg = you CAN\'T say "I was just following orders." War criminals get held accountable. ⚖️',
  },
  {
    id: 'vus14-10-v2', templateId: 'vus14-10', version: 2, versionFormat: 'quote',
    standardId: 'VUS.14', text: 'This statement established which legal principle?',
    options: ['Diplomatic immunity', 'Individual accountability for war crimes', 'Freedom of the press', 'Right to a speedy trial'],
    correctIndex: 1, errorCategory: 'stimulus',
    quote: 'The wrongs which we seek to condemn and punish have been so calculated, so malignant, and so devastating, that civilization cannot tolerate their being ignored because it cannot survive their being repeated.',
    quoteSource: 'Justice Robert H. Jackson, Opening Statement, Nuremberg Trials (1945)',
    strategyTip: '"Wrongs so devastating civilization cannot tolerate" = Nuremberg Trials holding Nazis accountable.',
    genAlphaTip: 'Jackson said these crimes are so bad that we HAVE to punish them or civilization is cooked. Nuremberg Trials. ⚖️🔥',
  },
  {
    id: 'vus14-10-v3', templateId: 'vus14-10', version: 3, versionFormat: 'visual',
    standardId: 'VUS.14', text: 'This photograph depicts which postwar legal proceeding?',
    options: ['Treaty of Versailles signing', 'Nuremberg Trials', 'United Nations founding', 'Yalta Conference'],
    correctIndex: 1, errorCategory: 'stimulus',
    imageDescription: 'A photograph from 1945-46 showing a large courtroom in Germany. Rows of defendants in suits sit behind a wooden railing, flanked by military police in white helmets. Judges from four Allied nations sit on an elevated bench. Translators wear headphones in a glass booth. The room is packed with observers and journalists.',
    strategyTip: 'German courtroom + defendants + Allied judges from four nations + 1945-46 = Nuremberg Trials.',
    genAlphaTip: 'Nazi defendants in a courtroom, Allied judges, military police. That\'s the Nuremberg Trials. Justice served. ⚖️',
  },
  {
    id: 'vus14-10-v4', templateId: 'vus14-10', version: 4, versionFormat: 'diagram',
    standardId: 'VUS.14', text: 'Which postwar event is described by this list?',
    options: ['Yalta Conference', 'Nuremberg Trials', 'Marshall Plan', 'Potsdam Conference'],
    correctIndex: 1, errorCategory: 'stimulus',
    diagramData: {
      type: 'list',
      listItems: [
        'Nazi leaders charged with crimes against humanity',
        'Established that "following orders" is not a valid defense',
        'Judges from US, Britain, France, and Soviet Union presided',
        'Set precedent for international criminal law',
      ],
    },
    strategyTip: 'Nazi leaders tried + "following orders" no defense + four Allied judges + international law = Nuremberg.',
    genAlphaTip: 'Nazis on trial, "just following orders" doesn\'t work, four countries judging. Nuremberg Trials. ⚖️',
  },
  {
    id: 'vus14-10-v5', templateId: 'vus14-10', version: 5, versionFormat: 'timeline',
    standardId: 'VUS.14', text: 'The Nuremberg Trials belong at which position?',
    options: ['1', '2', '3', '4'],
    correctIndex: 1, errorCategory: 'sequence',
    timelineData: [
      { year: 1945, label: 'Germany surrenders (May)' },
      { year: 1945, label: '?', highlight: true },
      { year: 1948, label: 'Marshall Plan begins' },
      { year: 1949, label: 'NATO formed' },
    ],
    strategyTip: 'Germany surrenders (May 1945) → Nuremberg Trials (Nov 1945-1946) → Marshall Plan (1948).',
    genAlphaTip: 'Germany surrenders → Nuremberg Trials → Marshall Plan → NATO. Postwar order. 📅',
  },

  // ===========================
  // Template 11: Japanese American Internment
  // Core concept: Executive Order 9066 forced Japanese Americans into internment camps
  // ===========================
  {
    id: 'vus14-11-v1', templateId: 'vus14-11', version: 1, versionFormat: 'direct',
    standardId: 'VUS.14', text: 'During World War II, Executive Order 9066 authorized the —',
    options: ['desegregation of the military', 'internment of Japanese Americans', 'rationing of food and gasoline', 'creation of the Manhattan Project'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'Executive Order 9066 (1942) forced over 100,000 Japanese Americans into internment camps.',
    genAlphaTip: 'Executive Order 9066 = Japanese Americans forced into camps. Over 100,000 people. A dark chapter. 🏚️',
  },
  {
    id: 'vus14-11-v2', templateId: 'vus14-11', version: 2, versionFormat: 'quote',
    standardId: 'VUS.14', text: 'This order led to which wartime action?',
    options: ['Military draft expansion', 'Japanese American internment', 'Desegregation of factories', 'Creation of the OSS'],
    correctIndex: 1, errorCategory: 'stimulus',
    quote: 'I hereby authorize the Secretary of War to prescribe military areas from which any or all persons may be excluded.',
    quoteSource: 'President Franklin D. Roosevelt, Executive Order 9066 (February 1942)',
    strategyTip: '"Military areas from which persons may be excluded" = legal basis for Japanese American internment.',
    genAlphaTip: 'FDR saying the military can exclude "any persons" from areas. That\'s how they justified internment. 📜',
  },
  {
    id: 'vus14-11-v3', templateId: 'vus14-11', version: 3, versionFormat: 'visual',
    standardId: 'VUS.14', text: 'This photograph documents which World War II policy?',
    options: ['Rationing', 'Japanese American internment', 'War bond drives', 'Military recruitment'],
    correctIndex: 1, errorCategory: 'stimulus',
    imageDescription: 'A photograph from 1942 showing Japanese American families carrying suitcases and personal belongings, boarding buses under the watch of armed US soldiers. A sign reads "INSTRUCTIONS TO ALL PERSONS OF JAPANESE ANCESTRY." Behind them, a row of tar-paper barracks stretches into the distance behind barbed wire fencing.',
    strategyTip: 'Japanese American families + suitcases + soldiers + barracks + barbed wire = internment.',
    genAlphaTip: 'Japanese American families forced onto buses, barbed wire barracks in the background. That\'s internment. 🏚️💔',
  },
  {
    id: 'vus14-11-v4', templateId: 'vus14-11', version: 4, versionFormat: 'diagram',
    standardId: 'VUS.14', text: 'Which wartime policy is described by this sequence?',
    options: ['Lend-Lease Act', 'Japanese American internment', 'Manhattan Project', 'GI Bill'],
    correctIndex: 1, errorCategory: 'stimulus',
    diagramData: {
      type: 'flow',
      flowSteps: ['Japan attacks Pearl Harbor', 'Executive Order 9066 signed', 'Over 100,000 Japanese Americans relocated to camps'],
    },
    strategyTip: 'Pearl Harbor → EO 9066 → Japanese Americans in camps = internment.',
    genAlphaTip: 'Pearl Harbor → executive order → 100,000+ people in camps. Japanese American internment, step by step. 📋',
  },
  {
    id: 'vus14-11-v5', templateId: 'vus14-11', version: 5, versionFormat: 'timeline',
    standardId: 'VUS.14', text: 'Executive Order 9066 (Japanese American internment) belongs at which position?',
    options: ['1', '2', '3', '4'],
    correctIndex: 1, errorCategory: 'sequence',
    timelineData: [
      { year: 1941, label: 'Pearl Harbor (December)' },
      { year: 1942, label: '?', highlight: true },
      { year: 1944, label: 'Korematsu v. US upholds internment' },
      { year: 1988, label: 'US government formally apologizes' },
    ],
    strategyTip: 'Pearl Harbor (Dec 1941) → EO 9066 (Feb 1942) → Korematsu (1944) → apology (1988).',
    genAlphaTip: 'Pearl Harbor → internment order → court upholds it → apology 46 years later. Know the timeline. 📅',
  },

  // ===========================
  // Template 12: Lend-Lease Act
  // Core concept: The US provided military supplies to Allies before entering WWII
  // ===========================
  {
    id: 'vus14-12-v1', templateId: 'vus14-12', version: 1, versionFormat: 'direct',
    standardId: 'VUS.14', text: 'The Lend-Lease Act (1941) allowed the United States to —',
    options: ['declare war on Germany', 'provide military supplies to Allied nations', 'intern Japanese Americans', 'create the atomic bomb'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'Lend-Lease let the US supply weapons and materials to Britain and other Allies without entering the war.',
    genAlphaTip: 'Lend-Lease = the US sent weapons and supplies to the Allies before officially joining the war. Helping from the sidelines. 📦⚔️',
  },
  {
    id: 'vus14-12-v2', templateId: 'vus14-12', version: 2, versionFormat: 'quote',
    standardId: 'VUS.14', text: 'This analogy was used to justify which policy?',
    options: ['Neutrality Acts', 'Lend-Lease Act', 'Marshall Plan', 'Truman Doctrine'],
    correctIndex: 1, errorCategory: 'stimulus',
    quote: 'Suppose my neighbor\'s home catches fire. If he can take my garden hose and connect it up, I may help him to put out the fire. I don\'t say, "Neighbor, my garden hose cost me $15; you have to pay me $15 for it." I want my garden hose back after the fire is over.',
    quoteSource: 'President Franklin D. Roosevelt, Press Conference (1940)',
    strategyTip: 'The "garden hose" analogy = lending supplies to help fight, then getting them back. That\'s Lend-Lease.',
    genAlphaTip: 'FDR\'s garden hose analogy. "Lend it, don\'t sell it." That\'s how he explained Lend-Lease to the public. 🏠🔥',
  },
  {
    id: 'vus14-12-v3', templateId: 'vus14-12', version: 3, versionFormat: 'visual',
    standardId: 'VUS.14', text: 'This image illustrates which US policy before entering World War II?',
    options: ['Neutrality Acts', 'Lend-Lease Act', 'Cash and Carry', 'War bond program'],
    correctIndex: 1, errorCategory: 'stimulus',
    imageDescription: 'A 1941 illustration showing a long convoy of American cargo ships crossing the Atlantic Ocean, loaded with tanks, planes, and crates of ammunition. The ships fly American flags but are heading toward Britain. A banner reads "ARSENAL OF DEMOCRACY."',
    strategyTip: 'American ships carrying weapons to Britain + "Arsenal of Democracy" = Lend-Lease.',
    genAlphaTip: 'US ships full of weapons heading to Britain, "Arsenal of Democracy" banner. That\'s Lend-Lease. 🚢🔫',
  },
  {
    id: 'vus14-12-v4', templateId: 'vus14-12', version: 4, versionFormat: 'diagram',
    standardId: 'VUS.14', text: 'Which policy best completes this diagram?',
    options: ['Neutrality Acts', 'Lend-Lease Act', 'Atlantic Charter', 'Four Freedoms'],
    correctIndex: 1, errorCategory: 'stimulus',
    diagramData: {
      type: 'flow',
      flowSteps: ['Britain running out of money to buy US weapons', '?', 'US becomes "Arsenal of Democracy"'],
    },
    strategyTip: 'Britain can\'t afford weapons → [new policy] → US supplies freely. Lend-Lease solved the funding problem.',
    genAlphaTip: 'Britain broke → ??? → US ships weapons anyway. Lend-Lease was the workaround. 💰➡️🔫',
  },
  {
    id: 'vus14-12-v5', templateId: 'vus14-12', version: 5, versionFormat: 'timeline',
    standardId: 'VUS.14', text: 'The Lend-Lease Act belongs at which position?',
    options: ['1', '2', '3', '4'],
    correctIndex: 1, errorCategory: 'sequence',
    timelineData: [
      { year: 1939, label: 'WWII begins in Europe' },
      { year: 1941, label: '?', highlight: true },
      { year: 1941, label: 'Pearl Harbor (December)' },
      { year: 1942, label: 'US fully mobilizes for war' },
    ],
    strategyTip: 'WWII starts (1939) → Lend-Lease (March 1941) → Pearl Harbor (Dec 1941) → full mobilization (1942).',
    genAlphaTip: 'War starts → Lend-Lease → Pearl Harbor → all-in. Lend-Lease came BEFORE Pearl Harbor. 📅',
  },

  // ===========================
  // Template 13: Battle of the Bulge
  // Core concept: Germany's last major offensive failed, leading to Allied victory in Europe
  // ===========================
  {
    id: 'vus14-13-v1', templateId: 'vus14-13', version: 1, versionFormat: 'direct',
    standardId: 'VUS.14', text: 'The Battle of the Bulge (1944) was significant because it —',
    options: ['opened a second front in Europe', 'was Germany\'s last major offensive of the war', 'led to the US entry into the war', 'resulted in the fall of France'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'The Battle of the Bulge (Dec 1944) was Germany\'s final counterattack. Its failure meant Germany was finished.',
    genAlphaTip: 'Battle of the Bulge = Germany\'s last big swing. They missed. After this, it was over for the Nazis. ⚔️💀',
  },
  {
    id: 'vus14-13-v2', templateId: 'vus14-13', version: 2, versionFormat: 'quote',
    standardId: 'VUS.14', text: 'This response was given during which World War II battle?',
    options: ['D-Day', 'Battle of Midway', 'Battle of the Bulge', 'Battle of Stalingrad'],
    correctIndex: 2, errorCategory: 'stimulus',
    quote: 'NUTS!',
    quoteSource: 'General Anthony McAuliffe, in response to a German demand for surrender at Bastogne (December 1944)',
    strategyTip: '"NUTS!" was McAuliffe\'s famous one-word refusal to surrender at Bastogne during the Battle of the Bulge.',
    genAlphaTip: 'Germans said "surrender." McAuliffe said "NUTS!" One word. Legend behavior. Battle of the Bulge. 🥜⚔️',
  },
  {
    id: 'vus14-13-v3', templateId: 'vus14-13', version: 3, versionFormat: 'visual',
    standardId: 'VUS.14', text: 'This photograph depicts which World War II battle?',
    options: ['D-Day', 'Battle of Stalingrad', 'Battle of the Bulge', 'Battle of Britain'],
    correctIndex: 2, errorCategory: 'stimulus',
    imageDescription: 'A winter photograph from December 1944 showing American soldiers crouched in snow-filled foxholes in a frozen Belgian forest. Their breath is visible in the frigid air. German tanks are visible in the distance through the bare trees. Soldiers appear exhausted and outnumbered.',
    strategyTip: 'American soldiers + winter + Belgium + December 1944 + surrounded = Battle of the Bulge.',
    genAlphaTip: 'Freezing cold, Belgian forest, December 1944, Americans surrounded. Battle of the Bulge. Winter warfare at its worst. 🥶⚔️',
  },
  {
    id: 'vus14-13-v4', templateId: 'vus14-13', version: 4, versionFormat: 'diagram',
    standardId: 'VUS.14', text: 'Which battle best completes this diagram?',
    options: ['Battle of Midway', 'D-Day invasion', 'Battle of the Bulge', 'Battle of Okinawa'],
    correctIndex: 2, errorCategory: 'stimulus',
    diagramData: {
      type: 'flow',
      flowSteps: ['Germany launches surprise winter counterattack', '?', 'German army exhausted; Allied advance resumes toward Berlin'],
    },
    strategyTip: 'Surprise winter attack → [specific battle] → Germany exhausted. The Bulge was Germany\'s last gamble.',
    genAlphaTip: 'Surprise attack → ??? → Germany done. Battle of the Bulge was the last Hail Mary. It failed. 🏈❌',
  },
  {
    id: 'vus14-13-v5', templateId: 'vus14-13', version: 5, versionFormat: 'timeline',
    standardId: 'VUS.14', text: 'The Battle of the Bulge belongs at which position?',
    options: ['1', '2', '3', '4'],
    correctIndex: 2, errorCategory: 'sequence',
    timelineData: [
      { year: 1944, label: 'D-Day (June)' },
      { year: 1944, label: 'Liberation of Paris (Aug)' },
      { year: 1944, label: '?', highlight: true },
      { year: 1945, label: 'Germany surrenders (May)' },
    ],
    strategyTip: 'D-Day (June 1944) → Paris freed (Aug 1944) → Bulge (Dec 1944) → Germany surrenders (May 1945).',
    genAlphaTip: 'D-Day → Paris → Bulge → surrender. The Bulge was December 1944, right before the end. 📅',
  },

  // ===========================
  // Template 14: V-E Day / V-J Day
  // Core concept: V-E Day (May 1945) ended the war in Europe; V-J Day (August 1945) ended the war in the Pacific
  // ===========================
  {
    id: 'vus14-14-v1', templateId: 'vus14-14', version: 1, versionFormat: 'direct',
    standardId: 'VUS.14', text: 'V-E Day (May 8, 1945) marked the —',
    options: ['end of the war in the Pacific', 'Allied victory in Europe', 'beginning of the Cold War', 'founding of the United Nations'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'V-E = Victory in Europe. May 8, 1945. Germany surrendered. The Pacific war continued until August.',
    genAlphaTip: 'V-E Day = Victory in Europe. May 8, 1945. Germany done. But Japan was still fighting. 🇪🇺✅',
  },
  {
    id: 'vus14-14-v2', templateId: 'vus14-14', version: 2, versionFormat: 'quote',
    standardId: 'VUS.14', text: 'This announcement refers to which event?',
    options: ['D-Day', 'V-E Day', 'Pearl Harbor', 'V-J Day'],
    correctIndex: 1, errorCategory: 'stimulus',
    quote: 'The mission of this Allied force was fulfilled at 0241 local time, May 7, 1945. The war in Europe is ended! Surrender was unconditional.',
    quoteSource: 'General Dwight D. Eisenhower, SHAEF Communiqué (May 1945)',
    strategyTip: '"War in Europe is ended" + "May 7, 1945" + "unconditional surrender" = V-E Day.',
    genAlphaTip: '"War in Europe is ended!" Eisenhower dropped the mic. V-E Day, May 1945. 🎤🇪🇺',
  },
  {
    id: 'vus14-14-v3', templateId: 'vus14-14', version: 3, versionFormat: 'visual',
    standardId: 'VUS.14', text: 'This photograph captures the celebration of which event?',
    options: ['End of World War I', 'V-E Day', 'V-J Day', 'Moon landing'],
    correctIndex: 2, errorCategory: 'stimulus',
    imageDescription: 'A famous photograph from August 1945 showing a sailor kissing a nurse in Times Square, New York City. Massive crowds fill the streets, waving American flags and holding newspapers with headlines reading "JAPAN SURRENDERS." Confetti rains down from the buildings.',
    strategyTip: 'Sailor kissing nurse + Times Square + "Japan Surrenders" + August 1945 = V-J Day celebration.',
    genAlphaTip: 'Sailor kissing nurse, Times Square, "JAPAN SURRENDERS." That\'s the V-J Day photo. Iconic. 💋🇺🇸',
  },
  {
    id: 'vus14-14-v4', templateId: 'vus14-14', version: 4, versionFormat: 'diagram',
    standardId: 'VUS.14', text: 'Based on this table, what can be concluded about the end of World War II?',
    options: ['The war ended on the same day everywhere', 'Europe was liberated before the Pacific war ended', 'Japan surrendered before Germany', 'The US fought only in the Pacific'],
    correctIndex: 1, errorCategory: 'stimulus',
    diagramData: {
      type: 'table',
      tableHeaders: ['Event', 'Date', 'Theater'],
      tableRows: [
        ['V-E Day', 'May 8, 1945', 'European'],
        ['Hiroshima', 'August 6, 1945', 'Pacific'],
        ['V-J Day', 'August 15, 1945', 'Pacific'],
      ],
      tableCaption: 'End of World War II',
    },
    strategyTip: 'V-E Day (May) came before V-J Day (August). Europe was liberated first.',
    genAlphaTip: 'May = Europe done. August = Japan done. Europe first, Pacific second. The table shows it clearly. 📊',
  },
  {
    id: 'vus14-14-v5', templateId: 'vus14-14', version: 5, versionFormat: 'timeline',
    standardId: 'VUS.14', text: 'V-J Day (Victory over Japan) belongs at which position?',
    options: ['1', '2', '3', '4'],
    correctIndex: 2, errorCategory: 'sequence',
    timelineData: [
      { year: 1945, label: 'V-E Day (May)' },
      { year: 1945, label: 'Hiroshima (August 6)' },
      { year: 1945, label: '?', highlight: true },
      { year: 1945, label: 'Nuremberg Trials begin (November)' },
    ],
    strategyTip: 'V-E (May) → Hiroshima (Aug 6) → V-J Day (Aug 15) → Nuremberg (Nov). All in 1945.',
    genAlphaTip: 'All 1945: Europe wins May → Hiroshima Aug 6 → Japan surrenders Aug 15 → trials in November. 📅',
  },

  // ===========================
  // Template 15: GI Bill of Rights
  // Core concept: The GI Bill provided education and housing benefits to returning veterans
  // ===========================
  {
    id: 'vus14-15-v1', templateId: 'vus14-15', version: 1, versionFormat: 'direct',
    standardId: 'VUS.14', text: 'The GI Bill of Rights (1944) provided returning veterans with —',
    options: ['mandatory military service extensions', 'education and housing benefits', 'guaranteed government jobs', 'free healthcare for life'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'The GI Bill paid for college tuition and provided low-interest home loans to WWII veterans.',
    genAlphaTip: 'GI Bill = free college + cheap home loans for vets. The government said "thanks for serving, here\'s a future." 🎓🏠',
  },
  {
    id: 'vus14-15-v2', templateId: 'vus14-15', version: 2, versionFormat: 'quote',
    standardId: 'VUS.14', text: 'This legislation is known as the —',
    options: ['New Deal', 'Fair Deal', 'GI Bill of Rights', 'Great Society'],
    correctIndex: 2, errorCategory: 'stimulus',
    quote: 'This law gives servicemen and women the opportunity to resume their education or technical training, with tuition and living expenses paid by the federal government.',
    quoteSource: 'Summary of the Servicemen\'s Readjustment Act (1944)',
    strategyTip: '"Servicemen resume education" + "tuition paid by government" = GI Bill.',
    genAlphaTip: 'Government pays for vets\' college. That\'s the GI Bill. Officially called the Servicemen\'s Readjustment Act. 📜🎓',
  },
  {
    id: 'vus14-15-v3', templateId: 'vus14-15', version: 3, versionFormat: 'visual',
    standardId: 'VUS.14', text: 'This photograph illustrates the impact of which postwar legislation?',
    options: ['Marshall Plan', 'GI Bill of Rights', 'Taft-Hartley Act', 'National Security Act'],
    correctIndex: 1, errorCategory: 'stimulus',
    imageDescription: 'A 1946 photograph showing a college campus overflowing with older male students in their 20s and 30s, many still wearing military-style haircuts. Registration lines wrap around buildings. A banner reads "WELCOME VETERANS." Temporary Quonset hut classrooms have been erected on the lawn to handle the overflow.',
    strategyTip: 'Veterans flooding a college campus + "Welcome Veterans" + temporary classrooms = GI Bill\'s impact.',
    genAlphaTip: 'Veterans everywhere on campus, long lines, temporary classrooms. The GI Bill sent millions of vets to college. 🎓👨‍🎓',
  },
  {
    id: 'vus14-15-v4', templateId: 'vus14-15', version: 4, versionFormat: 'diagram',
    standardId: 'VUS.14', text: 'Which legislation is described by this list?',
    options: ['New Deal', 'GI Bill of Rights', 'Marshall Plan', 'Social Security Act'],
    correctIndex: 1, errorCategory: 'stimulus',
    diagramData: {
      type: 'list',
      listItems: [
        'Paid college tuition for returning veterans',
        'Provided low-interest home loans',
        'Created a middle-class boom in the 1950s',
        'Over 8 million veterans used education benefits',
      ],
    },
    strategyTip: 'College tuition for vets + home loans + middle-class boom + 8 million users = GI Bill.',
    genAlphaTip: 'Free college, cheap houses, 8 million vets, middle-class explosion. All because of the GI Bill. 📋🏠',
  },
  {
    id: 'vus14-15-v5', templateId: 'vus14-15', version: 5, versionFormat: 'timeline',
    standardId: 'VUS.14', text: 'The passage of the GI Bill belongs at which position?',
    options: ['1', '2', '3', '4'],
    correctIndex: 1, errorCategory: 'sequence',
    timelineData: [
      { year: 1942, label: 'US fully mobilized for war' },
      { year: 1944, label: '?', highlight: true },
      { year: 1945, label: 'WWII ends' },
      { year: 1947, label: 'Veterans flood colleges' },
    ],
    strategyTip: 'Mobilized (1942) → GI Bill passed (1944, before war ended) → War ends (1945) → vets enroll (1947).',
    genAlphaTip: 'The GI Bill passed in 1944 BEFORE the war ended. They planned ahead. Smart. 📅🧠',
  },
];
