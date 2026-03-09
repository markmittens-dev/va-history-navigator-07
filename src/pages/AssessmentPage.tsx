import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft, LogOut, Lightbulb, BarChart3, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppState } from '@/context/AppContext';
import { questionBank, generatePracticeQuestions, getMockSOLQuestions, getUnitMasteryQuestions } from '@/data/questions';
import { solStandards } from '@/data/standards';
import { Question, ErrorCategory, VERSION_XP, VERSION_FORMAT_LABELS } from '@/types/sol';
import { useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import Timeline from '@/components/Timeline';
import VocabHighlighter from '@/components/VocabHighlighter';
import NewspaperClipping from '@/components/NewspaperClipping';
import QuoteAttribution from '@/components/QuoteAttribution';
import ImageDescription from '@/components/ImageDescription';
import DiagramBox from '@/components/DiagramBox';

const errorCategoryLabels: Record<ErrorCategory, string> = {
  memorization: '📝 Memorization',
  sequence: '🔢 Sequence',
  stimulus: '🖼️ Stimulus Analysis',
};

const AssessmentPage = () => {
  const { session, recordAnswer, logout, nickname, getStandardPerformance, incrementHints, trackVersionUsed } = useAppState();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [feedbackMode, setFeedbackMode] = useState(false);
  const [feedbackQuestions, setFeedbackQuestions] = useState<Question[]>([]);
  const [feedbackIndex, setFeedbackIndex] = useState(0);
  const [showStrategy, setShowStrategy] = useState(false);
  const [history, setHistory] = useState<number[]>([]);
  const [earnedXP, setEarnedXP] = useState(0);

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

  if (!session) { navigate('/'); return null; }

  if (!currentQuestion) {
    return <ResultsScreen session={session} nickname={nickname} isGenAlpha={isGenAlpha} getStandardPerformance={getStandardPerformance} onDone={() => { logout(); navigate('/'); }} />;
  }

  const handleSelect = (index: number) => { if (!showResult) setSelectedOption(index); };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    const correct = selectedOption === currentQuestion.correctIndex;
    const xp = correct ? VERSION_XP[currentQuestion.versionFormat] : 0;
    recordAnswer({ questionId: currentQuestion.id, standardId: currentQuestion.standardId, selectedIndex: selectedOption, correct, errorCategory: currentQuestion.errorCategory, timestamp: Date.now(), xpEarned: xp });
    setShowResult(true);
    if (correct) setEarnedXP(xp);
    else { setEarnedXP(0); }
    if (!correct) {
      setShowStrategy(true);
      incrementHints();
    }
  };

  const handleNext = () => {
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
      if (feedbackIndex < feedbackQuestions.length - 1) {
        setFeedbackIndex(prev => prev + 1);
      } else {
        setFeedbackMode(false);
        setCurrentIndex(prev => prev + 1);
      }
    } else {
      setHistory(prev => [...prev, currentIndex]);
      setCurrentIndex(prev => prev + 1);
    }
    setSelectedOption(null);
    setShowResult(false);
    setShowStrategy(false);
    setEarnedXP(0);
  };

  const handleBack = () => {
    if (feedbackMode) {
      if (feedbackIndex > 0) setFeedbackIndex(prev => prev - 1);
      else { setFeedbackMode(false); }
    } else if (history.length > 0) {
      const prevIndex = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      setCurrentIndex(prevIndex);
    }
    setSelectedOption(null);
    setShowResult(false);
    setShowStrategy(false);
    setEarnedXP(0);
  };

  const canGoBack = feedbackMode ? feedbackIndex > 0 : history.length > 0;
  const progressPct = feedbackMode
    ? Math.round(((feedbackIndex + 1) / feedbackQuestions.length) * 100)
    : Math.round(((currentIndex + 1) / questions.length) * 100);

  const tipText = isGenAlpha ? currentQuestion.genAlphaTip : currentQuestion.strategyTip;
  const formatLabel = VERSION_FORMAT_LABELS[currentQuestion.versionFormat];
  const xpValue = VERSION_XP[currentQuestion.versionFormat];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur-sm px-4 py-3">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <div className="flex items-center gap-3">
            {canGoBack && (
              <button onClick={handleBack} className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <div>
              <p className="text-xs text-muted-foreground">
                {feedbackMode ? '🔄 Practice Mode' : `Q ${currentIndex + 1}/${questions.length}`}
                <span className="ml-1.5 text-primary font-medium">V{currentQuestion.version}</span>
                <span className="ml-1 opacity-60">· {formatLabel}</span>
                {isGenAlpha && ' 🔥'}
              </p>
              <Progress value={progressPct} className="mt-1 h-1.5 w-32" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full bg-accent/20 px-2 py-0.5">
              <Zap className="h-3 w-3 text-accent-foreground" />
              <span className="text-[10px] font-bold text-accent-foreground">{xpValue} XP</span>
            </div>
            <span className="text-xs text-muted-foreground">{nickname}</span>
            <button onClick={() => { logout(); navigate('/'); }} className="text-muted-foreground hover:text-foreground">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-6">
        <div className="mx-auto max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div key={currentQuestion.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
              <div className="mb-4 flex items-center gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{currentQuestion.standardId}</span>
                <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">{errorCategoryLabels[currentQuestion.errorCategory]}</span>
              </div>

              {/* V2: Newspaper clipping for headlines */}
              {currentQuestion.headline && <NewspaperClipping headline={currentQuestion.headline} />}
              
              {/* V2: Quote attribution */}
              {currentQuestion.quote && currentQuestion.quoteSource && (
                <QuoteAttribution quote={currentQuestion.quote} source={currentQuestion.quoteSource} />
              )}

              {/* V3: Visual stimulus (described image) */}
              {currentQuestion.imageDescription && (
                <ImageDescription description={currentQuestion.imageDescription} />
              )}

              {/* V4: Diagram / Data */}
              {currentQuestion.diagramData && (
                <DiagramBox data={currentQuestion.diagramData} />
              )}

              <h2 className="font-display text-lg font-semibold text-foreground leading-snug mb-5">
                <VocabHighlighter text={currentQuestion.text} />
              </h2>

              {/* V5: Timeline (shown after answer for sequence questions) */}
              {currentQuestion.timelineData && currentQuestion.versionFormat === 'timeline' && (
                <Timeline events={currentQuestion.timelineData} />
              )}

              <div className="space-y-2.5">
                {currentQuestion.options.map((option, i) => {
                  let optionStyle = 'bg-card border-border hover:border-primary/40';
                  if (showResult) {
                    if (i === currentQuestion.correctIndex) optionStyle = 'bg-secondary/10 border-secondary text-foreground';
                    else if (i === selectedOption && i !== currentQuestion.correctIndex) optionStyle = 'bg-destructive/10 border-destructive text-foreground';
                  } else if (i === selectedOption) {
                    optionStyle = 'bg-primary/10 border-primary text-foreground';
                  }
                  return (
                    <button key={i} onClick={() => handleSelect(i)} className={`w-full rounded-xl border-2 p-4 text-left text-sm font-medium transition-all ${optionStyle}`}>
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">{String.fromCharCode(65 + i)}</span>
                        <span><VocabHighlighter text={option} /></span>
                        {showResult && i === currentQuestion.correctIndex && <CheckCircle2 className="ml-auto h-5 w-5 shrink-0 text-secondary" />}
                        {showResult && i === selectedOption && i !== currentQuestion.correctIndex && <XCircle className="ml-auto h-5 w-5 shrink-0 text-destructive" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* XP earned animation */}
              {showResult && earnedXP > 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-3 flex items-center justify-center gap-1">
                  <Zap className="h-4 w-4 text-accent-foreground" />
                  <span className="text-sm font-bold text-accent-foreground">+{earnedXP} XP</span>
                </motion.div>
              )}

              {showStrategy && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-xl border-2 border-accent bg-accent/10 p-4">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-accent-foreground" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{isGenAlpha ? 'Coach Says 🎤' : 'Pattern Tip'}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{tipText}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <div className="sticky bottom-0 border-t border-border bg-card/80 backdrop-blur-sm px-4 py-4">
        <div className="mx-auto max-w-lg">
          {!showResult ? (
            <Button onClick={handleSubmit} disabled={selectedOption === null} className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40">
              {isGenAlpha ? 'Lock It In 🔒' : 'Check Answer'}
            </Button>
          ) : (
            <Button onClick={handleNext} className="w-full h-12 bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
              {feedbackMode && feedbackIndex < feedbackQuestions.length - 1 ? (isGenAlpha ? 'Next One 💪' : 'Next Practice') : (isGenAlpha ? 'Keep Going 🚀' : 'Continue')}
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

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
  const totalXP = session.answers.reduce((sum, a) => sum + (a.xpEarned || 0), 0);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-secondary/20">
          <BarChart3 className="h-10 w-10 text-secondary" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground">
          {isGenAlpha ? (passed ? 'You ate that up! 🔥' : 'You got cooked a lil bit 💀') : `Great Work, ${nickname}!`}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {correctQ} of {totalQ} correct ({pct}%)
          {session.quizMode === 'mock-sol' && (
            <span className={`ml-2 font-bold ${passed ? 'text-secondary' : 'text-destructive'}`}>
              {passed ? '✅ PASS' : '❌ DID NOT PASS'}
            </span>
          )}
        </p>
        <div className="mt-2 flex items-center justify-center gap-1">
          <Zap className="h-4 w-4 text-accent-foreground" />
          <span className="text-sm font-bold text-accent-foreground">{totalXP} XP earned</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Retake #{session.retakeNumber} · V{((session.retakeNumber - 1) % 5) + 1} ({VERSION_FORMAT_LABELS[['direct', 'quote', 'visual', 'diagram', 'timeline'][((session.retakeNumber - 1) % 5)] as import('@/types/sol').VersionFormat]})
        </p>
        <div className="mt-6 space-y-2">
          {solStandards.filter(s => s.id !== 'VUS.1' && session.answers.some(a => a.standardId === s.id)).map(std => {
            const perf = getStandardPerformance(std.id);
            const p = perf.total > 0 ? Math.round((perf.correct / perf.total) * 100) : 0;
            return (
              <div key={std.id} className="rounded-lg bg-card p-3 text-left">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{std.id}</span>
                  <span className={p >= 70 ? 'text-secondary' : 'text-destructive'}>{p}%</span>
                </div>
                <Progress value={p} className="mt-1.5 h-2" />
              </div>
            );
          })}
        </div>
        <Button onClick={onDone} className="mt-6 w-full bg-primary text-primary-foreground">Done</Button>
      </motion.div>
    </div>
  );
}

export default AssessmentPage;
