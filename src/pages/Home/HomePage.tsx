import SpecialForYouCard from './_Components/SpecialForYouCard';
import HeroCard from './_Components/HeroCard';
import TrendingCard from './_Components/TrendingCard';
import PopularCard from './_Components/PopularCard';
import { cn } from '../../utils/ui.util';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4 min-h-screen  ">
        <HeroCard />

        <div
          aria-label="content-section"
          className={cn([
            'relative z-20 flex flex-col gap-6',
            '-translate-y-15 sm:-translate-y-20 md:-translate-y-30 lg:-translate-y-18 xl:-translate-y-40 2xl:-translate-y-50 3xl:-translate-y-60',
          ])}>
          <SpecialForYouCard />

          <TrendingCard />

          <PopularCard />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
