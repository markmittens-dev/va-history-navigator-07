import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft, LogOut, Lightbulb, Volume2, VolumeX, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppState } from '@/context/AppContext';
import { questionBank, generatePracticeQuestions, getMockSOLQuestions, getUnitMasteryQuestions } from '@/data/questions';
import { solStandards } from '@/data/standards';
import { Question, ErrorCategory, VERSION_FORMAT_LABELS } from '@/types/sol';
import { useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import Timeline from '@/components/Timeline';
import VocabHighlighter from '@/components/VocabHighlighter';
import NewspaperClipping from '@/components/NewspaperClipping';
import QuoteAttribution from '@/components/QuoteAttribution';
import ImageDescription from '@/components/ImageDescription';
import DiagramBox from '@/components/DiagramBox';
import { useSpeech } from '@/hooks/useSpeech';

const errorCategoryLabels: Record<ErrorCategory, string> = {
  memorization: 'Memorization',
  sequence: 'Sequence',
  stimulus: 'Stimulus Analysis',
};

/* ───────── Speaker Button ───────── */
const SpeakButton = ({ text, speak, stop, isSpeaking, small = false }: {
  text: string; speak: (t: string) => void; stop: () => void; isSpeaking: boolean; small?: boolean;
}) => (
  <button
    onClick={(e) => { e.stopPropagation(); isSpeaking ? stop() : speak(text); }}
    className={`inline-flex items-center justify-center rounded-full text-primary hover:text-accent transition-colors ${small ? 'h-7 w-7' : 'h-9 w-9'}`}
    title={isSpeaking ? 'Stop reading' : 'Read aloud'}
  >
    {isSpeaking ? <VolumeX className={small ? 'h-3.5 w-3.5' : 'h-4 w-4'} /> : <Volume2 className={small ? 'h-3.5 w-3.5' : 'h-4 w-4'} />}
  </button>
);

/* ───────── Assessment Page ───────── */
const AssessmentPage = () => {
  const { session, recordAnswer, logout, nickname, getStandardPerformance, incrementHints, trackVersionUsed } = useAppState();
  const navigate = useNavigate();
  const { speak, stop, isSpeaking, autoRead, setAutoRead } = useSpeech();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [feedbackMode, setFeedbackMode] = useState(false);
  const [feedbackQuestions, setFeedbackQuestions] = useState<Question[]>([]);
  const [feedbackIndex, setFeedbackIndex] = useState(0);
  const [showStrategy, setShowStrategy] = useState(false);
  const [history, setHistory] = useState<number[]>([]);
  const [showSettings, setShowSettings] = useState(false);

  const questions = useMemo(() => {
    if (!session) return [];
    const retake = session.retakeNumber;
    if (session.quizMode === 'mock-sol') return getMockSOLQuestions(session.usedTemplateVersions, retake);
    if (session.quizMode === 'unit-mastery' && session.selectedUnit) return getUnitMasteryQuestions(session.selectedUnit, session.usedTemplateVersions, retake);
    return [];
  }, [session?.quizMode, session?.selectedUnit, session?.retakeNumber]);

  const isGenAlpha = session?.coachPersonality === 'gen-alpha';
  const activeQuestions = feedbackMode ? feedbackQuestions : questions;
  const activeIndex = feedbackMode ? feedbackIndex : currentIndex;
  const currentQuestion = activeQuestions[activeIndex];

  useEffect(() => {
    if (currentQuestion) {
      trackVersionUsed(currentQuestion.templateId, currentQuestion.version);
    }
  }, [currentQuestion?.id]);

  // Auto-read questions
  useEffect(() => {
    if (autoRead && currentQuestion && !showResult) {
      const fullText = [currentQuestion.imageDescription, currentQuestion.text].filter(Boolean).join('. ');
      speak(fullText);
    }
  }, [currentQuestion?.id, autoRead]);

  if (!session) { navigate('/'); return null; }

  if (!currentQuestion) {
    return <ResultsScreen session={session} nickname={nickname} isGenAlpha={isGenAlpha} getStandardPerformance={getStandardPerformance} onDone={() => { logout(); navigate('/'); }} />;
  }

  const handleSelect = (index: number) => { if (!showResult) setSelectedOption(index); };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    stop();
    const correct = selectedOption === currentQuestion.correctIndex;
    recordAnswer({ questionId: currentQuestion.id, standardId: currentQuestion.standardId, selectedIndex: selectedOption, correct, errorCategory: currentQuestion.errorCategory, timestamp: Date.now(), xpEarned: 0 });
    setShowResult(true);
    if (!correct) {
      setShowStrategy(true);
      incrementHints();
    }
  };

  const handleNext = () => {
    stop();
    const wasCorrect = selectedOption === currentQuestion.correctIndex;
    if (!wasCorrect && !feedbackMode) {
      const practice = generatePracticeQuestions(currentQuestion, questionBank);
      if (practice.length > 0) {
        setHistory(prev => [...prev, currentIndex]);
        setFeedbackQuestions(practice);
        setFeedbackIndex(0);
        setFeedbackMode(true);
        setSelectedOption(null);
        setShowResult(false);
        setShowStrategy(false);
        return;
      }
    }
    if (feedbackMode) {
      if (feedbackIndex < feedbackQuestions.length - 1) setFeedbackIndex(prev => prev + 1);
      else { setFeedbackMode(false); setCurrentIndex(prev => prev + 1); }
    } else {
      setHistory(prev => [...prev, currentIndex]);
      setCurrentIndex(prev => prev + 1);
    }
    setSelectedOption(null);
    setShowResult(false);
    setShowStrategy(false);
  };

  const handleBack = () => {
    stop();
    if (feedbackMode) {
      if (feedbackIndex > 0) setFeedbackIndex(prev => prev - 1);
      else setFeedbackMode(false);
    } else if (history.length > 0) {
      const prevIndex = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      setCurrentIndex(prevIndex);
    }
    setSelectedOption(null);
    setShowResult(false);
    setShowStrategy(false);
  };

  const canGoBack = feedbackMode ? feedbackIndex > 0 : history.length > 0;
  const progressPct = feedbackMode
    ? Math.round(((feedbackIndex + 1) / feedbackQuestions.length) * 100)
    : Math.round(((currentIndex + 1) / questions.length) * 100);

  const tipText = isGenAlpha ? currentQuestion.genAlphaTip : currentQuestion.strategyTip;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header — clean, no XP */}
      <header className="sticky top-0 z-10 border-b border-border bg-card px-4 py-3">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <div className="flex items-center gap-3">
            {canGoBack && (
              <button onClick={handleBack} className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <div>
              <p className="text-sm font-medium text-foreground">
                {feedbackMode ? 'Practice Mode' : `Question ${currentIndex + 1} of ${questions.length}`}
              </p>
              <Progress value={progressPct} className="mt-1.5 h-2 w-40" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowSettings(!showSettings)} className="rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <Settings className="h-4 w-4" />
            </button>
            <span className="text-xs font-medium text-muted-foreground">{nickname}</span>
            <button onClick={() => { stop(); logout(); navigate('/'); }} className="text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Settings dropdown */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mx-auto max-w-lg mt-3 pt-3 border-t border-border">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-foreground">Auto-read questions</span>
                  <button
                    onClick={() => setAutoRead(!autoRead)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${autoRead ? 'bg-primary' : 'bg-muted'}`}
                  >
                    <span className={`inline-block h-4 w-4 rounded-full bg-card transition-transform ${autoRead ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </label>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6">
        <div className="mx-auto max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div key={currentQuestion.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
              {/* Question card */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                {/* Tags */}
                <div className="mb-4 flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{currentQuestion.standardId}</span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">{errorCategoryLabels[currentQuestion.errorCategory]}</span>
                </div>

                {/* Stimuli */}
                {currentQuestion.headline && <NewspaperClipping headline={currentQuestion.headline} />}
                {currentQuestion.quote && currentQuestion.quoteSource && (
                  <QuoteAttribution quote={currentQuestion.quote} source={currentQuestion.quoteSource} />
                )}
                {currentQuestion.imageDescription && (
                  <ImageDescription description={currentQuestion.imageDescription} />
                )}
                {currentQuestion.diagramData && (
                  <DiagramBox data={currentQuestion.diagramData} />
                )}

                {/* Question text with speaker */}
                <div className="flex items-start gap-2">
                  <h2 className="flex-1 text-lg font-semibold text-foreground leading-relaxed">
                    <VocabHighlighter text={currentQuestion.text} />
                  </h2>
                  <SpeakButton
                    text={[currentQuestion.imageDescription, currentQuestion.text].filter(Boolean).join('. ')}
                    speak={speak} stop={stop} isSpeaking={isSpeaking}
                  />
                </div>

                {/* Timeline */}
                {currentQuestion.timelineData && currentQuestion.versionFormat === 'timeline' && (
                  <div className="mt-4">
                    <Timeline events={currentQuestion.timelineData} />
                  </div>
                )}
              </div>

              {/* Answer choices */}
              <div className="mt-4 space-y-3">
                {currentQuestion.options.map((option, i) => {
                  let optionStyle = 'bg-card border-border hover:border-primary/40';
                  if (showResult) {
                    if (i === currentQuestion.correctIndex) optionStyle = 'bg-success/10 border-success';
                    else if (i === selectedOption) optionStyle = 'bg-destructive/10 border-destructive';
                  } else if (i === selectedOption) {
                    optionStyle = 'bg-accent/15 border-accent';
                  }
                  return (
                    <button key={i} onClick={() => handleSelect(i)} className={`w-full rounded-xl border-2 p-4 text-left transition-all ${optionStyle}`}>
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold text-muted-foreground">{String.fromCharCode(65 + i)}</span>
                        <span className="flex-1 text-base font-medium text-foreground leading-snug"><VocabHighlighter text={option} /></span>
                        <SpeakButton text={option} speak={speak} stop={stop} isSpeaking={isSpeaking} small />
                        {showResult && i === currentQuestion.correctIndex && <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />}
                        {showResult && i === selectedOption && i !== currentQuestion.correctIndex && <XCircle className="h-5 w-5 shrink-0 text-destructive" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Strategy tip */}
              {showStrategy && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-xl border border-accent bg-accent/10 p-4">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-accent-foreground" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{isGenAlpha ? 'Coach Says' : 'Strategy Tip'}</p>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{tipText}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom action bar */}
      <div className="sticky bottom-0 border-t border-border bg-card px-4 py-4">
        <div className="mx-auto max-w-lg">
          {!showResult ? (
            <Button onClick={handleSubmit} disabled={selectedOption === null} className="w-full h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-base font-semibold disabled:opacity-40">
              Check Answer
            </Button>
          ) : (
            <Button onClick={handleNext} className="w-full h-12 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 text-base font-semibold gap-2">
              {feedbackMode && feedbackIndex < feedbackQuestions.length - 1 ? 'Next Practice' : 'Continue'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

/* ───────── Results Screen ───────── */
function ResultsScreen({ session, nickname, isGenAlpha, getStandardPerformance, onDone }: {
  session: NonNullable<ReturnType<typeof import('@/context/AppContext').useAppState>['session']>;
  nickname: string; isGenAlpha: boolean;
  getStandardPerformance: (id: string) => import('@/types/sol').StandardPerformance;
  onDone: () => void;
}) {
  const totalQ = session.answers.length;
  const correctQ = session.answers.filter(a => a.correct).length;
  const pct = totalQ > 0 ? Math.round((correctQ / totalQ) * 100) : 0;
  const passed = pct >= 70;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm text-center">
        <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${passed ? 'bg-success/15' : 'bg-destructive/15'}`}>
          {passed ? <CheckCircle2 className="h-10 w-10 text-success" /> : <XCircle className="h-10 w-10 text-destructive" />}
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          {passed ? 'Well done!' : 'Keep practicing.'}
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">
          {correctQ} of {totalQ} correct · {pct}%
        </p>
        {session.quizMode === 'mock-sol' && (
          <p className={`mt-1 text-sm font-bold ${passed ? 'text-success' : 'text-destructive'}`}>
            {passed ? 'PASS' : 'DID NOT PASS'}
          </p>
        )}
        <div className="mt-6 space-y-2">
          {solStandards.filter(s => s.id !== 'VUS.1' && session.answers.some(a => a.standardId === s.id)).map(std => {
            const perf = getStandardPerformance(std.id);
            const p = perf.total > 0 ? Math.round((perf.correct / perf.total) * 100) : 0;
            return (
              <div key={std.id} className="rounded-xl bg-card border border-border p-3 text-left">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{std.id}</span>
                  <span className={p >= 70 ? 'text-success font-bold' : 'text-destructive font-bold'}>{p}%</span>
                </div>
                <Progress value={p} className="mt-1.5 h-2" />
              </div>
            );
          })}
        </div>
        <Button onClick={onDone} className="mt-6 w-full h-12 rounded-xl bg-primary text-primary-foreground text-base font-semibold">Done</Button>
      </motion.div>
    </div>
  );
}

export default AssessmentPage;
