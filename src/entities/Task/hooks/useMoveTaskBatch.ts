import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { QueryKeys } from '@/constants';

import { moveTaskBatch } from '../api';
import { Task } from '../model';
import { MoveTaskBatchParams } from '../types';

export const useMoveTaskBatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tasks: MoveTaskBatchParams) => {
      if (tasks.length === 0) throw new Error('No tasks to move');
      await moveTaskBatch(tasks);
    },

    onMutate: async tasks => {
      if (tasks.length === 0) return;

      const boardId = queryClient
        .getQueryData<Task[]>([QueryKeys.TASKS])
        ?.find(t => tasks.some(task => task.id === t.id))?.boardId;

      if (!boardId) return;

      await queryClient.cancelQueries({ queryKey: [QueryKeys.TASKS, boardId] });

      const previousTasks = queryClient.getQueryData<Task[]>([
        QueryKeys.TASKS,
        boardId,
      ]);

      if (!previousTasks) return { previousTasks, boardId };

      const updatedTasks = previousTasks.map(task => {
        const updated = tasks.find(t => t.id === task.id);
        return updated
          ? {
              ...task,
              order_index: updated.orderIndex,
              status: updated.status,
            }
          : task;
      });

      queryClient.setQueryData([QueryKeys.TASKS, boardId], updatedTasks);

      return { previousTasks, boardId };
    },

    onError: (error: Error, _, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(
          [QueryKeys.TASKS, context.boardId],
          context.previousTasks
        );
      }
      toast.error(error.message || 'Error while moving tasks');
    },

    onSuccess: (_, tasks) => {
      if (tasks.length === 0) return;

      const boardId = queryClient
        .getQueryData<Task[]>([QueryKeys.TASKS])
        ?.find(t => tasks.some(task => task.id === t.id))?.boardId;

      if (boardId) {
        queryClient.invalidateQueries({ queryKey: [QueryKeys.TASKS, boardId] });
        queryClient.invalidateQueries({ queryKey: [QueryKeys.BOARD, boardId] });
      }
    },
  });
};
