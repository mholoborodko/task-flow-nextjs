import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { QueryKeys } from '@/constants';
import { removeTask } from '@/entities/Task';

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => removeTask(id),
    onSuccess: () => {
      toast.success('Task deleted successfully!');
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.BOARD],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.TASKS],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete task');
    },
  });
};
