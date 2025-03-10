'use client';

import { useTaskStore } from '@/store/taskStore';

import { TaskCard } from './TaskCard';

export const TaskList: React.FC = () => {
  const { tasks, removeTask } = useTaskStore();

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} onDelete={removeTask} />
      ))}
    </div>
  );
};
