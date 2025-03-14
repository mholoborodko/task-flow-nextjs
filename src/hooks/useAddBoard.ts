import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { addBoard } from '@/api/boards';
import { Board } from '@/entities/Board';
import { QueryKeys } from '@/utils/queryKeys';

export const useAddBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addBoard,
    onSuccess: newBoard => {
      queryClient.setQueryData(
        [QueryKeys.BOARDS],
        (oldBoards: Board[] = []) => [...oldBoards, newBoard]
      );
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOARD] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to add board');
    },
  });
};
