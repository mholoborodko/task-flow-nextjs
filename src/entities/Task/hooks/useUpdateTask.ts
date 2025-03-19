import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { QueryKeys } from '@/constants';
import { updateTask } from '@/entities/Task';

import { Task } from '../model';
import { UpdateTaskParams } from '../types';

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: UpdateTaskParams) => updateTask(task),

    onSuccess: updatedTask => {
      queryClient.setQueryData(
        [QueryKeys.TASKS, updatedTask.boardId],
        (oldTasks: Task[] = []) =>
          oldTasks.map(task =>
            task.id === updatedTask.id ? updatedTask : task
          )
      );

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.BOARD, updatedTask.boardId],
      });

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.TASKS, updatedTask.boardId],
      });

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.TASK, updatedTask.id],
      });
    },

    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update task');
    },
  });
};
