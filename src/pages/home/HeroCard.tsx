import { Heart } from 'lucide-react';
import Button from '../../components/ui/Button';
import TrailerVideo from './TrailerVideo';

const HeroCard = () => {
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
      <section className="relative w-full h-[56.25vw] min-h-100 max-h-240 overflow-hidden">
        <TrailerVideo></TrailerVideo>

        <div className="relative z-20 h-full flex flex-col justify-center px-8 md:px-16 gap-6 max-w-2xl">
          {/* Information */}
          <div className="space-y-4">
            <h1 className="text-white text-4xl md:text-6xl font-bold tracking-tight">
              Chainsaw Man
            </h1>
            <p className="text-gray-200 text-lg md:text-xl leading-relaxed drop-shadow-md">
              Denji has a simple dream — to live a happy and peaceful life,
              spending time with a girl.
            </p>
          </div>

          {/* Action */}
          <div className="flex items-center gap-4">
            <Button size={'lg'} outline={true} variant="primary">
              Learn More
            </Button>
            <Button size={'lg'} leftIcon={<Heart />}>
              To Favourite
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroCard;
