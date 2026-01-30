import { useInView } from 'react-intersection-observer';

interface LazyLoadSectionProps {
  children: (inView: boolean) => React.ReactNode;
  rootMargin?: string;
}

const LazyLoadSection = ({
  children,
  rootMargin = '200px',
}: LazyLoadSectionProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin,
  });

  return (
    <div ref={ref} className={`min-h-[${rootMargin}]`}>
      {children(inView)}
    </div>
  );
};

export default LazyLoadSection;
