'use client';

import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useParams, useRouter } from 'next/navigation';

import {
  BoardHeaderSkeleton,
  BoardSkeleton,
  useBoardById,
} from '@/entities/Board';
import { TaskList, TaskStatus, useTasks } from '@/entities/Task';
import { CreateOrUpdateTaskModal } from '@/features';
import { useToggle } from '@/hooks';
import { useTaskStore } from '@/store/taskStore';

import { Button, EmptyState, Icon, LoaderContainer } from '../shared';
import { ButtonVariant } from '../shared/Button';

export const Board = () => {
  const router = useRouter();
  const { id: boardId }: { id: string } = useParams();

  const createOrUpdateTaskModalSwitcher = useToggle(false);

  const { data: board, isLoading: isLoadingBoard } = useBoardById(boardId);
  const { data: tasks, isLoading: isLoadingTasks } = useTasks(boardId);

  const { moveTask } = useTaskStore();

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    moveTask(
      draggableId,
      destination.droppableId as TaskStatus,
      destination.index
    );
  };

  const statuses = [TaskStatus.TO_DO, TaskStatus.IN_PROGRESS, TaskStatus.DONE];

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
        isLoading={isLoadingBoard || isLoadingTasks}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="mt-8 grid grid-cols-3 gap-4 h-full">
            {statuses.map(taskStatus => (
              <TaskList
                key={taskStatus}
                status={taskStatus}
                tasks={
                  tasks?.filter(({ status }) => status === taskStatus) || []
                }
              />
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
