'use client'

import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import React from 'react';

export const CustomSplitText = ({ text }: { text: string }) => {
  const [splitText, setSplitText] = React.useState<string[]>([]);

  React.useEffect(() => {
    // Dividir el texto en palabras (en lugar de caracteres)
    setSplitText(text.split(' '));
  }, [text]);

  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true); // Establece el estado después de que se haya renderizado en el cliente
  }, []);
  
  if (!isClient) return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 6 }).map((line, i) => <Skeleton key={i} className="w-full h-4 rounded" />)}
    </div>
  );

  return (
    <motion.div>
      {splitText.map((word, index) => (
        <motion.span
          key={index}
          initial={{ position: 'relative', bottom: '-5px', opacity: 0, y: 50 }}
          animate={{ position: 'relative', bottom: '0', opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.02, // Ajusta el retraso entre palabras
            type: 'spring',
            stiffness: 200,
            damping: 25,
          }}
        >
          {word}
          {/* Agregar espacio entre palabras */}
          {index < splitText.length - 1 && ' '}
        </motion.span>
      ))}
    </motion.div>
  );
};
