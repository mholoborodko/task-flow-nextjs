import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { QueryKeys } from '@/constants';
import { updateBoard, Board, UpdateBoardRequest } from '@/entities/Board';

export function useUpdateBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ boardId, title, description }: UpdateBoardRequest) =>
      updateBoard(boardId, { title, description }),

    onSuccess: (_, { boardId, title }) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOARDS] });
      queryClient.setQueryData([QueryKeys.BOARD, boardId], (prev: Board) => ({
        ...prev,
        title,
      }));
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOARD] });
    },

    onError: error => {
      toast.error(`Error updating board: ${error.message}`);
    },
  });
}
