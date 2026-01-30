import Button from '../../components/ui/Button';

import SpecialForYouCard from './SpecialForYouCard';
import HeroCard from './HeroCard';
import TrendingCard from './TrendingCard';
import PopularCard from './PopularCard';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        <HeroCard />

        <SpecialForYouCard />

        <TrendingCard />

        <PopularCard />
      </div>
    </div>
  );
};

export default HomePage;
