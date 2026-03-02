import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useAppState } from '@/context/AppContext';
import { solStandards } from '@/data/standards';
import { QuizMode, CoachPersonality } from '@/types/sol';

const LoginPage = () => {
  const [mode, setMode] = useState<'select' | 'student' | 'teacher'>('select');
  const [step, setStep] = useState<'credentials' | 'setup'>('credentials');
  const [remediationId, setRemediationId] = useState('');
  const [classCode, setClassCode] = useState('');
  const [error, setError] = useState('');
  const [quizMode, setQuizMode] = useState<QuizMode>('mock-sol');
  const [selectedUnit, setSelectedUnit] = useState('VUS.1');
  const [coachPersonality, setCoachPersonality] = useState<CoachPersonality>('historian');
  const { loginAsStudent, loginAsTeacher } = useAppState();
  const navigate = useNavigate();

  const handleStudentCredentials = () => {
    if (!remediationId.trim()) { setError('Enter your Remediation ID (e.g., VA-01)'); return; }
    if (!/^\d{6}$/.test(classCode)) { setError('Enter a valid 6-digit class code'); return; }
    setStep('setup');
  };

  const handleStartQuiz = () => {
    loginAsStudent(remediationId.trim(), classCode, quizMode, selectedUnit, coachPersonality);
    navigate('/assessment');
  };

  const handleTeacherLogin = () => {
    if (!/^\d{6}$/.test(classCode)) { setError('Enter a valid 6-digit class code'); return; }
    loginAsTeacher(classCode);
    navigate('/teacher');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
            <BookOpen className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">VA History SOL</h1>
          <p className="mt-1 text-sm text-muted-foreground">Adaptive Learning Engine</p>
        </div>

        {mode === 'select' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <Button onClick={() => setMode('student')} className="w-full h-14 text-base gap-3 bg-primary text-primary-foreground hover:bg-primary/90">
              <GraduationCap className="h-5 w-5" /> I'm a Student
            </Button>
            <Button onClick={() => setMode('teacher')} variant="outline" className="w-full h-14 text-base gap-3">
              <Users className="h-5 w-5" /> I'm a Teacher
            </Button>
          </motion.div>
        )}

        {mode === 'student' && step === 'credentials' && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Remediation ID</label>
              <Input placeholder="e.g., VA-01" value={remediationId} onChange={e => { setRemediationId(e.target.value); setError(''); }} maxLength={20} className="h-12" />
              <p className="mt-1 text-xs text-muted-foreground">Your teacher will give you this ID. No personal info needed.</p>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Class Code</label>
              <Input placeholder="6-digit code from your teacher" value={classCode} onChange={e => { setClassCode(e.target.value.replace(/\D/g, '').slice(0, 6)); setError(''); }} inputMode="numeric" maxLength={6} className="h-12 tracking-widest text-center text-lg" />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button onClick={handleStudentCredentials} className="w-full h-12 bg-secondary text-secondary-foreground hover:bg-secondary/90">Next</Button>
            <button onClick={() => setMode('select')} className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors">← Go back</button>
          </motion.div>
        )}

        {mode === 'student' && step === 'setup' && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            {/* Coach Personality Toggle */}
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <span className="text-sm font-semibold text-foreground">Coach Personality</span>
                </div>
                <Switch checked={coachPersonality === 'gen-alpha'} onCheckedChange={c => setCoachPersonality(c ? 'gen-alpha' : 'historian')} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {coachPersonality === 'historian' ? '📚 Historian Mode — Standard academic feedback' : '🔥 Gen Alpha Mode — Modern slang (no cap, OG, cooked)'}
              </p>
            </div>

            {/* Quiz Mode */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">Quiz Mode</label>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setQuizMode('unit-mastery')} className={`rounded-xl border-2 p-3 text-left text-sm transition-all ${quizMode === 'unit-mastery' ? 'border-primary bg-primary/10' : 'border-border bg-card'}`}>
                  <p className="font-semibold text-foreground">Unit Mastery</p>
                  <p className="text-xs text-muted-foreground">15 questions per unit</p>
                </button>
                <button onClick={() => setQuizMode('mock-sol')} className={`rounded-xl border-2 p-3 text-left text-sm transition-all ${quizMode === 'mock-sol' ? 'border-primary bg-primary/10' : 'border-border bg-card'}`}>
                  <p className="font-semibold text-foreground">Mock SOL</p>
                  <p className="text-xs text-muted-foreground">65 questions, full test</p>
                </button>
              </div>
            </div>

            {quizMode === 'unit-mastery' && (
              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">Select Unit</label>
                <div className="max-h-48 overflow-y-auto space-y-1.5 rounded-xl border border-border bg-card p-2">
                  {solStandards.map(std => (
                    <button key={std.id} onClick={() => setSelectedUnit(std.id)} className={`w-full rounded-lg p-2.5 text-left text-sm transition-all ${selectedUnit === std.id ? 'bg-primary/10 border border-primary' : 'hover:bg-muted'}`}>
                      <span className="font-semibold text-foreground">{std.id}</span>
                      <span className="ml-2 text-xs text-muted-foreground">{std.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Button onClick={handleStartQuiz} className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90">
              Start {quizMode === 'mock-sol' ? 'Mock SOL' : `${selectedUnit} Quiz`}
            </Button>
            <button onClick={() => setStep('credentials')} className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors">← Go back</button>
          </motion.div>
        )}

        {mode === 'teacher' && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Your Class Code</label>
              <Input placeholder="Enter your 6-digit code" value={classCode} onChange={e => { setClassCode(e.target.value.replace(/\D/g, '').slice(0, 6)); setError(''); }} inputMode="numeric" maxLength={6} className="h-12 tracking-widest text-center text-lg" />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button onClick={handleTeacherLogin} className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90">View Dashboard</Button>
            <button onClick={() => setMode('select')} className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors">← Go back</button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default LoginPage;
