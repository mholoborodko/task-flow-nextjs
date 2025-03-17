import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { addTask } from '@/api/tasks';
import { QueryKeys } from '@/constants';

import { Task } from '../model';
import { AddTaskRequest } from '../types';

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      title,
      description,
      status,
      due_date,
      priority,
      board_id,
    }: AddTaskRequest) =>
      addTask(title, description, board_id, status, priority, due_date),

    onSuccess: newTask => {
      queryClient.setQueryData([QueryKeys.TASKS], (oldTasks: Task[] = []) => [
        ...oldTasks,
        newTask,
      ]);

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.BOARD, newTask.board_id],
      });
    },

    onError: (error: any) => {
      toast.error(error.message || 'Failed to add task');
    },
  });
};
