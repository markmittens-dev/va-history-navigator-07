export interface VocabWord {
  term: string;
  definition: string;
  category: 'government' | 'conflict' | 'economics' | 'global' | 'rights';
}

export const gatekeeperVocabulary: VocabWord[] = [
  // Government
  { term: 'Ratification', definition: 'The official approval of a document, like a constitution or treaty, to make it law.', category: 'government' },
  { term: 'Sovereignty', definition: 'The supreme power of a nation or state to govern itself without outside interference.', category: 'government' },
  { term: 'Unalienable Rights', definition: 'Rights that cannot be taken away, such as life, liberty, and the pursuit of happiness.', category: 'government' },
  { term: 'Legislature', definition: 'The branch of government that makes laws (e.g., Congress, the Virginia General Assembly).', category: 'government' },
  { term: 'Amendment', definition: 'A formal change or addition to a law or constitution.', category: 'government' },
  { term: 'Federalism', definition: 'A system where power is shared between a central (national) government and state governments.', category: 'government' },
  { term: 'Veto', definition: 'The power of the president (or governor) to reject a bill passed by the legislature.', category: 'government' },
  { term: 'Checks and Balances', definition: 'A system where each branch of government can limit the powers of the other branches.', category: 'government' },
  { term: 'Dissent', definition: 'Strong disagreement with an official policy or decision, often expressed publicly.', category: 'government' },
  { term: 'Grievance', definition: 'A formal complaint, especially about unfair treatment — like the colonists\' complaints against the king.', category: 'government' },

  // Conflict
  { term: 'Secede', definition: 'To formally withdraw from a group or organization, like Southern states leaving the Union.', category: 'conflict' },
  { term: 'Confederacy', definition: 'An alliance of states; specifically, the Confederate States of America formed during the Civil War.', category: 'conflict' },
  { term: 'Abolition', definition: 'The movement to end slavery completely.', category: 'conflict' },
  { term: 'Emancipation', definition: 'The act of freeing people from slavery or oppression.', category: 'conflict' },
  { term: 'Cavalier', definition: 'Wealthy English settlers loyal to the king who came to Virginia seeking land.', category: 'conflict' },
  { term: 'Annexation', definition: 'Adding new territory to an existing country, state, or city.', category: 'conflict' },
  { term: 'Reconciliation', definition: 'The process of restoring friendly relations after a conflict.', category: 'conflict' },
  { term: 'Devastation', definition: 'Severe and widespread destruction or damage.', category: 'conflict' },
  { term: 'Compromise', definition: 'An agreement where each side gives up something to settle a dispute.', category: 'conflict' },
  { term: 'Insurrection', definition: 'A violent uprising against a government or authority.', category: 'conflict' },

  // Economics
  { term: 'Laissez-faire', definition: 'An economic policy of minimal government interference in business and trade.', category: 'economics' },
  { term: 'Monopoly', definition: 'When one company controls an entire industry, eliminating competition.', category: 'economics' },
  { term: 'Agrarian', definition: 'Relating to farming and agriculture as the basis of an economy.', category: 'economics' },
  { term: 'Industrialization', definition: 'The shift from a farming economy to one based on factories and manufacturing.', category: 'economics' },
  { term: 'Speculation', definition: 'Risky financial investments made hoping to profit from price changes.', category: 'economics' },
  { term: 'Productivity', definition: 'The rate at which goods are produced, especially per worker.', category: 'economics' },
  { term: 'Tariff', definition: 'A tax on imported goods, used to protect domestic industries.', category: 'economics' },
  { term: 'Philanthropy', definition: 'Using wealth to promote the well-being of others through charitable donations.', category: 'economics' },
  { term: 'Urbanization', definition: 'The growth of cities as people move from rural areas for jobs and opportunities.', category: 'economics' },
  { term: 'Credit', definition: 'Borrowing money with a promise to pay it back later, often with interest.', category: 'economics' },

  // Global
  { term: 'Containment', definition: 'The U.S. Cold War policy of preventing the spread of communism to other countries.', category: 'global' },
  { term: 'Totalitarianism', definition: 'A government system where the state has total control over every aspect of public and private life.', category: 'global' },
  { term: 'Isolationism', definition: 'A policy of avoiding involvement in the affairs of other nations.', category: 'global' },
  { term: 'Normalization', definition: 'The process of restoring normal diplomatic relations between countries.', category: 'global' },
  { term: 'Retaliation', definition: 'An act of revenge or counterattack in response to an enemy\'s action.', category: 'global' },
  { term: 'Diplomatic', definition: 'Relating to managing international relations through negotiation rather than force.', category: 'global' },
  { term: 'Infiltration', definition: 'Secretly entering or gaining access to an organization or territory.', category: 'global' },
  { term: 'Alliance', definition: 'A formal agreement between nations to support each other, especially in war.', category: 'global' },
  { term: 'Aggression', definition: 'Hostile or violent action by one country against another.', category: 'global' },
  { term: 'Coalition', definition: 'A temporary alliance of groups or countries for a shared purpose.', category: 'global' },

  // Rights
  { term: 'Disenfranchisement', definition: 'Taking away a person\'s right to vote through laws, literacy tests, or poll taxes.', category: 'rights' },
  { term: 'Desegregation', definition: 'Ending the separation of people based on race in schools, public places, etc.', category: 'rights' },
  { term: 'Litigation', definition: 'The process of taking legal action through the court system.', category: 'rights' },
  { term: 'Non-violence', definition: 'A strategy of achieving change through peaceful protests, not physical force.', category: 'rights' },
  { term: 'Prejudice', definition: 'An unfair negative opinion about a group of people based on race, religion, etc.', category: 'rights' },
  { term: 'Integration', definition: 'Bringing people of different races together in schools, workplaces, and communities.', category: 'rights' },
  { term: 'Suffrage', definition: 'The right to vote in political elections.', category: 'rights' },
  { term: 'Toleration', definition: 'Allowing people to hold different opinions or beliefs without persecution.', category: 'rights' },
  { term: 'Migration', definition: 'The movement of people from one place to another, often for better opportunities.', category: 'rights' },
  { term: 'Muckraker', definition: 'Journalists who exposed corruption, unsafe conditions, and social problems in the early 1900s.', category: 'rights' },
];

// Build a quick lookup set of lowercase terms for text scanning
export const vocabTermSet = new Set(gatekeeperVocabulary.map(v => v.term.toLowerCase()));

export function getVocabDefinition(term: string): string | undefined {
  const found = gatekeeperVocabulary.find(v => v.term.toLowerCase() === term.toLowerCase());
  return found?.definition;
}
