import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { updateTask } from '@/api/tasks'; // Предположим, у тебя есть API для обновления задачи
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
      due_date,
      priority,
      board_id,
    }: UpdateTaskRequest) =>
      updateTask(id, title, description, status, due_date, priority, board_id),

    onSuccess: updatedTask => {
      queryClient.setQueryData([QueryKeys.TASKS], (oldTasks: Task[] = []) =>
        oldTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
      );

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.BOARD, updatedTask.board_id],
      });

      toast.success('Task updated successfully!');
    },

    onError: (error: any) => {
      toast.error(error.message || 'Failed to update task');
    },
  });
};
