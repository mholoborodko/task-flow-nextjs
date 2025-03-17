import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { removeTask } from '@/api/tasks';
import { QueryKeys } from '@/constants';

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => removeTask(id),
    onSuccess: () => {
      toast.success('Task deleted successfully!');
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.BOARD],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete task');
    },
  });
};
