'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { differenceInDays } from 'date-fns';

import useSearchModal from '@/app/hooks/useSearchModal';
import { TextareaAutosize } from '../ui/textarea-autosize';
import { cn } from '@/utils/helpers';
import { useListings } from '@/app/providers/ListingProvider';

const Search = () => {
  const { setSearchInput } = useListings();
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const locationValue = params?.get('locationValue');
  const startDate = params?.get('startDate');
  const locationLabel = 'Search';
  const [input, setInput] = useState<string>('');

  const chatInputRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInputChange = (value: string) => {
    setInput(value);
    chatInputRef?.current?.focus();
  };

  return (
    <div
      className="relative max-w-sm flex min-h-[40px] w-full items-center justify-center rounded-xl border border-[#232325]
    "
    >
      <TextareaAutosize
        textareaRef={chatInputRef}
        className="text-md flex w-full resize-none rounded-md border-none bg-transparent py-1 pl-3 pr-14  placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50"
        placeholder={`Search`}
        onValueChange={handleInputChange}
        value={input}
        minRows={1}
        maxRows={18}
        onCompositionStart={() => setIsTyping(true)}
        onCompositionEnd={() => setIsTyping(false)}
      />
      <div className="absolute right-3 flex cursor-pointer justify-center hover:opacity-50">
        <BiSearch
          className={cn(
            'rounded bg-[#4169E1] p-1 text-secondary',
            !input ? 'cursor-not-allowed opacity-50' : ''
          )}
          onClick={() => {
            setSearchInput(input);
          }}
          size={25}
        />
      </div>
    </div>
  );
};

export default Search;
