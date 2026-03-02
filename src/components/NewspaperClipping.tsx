import { motion } from 'framer-motion';

interface NewspaperClippingProps {
  headline: string;
  children?: React.ReactNode;
}

const NewspaperClipping = ({ headline, children }: NewspaperClippingProps) => (
  <motion.div
    initial={{ opacity: 0, rotate: -1 }}
    animate={{ opacity: 1, rotate: 0 }}
    className="my-4 rounded border-2 border-foreground/20 bg-card p-4 shadow-md"
    style={{
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 27px, hsl(var(--border)) 28px)',
      fontFamily: '"Georgia", "Times New Roman", serif',
    }}
  >
    <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-1">The Daily News</p>
    <h3 className="text-base font-bold leading-tight text-foreground" style={{ fontFamily: '"Georgia", serif' }}>
      {headline}
    </h3>
    {children && <div className="mt-2 text-sm text-muted-foreground">{children}</div>}
  </motion.div>
);

export default NewspaperClipping;
