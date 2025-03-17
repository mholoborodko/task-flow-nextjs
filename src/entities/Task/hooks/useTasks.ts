'use client';

import { useQuery } from '@tanstack/react-query';

import { fetchTasks } from '@/api/tasks';
import { QueryKeys } from '@/constants';

export const useTasks = (boardId: string) => {
  return useQuery({
    queryKey: [QueryKeys.TASKS, boardId],
    queryFn: () => fetchTasks(boardId),
    enabled: !!boardId,
  });
};
