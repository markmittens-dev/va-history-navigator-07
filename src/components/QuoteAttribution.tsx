import { motion } from 'framer-motion';

interface QuoteAttributionProps {
  quote: string;
  source: string;
}

const QuoteAttribution = ({ quote, source }: QuoteAttributionProps) => (
  <motion.blockquote
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    className="my-4 border-l-4 border-primary bg-card rounded-r-xl p-4"
  >
    <p className="text-sm italic text-foreground leading-relaxed">"{quote}"</p>
    <footer className="mt-2 text-xs font-semibold text-primary">— {source}</footer>
  </motion.blockquote>
);

export default QuoteAttribution;
