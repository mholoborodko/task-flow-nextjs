import { useQuery } from '@tanstack/react-query';

import { fetchBoards } from '@/api/boards';
import { QueryKeys } from '@/utils/queryKeys';

export const useBoards = () => {
  return useQuery({
    queryKey: [QueryKeys.BOARDS],
    queryFn: fetchBoards,
  });
};
