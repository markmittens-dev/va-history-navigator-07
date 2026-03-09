import { motion } from 'framer-motion';
import { Image } from 'lucide-react';

interface ImageDescriptionProps {
  description: string;
}

const ImageDescription = ({ description }: ImageDescriptionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="my-4 rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 p-4"
  >
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Image className="h-4 w-4 text-primary" />
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">IMAGE</p>
        <p className="text-sm leading-relaxed text-foreground italic">{description}</p>
      </div>
    </div>
  </motion.div>
);

export default ImageDescription;
