import { Task } from '@/store/taskStore';

import { Button, ButtonVariant } from './Button';
import { Card } from './Card';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  return (
    <Card>
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <Button variant={ButtonVariant.DANGER} onClick={() => onDelete(task.id)}>
        Delete
      </Button>
    </Card>
  );
};
