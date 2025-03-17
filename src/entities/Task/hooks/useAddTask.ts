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
      dueDate,
      priority,
      boardId,
    }: AddTaskRequest) =>
      addTask(title, description, boardId, status, priority, dueDate),

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
