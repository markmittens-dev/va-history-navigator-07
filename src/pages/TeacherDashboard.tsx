import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, TrendingDown, AlertTriangle, CheckCircle2, Download, BookOpen, Lightbulb } from 'lucide-react';
import { useAppState } from '@/context/AppContext';
import { solStandards } from '@/data/standards';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

type TabId = 'heatmap' | 'vocab' | 'hints';

const TeacherDashboard = () => {
  const { classCode, classData, logout } = useAppState();
  const navigate = useNavigate();
  const data = classData[classCode];
  const [activeTab, setActiveTab] = useState<TabId>('heatmap');

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

  // Vocab gap analysis
  const vocabCounts: Record<string, number> = {};
  data.vocabClicks.forEach(c => { vocabCounts[c.term] = (vocabCounts[c.term] || 0) + 1; });
  const sortedVocab = Object.entries(vocabCounts).sort((a, b) => b[1] - a[1]);

  // Hints analysis
  const sortedHints = Object.entries(data.hintsByStudent).sort((a, b) => b[1] - a[1]);

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

  const exportCSV = () => {
    const rows = [['Standard', 'Total', 'Correct', '%', 'Memory %', 'Sequence %', 'Stimulus %']];
    standardsWithData.forEach(s => {
      if (!s.perf) return;
      const p = s.perf;
      const memPct = p.memorization.total > 0 ? Math.round((p.memorization.correct / p.memorization.total) * 100) : 0;
      const seqPct = p.sequence.total > 0 ? Math.round((p.sequence.correct / p.sequence.total) * 100) : 0;
      const stimPct = p.stimulus.total > 0 ? Math.round((p.stimulus.correct / p.stimulus.total) * 100) : 0;
      rows.push([s.id, String(p.total), String(p.correct), String(s.pct ?? 0), String(memPct), String(seqPct), String(stimPct)]);
    });
    rows.push([]);
    rows.push(['Most-Clicked Vocab Terms']);
    rows.push(['Term', 'Clicks']);
    sortedVocab.forEach(([term, count]) => rows.push([term, String(count)]));
    rows.push([]);
    rows.push(['Hints Used by Remediation ID']);
    rows.push(['Remediation ID', 'Hints']);
    sortedHints.forEach(([id, count]) => rows.push([id, String(count)]));

    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `class-${classCode}-report.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'heatmap', label: 'Standards', icon: <CheckCircle2 className="h-4 w-4" /> },
    { id: 'vocab', label: 'Vocab Gaps', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'hints', label: 'Hint Usage', icon: <Lightbulb className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-primary px-4 py-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <div>
            <h1 className="font-display text-lg font-bold text-primary-foreground">Teacher Dashboard</h1>
            <p className="text-xs text-primary-foreground/70">Class Code: {classCode} · {data.totalStudents} students</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={exportCSV} className="text-primary-foreground/70 hover:text-primary-foreground" title="Export CSV">
              <Download className="h-5 w-5" />
            </button>
            <button onClick={() => { logout(); navigate('/'); }} className="text-primary-foreground/70 hover:text-primary-foreground">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6 space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl bg-destructive/10 p-4 text-center">
            <AlertTriangle className="mx-auto h-6 w-6 text-destructive" />
            <p className="mt-2 text-2xl font-bold text-foreground">{struggling}</p>
            <p className="text-xs text-muted-foreground">Struggling</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl bg-accent/10 p-4 text-center">
            <TrendingDown className="mx-auto h-6 w-6 text-accent" />
            <p className="mt-2 text-2xl font-bold text-foreground">{improving}</p>
            <p className="text-xs text-muted-foreground">Improving</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-xl bg-secondary/10 p-4 text-center">
            <CheckCircle2 className="mx-auto h-6 w-6 text-secondary" />
            <p className="mt-2 text-2xl font-bold text-foreground">{mastered}</p>
            <p className="text-xs text-muted-foreground">Mastered</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 rounded-xl bg-muted p-1">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-semibold transition-all ${activeTab === tab.id ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Heatmap Tab */}
        {activeTab === 'heatmap' && (
          <>
            <div>
              <h2 className="font-display text-lg font-bold text-foreground mb-3">Skill Heatmap</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {standardsWithData.map((std, i) => (
                  <motion.div key={std.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }} className={`rounded-xl p-3 text-center ${getHeatColor(std.pct)}`}>
                    <p className={`text-xs font-bold ${getTextColor(std.pct)}`}>{std.id}</p>
                    <p className={`text-lg font-bold ${getTextColor(std.pct)}`}>{std.pct !== null ? `${std.pct}%` : '—'}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-foreground mb-3">Detailed Breakdown</h2>
              <div className="space-y-3">
                {standardsWithData.filter(s => s.perf).map(std => {
                  const p = std.perf!;
                  const memPct = p.memorization.total > 0 ? Math.round((p.memorization.correct / p.memorization.total) * 100) : 0;
                  const seqPct = p.sequence.total > 0 ? Math.round((p.sequence.correct / p.sequence.total) * 100) : 0;
                  const stimPct = p.stimulus.total > 0 ? Math.round((p.stimulus.correct / p.stimulus.total) * 100) : 0;
                  return (
                    <motion.div key={std.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border border-border bg-card p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-sm font-bold text-foreground">{std.id}</span>
                          <span className="ml-2 text-xs text-muted-foreground">{std.title}</span>
                        </div>
                        <span className={`text-sm font-bold ${std.pct! >= 75 ? 'text-secondary' : std.pct! >= 50 ? 'text-accent' : 'text-destructive'}`}>{std.pct}%</span>
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
          </>
        )}

        {/* Vocab Gaps Tab */}
        {activeTab === 'vocab' && (
          <div>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">Vocabulary Gap Report</h2>
            <p className="text-sm text-muted-foreground mb-4">Most-clicked vocabulary terms — these words are blocking student comprehension.</p>
            {sortedVocab.length === 0 ? (
              <p className="text-sm text-muted-foreground">No vocabulary data yet.</p>
            ) : (
              <div className="space-y-2">
                {sortedVocab.slice(0, 20).map(([term, count], i) => {
                  const maxCount = sortedVocab[0][1];
                  const barPct = Math.round((count / maxCount) * 100);
                  return (
                    <motion.div key={term} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="rounded-lg border border-border bg-card p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-foreground">{term}</span>
                        <span className="text-xs font-bold text-accent">{count} clicks</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${barPct}%` }} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Hints Tab */}
        {activeTab === 'hints' && (
          <div>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">Hint Usage by Remediation ID</h2>
            <p className="text-sm text-muted-foreground mb-4">High hint counts may indicate genuine struggle or "gaming" the system.</p>
            {sortedHints.length === 0 ? (
              <p className="text-sm text-muted-foreground">No hint data yet.</p>
            ) : (
              <div className="space-y-2">
                {sortedHints.map(([id, count], i) => {
                  const maxH = sortedHints[0][1];
                  const barPct = maxH > 0 ? Math.round((count / maxH) * 100) : 0;
                  const isHigh = count > 10;
                  return (
                    <motion.div key={id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className={`rounded-lg border p-3 ${isHigh ? 'border-destructive/50 bg-destructive/5' : 'border-border bg-card'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-foreground">{id}</span>
                        <span className={`text-xs font-bold ${isHigh ? 'text-destructive' : 'text-muted-foreground'}`}>
                          {count} hints {isHigh && '⚠️'}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${isHigh ? 'bg-destructive' : 'bg-primary'}`} style={{ width: `${barPct}%` }} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Export button */}
        <Button onClick={exportCSV} variant="outline" className="w-full gap-2">
          <Download className="h-4 w-4" /> Export CSV Report
        </Button>
      </main>
    </div>
  );
};

export default TeacherDashboard;
