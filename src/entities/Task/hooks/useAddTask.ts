import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { QueryKeys } from '@/constants';

import { addTask } from '../api';

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTask,
    onSuccess: (_, { boardId }) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.TASKS, boardId] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOARD, boardId] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add task');
    },
  });
};
