'use client';

import { useQuery } from '@tanstack/react-query';

import { fetchTaskById } from '@/api/tasks';
import { QueryKeys } from '@/constants';

export function useTaskById(taskId: string) {
  return useQuery({
    queryKey: [QueryKeys.TASK, taskId],
    queryFn: () => {
      if (!taskId) return Promise.reject(new Error('Task ID is required'));
      return fetchTaskById(taskId);
    },
    enabled: !!taskId,
  });
}
