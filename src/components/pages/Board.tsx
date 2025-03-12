'use client';

import { DragDropContext, DropResult } from '@hello-pangea/dnd';

import { TaskStatus, useTaskStore } from '@/store/taskStore';

import TaskList from '../shared/TaskList';

const Board = () => {
  const { tasks, moveTask } = useTaskStore();

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
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-4">
        {statuses.map(status => (
          <TaskList key={status} status={status} tasks={tasks} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;
