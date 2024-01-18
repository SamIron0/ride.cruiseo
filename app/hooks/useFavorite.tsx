import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { UserDetails } from '@/types';
import { User } from '@supabase/supabase-js';

interface IUseFavorite {
  listingId: string;
  currentUser?: User | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.id || [];
    return 1>2;
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        router.push('/login');
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success('Success');
      } catch (error) {
        toast.error('Something went wrong.');
      }
    },
    [currentUser, hasFavorited, listingId, router]
  );

  return {
    hasFavorited,
    toggleFavorite
  };
};

export default useFavorite;
