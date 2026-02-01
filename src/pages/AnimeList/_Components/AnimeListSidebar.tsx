import { useMemo, useState } from 'react';
import { useUrlQueryState } from '../../../hooks/useUrlQueryState';
import DatePicker from '../../../components/ui/DatePicker';

import AccordionSection from '../../../components/ui/AccordionSection';
import {
  getAnimeRatingFilterList,
  getAnimeStatusFilterList,
  getAnimeTypeFilterList,
} from '../../../utils/anime.util';
import Checkbox from '../../../components/ui/Checkbox';
import { useCheckboxGroup } from '../../../hooks/useCheckboxGroup';
import Button from '../../../components/ui/Button';
import type { CheckboxOption } from '../../../types/ui.interface';
import {
  getAnimeRatingLabel,
  getAnimeStatusLabel,
  getAnimeTypeLabel,
} from '../../../utils/labelHelper';

const AnimeListSidebar = () => {
  const [openSections, setOpenSections] = useState({
    date: false,
    status: true,
    type: true,
    rating: true,
  });

  return (
    <aside className="w-60 lg:w-80 border-r bg-black/70 border-white/10 p-6 pt-8 hidden lg:block shrink-0">
      <h2 className="text-xl font-bold text-white mb-8 tracking-wide">
        Filters
      </h2>

      <DateFilterSection
        isOpen={openSections.date}
        onToggle={() =>
          setOpenSections({ ...openSections, date: !openSections.date })
        }
      />

      <StatusFilterSection
        isOpen={openSections.status}
        onToggle={() =>
          setOpenSections({ ...openSections, status: !openSections.status })
        }
      />

      <AnimeTypeFilterSection
        isOpen={openSections.type}
        onToggle={() =>
          setOpenSections({ ...openSections, type: !openSections.type })
        }
      />

      <RatingFilterSection
        isOpen={openSections.rating}
        onToggle={() =>
          setOpenSections({ ...openSections, rating: !openSections.rating })
        }
      />
    </aside>
  );
};

const DateFilterSection = ({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const { urlRequest, setSingleParam } = useUrlQueryState();
  return (
    <AccordionSection
      title="Date"
      isOpen={isOpen}
      onToggle={onToggle}
      className="mb-4">
      <div className="flex flex-col w-full space-y-4 animate-in fade-in slide-in-from-top-2">
        {/* Start Date */}
        <div className="flex-1">
          <label className="block text-sm text-gray-400 mb-1 ml-1 ">
            Start From
          </label>
          <DatePicker
            value={urlRequest.start_date}
            onChange={(e) => {
              setSingleParam('start_date', e.target.value);
            }}
          />
        </div>
        {/* End Date */}
        <div className="flex-1">
          <label className="block text-sm text-gray-400 mb-1 ml-1 ">
            End By
          </label>
          <DatePicker
            value={urlRequest.end_date}
            onChange={(e) => {
              setSingleParam('end_date', e.target.value);
            }}
          />
        </div>
      </div>{' '}
    </AccordionSection>
  );
};

const AnimeTypeFilterSection = ({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const { urlRequest, setSingleParam } = useUrlQueryState();

  const animeFilters: CheckboxOption[] = useMemo(() => {
    const types = getAnimeTypeFilterList();
    const result = types.map((type) => ({
      id: type.id,
      label: getAnimeTypeLabel(type.id),
      checked: urlRequest.type === type.id,
    }));
    return result;
  }, [urlRequest.type]);

  const handleOnChange = (ids: string[]) => {
    setSingleParam('type', ids.join(','));
  };

  const { options, toggleSingle } = useCheckboxGroup(
    animeFilters,
    handleOnChange,
  );

  return (
    <AccordionSection
      title="Anime Type"
      isOpen={isOpen}
      onToggle={onToggle}
      className="mb-4">
      {options.map((filter) => (
        <Checkbox
          className="mb-4"
          key={filter.id}
          label={filter.label}
          checked={filter.checked}
          onChange={(v) => {
            toggleSingle(filter.id);
          }}
        />
      ))}
    </AccordionSection>
  );
};

const StatusFilterSection = ({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const { urlRequest, setSingleParam } = useUrlQueryState();

  const animeFilters: CheckboxOption[] = useMemo(() => {
    const types = getAnimeStatusFilterList();
    const result = types.map((type) => ({
      id: type.id,
      label: getAnimeStatusLabel(type.id),
      checked: urlRequest.status === type.id,
    }));
    return result;
  }, [urlRequest.status]);

  const handleOnChange = (ids: string[]) => {
    setSingleParam('status', ids.join(','));
  };

  const { options, toggleSingle } = useCheckboxGroup(
    animeFilters,
    handleOnChange,
  );

  return (
    <AccordionSection
      title="Status"
      isOpen={isOpen}
      onToggle={onToggle}
      className="mb-4">
      {options.map((filter) => (
        <Checkbox
          className="mb-4"
          key={filter.id}
          label={filter.label}
          checked={filter.checked}
          onChange={(v) => {
            toggleSingle(filter.id);
          }}
        />
      ))}
    </AccordionSection>
  );
};

const RatingFilterSection = ({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const { urlRequest, setSingleParam } = useUrlQueryState();

  const animeFilters: CheckboxOption[] = useMemo(() => {
    const types = getAnimeRatingFilterList();
    const result = types.map((type) => ({
      id: type.id,
      label: getAnimeRatingLabel(type.id),
      checked: urlRequest.rating === type.id,
    }));
    return result;
  }, [urlRequest.rating]);

  const handleOnChange = (ids: string[]) => {
    setSingleParam('rating', ids.join(','));
  };

  const { options, toggleSingle } = useCheckboxGroup(
    animeFilters,
    handleOnChange,
  );

  return (
    <AccordionSection
      title="Ratings"
      isOpen={isOpen}
      onToggle={onToggle}
      className="mb-4">
      {options.map((filter) => (
        <Checkbox
          className="mb-4"
          key={filter.id}
          label={filter.label}
          checked={filter.checked}
          onChange={(v) => {
            toggleSingle(filter.id);
          }}
        />
      ))}
    </AccordionSection>
  );
};

export default AnimeListSidebar;
