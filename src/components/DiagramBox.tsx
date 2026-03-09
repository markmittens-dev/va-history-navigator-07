import { motion } from 'framer-motion';
import { DiagramData } from '@/types/sol';

interface DiagramBoxProps {
  data: DiagramData;
}

const DiagramBox = ({ data }: DiagramBoxProps) => {
  if (data.type === 'flow' && data.flowSteps) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="my-4 rounded-xl border-2 border-border bg-card p-4 font-mono text-sm"
      >
        <div className="flex flex-wrap items-center justify-center gap-2">
          {data.flowSteps.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`rounded-lg border-2 px-3 py-2 text-center ${
                step === '?' 
                  ? 'border-primary bg-primary/10 font-bold text-primary min-w-[80px]' 
                  : 'border-border bg-muted/30 text-foreground'
              }`}>
                {step}
              </div>
              {i < data.flowSteps!.length - 1 && (
                <span className="text-lg text-muted-foreground">→</span>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (data.type === 'table' && data.tableHeaders && data.tableRows) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="my-4 overflow-x-auto rounded-xl border-2 border-border bg-card"
      >
        {data.tableCaption && (
          <p className="border-b border-border px-4 py-2 text-xs font-semibold text-muted-foreground text-center">
            {data.tableCaption}
          </p>
        )}
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {data.tableHeaders.map((h, i) => (
                <th key={i} className="px-4 py-2 text-left font-semibold text-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.tableRows.map((row, ri) => (
              <tr key={ri} className="border-b border-border last:border-0">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-2 text-foreground">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    );
  }

  if (data.type === 'list' && data.listItems) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="my-4 rounded-xl border-2 border-border bg-card p-4"
      >
        <ul className="space-y-1.5">
          {data.listItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-foreground">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    );
  }

  return null;
};

export default DiagramBox;
