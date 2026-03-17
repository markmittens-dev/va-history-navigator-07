import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, TrendingDown, AlertTriangle, CheckCircle2, Download, BookOpen, Lightbulb, RotateCcw } from 'lucide-react';
import { useAppState } from '@/context/AppContext';
import { solStandards } from '@/data/standards';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type TabId = 'heatmap' | 'vocab' | 'hints' | 'retakes';

const TeacherDashboard = () => {
  const { classCode, classData, retakeHistory, logout } = useAppState();
  const navigate = useNavigate();
  const data = classData[classCode];
  const [activeTab, setActiveTab] = useState<TabId>('heatmap');

  const filteredStandards = solStandards.filter(s => s.id !== 'VUS.1');

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <p className="text-muted-foreground">No data available yet for this class.</p>
      </div>
    );
  }

  const studentRecords = data.studentRecords || {};
  const studentIds = Object.keys(studentRecords).sort();

  const getMasteryLevel = (correct: number): 'mastered' | 'developing' | 'not-mastered' => {
    if (correct >= 3) return 'mastered';
    if (correct >= 1) return 'developing';
    return 'not-mastered';
  };

  const getMasteryColor = (level: 'mastered' | 'developing' | 'not-mastered') => {
    switch (level) {
      case 'mastered': return 'bg-emerald-500';
      case 'developing': return 'bg-amber-400';
      case 'not-mastered': return 'bg-red-500';
    }
  };

  const getMasteryTextColor = (level: 'mastered' | 'developing' | 'not-mastered') => {
    switch (level) {
      case 'mastered': return 'text-white';
      case 'developing': return 'text-gray-900';
      case 'not-mastered': return 'text-white';
    }
  };

  // Class-level standard struggle: average correct across all students
  const standardStruggles = useMemo(() => {
    return filteredStandards.map(std => {
      let totalCorrect = 0;
      let studentCount = 0;
      studentIds.forEach(id => {
        const rec = studentRecords[id]?.standards[std.id];
        if (rec && rec.attempts > 0) {
          totalCorrect += rec.correct;
          studentCount++;
        }
      });
      const avgCorrect = studentCount > 0 ? totalCorrect / studentCount : 0;
      return { ...std, avgCorrect, studentCount, level: getMasteryLevel(Math.round(avgCorrect)) };
    }).sort((a, b) => a.avgCorrect - b.avgCorrect);
  }, [studentRecords, studentIds, filteredStandards]);

  const standardsWithData = filteredStandards.map(std => {
    const perf = data.standards[std.id];
    const pct = perf && perf.total > 0 ? Math.round((perf.correct / perf.total) * 100) : null;
    return { ...std, perf, pct };
  });

  const struggling = standardStruggles.filter(s => s.level === 'not-mastered').length;
  const developing = standardStruggles.filter(s => s.level === 'developing').length;
  const mastered = standardStruggles.filter(s => s.level === 'mastered').length;

  const vocabCounts: Record<string, number> = {};
  data.vocabClicks.forEach(c => { vocabCounts[c.term] = (vocabCounts[c.term] || 0) + 1; });
  const sortedVocab = Object.entries(vocabCounts).sort((a, b) => b[1] - a[1]);

  const sortedHints = Object.entries(data.hintsByStudent).sort((a, b) => b[1] - a[1]);

  const exportCSV = () => {
    const rows: string[][] = [];

    // Section 1: Student × Standard Mastery Heatmap
    rows.push(['MASTERY HEATMAP — Student × Standard']);
    rows.push(['Remediation ID', ...filteredStandards.map(s => s.id)]);
    studentIds.forEach(id => {
      const row = [id];
      filteredStandards.forEach(std => {
        const rec = studentRecords[id]?.standards[std.id];
        if (rec) {
          const level = getMasteryLevel(rec.correct);
          row.push(`${rec.correct}/${rec.attempts} (${level})`);
        } else {
          row.push('0/0 (not-mastered)');
        }
      });
      rows.push(row);
    });

    // Section 2: Unit Attempts
    rows.push([]);
    rows.push(['UNIT ATTEMPTS']);
    rows.push(['Remediation ID', 'Unit', 'Attempts']);
    studentIds.forEach(id => {
      const rec = studentRecords[id];
      if (rec) {
        Object.entries(rec.unitAttempts).forEach(([unit, attempts]) => {
          rows.push([id, unit, String(attempts)]);
        });
      }
    });

    // Section 3: Class Standard Summary
    rows.push([]);
    rows.push(['CLASS STANDARD SUMMARY']);
    rows.push(['Standard', 'Avg Correct', 'Students Attempted', 'Status']);
    standardStruggles.forEach(s => {
      rows.push([s.id, s.avgCorrect.toFixed(1), String(s.studentCount), s.level]);
    });

    // Section 4: Vocab
    rows.push([]);
    rows.push(['VOCABULARY AUDIT']);
    rows.push(['Term', 'Clicks']);
    sortedVocab.forEach(([term, count]) => rows.push([term, String(count)]));

    // Section 5: Hints
    rows.push([]);
    rows.push(['HINT USAGE']);
    rows.push(['Remediation ID', 'Hints']);
    sortedHints.forEach(([id, count]) => rows.push([id, String(count)]));

    // Section 6: Retakes
    rows.push([]);
    rows.push(['RETAKE ANALYSIS']);
    rows.push(['Remediation ID', 'Standard', 'Retake #', 'Score', 'Total']);
    Object.entries(retakeHistory).forEach(([id, records]) => {
      records.forEach(r => {
        rows.push([id, r.standardId, String(r.retakeNumber), String(r.correct), String(r.total)]);
      });
    });

    const csv = rows.map(r => r.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `class-${classCode}-mastery-report.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'heatmap', label: 'Mastery', icon: <CheckCircle2 className="h-4 w-4" /> },
    { id: 'vocab', label: 'Vocab', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'hints', label: 'Hints', icon: <Lightbulb className="h-4 w-4" /> },
    { id: 'retakes', label: 'Retakes', icon: <RotateCcw className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-primary px-4 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div>
            <h1 className="font-display text-lg font-bold text-primary-foreground">Perfect Practice — Teacher Dashboard</h1>
            <p className="text-xs text-primary-foreground/70">Class Code: {classCode} · {data.totalStudents} students · VUS.2–17</p>
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

      <main className="mx-auto max-w-4xl px-4 py-6 space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl bg-red-500/10 p-4 text-center">
            <AlertTriangle className="mx-auto h-6 w-6 text-red-500" />
            <p className="mt-2 text-2xl font-bold text-foreground">{struggling}</p>
            <p className="text-xs text-muted-foreground">Not Mastered</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl bg-amber-400/10 p-4 text-center">
            <TrendingDown className="mx-auto h-6 w-6 text-amber-500" />
            <p className="mt-2 text-2xl font-bold text-foreground">{developing}</p>
            <p className="text-xs text-muted-foreground">Developing</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-xl bg-emerald-500/10 p-4 text-center">
            <CheckCircle2 className="mx-auto h-6 w-6 text-emerald-500" />
            <p className="mt-2 text-2xl font-bold text-foreground">{mastered}</p>
            <p className="text-xs text-muted-foreground">Mastered</p>
          </motion.div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="inline-block h-3 w-3 rounded bg-emerald-500" /> Mastered (3+ correct)</span>
          <span className="flex items-center gap-1.5"><span className="inline-block h-3 w-3 rounded bg-amber-400" /> Developing (1-2 correct)</span>
          <span className="flex items-center gap-1.5"><span className="inline-block h-3 w-3 rounded bg-red-500" /> Not Mastered (0 correct)</span>
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
          <div className="space-y-6">
            {/* Student × Standard Grid */}
            <div>
              <h2 className="font-display text-lg font-bold text-foreground mb-3">Student × Standard Mastery Heatmap</h2>
              <div className="overflow-x-auto rounded-xl border border-border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="sticky left-0 z-10 bg-muted/50 min-w-[80px] text-xs font-bold">ID</TableHead>
                      {filteredStandards.map(std => (
                        <TableHead key={std.id} className="text-center text-[10px] font-bold px-1 min-w-[52px]">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="cursor-help">{std.id.replace('VUS.', '')}</span>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-[200px]">
                              <p className="font-bold text-xs">{std.id}: {std.title}</p>
                              <p className="text-[10px] text-muted-foreground">{std.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableHead>
                      ))}
                      <TableHead className="text-center text-[10px] font-bold px-2">Attempts</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentIds.map(id => {
                      const rec = studentRecords[id];
                      const totalAttempts = rec ? Object.values(rec.unitAttempts).reduce((s, v) => s + v, 0) : 0;
                      return (
                        <TableRow key={id}>
                          <TableCell className="sticky left-0 z-10 bg-card text-xs font-bold whitespace-nowrap">{id}</TableCell>
                          {filteredStandards.map(std => {
                            const stdRec = rec?.standards[std.id];
                            const correct = stdRec?.correct ?? 0;
                            const attempts = stdRec?.attempts ?? 0;
                            const level = getMasteryLevel(correct);
                            return (
                              <TableCell key={std.id} className="p-0 text-center">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className={`mx-auto my-1 flex h-7 w-10 items-center justify-center rounded ${getMasteryColor(level)} ${getMasteryTextColor(level)} text-[10px] font-bold cursor-help`}>
                                      {correct}/{attempts}
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent side="top">
                                    <p className="text-xs"><strong>{id}</strong> — {std.id}</p>
                                    <p className="text-[10px]">{correct} correct out of {attempts} attempts</p>
                                    <p className="text-[10px] capitalize">{level.replace('-', ' ')}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TableCell>
                            );
                          })}
                          <TableCell className="text-center text-xs font-bold">{totalAttempts}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Class-Level Struggle Summary */}
            <div>
              <h2 className="font-display text-lg font-bold text-foreground mb-3">Standards Needing Reteaching</h2>
              <p className="text-sm text-muted-foreground mb-3">Standards sorted by average student mastery — lowest first.</p>
              <div className="space-y-2">
                {standardStruggles.slice(0, 8).map((std, i) => (
                  <motion.div key={std.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                    className={`rounded-xl border p-4 ${std.level === 'not-mastered' ? 'border-red-500/30 bg-red-500/5' : std.level === 'developing' ? 'border-amber-400/30 bg-amber-400/5' : 'border-emerald-500/30 bg-emerald-500/5'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-bold text-foreground">{std.id}</span>
                        <span className="ml-2 text-xs text-muted-foreground">{std.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-block h-2.5 w-2.5 rounded-full ${getMasteryColor(std.level)}`} />
                        <span className="text-xs font-bold text-foreground">Avg {std.avgCorrect.toFixed(1)} correct</span>
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{std.description} — {std.studentCount} student{std.studentCount !== 1 ? 's' : ''} attempted</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Vocab Gaps Tab */}
        {activeTab === 'vocab' && (
          <div>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">Vocabulary Audit</h2>
            <p className="text-sm text-muted-foreground mb-4">Most-clicked terms — these words are blocking student comprehension of history content.</p>
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

        {/* Retake Analysis Tab */}
        {activeTab === 'retakes' && (
          <div>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">Retake Analysis</h2>
            <p className="text-sm text-muted-foreground mb-4">Track improvement across the 5 question versions.</p>
            {Object.keys(retakeHistory).length === 0 ? (
              <p className="text-sm text-muted-foreground">No retake data yet.</p>
            ) : (
              <div className="space-y-4">
                {Object.entries(retakeHistory).map(([remId, records]) => (
                  <motion.div key={remId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold text-foreground">{remId}</span>
                      <span className="text-xs text-muted-foreground">{records.length} attempt{records.length > 1 ? 's' : ''}</span>
                    </div>
                    <div className="space-y-2">
                      {records.map((r, i) => {
                        const scorePct = r.total > 0 ? Math.round((r.correct / r.total) * 100) : 0;
                        const prevPct = i > 0 && records[i - 1].total > 0 ? Math.round((records[i - 1].correct / records[i - 1].total) * 100) : 0;
                        const improving = i > 0 && scorePct > prevPct;
                        const declining = i > 0 && scorePct < prevPct;
                        return (
                          <div key={i} className="rounded-lg bg-muted p-3">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-foreground">v{r.retakeNumber}</span>
                                <span className="text-xs text-muted-foreground">{r.standardId}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className={`text-sm font-bold ${scorePct >= 70 ? 'text-emerald-500' : 'text-red-500'}`}>{scorePct}%</span>
                                {improving && <span className="text-xs text-emerald-500">↑</span>}
                                {declining && <span className="text-xs text-red-500">↓</span>}
                              </div>
                            </div>
                            <Progress value={scorePct} className="h-1.5" />
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        <Button onClick={exportCSV} variant="outline" className="w-full gap-2">
          <Download className="h-4 w-4" /> Export Full Mastery Report (CSV)
        </Button>
      </main>
    </div>
  );
};

export default TeacherDashboard;
