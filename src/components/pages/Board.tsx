'use client';

import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';

import { QueryKeys } from '@/constants';
import {
  BoardHeaderSkeleton,
  BoardSkeleton,
  useBoardById,
} from '@/entities/Board';
import {
  TaskList,
  TaskStatus,
  useMoveTaskBatch,
  useTasks,
} from '@/entities/Task';
import { CreateOrUpdateTaskModal } from '@/features';
import { useToggle } from '@/hooks';

import { Button, EmptyState, Icon, LoaderContainer } from '../shared';
import { ButtonVariant } from '../shared/Button';

export const Board = () => {
  const router = useRouter();
  const { id: boardId }: { id: string } = useParams();

  const createOrUpdateTaskModalSwitcher = useToggle(false);
  const isMovingTask = useToggle(false);

  const { data: board, isLoading: isLoadingBoard } = useBoardById(boardId);
  const { data: tasks, isLoading: isLoadingTasks } = useTasks(boardId);

  const { mutate: moveTaskBatch } = useMoveTaskBatch();

  const queryClient = useQueryClient();

  const onDragEnd = useCallback(
    async (result: DropResult) => {
      const { source, destination, draggableId } = result;

      if (!destination) return;

      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) {
        return;
      }

      const movedTask = tasks?.find(task => task.id === draggableId);
      if (!movedTask) return;

      const isSameColumn = source.droppableId === destination.droppableId;
      const updatedTasks = tasks?.filter(task => task.id !== draggableId) || [];

      const tasksWithNewStatus = updatedTasks.filter(
        task => task.status === destination.droppableId
      );
      const tasksWithoutNewStatus = updatedTasks.filter(
        task => task.status !== destination.droppableId
      );

      tasksWithNewStatus.splice(destination.index, 0, {
        ...movedTask,
        ...(isSameColumn
          ? {}
          : { status: destination.droppableId as TaskStatus }),
      });

      const reorderedTasks = tasksWithNewStatus.map((task, index) => ({
        ...task,
        orderIndex: index,
      }));

      try {
        isMovingTask.on();

        queryClient.setQueryData(
          [QueryKeys.TASKS, boardId],
          [...tasksWithoutNewStatus, ...reorderedTasks]
        );

        moveTaskBatch(reorderedTasks);
      } catch (error) {
        toast.error(JSON.stringify(error));
      } finally {
        isMovingTask.off();
      }
    },
    [boardId, isMovingTask, moveTaskBatch, queryClient, tasks]
  );

  const statuses = useMemo(
    () => [TaskStatus.TO_DO, TaskStatus.IN_PROGRESS, TaskStatus.DONE],
    []
  );

  const filteredTasks = useMemo(() => {
    return statuses.map(status => ({
      status,
      tasks: tasks?.filter(task => task.status === status) || [],
    }));
  }, [tasks, statuses]);

  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex items-center justify-between gap-4">
        <LoaderContainer
          customLoader={<BoardHeaderSkeleton />}
          isLoading={isLoadingBoard}
        >
          <div className="flex items-center gap-3">
            <Button
              label={
                <Icon className="text-gray-500" name="back-arrow" size={20} />
              }
              variant={ButtonVariant.SECONDARY}
              onClick={() => router.push('/')}
            />
            <h1 className="text-2xl font-bold text-blue-950">
              {board?.title || ''}
            </h1>
          </div>
        </LoaderContainer>
        <Button
          disabled={isLoadingBoard}
          label="Add task"
          onClick={createOrUpdateTaskModalSwitcher.on}
        />
      </div>
      <LoaderContainer
        customLoader={<BoardSkeleton />}
        emptyStateComponent={
          <div className="flex-center h-full">
            <EmptyState message="No tasks here yet" />
          </div>
        }
        isEmpty={!tasks?.length}
        isLoading={isLoadingBoard || isLoadingTasks || isMovingTask.value}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="mt-8 grid grid-cols-3 gap-4 h-full">
            {filteredTasks.map(({ status, tasks }) => (
              <TaskList key={status} status={status} tasks={tasks} />
            ))}
          </div>
        </DragDropContext>
      </LoaderContainer>
      <CreateOrUpdateTaskModal
        boardId={boardId}
        isOpen={createOrUpdateTaskModalSwitcher.value}
        onClose={createOrUpdateTaskModalSwitcher.off}
      />
    </div>
  );
};

export default Board;
