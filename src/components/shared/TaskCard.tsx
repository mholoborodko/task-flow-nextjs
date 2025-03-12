import { Task } from '@/store/taskStore';

import { Button, ButtonVariant } from './Button';

type TaskCardProps = {
  task: Task;
  onDelete: (taskId: string) => void;
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{task.description}</p>
      <Button
        className="mt-2"
        variant={ButtonVariant.DANGER}
        onClick={() => onDelete(task.id)}
      >
        Delete
      </Button>
    </div>
  );
};
