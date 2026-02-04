import { useCallback, useMemo, useState } from 'react';
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
import type { CheckboxOption } from '../../../types/ui.interface';
import { useAnimeListUI } from '../../../hooks/useAnimeListUI';
import { cn } from '../../../utils/ui.util';
import Button from '../../../components/ui/Button';
import { X } from 'lucide-react';

const AnimeListSidebar = () => {
  const { isMobileFilterOpen, closeMobileFilter } = useAnimeListUI();
  const [openSections, setOpenSections] = useState({
    date: false,
    status: true,
    type: true,
    rating: true,
  });

  return (
    <>
      {/* 1. Mobile Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden',
          isMobileFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
        onClick={closeMobileFilter}
      />
      {/* Sidebar */}
      <aside
        className={cn(
          // --- Mobile Base Styles---
          'fixed inset-y-0 right-0 z-50 w-[85%] max-w-sm flex flex-col',
          'bg-zinc-950 border-l border-white/10 shadow-2xl pt-18',
          'transition-transform duration-300 ease-in-out',
          // Mobile animation：when open x=0，remove from screen when close
          isMobileFilterOpen ? 'translate-x-0' : 'translate-x-full',

          // --- Desktop Styles ---
          'lg:static lg:w-80 lg:translate-x-0 lg:pt-0',
          'lg:bg-transparent lg:shadow-none lg:border-l-0 lg:border-r',
        )}>
        {/* Mobile layer title */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 lg:hidden shrink-0">
          <h2 className="text-xl font-bold text-white tracking-wide">
            Filters
          </h2>
          <Button outline onClick={closeMobileFilter}>
            <X size={24} />
          </Button>
        </div>

        {/* Hidden on mobile */}
        <div className="hidden lg:block p-6 pt-8 pb-4 shrink-0">
          <h2 className="text-xl font-bold text-white tracking-wide">
            Filters
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-6 pt-2 lg:pt-0 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
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
        </div>

        <div className="p-4 border-t border-white/10 bg-zinc-950 lg:hidden shrink-0 pb-8">
          <button
            onClick={closeMobileFilter}
            className="w-full py-3 bg-white text-black font-bold rounded-xl active:scale-[0.98] transition-transform">
            View Results
          </button>
        </div>
      </aside>
    </>
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
      label: type.label,
      checked: urlRequest.type === type.id,
    }));
    return result;
  }, [urlRequest.type]);

  const handleOnChange = useCallback(
    (ids: string[]) => {
      setSingleParam('type', ids.join(','));
    },
    [setSingleParam],
  );

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
      label: type.label,
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
      label: type.label,
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
