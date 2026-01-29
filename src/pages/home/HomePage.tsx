import Button from '../../components/ui/Button';

import SpecialForYouCard from './SpecialForYouCard';
import HeroCard from './HeroCard';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        <HeroCard></HeroCard>
        <SpecialForYouCard></SpecialForYouCard>
      </div>
      <div className="min-w-full px-8 self-end">
        <Button className="w-full ">Show More</Button>
      </div>
    </div>
  );
};

export default HomePage;
