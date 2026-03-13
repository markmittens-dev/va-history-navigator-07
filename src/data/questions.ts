import { Question, VersionFormat } from '@/types/sol';
import { selectVersionsForQuiz, getVersionForAttempt } from './questionVariants';
import { vus14Questions } from './questions-vus14';

/**
 * PERFECT PRACTICE — 5-Version Question Bank
 * 
 * Each template group has up to 5 versions:
 * V1 = Direct Recall (10 XP)
 * V2 = Quote / Primary Source (25 XP)
 * V3 = Visual Stimulus (35 XP)
 * V4 = Data / Diagram (40 XP)
 * V5 = Timeline / Sequence (25 XP)
 * 
 * All versions test the SAME core concept.
 */

const allQuestions: Question[] = [

  // ===========================
  // VUS.2 — First Thirteen Colonies
  // ===========================

  // --- Template: vus2-colony-business ---
  {
    id: 'vus2-1-v1', templateId: 'vus2-1', version: 1, versionFormat: 'direct',
    standardId: 'VUS.2', text: 'Which colony was established as a business venture?',
    options: ['Connecticut', 'Massachusetts', 'Georgia', 'Virginia'],
    correctIndex: 3, errorCategory: 'memorization',
    strategyTip: 'Virginia (Jamestown, 1607) was founded by the Virginia Company as a for-profit enterprise.',
    genAlphaTip: 'Virginia was literally a startup 💰. Jamestown was all about profit, no cap.',
  },
  {
    id: 'vus2-1-v2', templateId: 'vus2-1', version: 2, versionFormat: 'quote',
    standardId: 'VUS.2', text: 'This charter describes a colony founded for which purpose?',
    options: ['Religious freedom', 'Military defense', 'Commercial profit', 'Political exile'],
    correctIndex: 2, errorCategory: 'stimulus',
    quote: 'We do grant and agree that the said persons shall have all the lands, tenements... for the habitation and plantation of such colony.',
    quoteSource: 'Charter of the Virginia Company, 1606',
    strategyTip: 'The Virginia Company charter is a business document — "habitation and plantation" means settlement for profit.',
    genAlphaTip: 'This charter is basically an investor pitch deck from 1606. "Give us land, we\'ll make money." Virginia Company was a startup fr. 📜💰',
  },
  {
    id: 'vus2-1-v3', templateId: 'vus2-1', version: 3, versionFormat: 'visual',
    standardId: 'VUS.2', text: 'This image illustrates the founding purpose of which colony?',
    options: ['Plymouth', 'Pennsylvania', 'Virginia', 'Rhode Island'],
    correctIndex: 2, errorCategory: 'stimulus',
    imageDescription: 'A 1607 engraving showing English settlers building a wooden fort along a river. Ships bearing the flag of a trading company are anchored nearby. Workers are loading barrels of tobacco onto smaller boats.',
    strategyTip: 'Trading company ships + tobacco loading = Virginia (Jamestown). It was a commercial venture.',
    genAlphaTip: 'Trading company flag + tobacco = Virginia. Jamestown was built to make money, and this image shows the hustle. 🚢🌿',
  },
  {
    id: 'vus2-1-v4', templateId: 'vus2-1', version: 4, versionFormat: 'diagram',
    standardId: 'VUS.2', text: 'Which colony best completes this diagram?',
    options: ['Massachusetts', 'Virginia', 'Maryland', 'Georgia'],
    correctIndex: 1, errorCategory: 'stimulus',
    diagramData: {
      type: 'flow',
      flowSteps: ['Virginia Company investors seek profit', '?', 'Cash crop economy based on tobacco'],
    },
    strategyTip: 'Virginia Company → founded colony → grew tobacco. The missing piece is the colony itself: Virginia.',
    genAlphaTip: 'Investors want money → ??? → tobacco economy. The answer is Virginia. Connect the dots. 🔗',
  },
  {
    id: 'vus2-1-v5', templateId: 'vus2-1', version: 5, versionFormat: 'timeline',
    standardId: 'VUS.2', text: 'Which event belongs at position 2?',
    options: ['Plymouth founded', 'Jamestown founded', 'Georgia founded', 'Pennsylvania founded'],
    correctIndex: 1, errorCategory: 'sequence',
    timelineData: [
      { year: 1585, label: 'Roanoke attempt' },
      { year: 1607, label: '?', highlight: true },
      { year: 1620, label: 'Plymouth founded' },
      { year: 1681, label: 'Pennsylvania founded' },
    ],
    strategyTip: '1607 is between Roanoke (1585) and Plymouth (1620). Jamestown was founded in 1607.',
    genAlphaTip: 'Roanoke (1585) → ??? (1607) → Plymouth (1620). Jamestown fills the gap. First permanent English settlement. 🏗️',
  },

  // --- Template: vus2-cavaliers ---
  {
    id: 'vus2-2-v1', templateId: 'vus2-2', version: 1, versionFormat: 'direct',
    standardId: 'VUS.2', text: 'Which factor was significant to the cavaliers in the early colonization of eastern Virginia?',
    options: ['Debt forgiveness', 'Free land', 'Political freedom', 'Religious tolerance'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'Cavaliers were loyal to the king and came to Virginia attracted by large land grants.',
    genAlphaTip: 'Cavaliers were like "free land? Say less." They dipped from England for those Virginia acres. 🏠',
  },
  {
    id: 'vus2-2-v2', templateId: 'vus2-2', version: 2, versionFormat: 'quote',
    standardId: 'VUS.2', text: 'Based on this source, what attracted cavaliers to Virginia?',
    options: ['Religious freedom', 'Gold discoveries', 'Generous land grants', 'Escape from war'],
    correctIndex: 2, errorCategory: 'stimulus',
    quote: 'Gentlemen of quality, having lost estates in the service of the Crown, were granted vast tracts of land in the Virginia colony.',
    quoteSource: 'Colonial Virginia Land Records, circa 1650',
    strategyTip: '"Granted vast tracts of land" directly tells you: cavaliers came for land grants.',
    genAlphaTip: '"Vast tracts of land" = free acres. Cavaliers came for the real estate. No cap. 🏡',
  },
  {
    id: 'vus2-2-v3', templateId: 'vus2-2', version: 3, versionFormat: 'visual',
    standardId: 'VUS.2', text: 'This image best illustrates which group of colonial settlers?',
    options: ['Puritans', 'Cavaliers', 'Quakers', 'Indentured servants'],
    correctIndex: 1, errorCategory: 'stimulus',
    imageDescription: 'A painting showing well-dressed English gentlemen in plumed hats riding horses across a large tobacco plantation in eastern Virginia. Enslaved workers tend the fields in the background.',
    strategyTip: 'Well-dressed gentlemen + large plantations + Virginia = Cavaliers (wealthy royalist settlers).',
    genAlphaTip: 'Fancy hats + big plantation + Virginia = Cavaliers. They were the wealthy OGs of colonial Virginia. 👒🐎',
  },
  {
    id: 'vus2-2-v4', templateId: 'vus2-2', version: 4, versionFormat: 'diagram',
    standardId: 'VUS.2', text: 'Which group of settlers is described in this list?',
    options: ['Pilgrims', 'Quakers', 'Cavaliers', 'Scots-Irish'],
    correctIndex: 2, errorCategory: 'stimulus',
    diagramData: {
      type: 'list',
      listItems: [
        'Loyal supporters of the English Crown',
        'Settled primarily in eastern Virginia',
        'Attracted by large land grants',
        'Established large tobacco plantations',
      ],
    },
    strategyTip: 'Crown loyalists + eastern Virginia + land grants + tobacco = Cavaliers.',
    genAlphaTip: 'King fans + Virginia + free land + tobacco = Cavaliers. It\'s all in the list. 📋',
  },
  {
    id: 'vus2-2-v5', templateId: 'vus2-2', version: 5, versionFormat: 'timeline',
    standardId: 'VUS.2', text: 'The arrival of Cavalier settlers in Virginia is best placed at which position?',
    options: ['1', '2', '3', '4'],
    correctIndex: 1, errorCategory: 'sequence',
    timelineData: [
      { year: 1607, label: 'Jamestown founded' },
      { year: 1649, label: '?', highlight: true },
      { year: 1681, label: 'Pennsylvania founded' },
      { year: 1733, label: 'Georgia founded' },
    ],
    strategyTip: 'Cavaliers came after the English Civil War (1640s) when King Charles I was executed.',
    genAlphaTip: 'Cavaliers left England after their king got executed (~1649). They needed a new home and Virginia had the land. 🏃‍♂️',
  },

  // --- Template: vus2-rhode-island ---
  {
    id: 'vus2-3-v1', templateId: 'vus2-3', version: 1, versionFormat: 'direct',
    standardId: 'VUS.2', text: 'The founders of Rhode Island had different views from the Massachusetts Puritans on —',
    options: ['enslaved workers', 'private property', 'indentured servants', 'religious tolerance'],
    correctIndex: 3, errorCategory: 'memorization',
    strategyTip: 'Roger Williams founded Rhode Island after being banished from Massachusetts for advocating religious freedom.',
    genAlphaTip: 'Roger Williams got cancelled by the Puritans for saying "let people worship however they want." Legend. 👑',
  },
  {
    id: 'vus2-3-v2', templateId: 'vus2-3', version: 2, versionFormat: 'quote',
    standardId: 'VUS.2', text: 'This statement reflects the founding principle of which colony?',
    options: ['Massachusetts', 'Virginia', 'Rhode Island', 'Maryland'],
    correctIndex: 2, errorCategory: 'stimulus',
    quote: 'No person shall be molested, punished, disquieted, or called into question for any differences in opinion in matters of religion.',
    quoteSource: 'Charter of Rhode Island, 1663',
    strategyTip: '"No person molested for differences in religion" = religious tolerance = Rhode Island.',
    genAlphaTip: '"Don\'t bother anyone for their beliefs" — that\'s Rhode Island\'s whole vibe. Religious freedom OG. 🙏',
  },
  {
    id: 'vus2-3-v3', templateId: 'vus2-3', version: 3, versionFormat: 'visual',
    standardId: 'VUS.2', text: 'This image best represents the founding of which colony?',
    options: ['Connecticut', 'Rhode Island', 'Georgia', 'New York'],
    correctIndex: 1, errorCategory: 'stimulus',
    imageDescription: 'An illustration showing a man being escorted out of a Puritan meeting house in Massachusetts. He is shown walking through snow toward a canoe, heading south. A banner reads "Banished for conscience."',
    strategyTip: '"Banished for conscience" from Massachusetts → Roger Williams → founding Rhode Island.',
    genAlphaTip: 'Kicked out of Massachusetts for his beliefs → founded Rhode Island. Roger Williams said "fine, I\'ll start my own colony." 🚣',
  },
  {
    id: 'vus2-3-v4', templateId: 'vus2-3', version: 4, versionFormat: 'diagram',
    standardId: 'VUS.2', text: 'Which colony best completes this diagram?',
    options: ['Virginia', 'Georgia', 'Rhode Island', 'New Hampshire'],
    correctIndex: 2, errorCategory: 'stimulus',
    diagramData: {
      type: 'flow',
      flowSteps: ['Roger Williams banished from Massachusetts', '?', 'First colony with full religious freedom'],
    },
    strategyTip: 'Williams banished → founded colony → religious freedom. The colony is Rhode Island.',
    genAlphaTip: 'Banished → new colony → religious freedom. It\'s Rhode Island. Connect the flow. 🔗',
  },
  {
    id: 'vus2-3-v5', templateId: 'vus2-3', version: 5, versionFormat: 'timeline',
    standardId: 'VUS.2', text: 'The founding of Rhode Island belongs at which position?',
    options: ['1', '2', '3', '4'],
    correctIndex: 1, errorCategory: 'sequence',
    timelineData: [
      { year: 1620, label: 'Plymouth founded' },
      { year: 1636, label: '?', highlight: true },
      { year: 1663, label: 'Rhode Island charter' },
      { year: 1681, label: 'Pennsylvania founded' },
    ],
    strategyTip: 'Rhode Island was founded in 1636, between Plymouth (1620) and its formal charter (1663).',
    genAlphaTip: 'Williams founded Rhode Island in 1636. Right after getting kicked out of Massachusetts. Quick bounce-back. 💪',
  },

  // --- Template: vus2-geography-economy ---
  {
    id: 'vus2-5-v1', templateId: 'vus2-5', version: 1, versionFormat: 'direct',
    standardId: 'VUS.2', text: 'The different types of economies found in the original colonies were primarily a reflection of the —',
    options: ['nationalities of the settlers', 'geography of the areas', 'provisions of the charters', 'religion of the settlers'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'New England = rocky (trade/fishing), Middle = fertile (grain), South = warm (tobacco/rice). Geography shaped economies.',
    genAlphaTip: 'You can\'t grow tobacco on rocks 🪨. Geography decided everything.',
  },
  {
    id: 'vus2-5-v2', templateId: 'vus2-5', version: 2, versionFormat: 'quote',
    standardId: 'VUS.2', text: 'This observation supports which conclusion about colonial economies?',
    options: ['Religion determined trade patterns', 'Geography shaped economic activity', 'Charters dictated what crops to grow', 'Immigration decided economic output'],
    correctIndex: 1, errorCategory: 'stimulus',
    quote: 'The rocky shores of the north lend themselves to fishing and shipbuilding, while the warm southern climate and rich soil produce abundant tobacco and rice.',
    quoteSource: 'Colonial trade report, circa 1720',
    strategyTip: 'The quote directly connects geography (rocky shores, warm climate) to economic activity.',
    genAlphaTip: 'Rocky = fishing. Warm + good soil = farming. Geography = economy. It\'s literally spelled out in the quote. 📝',
  },
  {
    id: 'vus2-5-v3', templateId: 'vus2-5', version: 3, versionFormat: 'visual',
    standardId: 'VUS.2', text: 'This map best supports which conclusion about colonial America?',
    options: ['Religion varied by region', 'Population was evenly distributed', 'Geography shaped colonial economies', 'All colonies had similar industries'],
    correctIndex: 2, errorCategory: 'stimulus',
    imageDescription: 'A color-coded map of the 13 colonies showing economic activities: New England colonies are labeled with icons for fishing, whaling, and shipbuilding. Middle colonies show wheat and grain icons. Southern colonies display tobacco, rice, and indigo symbols.',
    strategyTip: 'Different economic activities in different regions = geography shaped economies.',
    genAlphaTip: 'Each region has different stuff going on. Fish up north, grain in the middle, tobacco down south. Geography runs the economy. 🗺️',
  },
  {
    id: 'vus2-5-v4', templateId: 'vus2-5', version: 4, versionFormat: 'diagram',
    standardId: 'VUS.2', text: 'Based on this table, what MOST influenced colonial economies?',
    options: ['Religion of settlers', 'Geography of the region', 'National origin of colonists', 'Date of founding'],
    correctIndex: 1, errorCategory: 'stimulus',
    diagramData: {
      type: 'table',
      tableHeaders: ['Region', 'Geography', 'Main Economy'],
      tableRows: [
        ['New England', 'Rocky soil, harbors', 'Fishing, shipbuilding'],
        ['Middle', 'Fertile river valleys', 'Grain, trade'],
        ['Southern', 'Warm climate, rich soil', 'Tobacco, rice, indigo'],
      ],
      tableCaption: 'Colonial Regional Economies',
    },
    strategyTip: 'The table shows a clear pattern: geography → economy. Each region\'s land and climate determined what it produced.',
    genAlphaTip: 'Look at the pattern: the geography column directly matches the economy column. Geography = economy. Free points. 📊',
  },
  {
    id: 'vus2-5-v5', templateId: 'vus2-5', version: 5, versionFormat: 'timeline',
    standardId: 'VUS.2', text: 'Place these colonial economic developments in order:',
    options: [
      'Tobacco economy → Triangular Trade → Rice plantations → Indigo production',
      'Rice plantations → Tobacco economy → Indigo → Triangular Trade',
      'Triangular Trade → Tobacco → Rice → Indigo',
      'Indigo → Rice → Tobacco → Triangular Trade',
    ],
    correctIndex: 0, errorCategory: 'sequence',
    timelineData: [
      { year: 1612, label: 'Tobacco cash crop', highlight: true },
      { year: 1650, label: 'Triangular Trade', highlight: true },
      { year: 1690, label: 'Rice plantations', highlight: true },
      { year: 1740, label: 'Indigo production', highlight: true },
    ],
    strategyTip: 'Tobacco came first (Virginia 1612), then trade networks expanded, then rice and indigo in the Carolinas.',
    genAlphaTip: 'Tobacco was the OG cash crop (1612), then trade grew, then rice and indigo joined later. Timeline it out. 📅',
  },

  // ===========================
  // VUS.5 — Revolutionary Period
  // ===========================

  // --- Template: vus5-common-sense ---
  {
    id: 'vus5-4-v1', templateId: 'vus5-4', version: 1, versionFormat: 'direct',
    standardId: 'VUS.5', text: 'Thomas Paine\'s publication of Common Sense influenced many American colonists to support the —',
    options: ['formation of loyalist groups', 'concept of capitalist economies', 'idea of separation from England', 'purchase of territory from France'],
    correctIndex: 2, errorCategory: 'memorization',
    strategyTip: 'Common Sense argued in plain language that independence from Britain was the only logical choice.',
    genAlphaTip: 'Thomas Paine dropped Common Sense and it went viral. "Why are we still with Britain?" Everyone said "facts." 📖🔥',
  },
  {
    id: 'vus5-4-v2', templateId: 'vus5-4', version: 2, versionFormat: 'quote',
    standardId: 'VUS.5', text: 'This passage was written to convince colonists to support —',
    options: ['remaining loyal to Britain', 'independence from Britain', 'forming an alliance with France', 'expanding westward'],
    correctIndex: 1, errorCategory: 'stimulus',
    quote: 'A government of our own is our natural right... \'TIS TIME TO PART.',
    quoteSource: 'Thomas Paine, Common Sense (1776)',
    strategyTip: '"Tis time to part" = it\'s time to separate. Paine urged independence.',
    genAlphaTip: '"TIS TIME TO PART" — Paine literally said it\'s breakup time with Britain. Can\'t get clearer than that. 💔🇺🇸',
  },
  {
    id: 'vus5-4-v3', templateId: 'vus5-4', version: 3, versionFormat: 'visual',
    standardId: 'VUS.5', text: 'This image illustrates the impact of which publication?',
    options: ['The Federalist Papers', 'Common Sense', 'The Declaration of Independence', 'Poor Richard\'s Almanack'],
    correctIndex: 1, errorCategory: 'stimulus',
    imageDescription: 'A 1776 print shop scene showing colonists eagerly reading a pamphlet titled "COMMON SENSE" by Thomas Paine. Some are raising fists in agreement. A crowd gathers outside, with copies being handed out freely.',
    strategyTip: 'The pamphlet is clearly labeled "Common Sense" — it inspired colonists toward independence.',
    genAlphaTip: 'Colonists going crazy over a pamphlet called COMMON SENSE. Paine was the first influencer. 📰🔥',
  },
  {
    id: 'vus5-4-v4', templateId: 'vus5-4', version: 4, versionFormat: 'diagram',
    standardId: 'VUS.5', text: 'Which publication best completes this diagram?',
    options: ['The Federalist Papers', 'Poor Richard\'s Almanack', 'Common Sense', 'The Olive Branch Petition'],
    correctIndex: 2, errorCategory: 'stimulus',
    diagramData: {
      type: 'flow',
      flowSteps: ['Growing colonial frustration with British rule', '?', 'Widespread support for independence'],
    },
    strategyTip: 'Frustration → [catalyst] → support for independence. The catalyst was Common Sense.',
    genAlphaTip: 'Mad at Britain → ??? → everyone wants independence. Common Sense was the spark. 🔥',
  },
  {
    id: 'vus5-4-v5', templateId: 'vus5-4', version: 5, versionFormat: 'timeline',
    standardId: 'VUS.5', text: 'The publication of Common Sense belongs at which position?',
    options: ['1', '2', '3', '4'],
    correctIndex: 1, errorCategory: 'sequence',
    timelineData: [
      { year: 1773, label: 'Boston Tea Party' },
      { year: 1776, label: '?', highlight: true },
      { year: 1776, label: 'Declaration signed' },
      { year: 1783, label: 'Treaty of Paris' },
    ],
    strategyTip: 'Common Sense was published in January 1776, just months before the Declaration of Independence.',
    genAlphaTip: 'Common Sense dropped January 1776. Declaration came July 1776. Paine warmed up the crowd. 📅',
  },

  // --- Template: vus5-declaration ---
  {
    id: 'vus5-7-v1', templateId: 'vus5-7', version: 1, versionFormat: 'direct',
    standardId: 'VUS.5', text: 'The Declaration of Independence was written primarily to —',
    options: ['Establish a new government structure', 'Justify separation from Britain', 'Create a bill of rights', 'Propose a peace treaty'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'The Declaration explained WHY the colonies had the right to break from Britain.',
    genAlphaTip: 'The Declaration was a breakup letter to King George. "It\'s not us, it\'s YOU." 💅📜',
  },
  {
    id: 'vus5-7-v2', templateId: 'vus5-7', version: 2, versionFormat: 'quote',
    standardId: 'VUS.5', text: 'This passage identifies which document\'s primary purpose?',
    options: ['Constitution', 'Articles of Confederation', 'Declaration of Independence', 'Federalist Papers'],
    correctIndex: 2, errorCategory: 'stimulus',
    quote: 'We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights.',
    quoteSource: 'Thomas Jefferson, Declaration of Independence (1776)',
    strategyTip: '"All men are created equal" and "unalienable Rights" = Declaration of Independence.',
    genAlphaTip: '"All men are created equal" — that\'s THE Declaration quote. If you see it, you know. 💯',
  },
  {
    id: 'vus5-7-v3', templateId: 'vus5-7', version: 3, versionFormat: 'visual',
    standardId: 'VUS.5', text: 'This painting depicts the presentation of which document?',
    options: ['The Constitution', 'The Treaty of Paris', 'The Declaration of Independence', 'The Bill of Rights'],
    correctIndex: 2, errorCategory: 'stimulus',
    imageDescription: 'A famous painting showing five men standing before a seated Continental Congress. The central figure places a large document on a desk. The men are identified as Thomas Jefferson, John Adams, Benjamin Franklin, Roger Sherman, and Robert Livingston.',
    strategyTip: 'The five-man committee (Jefferson, Adams, Franklin, Sherman, Livingston) drafted the Declaration.',
    genAlphaTip: 'Jefferson, Adams, Franklin, Sherman, Livingston = the Declaration dream team. If you see these five, it\'s the Declaration. 🖊️',
  },
  {
    id: 'vus5-7-v4', templateId: 'vus5-7', version: 4, versionFormat: 'diagram',
    standardId: 'VUS.5', text: 'Which document best completes this diagram?',
    options: ['Constitution', 'Declaration of Independence', 'Bill of Rights', 'Articles of Confederation'],
    correctIndex: 1, errorCategory: 'stimulus',
    diagramData: {
      type: 'list',
      listItems: [
        'Lists grievances against King George III',
        'States that "all men are created equal"',
        'Asserts the right to "alter or abolish" unjust government',
        'Written primarily by Thomas Jefferson',
      ],
    },
    strategyTip: 'Grievances + equality + right to rebel + Jefferson = Declaration of Independence.',
    genAlphaTip: 'Grievances + "all men are created equal" + Jefferson = Declaration. All the clues point one way. 🎯',
  },
  {
    id: 'vus5-7-v5', templateId: 'vus5-7', version: 5, versionFormat: 'timeline',
    standardId: 'VUS.5', text: 'The signing of the Declaration of Independence belongs at which position?',
    options: ['1', '2', '3', '4'],
    correctIndex: 1, errorCategory: 'sequence',
    timelineData: [
      { year: 1775, label: 'Lexington & Concord' },
      { year: 1776, label: '?', highlight: true },
      { year: 1781, label: 'Battle of Yorktown' },
      { year: 1783, label: 'Treaty of Paris' },
    ],
    strategyTip: 'Fighting started (1775) → Declaration (1776) → British defeat (1781) → Peace treaty (1783).',
    genAlphaTip: 'Fight starts (1775) → declare independence (1776) → win at Yorktown (1781) → peace treaty (1783). Easy sequence. 📅',
  },

  // ===========================
  // VUS.8 — Missouri Compromise (Sample 5-Version Set from instructions)
  // ===========================
  {
    id: 'vus8-3-v1', templateId: 'vus8-3', version: 1, versionFormat: 'direct',
    standardId: 'VUS.8', text: 'Before the Civil War, slavery was prohibited in certain areas by the —',
    options: ['Monroe Doctrine', 'Dred Scott decision', 'Kansas-Nebraska Act', 'Missouri Compromise'],
    correctIndex: 3, errorCategory: 'memorization',
    strategyTip: 'The Missouri Compromise (1820) drew a line at 36°30\' — slavery banned above, allowed below.',
    genAlphaTip: 'Missouri Compromise drew a literal line on the map. Above = no slavery, below = slavery. 📏',
  },
  {
    id: 'vus8-3-v2', templateId: 'vus8-3', version: 2, versionFormat: 'quote',
    standardId: 'VUS.8', text: 'This excerpt describes a provision of the —',
    options: ['Emancipation Proclamation', 'Compromise of 1850', 'Kansas-Nebraska Act', 'Missouri Compromise'],
    correctIndex: 3, errorCategory: 'stimulus',
    quote: 'Henceforth slavery shall be, and is hereby, forever prohibited in all that territory ceded by France to the United States under the name of Louisiana, which lies north of thirty-six degrees and thirty minutes north latitude.',
    quoteSource: 'Missouri Compromise Act, 1820',
    strategyTip: '"Prohibited north of 36°30\'" is the defining feature of the Missouri Compromise.',
    genAlphaTip: '"Prohibited north of 36°30\'" = Missouri Compromise. That\'s THE line. Know it. 📏✅',
  },
  {
    id: 'vus8-3-v3', templateId: 'vus8-3', version: 3, versionFormat: 'visual',
    standardId: 'VUS.8', text: 'This map illustrates the geographic impact of —',
    options: ['The Emancipation Proclamation', 'The Compromise of 1850', 'The Kansas-Nebraska Act', 'The Missouri Compromise'],
    correctIndex: 3, errorCategory: 'stimulus',
    imageDescription: 'A map of the United States circa 1820, showing a bold horizontal line drawn across the middle of the country. Territory above the line is labeled "Free Territory." Territory below is labeled "Slave Territory." The line sits just above the southern border of Missouri.',
    strategyTip: 'A horizontal line dividing free and slave territory in 1820 = Missouri Compromise line at 36°30\'.',
    genAlphaTip: 'Bold line across the country, free above, slave below, 1820. That\'s the Missouri Compromise map. Lock it in. 🗺️',
  },
  {
    id: 'vus8-3-v4', templateId: 'vus8-3', version: 4, versionFormat: 'diagram',
    standardId: 'VUS.8', text: 'Which event best completes this diagram?',
    options: ['Passage of the Emancipation Proclamation', 'Signing of the Compromise of 1850', 'Passage of the Kansas-Nebraska Act', 'Passage of the Missouri Compromise'],
    correctIndex: 3, errorCategory: 'stimulus',
    diagramData: {
      type: 'flow',
      flowSteps: ['Southern states demand westward expansion of slavery', '?', 'Temporary sectional peace maintained until 1854'],
    },
    strategyTip: 'Demand for slavery expansion → [compromise] → temporary peace. The Missouri Compromise was that compromise.',
    genAlphaTip: 'Slavery debate → ??? → temporary peace until 1854. The Missouri Compromise was the band-aid. 🩹',
  },
  {
    id: 'vus8-3-v5', templateId: 'vus8-3', version: 5, versionFormat: 'timeline',
    standardId: 'VUS.8', text: 'Which event belongs at position 2?',
    options: ['Emancipation Proclamation', 'Compromise of 1850', 'Dred Scott Decision', 'Missouri Compromise'],
    correctIndex: 3, errorCategory: 'sequence',
    timelineData: [
      { year: 1803, label: 'Louisiana Purchase' },
      { year: 1820, label: '?', highlight: true },
      { year: 1854, label: 'Kansas-Nebraska Act' },
      { year: 1861, label: 'Civil War begins' },
    ],
    strategyTip: 'Louisiana Purchase (1803) → Missouri Compromise (1820) → Kansas-Nebraska Act (1854).',
    genAlphaTip: 'Louisiana Purchase (1803) → ??? (1820) → Kansas-Nebraska (1854). Missouri Compromise fills the gap. 📅',
  },

  // ===========================
  // VUS.6 — Checks and Balances
  // ===========================
  {
    id: 'vus6-1-v1', templateId: 'vus6-1', version: 1, versionFormat: 'direct',
    standardId: 'VUS.6', text: 'The President can veto laws, Congress can override vetoes, and Courts can declare laws unconstitutional. This system is called —',
    options: ['separation of powers', 'checks and balances', 'federalism', 'popular sovereignty'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'Each branch limiting the others\' power = checks and balances.',
    genAlphaTip: 'Each branch can check the others so nobody gets too OP. The Founders were cracked at game design. ⚖️',
  },
  {
    id: 'vus6-1-v2', templateId: 'vus6-1', version: 2, versionFormat: 'quote',
    standardId: 'VUS.6', text: 'This quote describes which constitutional principle?',
    options: ['Federalism', 'Checks and balances', 'Judicial review', 'Popular sovereignty'],
    correctIndex: 1, errorCategory: 'stimulus',
    quote: 'Ambition must be made to counteract ambition. The interest of the man must be connected with the constitutional rights of the place.',
    quoteSource: 'James Madison, Federalist No. 51 (1788)',
    strategyTip: '"Ambition counteracting ambition" means each branch keeps the others in check.',
    genAlphaTip: 'Madison said "let their ambitions fight each other." That\'s checks and balances in a nutshell. 🧠',
  },
  {
    id: 'vus6-1-v3', templateId: 'vus6-1', version: 3, versionFormat: 'visual',
    standardId: 'VUS.6', text: 'This diagram illustrates which principle of American government?',
    options: ['Separation of powers', 'Checks and balances', 'Popular sovereignty', 'Republicanism'],
    correctIndex: 1, errorCategory: 'stimulus',
    imageDescription: 'A triangular diagram showing three boxes labeled "Executive," "Legislative," and "Judicial." Arrows connect each box to the other two, with labels: "can veto," "can override veto," "can declare unconstitutional," "appoints judges," "confirms appointments," and "can impeach."',
    strategyTip: 'Arrows showing each branch acting on the others = checks and balances.',
    genAlphaTip: 'Three boxes, arrows everywhere, each one keeping the others in line. That\'s checks and balances, visualized. 🔄',
  },
  {
    id: 'vus6-1-v4', templateId: 'vus6-1', version: 4, versionFormat: 'diagram',
    standardId: 'VUS.6', text: 'This table describes which principle of the Constitution?',
    options: ['Federalism', 'Checks and balances', 'Separation of powers', 'Limited government'],
    correctIndex: 1, errorCategory: 'stimulus',
    diagramData: {
      type: 'table',
      tableHeaders: ['Branch', 'Power', 'Check on Other Branch'],
      tableRows: [
        ['Executive', 'Signs or vetoes laws', 'Checks Legislative'],
        ['Legislative', 'Overrides vetoes, confirms appointments', 'Checks Executive & Judicial'],
        ['Judicial', 'Declares laws unconstitutional', 'Checks Legislative & Executive'],
      ],
      tableCaption: 'Constitutional Powers',
    },
    strategyTip: 'Each branch has specific powers to limit other branches = checks and balances.',
    genAlphaTip: 'The table literally shows each branch checking the others. Checks and balances = the ultimate power balance. ⚖️',
  },
  {
    id: 'vus6-1-v5', templateId: 'vus6-1', version: 5, versionFormat: 'timeline',
    standardId: 'VUS.6', text: 'The ratification of the Constitution, which established checks and balances, belongs at which position?',
    options: ['1', '2', '3', '4'],
    correctIndex: 1, errorCategory: 'sequence',
    timelineData: [
      { year: 1781, label: 'Articles of Confederation' },
      { year: 1788, label: '?', highlight: true },
      { year: 1791, label: 'Bill of Rights added' },
      { year: 1803, label: 'Marbury v. Madison' },
    ],
    strategyTip: 'Constitution ratified in 1788, after the Articles (1781) and before the Bill of Rights (1791).',
    genAlphaTip: 'Articles (1781) → Constitution (1788) → Bill of Rights (1791) → Marbury (1803). Lock in the dates. 📅',
  },

  // ===========================
  // VUS.9 — Civil War Turning Points
  // ===========================
  {
    id: 'vus9-4-v1', templateId: 'vus9-4', version: 1, versionFormat: 'direct',
    standardId: 'VUS.9', text: 'The Battle of Gettysburg was significant because it —',
    options: ['caused states to secede from the Union', 'was the opening conflict of the war', 'forced the surrender of the South', 'was the turning point of the war'],
    correctIndex: 3, errorCategory: 'memorization',
    strategyTip: 'After Gettysburg (July 1863), the Confederacy was on the defensive and never recovered.',
    genAlphaTip: 'Gettysburg was THE turning point. After this L, the Confederacy was on a losing streak. GG. ⚔️',
  },
  {
    id: 'vus9-4-v2', templateId: 'vus9-4', version: 2, versionFormat: 'quote',
    standardId: 'VUS.9', text: 'Lincoln delivered this address at the site of which battle?',
    options: ['Antietam', 'Gettysburg', 'Vicksburg', 'Bull Run'],
    correctIndex: 1, errorCategory: 'stimulus',
    quote: 'Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.',
    quoteSource: 'Abraham Lincoln, Gettysburg Address (1863)',
    strategyTip: '"Four score and seven years ago" is the opening of the Gettysburg Address.',
    genAlphaTip: '"Four score and seven" = Gettysburg Address. One of the most famous speeches ever. Lincoln cooked. 🎤🔥',
  },
  {
    id: 'vus9-4-v3', templateId: 'vus9-4', version: 3, versionFormat: 'visual',
    standardId: 'VUS.9', text: 'This image depicts the aftermath of which Civil War battle?',
    options: ['Battle of Bull Run', 'Battle of Antietam', 'Battle of Gettysburg', 'Battle of Vicksburg'],
    correctIndex: 2, errorCategory: 'stimulus',
    imageDescription: 'A black-and-white photograph from July 1863 showing a vast battlefield in Pennsylvania covered with fallen soldiers and broken artillery. A cemetery with a low stone wall is visible in the background. Union and Confederate flags lie scattered on the ground.',
    strategyTip: 'Pennsylvania + July 1863 + massive casualties + cemetery = Gettysburg.',
    genAlphaTip: 'Pennsylvania, July 1863, massive battlefield, cemetery in the back. That\'s Gettysburg. The bloodiest battle of the war. 💀',
  },
  {
    id: 'vus9-4-v4', templateId: 'vus9-4', version: 4, versionFormat: 'diagram',
    standardId: 'VUS.9', text: 'Which battle best completes this diagram?',
    options: ['Battle of Fort Sumter', 'Battle of Bull Run', 'Battle of Gettysburg', 'Battle of Appomattox'],
    correctIndex: 2, errorCategory: 'stimulus',
    diagramData: {
      type: 'flow',
      flowSteps: ['Confederate armies advance northward', '?', 'Confederacy permanently on the defensive'],
    },
    strategyTip: 'Confederates advance north → [decisive battle] → permanently on defensive. Gettysburg was that battle.',
    genAlphaTip: 'Confederates push north → ??? → never recover. Gettysburg was the wall they hit. 🧱',
  },
  {
    id: 'vus9-4-v5', templateId: 'vus9-4', version: 5, versionFormat: 'timeline',
    standardId: 'VUS.9', text: 'The Battle of Gettysburg belongs at which position?',
    options: ['1', '2', '3', '4'],
    correctIndex: 1, errorCategory: 'sequence',
    timelineData: [
      { year: 1861, label: 'Fort Sumter' },
      { year: 1863, label: '?', highlight: true },
      { year: 1863, label: 'Emancipation in effect' },
      { year: 1865, label: 'Appomattox' },
    ],
    strategyTip: 'Fort Sumter (1861) → Gettysburg (July 1863) → Appomattox (1865).',
    genAlphaTip: 'Sumter starts it → Gettysburg turns it → Appomattox ends it. Know the sequence. 📅',
  },

  // ===========================
  // VUS.10 — Muckrakers & Child Labor
  // ===========================
  {
    id: 'vus10-5-v1', templateId: 'vus10-5', version: 1, versionFormat: 'direct',
    standardId: 'VUS.10', text: 'Journalists who exposed social injustices during the Progressive Era were known as —',
    options: ['suffragists', 'muckrakers', 'abolitionists', 'populists'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'Muckrakers were journalists who exposed corruption, child labor, and unsafe conditions.',
    genAlphaTip: 'Muckrakers = the investigative journalists of their time. They exposed the terrible stuff. 🔍',
  },
  {
    id: 'vus10-5-v2', templateId: 'vus10-5', version: 2, versionFormat: 'quote',
    standardId: 'VUS.10', text: 'The author of this passage would be considered a —',
    options: ['suffragist', 'muckraker', 'union representative', 'factory owner'],
    correctIndex: 1, errorCategory: 'stimulus',
    quote: 'I aimed at the public\'s heart, and by accident I hit it in the stomach. The conditions in these packing plants are a disgrace to civilization.',
    quoteSource: 'Upton Sinclair, on The Jungle (1906)',
    strategyTip: 'Sinclair exposed meatpacking conditions in The Jungle — he was a classic muckraker.',
    genAlphaTip: 'Upton Sinclair wrote about gross meatpacking plants and people were SHOOK. Classic muckraker move. 🥩🤮',
  },
  {
    id: 'vus10-5-v3', templateId: 'vus10-5', version: 3, versionFormat: 'visual',
    standardId: 'VUS.10', text: 'This photograph demonstrates conditions exposed by a —',
    options: ['suffragist', 'muckraker', 'union representative', 'factory owner'],
    correctIndex: 1, errorCategory: 'stimulus',
    imageDescription: 'A 1911 newspaper photograph showing young boys, ages 8–12, operating large spinning machinery inside a textile mill. Their clothes are torn and their faces are covered in dust. No adult supervisors are visible.',
    strategyTip: 'Photos of child laborers were used by muckrakers to push for reform.',
    genAlphaTip: 'Kids in factories = muckraker content. They used these photos to say "this is NOT okay." 📸😤',
  },
  {
    id: 'vus10-5-v4', templateId: 'vus10-5', version: 4, versionFormat: 'diagram',
    standardId: 'VUS.10', text: 'Which group best completes this diagram?',
    options: ['Factory owners', 'Suffragists', 'Muckrakers', 'Populists'],
    correctIndex: 2, errorCategory: 'stimulus',
    diagramData: {
      type: 'flow',
      flowSteps: ['Unsafe working conditions exist', '?', 'Public demands reform legislation'],
    },
    strategyTip: 'Bad conditions → [exposure] → reform demands. Muckrakers were the ones who exposed the problems.',
    genAlphaTip: 'Bad conditions → ??? → people demand change. Muckrakers filled that gap by exposing the truth. 💡',
  },
  {
    id: 'vus10-5-v5', templateId: 'vus10-5', version: 5, versionFormat: 'timeline',
    standardId: 'VUS.10', text: 'Place these Progressive Era developments in order:',
    options: [
      'The Jungle published → Pure Food and Drug Act → Child labor laws → 19th Amendment',
      'Child labor laws → The Jungle → 19th Amendment → Pure Food and Drug Act',
      '19th Amendment → The Jungle → Pure Food and Drug Act → Child labor laws',
      'Pure Food and Drug Act → The Jungle → 19th Amendment → Child labor laws',
    ],
    correctIndex: 0, errorCategory: 'sequence',
    timelineData: [
      { year: 1906, label: 'The Jungle published', highlight: true },
      { year: 1906, label: 'Pure Food & Drug Act', highlight: true },
      { year: 1916, label: 'Child labor laws', highlight: true },
      { year: 1920, label: '19th Amendment', highlight: true },
    ],
    strategyTip: 'The Jungle (1906) directly led to the Pure Food & Drug Act (1906), then child labor laws, then women\'s suffrage.',
    genAlphaTip: 'The Jungle → food safety → child labor laws → women voting. Reform timeline, locked in. 📅',
  },

  // ===========================
  // VUS.14 — Pearl Harbor
  // ===========================
  {
    id: 'vus14-1-v1', templateId: 'vus14-1', version: 1, versionFormat: 'direct',
    standardId: 'VUS.14', text: 'What event directly caused the United States to enter World War II?',
    options: ['Invasion of Poland', 'Fall of France', 'Attack on Pearl Harbor', 'Battle of Britain'],
    correctIndex: 2, errorCategory: 'memorization',
    strategyTip: 'The US maintained neutrality until Japan attacked Pearl Harbor on December 7, 1941.',
    genAlphaTip: 'Pearl Harbor was the "that\'s it, we\'re fighting" moment. Dec 7, 1941. 💥',
  },
  {
    id: 'vus14-1-v2', templateId: 'vus14-1', version: 2, versionFormat: 'quote',
    standardId: 'VUS.14', text: 'This speech was delivered in response to which event?',
    options: ['D-Day invasion', 'Attack on Pearl Harbor', 'Bombing of Hiroshima', 'Fall of Berlin'],
    correctIndex: 1, errorCategory: 'stimulus',
    quote: 'Yesterday, December 7th, 1941 — a date which will live in infamy — the United States of America was suddenly and deliberately attacked by naval and air forces of the Empire of Japan.',
    quoteSource: 'President Franklin D. Roosevelt, Address to Congress (1941)',
    strategyTip: '"Date which will live in infamy" + December 7, 1941 = Pearl Harbor attack.',
    genAlphaTip: '"A date which will live in infamy" — FDR was talking about Pearl Harbor. Most iconic war speech ever. 🎤',
  },
  {
    id: 'vus14-1-v3', templateId: 'vus14-1', version: 3, versionFormat: 'visual',
    standardId: 'VUS.14', text: 'This image depicts which event that brought the US into World War II?',
    options: ['Battle of Midway', 'D-Day invasion', 'Attack on Pearl Harbor', 'Battle of the Bulge'],
    correctIndex: 2, errorCategory: 'stimulus',
    imageDescription: 'A black-and-white photograph from December 7, 1941 showing the USS Arizona battleship engulfed in flames and thick black smoke at a naval base in Hawaii. Other warships are visible in the background, some listing or sinking. Japanese planes can be seen in the sky.',
    strategyTip: 'USS Arizona + Hawaii + December 7, 1941 + Japanese attack = Pearl Harbor.',
    genAlphaTip: 'USS Arizona on fire, Hawaii, Japanese planes — that\'s Pearl Harbor. The moment everything changed. 🔥🚢',
  },
  {
    id: 'vus14-1-v4', templateId: 'vus14-1', version: 4, versionFormat: 'diagram',
    standardId: 'VUS.14', text: 'Which event best completes this diagram?',
    options: ['Invasion of Poland', 'Attack on Pearl Harbor', 'Signing of Lend-Lease Act', 'Fall of France'],
    correctIndex: 1, errorCategory: 'stimulus',
    diagramData: {
      type: 'flow',
      flowSteps: ['US maintains neutrality policy', '?', 'Congress declares war on Japan'],
    },
    strategyTip: 'Neutrality → [attack] → war declaration. Pearl Harbor was the trigger.',
    genAlphaTip: 'Neutral → ??? → war declared. Pearl Harbor was the event that flipped the switch. 🔄',
  },
  {
    id: 'vus14-1-v5', templateId: 'vus14-1', version: 5, versionFormat: 'timeline',
    standardId: 'VUS.14', text: 'The attack on Pearl Harbor belongs at which position?',
    options: ['1', '2', '3', '4'],
    correctIndex: 1, errorCategory: 'sequence',
    timelineData: [
      { year: 1939, label: 'WWII begins in Europe' },
      { year: 1941, label: '?', highlight: true },
      { year: 1944, label: 'D-Day invasion' },
      { year: 1945, label: 'War ends' },
    ],
    strategyTip: 'WWII in Europe (1939) → Pearl Harbor (1941) → D-Day (1944) → War ends (1945).',
    genAlphaTip: 'Europe (1939) → Pearl Harbor (1941) → D-Day (1944) → VE/VJ Day (1945). Timeline locked. 📅',
  },

  // ===========================
  // VUS.15 — Containment
  // ===========================
  {
    id: 'vus15-2-v1', templateId: 'vus15-2', version: 1, versionFormat: 'direct',
    standardId: 'VUS.15', text: 'The policy of containment was designed to —',
    options: ['spread democracy worldwide', 'prevent the spread of communism', 'negotiate peace treaties', 'reduce military spending'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'Containment aimed to stop communism from spreading beyond where it already existed.',
    genAlphaTip: 'Containment = don\'t let communism spread any further. Like putting a fence around it. 🧊',
  },
  {
    id: 'vus15-2-v2', templateId: 'vus15-2', version: 2, versionFormat: 'quote',
    standardId: 'VUS.15', text: 'This statement describes which US foreign policy?',
    options: ['Isolationism', 'Dollar Diplomacy', 'Containment', 'Détente'],
    correctIndex: 2, errorCategory: 'stimulus',
    quote: 'It must be the policy of the United States to support free peoples who are resisting attempted subjugation by armed minorities or by outside pressures.',
    quoteSource: 'President Harry S. Truman, Address to Congress (1947)',
    strategyTip: '"Support free peoples resisting subjugation" = Truman Doctrine = containment policy.',
    genAlphaTip: 'Truman said "we\'re helping anyone fighting against communism." That\'s containment. The Truman Doctrine. 🛡️',
  },
  {
    id: 'vus15-2-v3', templateId: 'vus15-2', version: 3, versionFormat: 'visual',
    standardId: 'VUS.15', text: 'This cartoon illustrates which US foreign policy?',
    options: ['Détente', 'Isolationism', 'Containment', 'Imperialism'],
    correctIndex: 2, errorCategory: 'stimulus',
    imageDescription: 'A political cartoon showing Uncle Sam building a brick wall around a large red area labeled "COMMUNISM." Countries like Greece, Turkey, and South Korea are shown on the outside of the wall, protected by American soldiers and aid packages.',
    strategyTip: 'Uncle Sam building a wall around communism = containment policy.',
    genAlphaTip: 'Uncle Sam literally building a wall around communism. That\'s containment in one image. 🧱🇺🇸',
  },
  {
    id: 'vus15-2-v4', templateId: 'vus15-2', version: 4, versionFormat: 'diagram',
    standardId: 'VUS.15', text: 'Which US policy is described by this list?',
    options: ['Isolationism', 'Imperialism', 'Containment', 'Manifest Destiny'],
    correctIndex: 2, errorCategory: 'stimulus',
    diagramData: {
      type: 'list',
      listItems: [
        'Truman Doctrine provides aid to Greece and Turkey',
        'Marshall Plan rebuilds Western Europe',
        'NATO formed as military alliance against Soviet Union',
        'US fights in Korea and Vietnam to stop communist expansion',
      ],
    },
    strategyTip: 'All four items are examples of containment — stopping communism through aid, alliances, and war.',
    genAlphaTip: 'Truman Doctrine, Marshall Plan, NATO, Korea, Vietnam — all containment strategies. Same goal, different tools. 🛠️',
  },
  {
    id: 'vus15-2-v5', templateId: 'vus15-2', version: 5, versionFormat: 'timeline',
    standardId: 'VUS.15', text: 'Place these Cold War containment actions in order:',
    options: [
      'Truman Doctrine → Korean War → Cuban Missile Crisis → Vietnam War',
      'Korean War → Truman Doctrine → Vietnam → Cuban Missile Crisis',
      'Cuban Missile Crisis → Korean War → Truman Doctrine → Vietnam',
      'Vietnam → Truman Doctrine → Korean War → Cuban Missile Crisis',
    ],
    correctIndex: 0, errorCategory: 'sequence',
    timelineData: [
      { year: 1947, label: 'Truman Doctrine', highlight: true },
      { year: 1950, label: 'Korean War', highlight: true },
      { year: 1962, label: 'Cuban Missile Crisis', highlight: true },
      { year: 1964, label: 'Vietnam War escalates', highlight: true },
    ],
    strategyTip: 'Truman (1947) → Korea (1950) → Cuba (1962) → Vietnam (1964+). Chronological containment.',
    genAlphaTip: 'Truman → Korea → Cuba → Vietnam. Containment went on for decades. Know the order. 📅',
  },

  // ===========================
  // VUS.16 — Brown v. Board
  // ===========================
  {
    id: 'vus16-1-v1', templateId: 'vus16-1', version: 1, versionFormat: 'direct',
    standardId: 'VUS.16', text: 'The Supreme Court decision in Brown v. Board of Education declared that —',
    options: ['separate but equal facilities were constitutional', 'racial segregation in public schools was unconstitutional', 'voting rights could not be denied based on race', 'affirmative action was required'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'Brown v. Board (1954) overturned Plessy v. Ferguson, ruling "separate but equal" was inherently unequal.',
    genAlphaTip: 'Brown v. Board said "separate is NOT equal" and struck down school segregation. Biggest W. 🏫⚖️',
  },
  {
    id: 'vus16-1-v2', templateId: 'vus16-1', version: 2, versionFormat: 'quote',
    standardId: 'VUS.16', text: 'This ruling is from which Supreme Court case?',
    options: ['Plessy v. Ferguson', 'Brown v. Board of Education', 'Marbury v. Madison', 'Dred Scott v. Sandford'],
    correctIndex: 1, errorCategory: 'stimulus',
    quote: 'We conclude that in the field of public education, the doctrine of "separate but equal" has no place. Separate educational facilities are inherently unequal.',
    quoteSource: 'Chief Justice Earl Warren, Brown v. Board of Education (1954)',
    strategyTip: '"Separate but equal has no place" + "inherently unequal" = Brown v. Board.',
    genAlphaTip: '"Separate but equal has NO place." Chief Justice Warren dropped the mic. Brown v. Board. 🎤⚖️',
  },
  {
    id: 'vus16-1-v3', templateId: 'vus16-1', version: 3, versionFormat: 'visual',
    standardId: 'VUS.16', text: 'This photograph relates to which Supreme Court decision?',
    options: ['Plessy v. Ferguson', 'Brown v. Board of Education', 'Roe v. Wade', 'Miranda v. Arizona'],
    correctIndex: 1, errorCategory: 'stimulus',
    imageDescription: 'A 1954 newspaper photograph showing African American students walking into a previously all-white school building. Armed National Guard soldiers escort them past a crowd of angry white protesters holding signs that read "Keep Our Schools Segregated."',
    strategyTip: 'Black students entering white schools + soldiers escorting + 1954 = aftermath of Brown v. Board.',
    genAlphaTip: 'Black students walking into white schools with soldiers protecting them. That\'s Brown v. Board being enforced. Historic moment. 🏫✊',
  },
  {
    id: 'vus16-1-v4', templateId: 'vus16-1', version: 4, versionFormat: 'diagram',
    standardId: 'VUS.16', text: 'Which Supreme Court case best completes this diagram?',
    options: ['Marbury v. Madison', 'Plessy v. Ferguson', 'Brown v. Board of Education', 'Dred Scott v. Sandford'],
    correctIndex: 2, errorCategory: 'stimulus',
    diagramData: {
      type: 'flow',
      flowSteps: ['Plessy v. Ferguson allows "separate but equal"', '?', 'Public school segregation declared unconstitutional'],
    },
    strategyTip: 'Plessy allows segregation → [new case] → segregation unconstitutional. Brown v. Board overturned Plessy.',
    genAlphaTip: 'Plessy said separate was OK → ??? → Court says NOPE. Brown v. Board was the reversal. 🔄',
  },
  {
    id: 'vus16-1-v5', templateId: 'vus16-1', version: 5, versionFormat: 'timeline',
    standardId: 'VUS.16', text: 'Brown v. Board of Education belongs at which position?',
    options: ['1', '2', '3', '4'],
    correctIndex: 1, errorCategory: 'sequence',
    timelineData: [
      { year: 1896, label: 'Plessy v. Ferguson' },
      { year: 1954, label: '?', highlight: true },
      { year: 1964, label: 'Civil Rights Act' },
      { year: 1965, label: 'Voting Rights Act' },
    ],
    strategyTip: 'Plessy (1896) → Brown (1954) → Civil Rights Act (1964) → Voting Rights Act (1965).',
    genAlphaTip: 'Plessy → Brown → Civil Rights Act → Voting Rights Act. Each one built on the last. 📅✊',
  },

  // ===========================
  // VUS.13 — Great Depression (FDIC)
  // ===========================
  {
    id: 'vus13-3-v1', templateId: 'vus13-3', version: 1, versionFormat: 'direct',
    standardId: 'VUS.13', text: 'Which New Deal program protected Americans from bank instability during the Great Depression?',
    options: ['Works Progress Administration', 'Tennessee Valley Authority', 'Federal Deposit Insurance Corporation', 'Agricultural Adjustment Administration'],
    correctIndex: 2, errorCategory: 'memorization',
    strategyTip: 'FDIC insured bank deposits so people wouldn\'t lose everything if a bank failed.',
    genAlphaTip: 'FDIC = your money is safe even if the bank fails. FDR said "we got you." 🏦✅',
  },
  {
    id: 'vus13-3-v2', templateId: 'vus13-3', version: 2, versionFormat: 'quote',
    standardId: 'VUS.13', text: 'This speech led to the creation of which New Deal program?',
    options: ['Social Security', 'FDIC', 'CCC', 'WPA'],
    correctIndex: 1, errorCategory: 'stimulus',
    quote: 'The only thing we have to fear is fear itself. Your government has provided a guarantee: your money in the bank is safe.',
    quoteSource: 'President Franklin D. Roosevelt, Fireside Chat (1933)',
    strategyTip: '"Money in the bank is safe" = FDIC, which insured bank deposits.',
    genAlphaTip: 'FDR said "your money is safe" on the radio. He was talking about the FDIC. Fireside Chat energy. 📻💰',
  },
  {
    id: 'vus13-3-v3', templateId: 'vus13-3', version: 3, versionFormat: 'visual',
    standardId: 'VUS.13', text: 'This image illustrates the problem addressed by which New Deal program?',
    options: ['WPA', 'CCC', 'FDIC', 'TVA'],
    correctIndex: 2, errorCategory: 'stimulus',
    imageDescription: 'A 1933 photograph showing a long line of worried Americans stretching around a city block, waiting outside a bank. A sign on the bank door reads "CLOSED — Bank Holiday." People clutch empty deposit books and look anxious.',
    strategyTip: 'Bank runs + people losing savings = the problem FDIC was created to solve.',
    genAlphaTip: 'Long lines at closed banks, people panicking about their money. FDIC was created to stop this from happening again. 🏦😰',
  },
  {
    id: 'vus13-3-v4', templateId: 'vus13-3', version: 4, versionFormat: 'diagram',
    standardId: 'VUS.13', text: 'Which New Deal program best completes this diagram?',
    options: ['WPA', 'CCC', 'FDIC', 'AAA'],
    correctIndex: 2, errorCategory: 'stimulus',
    diagramData: {
      type: 'flow',
      flowSteps: ['Banks fail across the country', '?', 'Americans\' savings protected up to $2,500'],
    },
    strategyTip: 'Bank failures → [new program] → savings protected. FDIC insured deposits.',
    genAlphaTip: 'Banks failing → ??? → savings protected. FDIC was the fix. Simple. 🔧',
  },
  {
    id: 'vus13-3-v5', templateId: 'vus13-3', version: 5, versionFormat: 'timeline',
    standardId: 'VUS.13', text: 'The creation of the FDIC belongs at which position?',
    options: ['1', '2', '3', '4'],
    correctIndex: 1, errorCategory: 'sequence',
    timelineData: [
      { year: 1929, label: 'Stock Market Crash' },
      { year: 1933, label: '?', highlight: true },
      { year: 1935, label: 'Social Security Act' },
      { year: 1938, label: 'Fair Labor Standards Act' },
    ],
    strategyTip: 'Crash (1929) → FDIC (1933, part of early New Deal) → Social Security (1935).',
    genAlphaTip: 'Crash → FDIC → Social Security → Fair Labor. The New Deal rolled out in stages. 📅',
  },

  // ===========================
  // VUS.11 — WWI Entry (Lusitania)
  // ===========================
  {
    id: 'vus11-1-v1', templateId: 'vus11-1', version: 1, versionFormat: 'direct',
    standardId: 'VUS.11', text: 'The sinking of the Lusitania eventually led the United States to —',
    options: ['join the Spanish American War', 'build the Panama Canal', 'enter World War I', 'maintain neutrality in the 1930s'],
    correctIndex: 2, errorCategory: 'memorization',
    strategyTip: 'The sinking of the Lusitania (1915) turned American opinion against Germany, leading to WWI entry.',
    genAlphaTip: 'Germany sank the Lusitania and America was NOT happy. Big reason the US entered WWI. 🚢💥',
  },
  {
    id: 'vus11-1-v2', templateId: 'vus11-1', version: 2, versionFormat: 'quote',
    standardId: 'VUS.11', text: 'This headline and the events it describes eventually led to —',
    options: ['The Spanish-American War', 'US entry into World War I', 'The construction of the Panama Canal', 'US isolationism in the 1920s'],
    correctIndex: 1, errorCategory: 'stimulus',
    headline: 'SUBMARINE SINKS LUSITANIA — 1,198 DEAD INCLUDING 128 AMERICANS',
    strategyTip: 'The Lusitania was sunk by a German U-boat in 1915, helping push the US toward WWI.',
    genAlphaTip: 'The Lusitania headline shocked Americans. 128 Americans dead. Germany messed up and the US remembered. 📰💀',
  },
  {
    id: 'vus11-1-v3', templateId: 'vus11-1', version: 3, versionFormat: 'visual',
    standardId: 'VUS.11', text: 'This image depicts an event that contributed to US entry into which war?',
    options: ['Spanish-American War', 'World War I', 'World War II', 'Korean War'],
    correctIndex: 1, errorCategory: 'stimulus',
    imageDescription: 'An illustration from a 1915 newspaper showing a large passenger ship tilting sharply to one side in the Atlantic Ocean, with lifeboats being lowered and passengers jumping into the water. A periscope is visible in the foreground. The ship\'s name "LUSITANIA" is visible on the hull.',
    strategyTip: 'Lusitania sinking + German submarine (periscope) + 1915 = event leading to WWI entry.',
    genAlphaTip: 'Ship named Lusitania sinking, periscope in the water = German U-boat attack. This pushed the US toward WWI. 🔭🚢',
  },
  {
    id: 'vus11-1-v4', templateId: 'vus11-1', version: 4, versionFormat: 'diagram',
    standardId: 'VUS.11', text: 'Which event best completes this diagram?',
    options: ['Assassination of Archduke Franz Ferdinand', 'Sinking of the Lusitania', 'Zimmermann Telegram', 'Treaty of Versailles'],
    correctIndex: 1, errorCategory: 'stimulus',
    diagramData: {
      type: 'flow',
      flowSteps: ['Germany begins unrestricted submarine warfare', '?', 'American public opinion turns against Germany'],
    },
    strategyTip: 'Unrestricted subs → [specific attack] → anti-German sentiment. The Lusitania was the key event.',
    genAlphaTip: 'Germany goes wild with subs → ??? → Americans are furious. The Lusitania sinking was what did it. 🚢💥',
  },
  {
    id: 'vus11-1-v5', templateId: 'vus11-1', version: 5, versionFormat: 'timeline',
    standardId: 'VUS.11', text: 'The sinking of the Lusitania belongs at which position?',
    options: ['1', '2', '3', '4'],
    correctIndex: 1, errorCategory: 'sequence',
    timelineData: [
      { year: 1914, label: 'WWI begins in Europe' },
      { year: 1915, label: '?', highlight: true },
      { year: 1917, label: 'US enters WWI' },
      { year: 1918, label: 'Armistice' },
    ],
    strategyTip: 'WWI starts (1914) → Lusitania (1915) → US enters (1917) → War ends (1918).',
    genAlphaTip: 'WWI starts → Lusitania sinks → US joins → war over. Know the sequence. 📅',
  },

  // ===========================
  // VUS.17 — 9/11 & War on Terror
  // ===========================
  {
    id: 'vus17-1-v1', templateId: 'vus17-1', version: 1, versionFormat: 'direct',
    standardId: 'VUS.17', text: 'The September 11, 2001 attacks led directly to the —',
    options: ['Gulf War', 'War on Terror', 'Cold War', 'Vietnam War'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: '9/11 prompted the US to launch the War on Terror, including invasions of Afghanistan and Iraq.',
    genAlphaTip: '9/11 changed everything. The War on Terror started right after. 🌍',
  },
  {
    id: 'vus17-1-v2', templateId: 'vus17-1', version: 2, versionFormat: 'quote',
    standardId: 'VUS.17', text: 'This address was delivered in response to which event?',
    options: ['Oklahoma City bombing', 'September 11 attacks', 'Hurricane Katrina', 'Boston Marathon bombing'],
    correctIndex: 1, errorCategory: 'stimulus',
    quote: 'Whether we bring our enemies to justice, or bring justice to our enemies, justice will be done.',
    quoteSource: 'President George W. Bush, Address to Congress (September 20, 2001)',
    strategyTip: 'Bush\'s address to Congress on September 20, 2001 was directly in response to 9/11.',
    genAlphaTip: 'Bush said "justice will be done" right after 9/11. This speech started the War on Terror. 🎤',
  },
  {
    id: 'vus17-1-v3', templateId: 'vus17-1', version: 3, versionFormat: 'visual',
    standardId: 'VUS.17', text: 'This image depicts which event that reshaped US foreign policy?',
    options: ['Pearl Harbor attack', 'Oklahoma City bombing', 'September 11 attacks', 'Hurricane Katrina'],
    correctIndex: 2, errorCategory: 'stimulus',
    imageDescription: 'A photograph showing two tall skyscrapers in New York City with thick black smoke pouring from their upper floors. A second plane is captured mid-flight heading toward one of the buildings. Emergency vehicles are visible on the streets below.',
    strategyTip: 'Two tall towers + smoke + plane heading toward building + New York = September 11, 2001.',
    genAlphaTip: 'Twin Towers, smoke, plane in the sky. September 11, 2001. The day that changed America forever. 🏙️',
  },
  {
    id: 'vus17-1-v4', templateId: 'vus17-1', version: 4, versionFormat: 'diagram',
    standardId: 'VUS.17', text: 'Which event best completes this diagram?',
    options: ['Gulf War', 'September 11 attacks', 'Fall of the Berlin Wall', 'Hurricane Katrina'],
    correctIndex: 1, errorCategory: 'stimulus',
    diagramData: {
      type: 'flow',
      flowSteps: ['?', 'Congress authorizes use of military force', 'US invades Afghanistan'],
    },
    strategyTip: '[Trigger event] → military authorization → Afghanistan invasion. 9/11 was the trigger.',
    genAlphaTip: '??? → Congress says "go" → Afghanistan invasion. 9/11 was the trigger event. 🎯',
  },
  {
    id: 'vus17-1-v5', templateId: 'vus17-1', version: 5, versionFormat: 'timeline',
    standardId: 'VUS.17', text: 'The September 11 attacks belong at which position?',
    options: ['1', '2', '3', '4'],
    correctIndex: 1, errorCategory: 'sequence',
    timelineData: [
      { year: 1991, label: 'Gulf War' },
      { year: 2001, label: '?', highlight: true },
      { year: 2003, label: 'Iraq War begins' },
      { year: 2011, label: 'Osama bin Laden killed' },
    ],
    strategyTip: 'Gulf War (1991) → 9/11 (2001) → Iraq War (2003) → bin Laden killed (2011).',
    genAlphaTip: 'Gulf War → 9/11 → Iraq → bin Laden. Know the post-Cold War timeline. 📅',
  },
];

// Export the full question bank
export const questionBank: Question[] = allQuestions;

// Generate practice questions for the adaptive feedback loop
export function generatePracticeQuestions(
  failedQuestion: Question,
  allQs: Question[]
): Question[] {
  const related = allQs.filter(
    q => q.templateId !== failedQuestion.templateId && 
         q.standardId === failedQuestion.standardId &&
         q.version === failedQuestion.version
  );
  const byCat = allQs.filter(
    q => q.templateId !== failedQuestion.templateId && 
         q.errorCategory === failedQuestion.errorCategory &&
         q.version === failedQuestion.version
  );
  const combined = [...new Map([...related, ...byCat].map(q => [q.templateId, q])).values()];
  return combined.slice(0, 5);
}

// Get questions for a Mock SOL (65 questions, one per template, all same version based on attempt)
export function getMockSOLQuestions(usedVersions: Record<string, number[]> = {}, retakeNumber: number = 1): Question[] {
  const targetVersion = getVersionForAttempt(retakeNumber);
  const selected = selectVersionsForQuiz(
    questionBank.filter(q => q.standardId !== 'VUS.1'),
    targetVersion
  );
  return selected.slice(0, 65).sort(() => Math.random() - 0.5);
}

// Get questions for unit mastery (15-20 questions, same version based on attempt)
export function getUnitMasteryQuestions(standardId: string, usedVersions: Record<string, number[]> = {}, retakeNumber: number = 1): Question[] {
  if (standardId === 'VUS.1') return [];
  const targetVersion = getVersionForAttempt(retakeNumber);
  const unitQs = questionBank.filter(q => q.standardId === standardId);
  const selected = selectVersionsForQuiz(unitQs, targetVersion);

  if (selected.length >= 15) {
    return [...selected].sort(() => Math.random() - 0.5).slice(0, 20);
  }
  // Supplement with related standards if needed
  const related = questionBank.filter(q => q.standardId !== standardId && q.standardId !== 'VUS.1');
  const relatedSelected = selectVersionsForQuiz(related, targetVersion);
  return [...selected, ...relatedSelected].slice(0, 15);
}
