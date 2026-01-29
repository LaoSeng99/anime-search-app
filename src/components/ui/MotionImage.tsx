import { motion, type HTMLMotionProps } from 'framer-motion';
import { useState } from 'react';

interface MotionImageProps extends HTMLMotionProps<'img'> {
  src: string;
  alt: string;
  className?: string;
}

const MotionImage = ({
  src,
  alt,
  className = '',
  ...props
}: MotionImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={() => setIsLoaded(true)}
      // Load animation
      initial={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }}
      animate={{
        opacity: isLoaded ? 1 : 0,
        filter: isLoaded ? 'blur(0px)' : 'blur(10px)',
        scale: isLoaded ? 1 : 1.1,
      }}
      transition={{
        duration: 0.4,
        ease: 'easeInOut',
      }}
      className={`object-cover  ${className}
      `}
      {...props}
    />
  );
};

export default MotionImage;
