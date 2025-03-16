import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { addBoard } from '@/api/boards';
import { QueryKeys } from '@/constants';
import { AddBoardRequest, Board } from '@/entities/Board';

export const useAddBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ title, description }: AddBoardRequest) =>
      addBoard(title, description),

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
