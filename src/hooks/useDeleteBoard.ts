'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { removeBoard } from '@/api/boards';
import { QueryKeys } from '@/utils/queryKeys';

export function useRemoveBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeBoard,
    onSuccess: () => {
      toast.success('Board removed successfully');
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOARDS] });
    },
    onError: error => {
      toast.error(error.message);
    },
  });
}
