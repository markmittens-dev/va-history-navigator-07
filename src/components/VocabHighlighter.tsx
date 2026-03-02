import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gatekeeperVocabulary } from '@/data/vocabulary';
import { useAppState } from '@/context/AppContext';

interface VocabHighlighterProps {
  text: string;
}

// Build regex that matches any gatekeeper term (case-insensitive, whole-word)
const termPattern = gatekeeperVocabulary
  .map(v => v.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  .sort((a, b) => b.length - a.length) // longest first
  .join('|');
const vocabRegex = new RegExp(`\\b(${termPattern})\\b`, 'gi');

const VocabHighlighter = ({ text }: VocabHighlighterProps) => {
  const [activeTerm, setActiveTerm] = useState<string | null>(null);
  const [activeDefinition, setActiveDefinition] = useState<string>('');
  const { logVocabClick } = useAppState();

  const handleClick = useCallback((term: string) => {
    const found = gatekeeperVocabulary.find(v => v.term.toLowerCase() === term.toLowerCase());
    if (!found) return;
    logVocabClick(found.term);
    if (activeTerm === found.term) {
      setActiveTerm(null);
    } else {
      setActiveTerm(found.term);
      setActiveDefinition(found.definition);
    }
  }, [activeTerm, logVocabClick]);

  // Split text by vocab terms, preserving matched terms
  const parts: { text: string; isVocab: boolean }[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const regex = new RegExp(vocabRegex.source, 'gi');
  
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, match.index), isVocab: false });
    }
    parts.push({ text: match[0], isVocab: true });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), isVocab: false });
  }

  if (parts.length === 0) {
    return <span>{text}</span>;
  }

  return (
    <span className="relative">
      {parts.map((part, i) =>
        part.isVocab ? (
          <button
            key={i}
            onClick={() => handleClick(part.text)}
            className="underline decoration-accent decoration-2 underline-offset-2 font-semibold text-foreground hover:text-accent transition-colors cursor-pointer"
          >
            {part.text}
          </button>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
      <AnimatePresence>
        {activeTerm && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute left-0 right-0 top-full mt-2 z-20 rounded-xl border-2 border-accent bg-card p-3 shadow-lg"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-bold text-accent">{activeTerm}</p>
                <p className="mt-1 text-sm text-muted-foreground leading-snug">{activeDefinition}</p>
              </div>
              <button onClick={() => setActiveTerm(null)} className="text-muted-foreground hover:text-foreground text-xs shrink-0">✕</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default VocabHighlighter;
