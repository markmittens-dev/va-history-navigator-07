import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppState } from '@/context/AppContext';

const LoginPage = () => {
  const [mode, setMode] = useState<'select' | 'student' | 'teacher'>('select');
  const [nickname, setNickname] = useState('');
  const [classCode, setClassCode] = useState('');
  const [error, setError] = useState('');
  const { loginAsStudent, loginAsTeacher } = useAppState();
  const navigate = useNavigate();

  const handleStudentLogin = () => {
    if (!nickname.trim()) { setError('Enter a nickname'); return; }
    if (!/^\d{6}$/.test(classCode)) { setError('Enter a valid 6-digit class code'); return; }
    loginAsStudent(nickname.trim(), classCode);
    navigate('/assessment');
  };

  const handleTeacherLogin = () => {
    if (!/^\d{6}$/.test(classCode)) { setError('Enter a valid 6-digit class code'); return; }
    loginAsTeacher(classCode);
    navigate('/teacher');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
            <BookOpen className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">VA History SOL</h1>
          <p className="mt-1 text-sm text-muted-foreground">Adaptive Learning Engine</p>
        </div>

        {mode === 'select' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <Button
              onClick={() => setMode('student')}
              className="w-full h-14 text-base gap-3 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <GraduationCap className="h-5 w-5" />
              I'm a Student
            </Button>
            <Button
              onClick={() => setMode('teacher')}
              variant="outline"
              className="w-full h-14 text-base gap-3"
            >
              <Users className="h-5 w-5" />
              I'm a Teacher
            </Button>
          </motion.div>
        )}

        {mode === 'student' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Nickname</label>
              <Input
                placeholder="Choose a nickname"
                value={nickname}
                onChange={e => { setNickname(e.target.value); setError(''); }}
                maxLength={20}
                className="h-12"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Class Code</label>
              <Input
                placeholder="6-digit code from your teacher"
                value={classCode}
                onChange={e => { setClassCode(e.target.value.replace(/\D/g, '').slice(0, 6)); setError(''); }}
                inputMode="numeric"
                maxLength={6}
                className="h-12 tracking-widest text-center text-lg"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button onClick={handleStudentLogin} className="w-full h-12 bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Start Learning
            </Button>
            <button onClick={() => setMode('select')} className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Go back
            </button>
          </motion.div>
        )}

        {mode === 'teacher' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Your Class Code</label>
              <Input
                placeholder="Enter your 6-digit code"
                value={classCode}
                onChange={e => { setClassCode(e.target.value.replace(/\D/g, '').slice(0, 6)); setError(''); }}
                inputMode="numeric"
                maxLength={6}
                className="h-12 tracking-widest text-center text-lg"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button onClick={handleTeacherLogin} className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90">
              View Dashboard
            </Button>
            <button onClick={() => setMode('select')} className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Go back
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default LoginPage;
