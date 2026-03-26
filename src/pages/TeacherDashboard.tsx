import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, AlertTriangle, CheckCircle2, Download, BookOpen, Lightbulb, RotateCcw, TrendingUp, TrendingDown, ArrowLeft, FileText } from 'lucide-react';
import { useAppState } from '@/context/AppContext';
import { solStandards } from '@/data/standards';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type TabId = 'heatmap' | 'vocab' | 'hints' | 'retakes';
type ViewMode = 'class' | 'student';

const TeacherDashboard = () => {
  const { classCode, classData, retakeHistory, logout } = useAppState();
  const navigate = useNavigate();
  const data = classData[classCode];
  const [activeTab, setActiveTab] = useState<TabId>('heatmap');
  const [viewMode, setViewMode] = useState<ViewMode>('class');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const filteredStandards = solStandards.filter(s => s.id !== 'VUS.1');
  const studentRecords = data?.studentRecords || {};
  const studentIds = Object.keys(studentRecords).sort();

  const getMasteryLevel = (correct: number): 'mastered' | 'developing' | 'not-mastered' => {
    if (correct >= 3) return 'mastered';
    if (correct >= 1) return 'developing';
    return 'not-mastered';
  };

  const getMasteryBg = (level: 'mastered' | 'developing' | 'not-mastered') => {
    switch (level) {
      case 'mastered': return 'bg-success';
      case 'developing': return 'bg-warning';
      case 'not-mastered': return 'bg-destructive';
    }
  };

  const getMasteryText = (level: 'mastered' | 'developing' | 'not-mastered') => {
    return level === 'developing' ? 'text-foreground' : 'text-card';
  };

  // Class struggle analysis
  const standardStruggles = useMemo(() => {
    return filteredStandards.map(std => {
      let redCount = 0;
      let totalStudents = 0;
      studentIds.forEach(id => {
        const rec = studentRecords[id]?.standards[std.id];
        totalStudents++;
        if (!rec || rec.correct < 1) redCount++;
      });
      const redPct = totalStudents > 0 ? Math.round((redCount / totalStudents) * 100) : 0;
      const avgCorrect = studentIds.reduce((sum, id) => {
        const rec = studentRecords[id]?.standards[std.id];
        return sum + (rec?.correct ?? 0);
      }, 0) / (studentIds.length || 1);
      return { ...std, redCount, redPct, avgCorrect, totalStudents, level: getMasteryLevel(Math.round(avgCorrect)) };
    }).sort((a, b) => b.redPct - a.redPct);
  }, [studentRecords, studentIds, filteredStandards]);

  // Top 3 focus areas
  const focusAreas = standardStruggles.slice(0, 3);

  // Reteach flags (>40% red)
  const reteachFlags = standardStruggles.filter(s => s.redPct > 40);

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <p className="text-muted-foreground">No data available for this class.</p>
      </div>
    );
  }

  const vocabCounts: Record<string, number> = {};
  data.vocabClicks.forEach(c => { vocabCounts[c.term] = (vocabCounts[c.term] || 0) + 1; });
  const sortedVocab = Object.entries(vocabCounts).sort((a, b) => b[1] - a[1]);
  const sortedHints = Object.entries(data.hintsByStudent).sort((a, b) => b[1] - a[1]);

  // CSV export
  const exportCSV = () => {
    const rows: string[][] = [];
    rows.push([`Class Code: ${classCode}`, `Date: ${new Date().toLocaleDateString()}`, `Students: ${studentIds.length}`]);
    rows.push([]);
    rows.push(['MASTERY HEATMAP']);
    rows.push(['Remediation ID', ...filteredStandards.map(s => s.id)]);
    studentIds.forEach(id => {
      const row = [id];
      filteredStandards.forEach(std => {
        const rec = studentRecords[id]?.standards[std.id];
        if (rec) {
          row.push(`${rec.correct}/${rec.attempts} (${getMasteryLevel(rec.correct)})`);
        } else row.push('0/0 (not-mastered)');
      });
      rows.push(row);
    });
    rows.push([]);
    rows.push(['VOCABULARY AUDIT']);
    rows.push(['Term', 'Clicks']);
    sortedVocab.forEach(([term, count]) => rows.push([term, String(count)]));
    rows.push([]);
    rows.push(['HINT USAGE']);
    rows.push(['Remediation ID', 'Hints']);
    sortedHints.forEach(([id, count]) => rows.push([id, String(count)]));
    rows.push([]);
    rows.push(['RETAKE ANALYSIS']);
    rows.push(['Remediation ID', 'Standard', 'Retake #', 'Score', 'Total']);
    Object.entries(retakeHistory).forEach(([id, records]) => {
      records.forEach(r => rows.push([id, r.standardId, String(r.retakeNumber), String(r.correct), String(r.total)]));
    });

    const csv = rows.map(r => r.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `class-${classCode}-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Selected student data
  const studentDetail = selectedStudent ? studentRecords[selectedStudent] : null;
  const studentRetakes = selectedStudent ? (retakeHistory[selectedStudent] || []) : [];

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'heatmap', label: 'Mastery', icon: <CheckCircle2 className="h-4 w-4" /> },
    { id: 'vocab', label: 'Vocab', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'hints', label: 'Hints', icon: <Lightbulb className="h-4 w-4" /> },
    { id: 'retakes', label: 'Retakes', icon: <RotateCcw className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-primary px-4 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-primary-foreground">Perfect Practice — Teacher Dashboard</h1>
            <p className="text-xs text-primary-foreground/70">Class {classCode} · {studentIds.length} students · VUS.2–17</p>
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

      <main className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        {/* Individual Student View */}
        {viewMode === 'student' && selectedStudent && studentDetail && (
          <div className="space-y-4">
            <button onClick={() => { setViewMode('class'); setSelectedStudent(null); }} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to class view
            </button>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="text-lg font-bold text-foreground">{selectedStudent}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {Object.values(studentDetail.unitAttempts).reduce((s, v) => s + v, 0)} total unit attempts
              </p>

              {/* Standards mastery */}
              <div className="mt-4 space-y-2">
                {filteredStandards.map(std => {
                  const rec = studentDetail.standards[std.id];
                  const correct = rec?.correct ?? 0;
                  const attempts = rec?.attempts ?? 0;
                  const level = getMasteryLevel(correct);
                  const pct = attempts > 0 ? Math.round((correct / attempts) * 100) : 0;
                  return (
                    <div key={std.id} className="rounded-lg bg-muted/50 p-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className={`inline-block h-2.5 w-2.5 rounded-full ${getMasteryBg(level)}`} />
                          <span className="text-sm font-medium text-foreground">{std.id}</span>
                          <span className="text-xs text-muted-foreground">{std.title}</span>
                        </div>
                        <span className="text-sm font-bold text-foreground">{correct}/{attempts} ({pct}%)</span>
                      </div>
                      <Progress value={pct} className="h-1.5" />
                    </div>
                  );
                })}
              </div>

              {/* Retake history */}
              {studentRetakes.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-bold text-foreground mb-3">Retake History</h3>
                  <div className="space-y-2">
                    {studentRetakes.map((r, i) => {
                      const scorePct = r.total > 0 ? Math.round((r.correct / r.total) * 100) : 0;
                      const prevPct = i > 0 && studentRetakes[i - 1].total > 0 ? Math.round((studentRetakes[i - 1].correct / studentRetakes[i - 1].total) * 100) : 0;
                      const improving = i > 0 && scorePct > prevPct;
                      const declining = i > 0 && scorePct < prevPct;
                      return (
                        <div key={i} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                          <span className="text-xs font-bold text-muted-foreground w-8">v{r.retakeNumber}</span>
                          <div className="flex-1">
                            <Progress value={scorePct} className="h-2" />
                          </div>
                          <span className={`text-sm font-bold ${scorePct >= 70 ? 'text-success' : 'text-destructive'}`}>{scorePct}%</span>
                          {improving && <TrendingUp className="h-4 w-4 text-success" />}
                          {declining && <TrendingDown className="h-4 w-4 text-destructive" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Class View */}
        {viewMode === 'class' && (
          <>
            {/* Focus Areas */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="text-base font-bold text-foreground mb-1">Focus Areas for Tomorrow</h2>
              <p className="text-xs text-muted-foreground mb-4">Top 3 standards where students are struggling most.</p>
              <div className="space-y-2">
                {focusAreas.map((std, i) => (
                  <div key={std.id} className="flex items-center gap-3 rounded-xl bg-destructive/5 border border-destructive/20 p-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-destructive text-card text-xs font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-foreground">{std.id} — {std.title}</p>
                      <p className="text-xs text-muted-foreground">{std.redPct}% of students have not mastered this standard</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reteach Flags */}
            {reteachFlags.length > 0 && (
              <div className="space-y-2">
                {reteachFlags.map(std => (
                  <div key={std.id} className="flex items-start gap-3 rounded-xl border border-warning bg-warning/10 p-3">
                    <AlertTriangle className="h-5 w-5 shrink-0 text-warning mt-0.5" />
                    <p className="text-sm text-foreground">
                      <strong>Consider reteaching {std.id}: {std.title}</strong> before the next quiz attempt — {std.redPct}% of students scored red.
                    </p>
                  </div>
                ))}
              </div>
            )}

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
              <div className="space-y-4">
                {/* Legend */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><span className="inline-block h-3 w-3 rounded bg-success" /> Mastered (3+)</span>
                  <span className="flex items-center gap-1.5"><span className="inline-block h-3 w-3 rounded bg-warning" /> Developing (1-2)</span>
                  <span className="flex items-center gap-1.5"><span className="inline-block h-3 w-3 rounded bg-destructive" /> Not Mastered (0)</span>
                </div>

                {/* Grid */}
                <div className="overflow-x-auto rounded-xl border border-border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="sticky left-0 z-10 bg-muted/50 min-w-[80px] text-xs font-bold">ID</TableHead>
                        {filteredStandards.map(std => (
                          <TableHead key={std.id} className="text-center text-[10px] font-bold px-1 min-w-[48px]">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="cursor-help">{std.id.replace('VUS.', '')}</span>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-[200px]">
                                <p className="font-bold text-xs">{std.id}: {std.title}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentIds.map(id => (
                        <TableRow key={id} className="cursor-pointer hover:bg-muted/30" onClick={() => { setSelectedStudent(id); setViewMode('student'); }}>
                          <TableCell className="sticky left-0 z-10 bg-card text-xs font-bold whitespace-nowrap text-primary underline">{id}</TableCell>
                          {filteredStandards.map(std => {
                            const stdRec = studentRecords[id]?.standards[std.id];
                            const correct = stdRec?.correct ?? 0;
                            const level = getMasteryLevel(correct);
                            return (
                              <TableCell key={std.id} className="p-0 text-center">
                                <div className={`mx-auto my-1 flex h-7 w-9 items-center justify-center rounded ${getMasteryBg(level)} ${getMasteryText(level)} text-[10px] font-bold`}>
                                  {correct}
                                </div>
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            {/* Vocab Tab */}
            {activeTab === 'vocab' && (
              <div>
                <h2 className="text-base font-bold text-foreground mb-1">Vocabulary Audit</h2>
                <p className="text-sm text-muted-foreground mb-4">Most-clicked terms — these words are blocking comprehension.</p>
                {sortedVocab.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No vocabulary data yet.</p>
                ) : (
                  <div className="space-y-2">
                    {sortedVocab.slice(0, 20).map(([term, count], i) => {
                      const maxCount = sortedVocab[0][1];
                      const barPct = Math.round((count / maxCount) * 100);
                      return (
                        <div key={term} className="rounded-lg border border-border bg-card p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-semibold text-foreground">{term}</span>
                            <span className="text-xs font-bold text-accent">{count} clicks</span>
                          </div>
                          <div className="h-2 rounded-full bg-muted overflow-hidden">
                            <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${barPct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Hints Tab */}
            {activeTab === 'hints' && (
              <div>
                <h2 className="text-base font-bold text-foreground mb-1">Hint Usage</h2>
                <p className="text-sm text-muted-foreground mb-4">High hint counts may indicate genuine struggle or system gaming.</p>
                {sortedHints.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No hint data yet.</p>
                ) : (
                  <div className="space-y-2">
                    {sortedHints.map(([id, count]) => {
                      const maxH = sortedHints[0][1];
                      const barPct = maxH > 0 ? Math.round((count / maxH) * 100) : 0;
                      const isHigh = count > 10;
                      return (
                        <div key={id} className={`rounded-lg border p-3 ${isHigh ? 'border-destructive/50 bg-destructive/5' : 'border-border bg-card'}`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-semibold text-foreground">{id}</span>
                            <span className={`text-xs font-bold ${isHigh ? 'text-destructive' : 'text-muted-foreground'}`}>
                              {count} hints {isHigh && '⚠'}
                            </span>
                          </div>
                          <div className="h-2 rounded-full bg-muted overflow-hidden">
                            <div className={`h-full rounded-full transition-all ${isHigh ? 'bg-destructive' : 'bg-primary'}`} style={{ width: `${barPct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Retakes Tab */}
            {activeTab === 'retakes' && (
              <div>
                <h2 className="text-base font-bold text-foreground mb-1">Retake Analysis</h2>
                <p className="text-sm text-muted-foreground mb-4">Track improvement across versions.</p>
                {Object.keys(retakeHistory).length === 0 ? (
                  <p className="text-sm text-muted-foreground">No retake data yet.</p>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(retakeHistory).map(([remId, records]) => (
                      <div key={remId} className="rounded-xl border border-border bg-card p-4">
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
                              <div key={i} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                                <span className="text-xs font-bold text-muted-foreground w-8">v{r.retakeNumber}</span>
                                <div className="flex-1"><Progress value={scorePct} className="h-2" /></div>
                                <span className={`text-sm font-bold ${scorePct >= 70 ? 'text-success' : 'text-destructive'}`}>{scorePct}%</span>
                                {improving && <TrendingUp className="h-4 w-4 text-success" />}
                                {declining && <TrendingDown className="h-4 w-4 text-destructive" />}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Export buttons */}
            <div className="flex gap-3">
              <Button onClick={exportCSV} variant="outline" className="flex-1 gap-2">
                <FileText className="h-4 w-4" /> Export CSV
              </Button>
              <Button onClick={exportCSV} variant="outline" className="flex-1 gap-2">
                <Download className="h-4 w-4" /> Export PDF
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default TeacherDashboard;
