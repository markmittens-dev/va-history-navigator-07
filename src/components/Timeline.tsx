import { motion } from 'framer-motion';
import { TimelineEvent } from '@/types/sol';

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline = ({ events }: TimelineProps) => {
  if (!events || events.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-4 overflow-x-auto"
    >
      <div className="relative flex items-center min-w-max px-2 py-6">
        {/* Horizontal line */}
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-border -translate-y-1/2" />

        {events.map((event, i) => (
          <div key={i} className="relative flex flex-col items-center mx-4 first:ml-0 last:mr-0" style={{ minWidth: '80px' }}>
            {/* Year label - alternating top/bottom */}
            {i % 2 === 0 ? (
              <>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="mb-2 text-center"
                >
                  <p className="text-[10px] font-bold text-primary">{event.year}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight max-w-[80px]">{event.label}</p>
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.15 + 0.1 }}
                  className={`z-10 h-4 w-4 rounded-full border-2 ${
                    event.highlight
                      ? 'bg-primary border-primary-foreground shadow-md shadow-primary/30'
                      : 'bg-muted border-border'
                  }`}
                />
                <div className="mt-2 h-6" />
              </>
            ) : (
              <>
                <div className="mb-2 h-6" />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.15 + 0.1 }}
                  className={`z-10 h-4 w-4 rounded-full border-2 ${
                    event.highlight
                      ? 'bg-primary border-primary-foreground shadow-md shadow-primary/30'
                      : 'bg-muted border-border'
                  }`}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="mt-2 text-center"
                >
                  <p className="text-[10px] font-bold text-primary">{event.year}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight max-w-[80px]">{event.label}</p>
                </motion.div>
              </>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Timeline;
