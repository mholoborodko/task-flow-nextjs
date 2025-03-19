import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/constants';
import { fetchBoards } from '@/entities/Board';

export const useBoards = () => {
  return useQuery({
    queryKey: [QueryKeys.BOARDS],
    queryFn: fetchBoards,
  });
};
