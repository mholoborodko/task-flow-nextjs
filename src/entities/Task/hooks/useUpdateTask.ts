import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { updateTask } from '@/api/tasks';
import { QueryKeys } from '@/constants';

import { Task } from '../model';
import { UpdateTaskRequest } from '../types';

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      title,
      description,
      status,
      dueDate,
      priority,
      boardId,
    }: UpdateTaskRequest) =>
      updateTask(id, title, description, status, dueDate, priority, boardId),

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

      toast.success('Task updated successfully!');
    },

    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update task');
    },
  });
};
