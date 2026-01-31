import SpecialForYouCard from './_Components/SpecialForYouCard';
import HeroCard from './_Components/HeroCard';
import TrendingCard from './_Components/TrendingCard';
import PopularCard from './_Components/PopularCard';

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
