import SearchBox from '../ui/SearchBox';

const AnimeSearchBox = () => {
  return (
    <div className="flex items-center flex-1 max-w-xl gap-6 ml-10">
      <div className="relative flex-1 group">
        <SearchBox></SearchBox>
      </div>
    </div>
  );
};

export default AnimeSearchBox;
