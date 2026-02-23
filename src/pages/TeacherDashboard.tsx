import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Users, TrendingDown, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useAppState } from '@/context/AppContext';
import { solStandards } from '@/data/standards';
import { Progress } from '@/components/ui/progress';

const TeacherDashboard = () => {
  const { classCode, classData, logout } = useAppState();
  const navigate = useNavigate();
  const data = classData[classCode];

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <p className="text-muted-foreground">No data available yet for this class.</p>
      </div>
    );
  }

  const standardsWithData = solStandards.map(std => {
    const perf = data.standards[std.id];
    const pct = perf && perf.total > 0 ? Math.round((perf.correct / perf.total) * 100) : null;
    return { ...std, perf, pct };
  });

  const struggling = standardsWithData.filter(s => s.pct !== null && s.pct < 50).length;
  const improving = standardsWithData.filter(s => s.pct !== null && s.pct >= 50 && s.pct < 75).length;
  const mastered = standardsWithData.filter(s => s.pct !== null && s.pct >= 75).length;

  const getHeatColor = (pct: number | null) => {
    if (pct === null) return 'bg-muted';
    if (pct >= 75) return 'bg-secondary';
    if (pct >= 50) return 'bg-accent';
    return 'bg-destructive';
  };

  const getTextColor = (pct: number | null) => {
    if (pct === null) return 'text-muted-foreground';
    if (pct >= 75) return 'text-secondary-foreground';
    if (pct >= 50) return 'text-accent-foreground';
    return 'text-destructive-foreground';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-primary px-4 py-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <div>
            <h1 className="font-display text-lg font-bold text-primary-foreground">Teacher Dashboard</h1>
            <p className="text-xs text-primary-foreground/70">Class Code: {classCode} · {data.totalStudents} students</p>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} className="text-primary-foreground/70 hover:text-primary-foreground">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6 space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="rounded-xl bg-destructive/10 p-4 text-center">
            <AlertTriangle className="mx-auto h-6 w-6 text-destructive" />
            <p className="mt-2 text-2xl font-bold text-foreground">{struggling}</p>
            <p className="text-xs text-muted-foreground">Struggling</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="rounded-xl bg-accent/10 p-4 text-center">
            <TrendingDown className="mx-auto h-6 w-6 text-accent" />
            <p className="mt-2 text-2xl font-bold text-foreground">{improving}</p>
            <p className="text-xs text-muted-foreground">Improving</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="rounded-xl bg-secondary/10 p-4 text-center">
            <CheckCircle2 className="mx-auto h-6 w-6 text-secondary" />
            <p className="mt-2 text-2xl font-bold text-foreground">{mastered}</p>
            <p className="text-xs text-muted-foreground">Mastered</p>
          </motion.div>
        </div>

        {/* Skill Heatmap */}
        <div>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">Skill Heatmap</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {standardsWithData.map((std, i) => (
              <motion.div
                key={std.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                className={`rounded-xl p-3 text-center ${getHeatColor(std.pct)}`}
              >
                <p className={`text-xs font-bold ${getTextColor(std.pct)}`}>{std.id}</p>
                <p className={`text-lg font-bold ${getTextColor(std.pct)}`}>
                  {std.pct !== null ? `${std.pct}%` : '—'}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detailed breakdown */}
        <div>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">Detailed Breakdown</h2>
          <div className="space-y-3">
            {standardsWithData.filter(s => s.perf).map(std => {
              const p = std.perf!;
              const memPct = p.memorization.total > 0 ? Math.round((p.memorization.correct / p.memorization.total) * 100) : 0;
              const seqPct = p.sequence.total > 0 ? Math.round((p.sequence.correct / p.sequence.total) * 100) : 0;
              const stimPct = p.stimulus.total > 0 ? Math.round((p.stimulus.correct / p.stimulus.total) * 100) : 0;

              return (
                <motion.div
                  key={std.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm font-bold text-foreground">{std.id}</span>
                      <span className="ml-2 text-xs text-muted-foreground">{std.title}</span>
                    </div>
                    <span className={`text-sm font-bold ${std.pct! >= 75 ? 'text-secondary' : std.pct! >= 50 ? 'text-accent' : 'text-destructive'}`}>
                      {std.pct}%
                    </span>
                  </div>
                  <Progress value={std.pct ?? 0} className="h-2 mb-3" />
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-lg bg-muted p-2">
                      <p className="text-xs text-muted-foreground">📝 Memory</p>
                      <p className="text-sm font-bold text-foreground">{memPct}%</p>
                    </div>
                    <div className="rounded-lg bg-muted p-2">
                      <p className="text-xs text-muted-foreground">🔢 Sequence</p>
                      <p className="text-sm font-bold text-foreground">{seqPct}%</p>
                    </div>
                    <div className="rounded-lg bg-muted p-2">
                      <p className="text-xs text-muted-foreground">🖼️ Stimulus</p>
                      <p className="text-sm font-bold text-foreground">{stimPct}%</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
