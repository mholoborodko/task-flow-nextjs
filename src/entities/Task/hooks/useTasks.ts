'use client';

import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/constants';
import { fetchTasks } from '@/entities/Task';

export const useTasks = (boardId: string) => {
  return useQuery({
    queryKey: [QueryKeys.TASKS, boardId],
    queryFn: () => fetchTasks(boardId),
    enabled: !!boardId,
  });
};
