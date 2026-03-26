import { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { gatekeeperVocabulary } from '@/data/vocabulary';
import { useAppState } from '@/context/AppContext';
import { X } from 'lucide-react';

interface VocabHighlighterProps {
  text: string;
}

// Build regex that matches any gatekeeper term (case-insensitive, whole-word)
const termPattern = gatekeeperVocabulary
  .map(v => v.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  .sort((a, b) => b.length - a.length)
  .join('|');
const vocabRegex = new RegExp(`\\b(${termPattern})\\b`, 'gi');

const VocabHighlighter = ({ text }: VocabHighlighterProps) => {
  const [activeTerm, setActiveTerm] = useState<string | null>(null);
  const [activeDefinition, setActiveDefinition] = useState<string>('');
  const [genZMode, setGenZMode] = useState(false);
  const { logVocabClick } = useAppState();
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!activeTerm) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveTerm(null);
        setGenZMode(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [activeTerm]);

  const handleClick = useCallback((term: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const found = gatekeeperVocabulary.find(v => v.term.toLowerCase() === term.toLowerCase());
    if (!found) return;
    logVocabClick(found.term);
    if (activeTerm === found.term) {
      setActiveTerm(null);
      setGenZMode(false);
    } else {
      setActiveTerm(found.term);
      setActiveDefinition(found.definition);
      setGenZMode(false);
    }
  }, [activeTerm, logVocabClick]);

  // Split text by vocab terms
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

  if (parts.length === 0) return <span>{text}</span>;

  const genZDefinition = activeTerm
    ? gatekeeperVocabulary.find(v => v.term === activeTerm)?.genZDefinition || activeDefinition
    : '';

  return (
    <span className="relative" ref={containerRef}>
      {parts.map((part, i) =>
        part.isVocab ? (
          <button
            key={i}
            onClick={(e) => handleClick(part.text, e)}
            className="underline decoration-dotted decoration-accent decoration-2 underline-offset-4 font-semibold text-foreground hover:text-accent transition-colors cursor-pointer"
          >
            {part.text}
          </button>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}

      {/* Bottom slide-up panel */}
      <AnimatePresence>
        {activeTerm && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-foreground/20"
              onClick={() => { setActiveTerm(null); setGenZMode(false); }}
            />
            {/* Bottom panel */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl border-t border-border bg-card p-5 pb-8 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto max-w-lg">
                {/* Handle */}
                <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-muted" />

                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-primary uppercase tracking-wide">{activeTerm}</p>
                    <p className="mt-2 text-base text-foreground leading-relaxed">
                      {genZMode ? genZDefinition : activeDefinition}
                    </p>
                  </div>
                  <button
                    onClick={() => { setActiveTerm(null); setGenZMode(false); }}
                    className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Toggle */}
                <button
                  onClick={() => setGenZMode(!genZMode)}
                  className="mt-4 w-full rounded-lg border border-border bg-muted/50 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  {genZMode ? '📚 Show standard definition' : '💬 Explain it differently'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </span>
  );
};

export default VocabHighlighter;
