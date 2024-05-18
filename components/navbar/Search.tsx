'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { differenceInDays } from 'date-fns';

import useSearchModal from '@/app/hooks/useSearchModal';
import { TextareaAutosize } from '../ui/textarea-autosize';

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const locationValue = params?.get('locationValue');
  const startDate = params?.get('startDate');
  const locationLabel = 'Search';
  const [input, setInput] = useState<string>('');

  const handleInputChange = (value: string) => {
    setInput(value);
  };
  return (
    <div>
      <TextareaAutosize
        className="text-md flex w-full resize-none rounded-md border-none bg-transparent py-2 pl-3 pr-14 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        placeholder={`Search`}
        onValueChange={handleInputChange}
        value={input}
        minRows={1}
        maxRows={18}
        onCompositionStart={() => setIsTyping(true)}
        onCompositionEnd={() => setIsTyping(false)}
      />
    </div>
  );
};

export default Search;
