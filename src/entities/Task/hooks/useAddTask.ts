import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { QueryKeys } from '@/constants';
import { addTask } from '@/entities/Task';

import { Task } from '../model';
import { AddTaskRequest } from '../types';

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: AddTaskRequest) => addTask(task),

    onSuccess: newTask => {
      queryClient.setQueryData(
        [QueryKeys.TASKS, newTask.boardId],
        (oldTasks: Task[] = []) => {
          return [...oldTasks, newTask];
        }
      );

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.TASKS, newTask.boardId],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.BOARD, newTask.boardId],
      });
    },

    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add task');
    },
  });
};
