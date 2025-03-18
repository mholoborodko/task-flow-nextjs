'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { QueryKeys } from '@/constants';
import { removeBoard } from '@/entities/Board';

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
