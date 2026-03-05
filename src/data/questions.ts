import { Question } from '@/types/sol';
import { generateAllVariants, selectVersionsForQuiz } from './questionVariants';

// Master question templates (version 1 only, VUS.1 EXCLUDED — starts at VUS.2)
const masterQuestions: Omit<Question, 'templateId' | 'version'>[] = [
  // ===== VUS.2 — First Thirteen Colonies =====
  {
    id: 'vus2-1', standardId: 'VUS.2', text: 'Which colony was established as a business venture?',
    options: ['Connecticut', 'Massachusetts', 'Georgia', 'Virginia'],
    correctIndex: 3, errorCategory: 'memorization',
    strategyTip: 'Virginia (Jamestown, 1607) was founded by the Virginia Company as a for-profit enterprise seeking gold and trade.',
    genAlphaTip: 'Virginia was literally a startup. The Virginia Company investors wanted that bag 💰. Jamestown was all about profit, no cap.',
  },
  {
    id: 'vus2-2', standardId: 'VUS.2', text: 'Which factor was significant to the cavaliers in the early colonization of eastern Virginia?',
    options: ['Debt forgiveness', 'Free land', 'Political freedom', 'Religious tolerance'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'Cavaliers were loyal to the king and came to Virginia attracted by the promise of large land grants.',
    genAlphaTip: 'Cavaliers were like "free land? Say less." They dipped from England for those Virginia acres. Main character energy. 🏠',
  },
  {
    id: 'vus2-3', standardId: 'VUS.2', text: 'The founders of Rhode Island had different views from the Massachusetts Puritans on —',
    options: ['enslaved workers', 'private property', 'indentured servants', 'religious tolerance'],
    correctIndex: 3, errorCategory: 'memorization',
    strategyTip: 'Roger Williams founded Rhode Island after being banished from Massachusetts for advocating religious freedom and separation of church and state.',
    genAlphaTip: 'Roger Williams got cancelled by the Puritans for saying "let people worship however they want" and started his own colony. Absolute legend. 👑',
  },
  {
    id: 'vus2-4', standardId: 'VUS.2', text: 'The town meetings held by colonists in buildings like Old South Meeting House were important because they demonstrated a form of —',
    options: ['religious toleration', 'direct democracy', 'multicultural integration', 'representative government'],
    correctIndex: 1, errorCategory: 'stimulus',
    strategyTip: 'Town meetings allowed citizens to directly participate in governance — a key principle of direct democracy.',
    genAlphaTip: 'Town meetings were literally democracy IRL. Everyone showed up and voted on stuff together. That\'s direct democracy bussin. 🗳️',
  },
  {
    id: 'vus2-5', standardId: 'VUS.2', text: 'The different types of economies found in the original colonies were primarily a reflection of the —',
    options: ['nationalities of the settlers', 'geography of the areas', 'provisions of the charters', 'religion of the settlers'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'New England had rocky soil (trade/fishing), Middle Colonies had fertile land (grain), Southern had warm climate (tobacco/rice). Geography shaped economies.',
    genAlphaTip: 'It\'s all about the geography, fam. You can\'t grow tobacco on rocks 🪨. New England = fishing, South = plantations, Middle = farming. The land decided everything.',
  },
  {
    id: 'vus2-6', standardId: 'VUS.2', text: 'Based on a description of a settlement surrounded by swampland with high mortality rates, which colony is being described?',
    options: ['Plymouth', 'Jamestown', 'Massachusetts Bay', 'Pennsylvania'],
    correctIndex: 1, errorCategory: 'stimulus',
    strategyTip: 'Geographic clues matter! Swampland and disease point to the Chesapeake region — Jamestown.',
    genAlphaTip: 'Swamp + people dying = Jamestown 100%. That place was literally built in a swamp. They were cooked from day one. 🐊',
  },
  {
    id: 'vus2-7', standardId: 'VUS.2', text: 'How did the Great Awakening most influence the American Revolutionary movement?',
    options: ['It supported the practice of slave labor', 'It established official state religions', 'It challenged the established government order', 'It discouraged trade with foreign countries'],
    correctIndex: 2, errorCategory: 'memorization',
    strategyTip: 'The Great Awakening taught people to question authority and think for themselves — ideas that fueled revolution.',
    genAlphaTip: 'The Great Awakening was like "think for yourself" energy. People started questioning EVERYTHING, including the government. Revolution arc incoming. 🔥',
  },

  // ===== VUS.3 — African American Culture & Slavery =====
  {
    id: 'vus3-1', standardId: 'VUS.3', text: 'Which term describes the forced journey of enslaved Africans across the Atlantic Ocean?',
    options: ['Trail of Tears', 'Middle Passage', 'Underground Railroad', 'Great Migration'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'The Middle Passage was the horrific sea voyage from Africa to the Americas as part of the Transatlantic Slave Trade.',
    genAlphaTip: 'The Middle Passage was the journey across the Atlantic. It was absolutely horrific — millions of people forced onto ships in unimaginable conditions. No cap, one of the worst chapters in history. 😔',
  },
  {
    id: 'vus3-2', standardId: 'VUS.3', text: 'The colonial economy maximized profits primarily through the use of —',
    options: ['machine labor', 'indentured servitude and race-based enslavement', 'paid immigrant workers', 'family farming only'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'Colonial wealth was built on the exploitation of indentured servants and, increasingly, enslaved Africans.',
    genAlphaTip: 'Colonies got rich off forced labor. First indentured servants, then full-on race-based slavery. The economy was built on exploitation. That\'s the real talk. 💯',
  },

  // ===== VUS.4 — Indigenous People & Settlers =====
  {
    id: 'vus4-1', standardId: 'VUS.4', text: 'The cooperation between colonists and Indigenous people during the 1600s primarily involved —',
    options: ['religious conversion only', 'agriculture, fur trade, and military alliances', 'shared political governance', 'educational exchanges'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'Cooperation included agriculture, the fur trade, military alliances, treaties, and cultural interchanges.',
    genAlphaTip: 'Colonists and Indigenous peoples actually worked together on farming, fur trading, and even military stuff. The vibes were sometimes chill before everything went sideways. 🤝',
  },

  // ===== VUS.5 — Revolutionary Period =====
  {
    id: 'vus5-1', standardId: 'VUS.5', text: 'During the American Revolution, Benjamin Franklin\'s "JOIN, or DIE" cartoon attempted to —',
    options: ['persuade colonists to support the Loyalists', 'recruit colonists for the Royal Navy', 'encourage colonists to resolve their differences', 'convince colonists to maintain state sovereignty'],
    correctIndex: 2, errorCategory: 'stimulus',
    strategyTip: 'The snake cut into pieces represents the colonies — the message is "unite or perish." It\'s a call for colonial unity.',
    genAlphaTip: 'The snake is chopped up = the colonies divided. Franklin was like "get together or we\'re all cooked." Ultimate unity check. 🐍',
  },
  {
    id: 'vus5-2', standardId: 'VUS.5', text: 'One major element of George Washington\'s military strategy during the American Revolution was avoiding —',
    options: ['direct confrontations', 'night attacks', 'important cities', 'naval battles'],
    correctIndex: 0, errorCategory: 'memorization',
    strategyTip: 'Washington\'s Fabian strategy avoided large-scale battles he couldn\'t win, preserving his army to fight another day.',
    genAlphaTip: 'Washington played it smart — he dodged the big fights because the British army was OP. He just kept his army alive. 200 IQ plays. 🧠',
  },
  {
    id: 'vus5-3', standardId: 'VUS.5', text: 'Which factor contributed to colonial victory in the American Revolution?',
    options: ['Shortages of British troops', 'Disloyalty of British generals', 'Lack of British popular support', 'Weakness of the British Navy'],
    correctIndex: 2, errorCategory: 'memorization',
    strategyTip: 'The war was unpopular in Britain — many opposed fighting fellow English-speaking colonists, and the cost was enormous.',
    genAlphaTip: 'People in Britain were like "why are we fighting them?" The war was literally unpopular back home. That lack of support hit different. 🇬🇧❌',
  },
  {
    id: 'vus5-4', standardId: 'VUS.5', text: 'Thomas Paine\'s publication of Common Sense influenced many American colonists to support the —',
    options: ['formation of loyalist groups', 'concept of capitalist economies', 'idea of separation from England', 'purchase of territory from France'],
    correctIndex: 2, errorCategory: 'memorization',
    strategyTip: 'Common Sense argued in plain language that independence from Britain was the only logical choice.',
    genAlphaTip: 'Thomas Paine dropped Common Sense and it went viral. He basically said "why are we still with Britain?" and everyone was like "facts." 📖🔥',
  },
  {
    id: 'vus5-5', standardId: 'VUS.5', text: 'The Treaty of Alliance of 1778 was signed by the United States and —',
    options: ['Spain', 'Portugal', 'Russia', 'France'],
    correctIndex: 3, errorCategory: 'memorization',
    strategyTip: 'France became America\'s key ally after the Battle of Saratoga proved the colonists could win.',
    genAlphaTip: 'France said "we got you" and became America\'s biggest ally. The Treaty of Alliance was the ultimate squad up moment. 🇫🇷🤝🇺🇸',
  },
  {
    id: 'vus5-6', standardId: 'VUS.5', text: 'Which sequence correctly shows the path to independence?',
    options: [
      'Stamp Act → Boston Massacre → Tea Party → Lexington & Concord',
      'Tea Party → Stamp Act → Boston Massacre → Lexington & Concord',
      'Boston Massacre → Stamp Act → Tea Party → Lexington & Concord',
      'Stamp Act → Tea Party → Boston Massacre → Lexington & Concord'
    ],
    correctIndex: 0, errorCategory: 'sequence',
    strategyTip: 'Cause-and-effect chain: Stamp Act (1765) → Massacre (1770) → Tea Party (1773) → Lexington & Concord (1775).',
    genAlphaTip: 'It\'s a rage timeline: Stamp Act (1765) made them mad → Massacre (1770) made them furious → Tea Party (1773) was petty revenge → Lexington (1775) was "okay we\'re fighting." 💥',
    timelineData: [
      { year: 1765, label: 'Stamp Act', highlight: true },
      { year: 1770, label: 'Boston Massacre', highlight: true },
      { year: 1773, label: 'Tea Party', highlight: true },
      { year: 1775, label: 'Lexington & Concord', highlight: true },
    ],
  },
  {
    id: 'vus5-7', standardId: 'VUS.5', text: 'A document states "all men are created equal" and lists grievances against a king. What is this document\'s primary purpose?',
    options: ['Establish a new government structure', 'Justify separation from Britain', 'Create a bill of rights', 'Propose a peace treaty'],
    correctIndex: 1, errorCategory: 'stimulus',
    strategyTip: 'Identify the document (Declaration of Independence), its audience (world/King George), and its purpose (justifying revolution).',
    genAlphaTip: 'This is the Declaration of Independence. Jefferson basically wrote a breakup letter to King George. "It\'s not us, it\'s YOU." 💅📜',
  },
  {
    id: 'vus5-8', standardId: 'VUS.5', text: 'The principles of the Declaration of Independence led to increased social participation over time by —',
    options: ['supporting low taxes', 'creating the two-party system', 'promoting civil rights', 'promoting a strong government'],
    correctIndex: 2, errorCategory: 'memorization',
    strategyTip: '"All men are created equal" became the foundation for expanding rights to all Americans over centuries.',
    genAlphaTip: '"All men are created equal" was the OG civil rights statement. It took centuries but that idea kept pushing America to do better. Iconic. ✊',
  },
  {
    id: 'vus5-9', standardId: 'VUS.5', text: 'John Locke\'s ideas contributed to the Declaration of Independence because he influenced the belief in —',
    options: ['capitalism and free enterprise', 'self-government and natural rights', 'a strong federal government and rule of law', 'a monarchy and democracy'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'Locke argued for natural rights (life, liberty, property) and government by consent — ideas Jefferson used directly.',
    genAlphaTip: 'John Locke was the OG philosopher. His "life, liberty, property" ideas went straight into the Declaration. Jefferson was basically a Locke stan. 🧠',
  },

  // ===== VUS.6 — American Political System =====
  {
    id: 'vus6-1', standardId: 'VUS.6', text: 'These powers — President can veto, Congress can override, Courts can declare unconstitutional — result from —',
    options: ['suggested amendments to the Articles of Confederation', 'a system of constitutional checks and balances', 'foreign influences on the colonies', 'an idea taken from the Articles of Confederation'],
    correctIndex: 1, errorCategory: 'stimulus',
    strategyTip: 'Each branch can limit the others\' power. This is the checks and balances system built into the Constitution.',
    genAlphaTip: 'This is checks and balances — each branch can check the others so nobody gets too OP. The Founders were actually cracked at game design. ⚖️',
  },
  {
    id: 'vus6-2', standardId: 'VUS.6', text: 'Which amendment to the Constitution was directly influenced by the Virginia Statute for Religious Freedom?',
    options: ['1st', '2nd', '5th', '8th'],
    correctIndex: 0, errorCategory: 'memorization',
    strategyTip: 'Thomas Jefferson\'s Virginia Statute for Religious Freedom directly inspired the 1st Amendment\'s religious freedom protections.',
    genAlphaTip: 'Virginia\'s religious freedom statute was the blueprint for the 1st Amendment. Jefferson said "no state religion" and the Constitution said "bet." 🙏',
  },
  {
    id: 'vus6-3', standardId: 'VUS.6', text: 'Which document directly influenced the first ten amendments to the Constitution?',
    options: ['Mayflower Compact', 'Virginia Declaration of Rights', 'Articles of Confederation', 'Emancipation Proclamation'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'George Mason\'s Virginia Declaration of Rights (1776) was a key model for the Bill of Rights.',
    genAlphaTip: 'George Mason wrote the Virginia Declaration of Rights and James Madison was like "I\'m using this for the Bill of Rights." Copy paste energy. 📋',
  },
  {
    id: 'vus6-4', standardId: 'VUS.6', text: 'Which leaders opposed the ratification of the Constitution of 1787?',
    options: ['Patrick Henry and George Mason', 'James Madison and George Washington', 'Patrick Henry and James Madison', 'George Mason and George Washington'],
    correctIndex: 0, errorCategory: 'memorization',
    strategyTip: 'Henry and Mason were Anti-Federalists who feared the Constitution gave too much power to the federal government.',
    genAlphaTip: 'Patrick Henry and George Mason were like "nah this Constitution gives the feds too much power." They were the OG skeptics. Anti-Federalist energy. 🚫',
  },
  {
    id: 'vus6-5', standardId: 'VUS.6', text: 'A statement favoring strong national government to manage trade, defense, and foreign relations would most likely favor the —',
    options: ['Treaty of Paris', 'Articles of Confederation', 'Declaration of Independence', 'Constitution of the United States'],
    correctIndex: 3, errorCategory: 'stimulus',
    strategyTip: 'The Constitution created a stronger central government to fix the weaknesses of the Articles of Confederation.',
    genAlphaTip: 'Strong government = Constitution vibes. The Articles were too weak (no cap, they couldn\'t even tax people). The Constitution was the upgrade. 💪',
  },
  {
    id: 'vus6-6', standardId: 'VUS.6', text: 'John Marshall was instrumental in strengthening the —',
    options: ['State Department', 'Federal Reserve', 'Electoral College', 'Supreme Court'],
    correctIndex: 3, errorCategory: 'memorization',
    strategyTip: 'Chief Justice Marshall established judicial review in Marbury v. Madison, making the Supreme Court a co-equal branch.',
    genAlphaTip: 'John Marshall turned the Supreme Court from a side character into a main character. Marbury v. Madison gave them the power to say "that law is unconstitutional." 🔨',
  },
  {
    id: 'vus6-7', standardId: 'VUS.6', text: 'Which early political party opposed the Bank of the United States, opposed the Jay Treaty, and favored an economy based on agriculture?',
    options: ['Federalists', 'Whigs', 'Know-Nothings', 'Democratic-Republicans'],
    correctIndex: 3, errorCategory: 'stimulus',
    strategyTip: 'Jefferson\'s Democratic-Republicans wanted limited government, farming economy, and opposed Hamilton\'s financial plans.',
    genAlphaTip: 'Democratic-Republicans were the "keep it simple" party. No big banks, no treaties with Britain, just farming vibes. Jefferson was team agrarian. 🌾',
  },
  {
    id: 'vus6-8', standardId: 'VUS.6', text: 'Which issue led to the development of the first political parties in the United States?',
    options: ['Abolition of slavery', 'Women\'s suffrage', 'Expansion of western territories', 'National government\'s powers'],
    correctIndex: 3, errorCategory: 'memorization',
    strategyTip: 'Hamilton (Federalists) wanted a strong national government; Jefferson (Democratic-Republicans) wanted states\' rights.',
    genAlphaTip: 'Hamilton vs. Jefferson was the original beef. They couldn\'t agree on how much power the government should have and that\'s how parties started. Drama. 🎭',
  },
  {
    id: 'vus6-9', standardId: 'VUS.6', text: 'Which principle is shared by the Articles of Confederation and the Constitution?',
    options: ['Judicial review', 'Limited government', 'Separation of powers', 'Checks and balances'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'Both documents aimed to prevent tyranny through limited government, though they differed in how.',
    genAlphaTip: 'Both the Articles and Constitution agreed on one thing: don\'t let the government get too powerful. Limited government was the shared vibe. 🤏',
  },
  {
    id: 'vus6-10', standardId: 'VUS.6', text: '"It is emphatically the province and duty of the judicial department to say what the law is." Which Supreme Court decision includes this?',
    options: ['Marbury v. Madison', 'Cohens v. Virginia', 'Gibbons v. Ogden', 'McCulloch v. Maryland'],
    correctIndex: 0, errorCategory: 'stimulus',
    quote: 'It is emphatically the province and duty of the judicial department to say what the law is.',
    quoteSource: 'Chief Justice John Marshall, Marbury v. Madison (1803)',
    strategyTip: 'This quote from Chief Justice Marshall in Marbury v. Madison (1803) established the principle of judicial review.',
    genAlphaTip: 'Marshall literally said "we decide what\'s legal" in Marbury v. Madison. That one quote gave the Supreme Court its main power. Iconic. 🏛️',
  },

  // ===== VUS.7 — Early 19th Century =====
  {
    id: 'vus7-1', standardId: 'VUS.7', text: 'One of the fundamental beliefs of Jacksonian Democracy was that —',
    options: ['political parties should have popular leaders', 'ordinary citizens should participate in politics', 'religious leaders should hold elected offices', 'federal jobs should go to qualified individuals'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'Jackson championed "the common man" — expanding voting rights beyond just wealthy landowners.',
    genAlphaTip: 'Jackson said "everyone gets to play" and opened up politics to regular people, not just rich dudes. The common man era. 🗳️',
  },
  {
    id: 'vus7-2', standardId: 'VUS.7', text: 'Critics of Andrew Jackson\'s stand on the Second Bank accused him of abusing executive powers by —',
    options: ['ignoring political supporters', 'using the military against the Cherokee', 'using the presidential veto to overrule Congress', 'opposing federal funding of internal improvements'],
    correctIndex: 2, errorCategory: 'memorization',
    strategyTip: 'Jackson vetoed the recharter of the Bank, which critics saw as overstepping presidential authority.',
    genAlphaTip: 'Jackson went full main character and vetoed the Bank. His haters said he was power tripping with the veto. King Andrew energy. 👑',
  },
  {
    id: 'vus7-3', standardId: 'VUS.7', text: 'Which group helped Andrew Jackson become President the first time they could participate in an election?',
    options: ['People allowed to vote without paying a poll tax', 'Newly freed slaves from West Africa', 'People allowed to vote without owning property', 'Naturalized immigrants from Eastern Europe'],
    correctIndex: 2, errorCategory: 'memorization',
    strategyTip: 'States began dropping property requirements for voting, allowing non-landowners to vote — and they chose Jackson.',
    genAlphaTip: 'When they let non-property-owners vote for the first time, those people said "Jackson is our guy." He was the people\'s champion. 💪',
  },
  {
    id: 'vus7-4', standardId: 'VUS.7', text: 'Place these events in Texas history in order: 1) Migration of settlers, 2) Battle of the Alamo, 3) Independence from Mexico, 4) Entry into the Union.',
    options: ['1, 2, 3, 4', '2, 1, 4, 3', '1, 3, 2, 4', '3, 1, 2, 4'],
    correctIndex: 0, errorCategory: 'sequence',
    strategyTip: 'Americans settled Texas → fought at the Alamo (1836) → won independence → annexed by the US (1845).',
    genAlphaTip: 'Texas speedrun: settlers move in → Alamo goes down → Texas says "we\'re independent" → USA says "welcome to the squad." 🤠',
    timelineData: [
      { year: 1821, label: 'American Settlers', highlight: true },
      { year: 1836, label: 'Battle of Alamo', highlight: true },
      { year: 1836, label: 'Texas Independence', highlight: true },
      { year: 1845, label: 'Joins the Union', highlight: true },
    ],
  },

  // ===== VUS.8 — Slavery & Abolition =====
  {
    id: 'vus8-1', standardId: 'VUS.8', text: 'President Lincoln was speaking to this person when he said "So you\'re the little woman who wrote the book that made this great war!" —',
    options: ['Elizabeth Cady Stanton', 'Sojourner Truth', 'Harriet Tubman', 'Harriet Beecher Stowe'],
    correctIndex: 3, errorCategory: 'stimulus',
    quote: 'So you\'re the little woman who wrote the book that made this great war!',
    quoteSource: 'Abraham Lincoln, attributed remark to Harriet Beecher Stowe',
    strategyTip: 'Uncle Tom\'s Cabin by Harriet Beecher Stowe dramatized the horrors of slavery and fueled anti-slavery sentiment.',
    genAlphaTip: 'Harriet Beecher Stowe wrote Uncle Tom\'s Cabin and it literally broke the internet (1852 edition). Lincoln credited her for starting the Civil War discourse. 📖🔥',
  },
  {
    id: 'vus8-2', standardId: 'VUS.8', text: 'Uprisings led by Nat Turner and Gabriel Prosser contributed to Southern states\' decisions to —',
    options: ['pass harsh fugitive slave laws', 'accept the Missouri Compromise', 'enact Jim Crow legislation', 'support passing of higher tariffs'],
    correctIndex: 0, errorCategory: 'memorization',
    strategyTip: 'Slave rebellions terrified Southern states, leading them to pass stricter slave codes and fugitive slave laws.',
    genAlphaTip: 'After Nat Turner and Gabriel Prosser\'s rebellions, the South freaked out and made the laws even harsher. They were scared and it showed. 😤',
  },
  {
    id: 'vus8-3', standardId: 'VUS.8', text: 'Before the Civil War, slavery was prohibited in certain areas by the —',
    options: ['Monroe Doctrine', 'Dred Scott decision', 'Kansas-Nebraska Act', 'Missouri Compromise'],
    correctIndex: 3, errorCategory: 'memorization',
    strategyTip: 'The Missouri Compromise (1820) drew a line at 36°30\' — slavery banned above it, allowed below.',
    genAlphaTip: 'The Missouri Compromise drew a literal line on the map. Above = no slavery, below = slavery. It was the ultimate "compromise" that just delayed the problem. 📏',
  },
  {
    id: 'vus8-4', standardId: 'VUS.8', text: 'What failed to carry out the ideals expressed in the Declaration of Independence?',
    options: ['Bill of Rights', 'Dred Scott decision', '14th Amendment', 'Voting Rights Act of 1965'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'Dred Scott (1857) ruled that enslaved people were not citizens — directly contradicting "all men are created equal."',
    genAlphaTip: 'The Dred Scott decision said enslaved people weren\'t even citizens. That\'s literally the opposite of "all men are created equal." Massive L for the Supreme Court. ❌',
  },

  // ===== VUS.9 — Civil War & Reconstruction =====
  {
    id: 'vus9-1', standardId: 'VUS.9', text: 'Which role did Jefferson Davis play in the nation\'s history?',
    options: ['Leader in the Texas Revolution', 'Justice on the Supreme Court', 'General in the Mexican-American War', 'President of the Confederate States of America'],
    correctIndex: 3, errorCategory: 'memorization',
    strategyTip: 'Jefferson Davis was a US Senator from Mississippi who became the President of the Confederacy.',
    genAlphaTip: 'Jefferson Davis went from US Senator to President of the Confederacy. He chose the wrong side of history. That\'s the lore. 📜',
  },
  {
    id: 'vus9-2', standardId: 'VUS.9', text: 'Which man was a US Senator who became the leader of the Confederacy?',
    options: ['Robert E. Lee', 'Jefferson Davis', 'Nat Turner', 'Stonewall Jackson'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'Davis was the political leader; Lee was the military leader. Don\'t confuse them!',
    genAlphaTip: 'Jefferson Davis = political boss of the Confederacy. Lee = military boss. Know the difference, it\'s gonna be on the test fr. 🎯',
  },
  {
    id: 'vus9-3', standardId: 'VUS.9', text: 'The Battle of Fort Sumter was significant because it was the first —',
    options: ['Confederate defeat', 'conflict with African-American soldiers', 'time British soldiers fought alongside Union', 'military confrontation of the Civil War'],
    correctIndex: 3, errorCategory: 'memorization',
    strategyTip: 'Fort Sumter (April 1861) was where the first shots of the Civil War were fired.',
    genAlphaTip: 'Fort Sumter = where it all started. The Confederacy fired the first shots and the Civil War was ON. 💥',
  },
  {
    id: 'vus9-4', standardId: 'VUS.9', text: 'The Battle of Gettysburg was significant because it —',
    options: ['caused states to secede from the Union', 'was the opening conflict of the war', 'forced the surrender of the South', 'was the turning point of the war'],
    correctIndex: 3, errorCategory: 'memorization',
    strategyTip: 'After Gettysburg (July 1863), the Confederacy was on the defensive and never recovered.',
    genAlphaTip: 'Gettysburg was THE turning point. After this L, the Confederacy was basically on a losing streak for the rest of the war. GG. ⚔️',
  },
  {
    id: 'vus9-5', standardId: 'VUS.9', text: 'In the Gettysburg Address, President Lincoln rejected the idea that the country was —',
    options: ['a federation of sovereign states', 'a society based on equality', 'committed to unity at any cost', 'founded on democratic ideals'],
    correctIndex: 0, errorCategory: 'memorization',
    strategyTip: 'Lincoln argued the US was ONE nation, not a collection of independent states that could leave whenever they wanted.',
    genAlphaTip: 'Lincoln said "nah, we\'re ONE nation, not a group chat you can just leave." He rejected the whole states\' rights to secede thing. 🇺🇸',
  },
  {
    id: 'vus9-6', standardId: 'VUS.9', text: 'Put these Civil War events in order: 1) Emancipation Proclamation, 2) Fort Sumter, 3) Gettysburg, 4) Appomattox.',
    options: ['2, 1, 3, 4', '1, 2, 3, 4', '2, 3, 1, 4', '3, 2, 1, 4'],
    correctIndex: 0, errorCategory: 'sequence',
    strategyTip: 'Fort Sumter (1861) → Emancipation (Jan 1863) → Gettysburg (July 1863) → Appomattox (1865).',
    genAlphaTip: 'Civil War timeline: Fort Sumter starts it (1861) → Lincoln frees enslaved people (1863) → Gettysburg turns the tide (1863) → Appomattox ends it (1865). 📅',
    timelineData: [
      { year: 1861, label: 'Fort Sumter', highlight: true },
      { year: 1863, label: 'Emancipation', highlight: true },
      { year: 1863, label: 'Gettysburg', highlight: true },
      { year: 1865, label: 'Appomattox', highlight: true },
    ],
  },
  {
    id: 'vus9-7', standardId: 'VUS.9', text: 'A description of a leader who "urged Southerners to reconcile" and "served as President of Washington College" describes —',
    options: ['Ulysses S. Grant', 'Abraham Lincoln', 'Robert E. Lee', 'Jefferson Davis'],
    correctIndex: 2, errorCategory: 'stimulus',
    strategyTip: 'After the war, Lee urged peace and reconciliation and became president of what is now Washington and Lee University.',
    genAlphaTip: 'Robert E. Lee after the war said "let\'s heal" and became a college president. Post-war redemption arc at Washington College. 🎓',
  },
  {
    id: 'vus9-8', standardId: 'VUS.9', text: '"With malice toward none; with charity for all..." expressed Lincoln\'s plans for —',
    options: ['creating a strategy for Union victory', 'eliminating Jim Crow laws', 'convincing Congress to abolish slavery', 'readmitting the Confederate states'],
    correctIndex: 3, errorCategory: 'stimulus',
    quote: 'With malice toward none; with charity for all...',
    quoteSource: 'Abraham Lincoln, Second Inaugural Address (1865)',
    strategyTip: 'Lincoln\'s Second Inaugural Address called for gentle Reconstruction — bringing the South back without vengeance.',
    genAlphaTip: 'Lincoln was saying "no hate, just healing." He wanted Reconstruction to be about unity, not revenge. Wholesome king energy. 🕊️',
  },
  {
    id: 'vus9-9', standardId: 'VUS.9', text: 'One major economic impact of the Civil War was the —',
    options: ['emergence of the South as a manufacturing center', 'increase in laborers relocating to the South', 'strengthening of the North and Midwest industrial regions', 'increase in tariffs on French and British goods'],
    correctIndex: 2, errorCategory: 'memorization',
    strategyTip: 'The war industrialized the North further while devastating the Southern agricultural economy.',
    genAlphaTip: 'The North\'s factories went brrrr during the war. Meanwhile the South was wrecked. North and Midwest got the economic W. 🏭',
  },
  {
    id: 'vus9-10', standardId: 'VUS.9', text: 'Which photograph of Richmond, Virginia illustrates the economic devastation caused by the Civil War on the South?',
    options: ['Industrial pollution', 'Economic devastation', 'Political corruption', 'Agricultural destruction'],
    correctIndex: 1, errorCategory: 'stimulus',
    headline: 'RICHMOND IN RUINS: THE COST OF WAR',
    strategyTip: 'Photos of burned-out buildings in Richmond show the destruction of the Southern economy and infrastructure.',
    genAlphaTip: 'Richmond was literally in ruins. The photos show buildings destroyed, the economy wrecked. The South was absolutely cooked after the war. 🔥🏚️',
  },

  // ===== VUS.10 — Industrialization & Progressive Era =====
  {
    id: 'vus10-1', standardId: 'VUS.10', text: 'Which businessman was known as the "King of Steel"?',
    options: ['John D. Rockefeller', 'Andrew Carnegie', 'J.P. Morgan', 'Cornelius Vanderbilt'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'Match tycoons to industries: Carnegie = Steel, Rockefeller = Oil, Vanderbilt = Railroads.',
    genAlphaTip: 'Carnegie = Steel, Rockefeller = Oil, Vanderbilt = Trains. That\'s the cheat sheet. Carnegie was literally the steel goat. 🏗️',
  },
  {
    id: 'vus10-2', standardId: 'VUS.10', text: 'A political cartoon shows a giant octopus with tentacles around the Capitol, railroads, and banks. What does this represent?',
    options: ['Labor unions gaining power', 'Monopolies controlling government and industry', 'Immigration restrictions', 'Progressive reforms succeeding'],
    correctIndex: 1, errorCategory: 'stimulus',
    strategyTip: 'In political cartoons, an octopus = control over many areas. Ask: who has too much power?',
    genAlphaTip: 'Octopus with tentacles everywhere = monopolies got their hands in EVERYTHING. Government, railroads, banks — they were griping it all. 🐙',
  },
  {
    id: 'vus10-3', standardId: 'VUS.10', text: 'Which civil rights leader believed African Americans could earn equality by learning vocational skills?',
    options: ['Oliver Hill', 'W.E.B. DuBois', 'Booker T. Washington', 'Martin Luther King Jr.'],
    correctIndex: 2, errorCategory: 'memorization',
    strategyTip: 'Washington advocated economic self-improvement through vocational education at Tuskegee.',
    genAlphaTip: 'Booker T. Washington said "learn a trade, get the bag, earn respect." He was all about that vocational education grind. 🛠️',
  },
  {
    id: 'vus10-4', standardId: 'VUS.10', text: 'A photograph shows children working in a textile factory, some younger than 10. Which reform movement would use this image?',
    options: ['Temperance movement', 'Women\'s suffrage', 'Child labor reform', 'Trust-busting'],
    correctIndex: 2, errorCategory: 'stimulus',
    strategyTip: 'Photos were powerful reform tools. Ask: Who is suffering? What injustice is shown?',
    genAlphaTip: 'Kids in factories = child labor reform content. Reformers used these photos to say "this is NOT okay." And they were right. 📸😤',
  },
  {
    id: 'vus10-5', standardId: 'VUS.10', text: 'This photograph of "Doffer and Spinner Boys in Seaconnet Mill, 1912" demonstrates conditions exposed by a —',
    options: ['suffragist', 'muckraker', 'union representative', 'factory owner'],
    correctIndex: 1, errorCategory: 'stimulus',
    strategyTip: 'Muckrakers were journalists who exposed social problems through writing and photography.',
    genAlphaTip: 'Muckrakers were the investigative journalists of their time. They exposed the terrible stuff happening in factories. Real whistleblower energy. 🔍',
  },
  {
    id: 'vus10-6', standardId: 'VUS.10', text: 'During the 19th century, Chinese immigrants played a major role in the —',
    options: ['building of the Transcontinental Railroad', 'development of the public school system', 'establishment of the abolition movement', 'formation of the Tammany Society'],
    correctIndex: 0, errorCategory: 'memorization',
    strategyTip: 'Chinese immigrants provided essential labor building the western portion of the Transcontinental Railroad.',
    genAlphaTip: 'Chinese immigrants literally built the Transcontinental Railroad from the west side. They did the hardest, most dangerous work. Respect. 🚂',
  },
  {
    id: 'vus10-7', standardId: 'VUS.10', text: 'During the Industrial Revolution, new technology affected the economy by —',
    options: ['increasing worker productivity', 'limiting profits', 'decreasing urban population', 'generating tax revenues'],
    correctIndex: 0, errorCategory: 'memorization',
    strategyTip: 'New machines and factories dramatically increased what each worker could produce.',
    genAlphaTip: 'New tech = more stuff made faster. Productivity went up, factories went brrrr. That\'s industrialization in a nutshell. ⚙️',
  },
  {
    id: 'vus10-8', standardId: 'VUS.10', text: 'The Standard Oil Company breakup was a result of the passage of the —',
    options: ['Interstate Commerce Act', '17th Amendment', 'Sherman Antitrust Act', '19th Amendment'],
    correctIndex: 2, errorCategory: 'memorization',
    strategyTip: 'The Sherman Antitrust Act (1890) was used to break up monopolies like Standard Oil.',
    genAlphaTip: 'The Sherman Antitrust Act said "monopolies are illegal" and Rockefeller\'s Standard Oil got broken up. Anti-monopoly W. ⚖️',
  },
  {
    id: 'vus10-9', standardId: 'VUS.10', text: 'Place these Progressive reforms in order: 1) 19th Amendment, 2) Pure Food and Drug Act, 3) 17th Amendment, 4) Federal Reserve Act.',
    options: ['2, 3, 4, 1', '1, 2, 3, 4', '3, 4, 2, 1', '2, 4, 3, 1'],
    correctIndex: 0, errorCategory: 'sequence',
    strategyTip: 'Pure Food & Drug (1906) → 17th Amendment (1913) → Federal Reserve (1913) → 19th Amendment (1920).',
    genAlphaTip: 'Progressive reforms timeline: food safety first (1906), then direct senator elections and the Fed (1913), then women voting (1920). 📅',
    timelineData: [
      { year: 1906, label: 'Pure Food & Drug Act', highlight: true },
      { year: 1913, label: '17th Amendment', highlight: true },
      { year: 1913, label: 'Federal Reserve Act', highlight: true },
      { year: 1920, label: '19th Amendment', highlight: true },
    ],
  },
  {
    id: 'vus10-10', standardId: 'VUS.10', text: 'Which individual helped found the NAACP?',
    options: ['James Meredith', 'W.E.B. DuBois', 'Thurgood Marshall', 'Booker T. Washington'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'DuBois co-founded the NAACP in 1909 to fight for civil rights through political action and legal challenges.',
    genAlphaTip: 'W.E.B. DuBois co-founded the NAACP. While Booker T. said "work hard," DuBois said "fight for your rights NOW." Different approaches, same goal. ✊',
  },

  // ===== VUS.11 — Emerging World Power & WWI =====
  {
    id: 'vus11-1', standardId: 'VUS.11', text: 'A headline reading "SUBMARINE SINKS LUSITANIA" eventually led to —',
    options: ['involvement in the Spanish American War', 'construction of the Panama Canal', 'entry into World War I', 'neutrality during the 1930s'],
    correctIndex: 2, errorCategory: 'stimulus',
    headline: 'SUBMARINE SINKS LUSITANIA — 1,198 DEAD',
    strategyTip: 'The sinking of the Lusitania (1915) turned American public opinion against Germany, leading to US entry into WWI.',
    genAlphaTip: 'Germany sank the Lusitania and America was NOT happy. That was one of the big reasons the US entered WWI. Germany chose violence and got consequences. 🚢💥',
  },
  {
    id: 'vus11-2', standardId: 'VUS.11', text: 'Which action kept the United States from joining the League of Nations?',
    options: ['Massive public protests', 'Veto by the President', 'Opposition in the Senate', 'Revision of treaties'],
    correctIndex: 2, errorCategory: 'memorization',
    strategyTip: 'The Senate refused to ratify the Treaty of Versailles, keeping the US out of Wilson\'s own League of Nations.',
    genAlphaTip: 'Wilson created the League of Nations but the Senate said "nah we\'re not joining." Imagine creating something and getting rejected by your own team. 💀',
  },
  {
    id: 'vus11-3', standardId: 'VUS.11', text: 'The Open Door Policy was important because its goal was to —',
    options: ['ensure freedom of trade with China', 'control the economy of Latin America', 'grant exclusive trading rights with Hawaii', 'limit commercial activity in Europe'],
    correctIndex: 0, errorCategory: 'memorization',
    strategyTip: 'The Open Door Policy (1899) demanded equal trading rights for all nations in China.',
    genAlphaTip: 'The Open Door Policy was like "everyone gets to trade with China equally." The US didn\'t want Europe hogging all the deals. Fair play energy. 🚪',
  },
  {
    id: 'vus11-4', standardId: 'VUS.11', text: 'President Taft developed Dollar Diplomacy to support —',
    options: ['US citizens traveling to Europe', 'equal trading rights in Japan', 'US businesses investing in Latin America', 'trade with the Philippines'],
    correctIndex: 2, errorCategory: 'memorization',
    strategyTip: 'Dollar Diplomacy used economic investment and loans to extend US influence, especially in Latin America.',
    genAlphaTip: 'Taft\'s Dollar Diplomacy was like "we\'ll invest money in Latin America so they need us." Using the bag to gain influence. 💰🌎',
  },
  {
    id: 'vus11-5', standardId: 'VUS.11', text: 'By the late 1890s, many business leaders believed future growth depended on —',
    options: ['tighter governmental regulation', 'increasing growth of labor unions', 'laws abolishing child labor', 'establishment of foreign markets'],
    correctIndex: 3, errorCategory: 'memorization',
    strategyTip: 'American businesses had outgrown domestic markets and needed international trade for continued expansion.',
    genAlphaTip: 'America\'s businesses maxed out the home market and needed to go global. Foreign markets = more customers = more money. Simple math. 📈🌍',
  },

  // ===== VUS.12 — 1920s & Social Change =====
  {
    id: 'vus12-1', standardId: 'VUS.12', text: 'Which type of music was popularized by radio in the 1920s?',
    options: ['Jazz', 'Reggae', 'Bluegrass', 'Folk'],
    correctIndex: 0, errorCategory: 'memorization',
    strategyTip: 'The 1920s were the "Jazz Age" — radio brought jazz music to millions of Americans.',
    genAlphaTip: 'The 1920s were literally the Jazz Age. Radio made jazz go viral before viral was a thing. 🎷📻',
  },
  {
    id: 'vus12-2', standardId: 'VUS.12', text: 'Which aspect of American life was most challenged by the passage of the 19th Amendment?',
    options: ['Organized religion', 'Role of women', 'Economic policy', 'Opposition to segregation'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'The 19th Amendment (1920) gave women the right to vote, fundamentally changing their role in American society.',
    genAlphaTip: 'The 19th Amendment = women can vote. It completely changed the role of women in society. Queens finally got their say. 👑🗳️',
  },
  {
    id: 'vus12-3', standardId: 'VUS.12', text: 'The Great Migration of the early 20th century refers to the movement of —',
    options: ['European immigrants to western cities', 'European immigrants to northeastern cities', 'African Americans from the South to northern cities', 'African Americans from the Midwest to eastern cities'],
    correctIndex: 2, errorCategory: 'memorization',
    strategyTip: 'Millions of African Americans moved from the rural South to northern cities seeking jobs and escaping Jim Crow.',
    genAlphaTip: 'African Americans left the South for northern cities to escape Jim Crow and find jobs. Millions of people said "we\'re out." The Great Migration was massive. 🚂',
  },
  {
    id: 'vus12-4', standardId: 'VUS.12', text: 'An emblem from 1903 reading "THE EIGHT HOUR DAY / A LIVING WAGE / To GUARD THE HOME" symbolizes women\'s struggles to —',
    options: ['join the military', 'earn respect as mothers', 'gain rights as workers', 'earn the right to vote'],
    correctIndex: 2, errorCategory: 'stimulus',
    strategyTip: 'The focus on work hours and wages shows this is about labor rights for women workers.',
    genAlphaTip: '8-hour day + living wage = worker rights. This emblem is about women fighting for fair treatment at work. Labor queen energy. 💪👩‍🏭',
  },
  {
    id: 'vus12-5', standardId: 'VUS.12', text: 'What is the correct order: 1) Stock Market Crash, 2) Excessive stock speculation, 3) Increased availability of credit, 4) Failure of banking system?',
    options: ['1, 3, 4, 2', '2, 4, 3, 1', '3, 2, 1, 4', '4, 1, 2, 3'],
    correctIndex: 2, errorCategory: 'sequence',
    strategyTip: 'Easy credit → people speculated on stocks → market crashed → banks failed. Cause and effect chain.',
    genAlphaTip: 'Credit was too easy → everyone gambled on stocks → market crashed → banks failed. It\'s a domino effect of bad decisions. 📉💀',
    timelineData: [
      { year: 1920, label: 'Easy Credit', highlight: true },
      { year: 1928, label: 'Stock Speculation', highlight: true },
      { year: 1929, label: 'Market Crash', highlight: true },
      { year: 1930, label: 'Bank Failures', highlight: true },
    ],
  },

  // ===== VUS.13 — Great Depression & New Deal =====
  {
    id: 'vus13-1', standardId: 'VUS.13', text: 'What was one result of the Federal Reserve\'s failure to prevent the collapse of the banking system?',
    options: ['The money supply contracted', 'Interest rates decreased', 'The stock market recovered', 'Protective tariffs were repealed'],
    correctIndex: 0, errorCategory: 'memorization',
    strategyTip: 'When banks failed, people lost savings and the money supply shrank — making the Depression worse.',
    genAlphaTip: 'Banks failed → money disappeared → economy went into freefall. The Federal Reserve fumbled hard. Massive L. 📉',
  },
  {
    id: 'vus13-2', standardId: 'VUS.13', text: 'Which part of the national government controls the supply of money in the economy?',
    options: ['Congress', 'Treasury Department', 'President', 'Federal Reserve'],
    correctIndex: 3, errorCategory: 'memorization',
    strategyTip: 'The Federal Reserve controls monetary policy — interest rates and money supply.',
    genAlphaTip: 'The Federal Reserve controls the money printer. They decide interest rates and how much money exists. The ultimate economic power. 🏦',
  },
  {
    id: 'vus13-3', standardId: 'VUS.13', text: 'Which New Deal program attempted to protect Americans from bank instability during the Great Depression?',
    options: ['Works Progress Administration', 'Tennessee Valley Authority', 'Federal Deposit Insurance Corporation', 'Agricultural Adjustment Administration'],
    correctIndex: 2, errorCategory: 'memorization',
    strategyTip: 'The FDIC insured bank deposits so people wouldn\'t lose everything if a bank failed.',
    genAlphaTip: 'FDIC = your money is safe even if the bank fails. FDR said "we got you" and insured everyone\'s deposits. Clutch move. 🏦✅',
  },

  // ===== VUS.14 — World War II =====
  {
    id: 'vus14-1', standardId: 'VUS.14', text: 'What event directly caused the United States to enter World War II?',
    options: ['Invasion of Poland', 'Fall of France', 'Attack on Pearl Harbor', 'Battle of Britain'],
    correctIndex: 2, errorCategory: 'memorization',
    strategyTip: 'The US maintained neutrality until Japan attacked Pearl Harbor on December 7, 1941.',
    genAlphaTip: 'Pearl Harbor was the "that\'s it, we\'re fighting" moment. Japan woke up and chose violence, and America said "bet." Dec 7, 1941. Never forget. 💥',
  },
  {
    id: 'vus14-2', standardId: 'VUS.14', text: 'After the start of WWII, the Lend-Lease Act allowed the United States to —',
    options: ['acquire new weapons', 'assist the Allied powers', 'occupy Axis territory', 'reinstate the military draft'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'Lend-Lease let the US supply Britain and allies with weapons and supplies before officially entering the war.',
    genAlphaTip: 'Lend-Lease was America saying "we\'re not fighting YET, but here\'s a bunch of weapons and supplies for free." Support from the sidelines. 📦🔫',
  },
  {
    id: 'vus14-3', standardId: 'VUS.14', text: 'Which factor best completes: "Onset of WWII → [?] → Changing roles for many women"?',
    options: ['Mass migration', 'Labor shortages', 'Resource rationing', 'High birthrates'],
    correctIndex: 1, errorCategory: 'stimulus',
    strategyTip: 'When men went to war, women filled factory jobs — Rosie the Riveter symbolized this shift.',
    genAlphaTip: 'Men went to war → factories needed workers → women stepped up. Rosie the Riveter energy. Women were like "we got this." 💪👩‍🔧',
  },
  {
    id: 'vus14-4', standardId: 'VUS.14', text: 'Order these WWII events: 1) D-Day, 2) Pearl Harbor, 3) Atomic bombs dropped, 4) Battle of Midway.',
    options: ['2, 4, 1, 3', '1, 2, 3, 4', '2, 1, 4, 3', '4, 2, 1, 3'],
    correctIndex: 0, errorCategory: 'sequence',
    strategyTip: 'Pearl Harbor (1941) → Midway (1942) → D-Day (1944) → Atomic bombs (1945).',
    genAlphaTip: 'WWII speedrun: Pearl Harbor (\'41) → Midway (\'42) → D-Day (\'44) → nukes (\'45). Memorize these dates, they\'re free points. 📅💯',
    timelineData: [
      { year: 1941, label: 'Pearl Harbor', highlight: true },
      { year: 1942, label: 'Midway', highlight: true },
      { year: 1944, label: 'D-Day', highlight: true },
      { year: 1945, label: 'Atomic Bombs', highlight: true },
    ],
  },
  {
    id: 'vus14-5', standardId: 'VUS.14', text: 'The United States interned many Japanese Americans during WWII because of —',
    options: ['their refusal to be deported', 'a fear they would aid the enemy', 'a concern over violent protest', 'their refusal to be drafted'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'Executive Order 9066 imprisoned Japanese Americans based on unfounded fears of espionage — a dark chapter in US history.',
    genAlphaTip: 'Japanese Americans got locked up because of paranoia, not evidence. Executive Order 9066 was one of America\'s biggest L\'s. Absolutely wrong. ❌',
  },

  // ===== VUS.15 — Cold War =====
  {
    id: 'vus15-1', standardId: 'VUS.15', text: 'What was the main purpose of the Marshall Plan?',
    options: ['To form a military alliance', 'To rebuild European economies after WWII', 'To contain communism in Asia', 'To establish the United Nations'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'The Marshall Plan (1948) provided billions in aid to rebuild war-torn Europe and prevent the spread of communism.',
    genAlphaTip: 'The Marshall Plan was America\'s "here\'s money to rebuild" move. Help Europe get back on its feet so communism doesn\'t take over. Big brain. 🧠💰',
  },
  {
    id: 'vus15-2', standardId: 'VUS.15', text: 'The policy of containment was designed to —',
    options: ['spread democracy worldwide', 'prevent the spread of communism', 'negotiate peace treaties', 'reduce military spending'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'Containment (Truman Doctrine) aimed to stop communism from spreading beyond where it already existed.',
    genAlphaTip: 'Containment = don\'t let communism spread any further. Like putting a fence around it. America\'s main Cold War strategy. 🧊',
  },
  {
    id: 'vus15-3', standardId: 'VUS.15', text: 'The Cuban Missile Crisis of 1962 was resolved when —',
    options: ['the US invaded Cuba', 'the Soviet Union removed its missiles from Cuba', 'Cuba joined NATO', 'the US declared war on the Soviet Union'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'Kennedy and Khrushchev negotiated: Soviets removed missiles from Cuba, US pledged not to invade Cuba.',
    genAlphaTip: 'JFK and Khrushchev played the scariest game of chicken ever. Soviets blinked first and removed the missiles. World almost ended fr. 😰🚀',
  },
  {
    id: 'vus15-4', standardId: 'VUS.15', text: 'Place these Cold War events in order: 1) Fall of Berlin Wall, 2) Korean War, 3) Cuban Missile Crisis, 4) Vietnam War.',
    options: ['2, 3, 4, 1', '3, 2, 1, 4', '2, 4, 3, 1', '1, 2, 3, 4'],
    correctIndex: 0, errorCategory: 'sequence',
    strategyTip: 'Korean War (1950-53) → Cuban Missile Crisis (1962) → Vietnam War (1964-75) → Berlin Wall falls (1989).',
    genAlphaTip: 'Cold War timeline: Korea (\'50s) → Cuba almost nukes (\'62) → Vietnam (\'60s-70s) → Berlin Wall falls (\'89). The Cold War was a long saga. 🧊📅',
    timelineData: [
      { year: 1950, label: 'Korean War', highlight: true },
      { year: 1962, label: 'Cuban Missile Crisis', highlight: true },
      { year: 1964, label: 'Vietnam War', highlight: true },
      { year: 1989, label: 'Berlin Wall Falls', highlight: true },
    ],
  },
  {
    id: 'vus15-5', standardId: 'VUS.15', text: 'NATO was established primarily to —',
    options: ['promote free trade', 'provide collective security against Soviet aggression', 'rebuild European economies', 'settle colonial disputes'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'NATO (1949) was a military alliance where an attack on one member was an attack on all.',
    genAlphaTip: 'NATO = the ultimate squad. Attack one member, you fight ALL of them. Made to stop the Soviet Union from expanding. Alliance energy. 🤝⚔️',
  },

  // ===== VUS.16 — Civil Rights Movement =====
  {
    id: 'vus16-1', standardId: 'VUS.16', text: 'The Supreme Court decision in Brown v. Board of Education declared that —',
    options: ['separate but equal facilities were constitutional', 'racial segregation in public schools was unconstitutional', 'voting rights could not be denied based on race', 'affirmative action was required'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'Brown v. Board (1954) overturned Plessy v. Ferguson, ruling that "separate but equal" was inherently unequal.',
    genAlphaTip: 'Brown v. Board said "separate is NOT equal" and struck down school segregation. One of the biggest Supreme Court W\'s ever. 🏫⚖️',
  },
  {
    id: 'vus16-2', standardId: 'VUS.16', text: 'Martin Luther King Jr.\'s approach to civil rights was based on the principle of —',
    options: ['armed resistance', 'non-violent protest', 'economic boycotts only', 'legal action exclusively'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'MLK followed Gandhi\'s philosophy of non-violent civil disobedience to achieve social change.',
    genAlphaTip: 'MLK\'s whole thing was non-violence. Peaceful protests, marches, and speeches. He changed the world without throwing a single punch. GOAT energy. 🕊️👑',
  },
  {
    id: 'vus16-3', standardId: 'VUS.16', text: 'The Civil Rights Act of 1964 primarily addressed —',
    options: ['voting rights for women', 'discrimination in public accommodations and employment', 'Native American land claims', 'immigration quotas'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'The Civil Rights Act banned discrimination based on race, color, religion, sex, or national origin in public places and employment.',
    genAlphaTip: 'The Civil Rights Act of 1964 = no more discrimination in jobs, restaurants, hotels, anywhere public. Huge W for equality. 🎉✊',
  },
  {
    id: 'vus16-4', standardId: 'VUS.16', text: '"I have a dream that one day this nation will rise up and live out the true meaning of its creed." This quote is from —',
    options: ['Frederick Douglass', 'Malcolm X', 'Martin Luther King Jr.', 'John F. Kennedy'],
    correctIndex: 2, errorCategory: 'stimulus',
    quote: 'I have a dream that one day this nation will rise up and live out the true meaning of its creed.',
    quoteSource: 'Martin Luther King Jr., March on Washington (1963)',
    strategyTip: 'MLK\'s "I Have a Dream" speech at the March on Washington (1963) is one of the most iconic speeches in American history.',
    genAlphaTip: 'This is MLK\'s legendary "I Have a Dream" speech. March on Washington, 1963. One of the most iconic moments in American history. Goosebumps every time. 🎤✨',
  },
  {
    id: 'vus16-5', standardId: 'VUS.16', text: 'Place these civil rights events in order: 1) Voting Rights Act, 2) Brown v. Board, 3) Montgomery Bus Boycott, 4) March on Washington.',
    options: ['2, 3, 4, 1', '3, 2, 1, 4', '2, 4, 3, 1', '1, 2, 3, 4'],
    correctIndex: 0, errorCategory: 'sequence',
    strategyTip: 'Brown v. Board (1954) → Bus Boycott (1955) → March on Washington (1963) → Voting Rights Act (1965).',
    genAlphaTip: 'Civil rights timeline: Brown v. Board (\'54) → Bus Boycott (\'55) → March on Washington (\'63) → Voting Rights Act (\'65). Each one built on the last. 📅✊',
    timelineData: [
      { year: 1954, label: 'Brown v. Board', highlight: true },
      { year: 1955, label: 'Bus Boycott', highlight: true },
      { year: 1963, label: 'March on Washington', highlight: true },
      { year: 1965, label: 'Voting Rights Act', highlight: true },
    ],
  },

  // ===== VUS.17 — Contemporary America =====
  {
    id: 'vus17-1', standardId: 'VUS.17', text: 'The September 11, 2001 attacks led directly to the —',
    options: ['Gulf War', 'War on Terror', 'Cold War', 'Vietnam War'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: '9/11 prompted the US to launch the War on Terror, including invasions of Afghanistan and Iraq.',
    genAlphaTip: '9/11 changed everything. The War on Terror started right after — Afghanistan, then Iraq. The world literally shifted that day. 🌍',
  },
  {
    id: 'vus17-2', standardId: 'VUS.17', text: 'Which technology has most transformed communication in the 21st century?',
    options: ['Television', 'Radio', 'The Internet', 'Newspapers'],
    correctIndex: 2, errorCategory: 'memorization',
    strategyTip: 'The Internet revolutionized how people communicate, access information, and conduct business.',
    genAlphaTip: 'The Internet changed EVERYTHING. Social media, streaming, online shopping — we literally live online now. The biggest tech shift ever. 📱💻',
  },
  {
    id: 'vus17-3', standardId: 'VUS.17', text: 'Globalization has most significantly affected the US economy by —',
    options: ['reducing international trade', 'increasing economic interdependence with other nations', 'eliminating competition', 'ending immigration'],
    correctIndex: 1, errorCategory: 'memorization',
    strategyTip: 'Globalization connects economies worldwide through trade, investment, and technology.',
    genAlphaTip: 'Globalization = the whole world\'s economies are connected. What happens in China affects America and vice versa. We\'re all linked now. 🌐',
  },
];

// Generate the full question bank with 5 versions per template (VUS.1 excluded)
export const questionBank: Question[] = generateAllVariants(masterQuestions as Question[]);

// Generate additional practice questions for the adaptive feedback loop
export function generatePracticeQuestions(
  failedQuestion: Question,
  allQuestions: Question[]
): Question[] {
  // Find questions with the same error category and similar standard (different templates)
  const relatedQuestions = allQuestions.filter(
    q => q.templateId !== failedQuestion.templateId && q.errorCategory === failedQuestion.errorCategory
  );
  const sameStandard = allQuestions.filter(
    q => q.templateId !== failedQuestion.templateId && q.standardId === failedQuestion.standardId
  );

  const combined = [...new Map(
    [...sameStandard, ...relatedQuestions].map(q => [q.templateId, q])
  ).values()];

  return combined.slice(0, 5);
}

// Get questions for a specific unit using version selection
export function getUnitQuestions(standardId: string): Question[] {
  return questionBank.filter(q => q.standardId === standardId && q.standardId !== 'VUS.1');
}

// Get questions for a Mock SOL (65 questions across VUS.2-VUS.17, one version per template)
export function getMockSOLQuestions(usedVersions: Record<string, number[]> = {}): Question[] {
  const nonUnit1 = questionBank.filter(q => q.standardId !== 'VUS.1');
  const selected = selectVersionsForQuiz(nonUnit1, usedVersions);

  // Balance across standards
  const standardGroups: Record<string, Question[]> = {};
  selected.forEach(q => {
    if (!standardGroups[q.standardId]) standardGroups[q.standardId] = [];
    standardGroups[q.standardId].push(q);
  });

  const result: Question[] = [];
  const standards = Object.keys(standardGroups);
  standards.forEach(sid => {
    result.push(...standardGroups[sid].slice(0, 5));
  });

  const remaining = selected.filter(q => !result.includes(q));
  const needed = Math.min(65, result.length + remaining.length) - result.length;
  result.push(...remaining.slice(0, needed));

  return result.slice(0, 65).sort(() => Math.random() - 0.5);
}

// Get 15 questions for unit mastery (one version per template, preferring unseen)
export function getUnitMasteryQuestions(standardId: string, usedVersions: Record<string, number[]> = {}): Question[] {
  if (standardId === 'VUS.1') return [];
  const unitQs = questionBank.filter(q => q.standardId === standardId);
  const selected = selectVersionsForQuiz(unitQs, usedVersions);

  if (selected.length >= 15) {
    return [...selected].sort(() => Math.random() - 0.5).slice(0, 15);
  }
  // Supplement with related standards
  const related = questionBank.filter(q => q.standardId !== standardId && q.standardId !== 'VUS.1');
  const relatedSelected = selectVersionsForQuiz(related, usedVersions);
  const all = [...selected, ...relatedSelected];
  return all.slice(0, 15);
}
