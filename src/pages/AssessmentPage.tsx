import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, LogOut, Lightbulb, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppState } from '@/context/AppContext';
import { questionBank, generatePracticeQuestions } from '@/data/questions';
import { solStandards } from '@/data/standards';
import { Question, ErrorCategory } from '@/types/sol';
import { useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

const errorCategoryLabels: Record<ErrorCategory, string> = {
  memorization: '📝 Memorization',
  sequence: '🔢 Sequence',
  stimulus: '🖼️ Stimulus Analysis',
};

const AssessmentPage = () => {
  const { session, recordAnswer, logout, nickname, getStandardPerformance } = useAppState();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [feedbackMode, setFeedbackMode] = useState(false);
  const [feedbackQuestions, setFeedbackQuestions] = useState<Question[]>([]);
  const [feedbackIndex, setFeedbackIndex] = useState(0);
  const [showStrategy, setShowStrategy] = useState(false);

  const questions = useMemo(() => questionBank, []);
  const activeQuestions = feedbackMode ? feedbackQuestions : questions;
  const activeIndex = feedbackMode ? feedbackIndex : currentIndex;
  const currentQuestion = activeQuestions[activeIndex];

  if (!session) {
    navigate('/');
    return null;
  }

  if (!currentQuestion) {
    // Assessment complete
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm text-center"
        >
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-secondary/20">
            <BarChart3 className="h-10 w-10 text-secondary" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">Great Work, {nickname}!</h2>
          <p className="mt-2 text-muted-foreground">
            You answered {session.answers.filter(a => a.correct).length} of {session.answers.length} correctly.
          </p>

          <div className="mt-6 space-y-2">
            {solStandards.filter(s => session.answers.some(a => a.standardId === s.id)).map(std => {
              const perf = getStandardPerformance(std.id);
              const pct = perf.total > 0 ? Math.round((perf.correct / perf.total) * 100) : 0;
              return (
                <div key={std.id} className="rounded-lg bg-card p-3 text-left">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{std.id}</span>
                    <span className={pct >= 70 ? 'text-secondary' : 'text-destructive'}>{pct}%</span>
                  </div>
                  <Progress value={pct} className="mt-1.5 h-2" />
                </div>
              );
            })}
          </div>

          <Button onClick={() => { logout(); navigate('/'); }} className="mt-6 w-full bg-primary text-primary-foreground">
            Done
          </Button>
        </motion.div>
      </div>
    );
  }

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    const correct = selectedOption === currentQuestion.correctIndex;

    recordAnswer({
      questionId: currentQuestion.id,
      standardId: currentQuestion.standardId,
      selectedIndex: selectedOption,
      correct,
      errorCategory: currentQuestion.errorCategory,
      timestamp: Date.now(),
    });

    setShowResult(true);

    if (!correct) {
      setShowStrategy(true);
    }
  };

  const handleNext = () => {
    const wasCorrect = selectedOption === currentQuestion.correctIndex;

    if (!wasCorrect && !feedbackMode) {
      // Enter feedback mode — generate practice questions
      const practice = generatePracticeQuestions(currentQuestion, questions);
      if (practice.length > 0) {
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
        // Exit feedback mode
        setFeedbackMode(false);
        setCurrentIndex(prev => prev + 1);
      }
    } else {
      setCurrentIndex(prev => prev + 1);
    }

    setSelectedOption(null);
    setShowResult(false);
    setShowStrategy(false);
  };

  const standard = solStandards.find(s => s.id === currentQuestion.standardId);
  const progressPct = feedbackMode
    ? Math.round(((feedbackIndex + 1) / feedbackQuestions.length) * 100)
    : Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur-sm px-4 py-3">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">{feedbackMode ? '🔄 Practice Mode' : `Question ${currentIndex + 1}/${questions.length}`}</p>
            <Progress value={progressPct} className="mt-1 h-1.5 w-32" />
          </div>
          <button onClick={() => { logout(); navigate('/'); }} className="text-muted-foreground hover:text-foreground">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Question area */}
      <main className="flex-1 px-4 py-6">
        <div className="mx-auto max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              {/* Standard badge */}
              <div className="mb-4 flex items-center gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {currentQuestion.standardId}
                </span>
                <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                  {errorCategoryLabels[currentQuestion.errorCategory]}
                </span>
              </div>

              {/* Question text */}
              <h2 className="font-display text-lg font-semibold text-foreground leading-snug mb-5">
                {currentQuestion.text}
              </h2>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQuestion.options.map((option, i) => {
                  let optionStyle = 'bg-card border-border hover:border-primary/40';
                  if (showResult) {
                    if (i === currentQuestion.correctIndex) {
                      optionStyle = 'bg-secondary/10 border-secondary text-foreground';
                    } else if (i === selectedOption && i !== currentQuestion.correctIndex) {
                      optionStyle = 'bg-destructive/10 border-destructive text-foreground';
                    }
                  } else if (i === selectedOption) {
                    optionStyle = 'bg-primary/10 border-primary text-foreground';
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      className={`w-full rounded-xl border-2 p-4 text-left text-sm font-medium transition-all ${optionStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{option}</span>
                        {showResult && i === currentQuestion.correctIndex && (
                          <CheckCircle2 className="ml-auto h-5 w-5 shrink-0 text-secondary" />
                        )}
                        {showResult && i === selectedOption && i !== currentQuestion.correctIndex && (
                          <XCircle className="ml-auto h-5 w-5 shrink-0 text-destructive" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Strategy tip */}
              {showStrategy && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 rounded-xl border-2 border-accent bg-accent/10 p-4"
                >
                  <div className="flex items-start gap-2">
                    <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Strategy Tip</p>
                      <p className="mt-1 text-sm text-muted-foreground">{currentQuestion.strategyTip}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom action */}
      <div className="sticky bottom-0 border-t border-border bg-card/80 backdrop-blur-sm px-4 py-4">
        <div className="mx-auto max-w-lg">
          {!showResult ? (
            <Button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
            >
              Check Answer
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="w-full h-12 bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2"
            >
              {feedbackMode && feedbackIndex < feedbackQuestions.length - 1 ? 'Next Practice' : 'Continue'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;
