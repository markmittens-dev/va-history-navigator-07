export interface VocabWord {
  term: string;
  definition: string;
  genZDefinition?: string;
  category: 'government' | 'conflict' | 'economics' | 'global' | 'rights' | 'academic' | 'wwii';
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
  { term: 'Popular sovereignty', definition: 'The idea that the government gets its power from the people.', category: 'government' },
  { term: 'Republic', definition: 'A form of government where citizens elect representatives to make laws for them.', category: 'government' },
  { term: 'Constitution', definition: 'The written plan of government that explains the rules and structure of a country.', category: 'government' },
  { term: 'Unconstitutional', definition: 'Something that goes against the rules of the Constitution.', category: 'government' },
  { term: 'Judicial review', definition: 'The power of the courts to decide if a law follows the Constitution or not.', category: 'government' },
  { term: 'Executive order', definition: 'A rule or command given by the president that has the force of law.', category: 'government' },

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
  { term: 'Manifest Destiny', definition: 'The belief that the United States was meant to expand across the entire continent.', category: 'conflict' },
  { term: 'Reconstruction', definition: 'The period after the Civil War when the South was rebuilt and brought back into the Union.', category: 'conflict' },
  { term: 'Secession', definition: 'The act of a state officially leaving the United States.', category: 'conflict' },

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
  { term: 'Rationing', definition: 'Limiting how much food, gas, or supplies people can buy so there is enough for everyone.', category: 'economics' },

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
  { term: 'Imperialism', definition: 'When a powerful country takes control of weaker countries for resources or power.', category: 'global' },
  { term: 'Communism', definition: 'A political system where the government owns everything and there is no private property.', category: 'global' },
  { term: 'Democracy', definition: 'A system of government where citizens vote to choose their leaders and make decisions.', category: 'global' },
  { term: 'Neutrality', definition: 'Not taking sides in a war or conflict between other countries.', category: 'global' },
  { term: 'Superpower', definition: 'An extremely powerful country with global influence, like the US or Soviet Union during the Cold War.', category: 'global' },

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
  { term: 'Segregation', definition: 'Separating people by race in schools, restaurants, buses, and other public places.', category: 'rights' },
  { term: 'Civil rights', definition: 'The rights of every citizen to be treated equally and fairly under the law.', category: 'rights' },
  { term: 'Discrimination', definition: 'Treating someone unfairly because of their race, gender, religion, or background.', category: 'rights' },

  // WWII-specific terms
  { term: 'Genocide', definition: 'The deliberate killing of a large group of people because of their race or nationality.', category: 'wwii' },
  { term: 'Holocaust', definition: 'The systematic murder of 6 million Jews by Nazi Germany during World War II.', category: 'wwii' },
  { term: 'Internment', definition: 'Forcing a group of people to live in guarded camps, usually during wartime.', category: 'wwii' },
  { term: 'Dictator', definition: 'A ruler who has total power over a country and does not allow opposition.', category: 'wwii' },
  { term: 'Propaganda', definition: 'Information or media used to influence people\'s opinions, often misleading or one-sided.', category: 'wwii' },
  { term: 'Mobilization', definition: 'Getting a country\'s military, economy, and people ready for war.', category: 'wwii' },
  { term: 'Arsenal', definition: 'A place where weapons and military equipment are stored, or a large collection of weapons.', category: 'wwii' },
  { term: 'Unconditional surrender', definition: 'Giving up completely without any conditions or demands — total defeat.', category: 'wwii' },
  { term: 'Allies', definition: 'The group of countries that fought together against Germany, Italy, and Japan in WWII (US, Britain, Soviet Union, France).', category: 'wwii' },
  { term: 'Axis powers', definition: 'The group of countries led by Germany, Italy, and Japan that fought against the Allies in WWII.', category: 'wwii' },
  { term: 'Blitzkrieg', definition: 'A fast, overwhelming military attack using planes and tanks together — "lightning war" in German.', category: 'wwii' },
  { term: 'Occupation', definition: 'When a foreign military takes control of a country or territory.', category: 'wwii' },
  { term: 'Liberation', definition: 'Freeing a country or people from enemy control or oppression.', category: 'wwii' },
  { term: 'Appeasement', definition: 'Giving in to a bully\'s demands to avoid conflict — like when Britain let Hitler take land to prevent war.', category: 'wwii' },
  { term: 'Theater', definition: 'In military terms, a large area where a war is being fought (like the Pacific Theater or European Theater).', category: 'wwii' },
  { term: 'Concentration camp', definition: 'A prison camp where the Nazis held and killed Jews and other persecuted groups.', category: 'wwii' },
  { term: 'Atrocity', definition: 'An extremely cruel and violent act, especially during a war.', category: 'wwii' },
  { term: 'Casualties', definition: 'People who are killed, wounded, or missing during a war or disaster.', category: 'wwii' },
  { term: 'Offensive', definition: 'A large-scale military attack meant to push the enemy back.', category: 'wwii' },
  { term: 'Counterattack', definition: 'An attack made in response to an enemy\'s attack — fighting back.', category: 'wwii' },

  // Academic / general terms ELL students may struggle with
  { term: 'Characterized', definition: 'Described by certain qualities or features — what makes something what it is.', category: 'academic' },
  { term: 'Significant', definition: 'Important or meaningful — it mattered and made a difference.', category: 'academic' },
  { term: 'Provision', definition: 'A specific rule or condition that is part of a law or agreement.', category: 'academic' },
  { term: 'Established', definition: 'Set up or created something officially, like a law, organization, or colony.', category: 'academic' },
  { term: 'Prohibited', definition: 'Not allowed — officially banned or forbidden by law.', category: 'academic' },
  { term: 'Authorized', definition: 'Officially approved or given permission to do something.', category: 'academic' },
  { term: 'Primarily', definition: 'Mainly or mostly — the most important reason.', category: 'academic' },
  { term: 'Precedent', definition: 'An earlier event or action that is used as an example for the future.', category: 'academic' },
  { term: 'Subjugation', definition: 'Bringing a group of people under control by force — domination.', category: 'academic' },
  { term: 'Legislation', definition: 'Laws that have been officially written and passed by a government.', category: 'academic' },
  { term: 'Prosperity', definition: 'A time of wealth, success, and good economic conditions.', category: 'academic' },
  { term: 'Systematic', definition: 'Done in an organized, planned way — step by step, not random.', category: 'academic' },
  { term: 'Persecution', definition: 'Treating a group of people cruelly or unfairly, especially because of their beliefs or identity.', category: 'academic' },
  { term: 'Accountable', definition: 'Responsible for your actions — you can be blamed or punished if you do something wrong.', category: 'academic' },
  { term: 'Emaciated', definition: 'Extremely thin and weak from lack of food — starving.', category: 'academic' },
  { term: 'Engulfed', definition: 'Completely surrounded or covered by something, like fire or water.', category: 'academic' },
  { term: 'Fortified', definition: 'Made stronger or more protected, usually with walls, fences, or defenses.', category: 'academic' },
  { term: 'Suppress', definition: 'To stop something by force — like silencing protests or opposition.', category: 'academic' },
  { term: 'Entangle', definition: 'To get involved in something complicated that is hard to escape from.', category: 'academic' },
  { term: 'Convoy', definition: 'A group of ships or vehicles traveling together for protection.', category: 'academic' },
  { term: 'Tuition', definition: 'The money you pay to attend a school, college, or university.', category: 'academic' },
  { term: 'Veteran', definition: 'A person who has served in the military, especially during a war.', category: 'academic' },
];

// Build a quick lookup set of lowercase terms for text scanning
export const vocabTermSet = new Set(gatekeeperVocabulary.map(v => v.term.toLowerCase()));

export function getVocabDefinition(term: string): string | undefined {
  const found = gatekeeperVocabulary.find(v => v.term.toLowerCase() === term.toLowerCase());
  return found?.definition;
}
