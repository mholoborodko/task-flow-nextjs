import { DateFormat } from '@/constants';
import { Task, TaskPriority } from '@/entities/Task';
import { convertEnumToString, formatDateString } from '@/utils';

import { Badge, BadgeVariant } from './Badge';
import { Icon } from './Icon';

type TaskCardProps = {
  task: Task;
};

const taskPriorityBadgeVariant = {
  [TaskPriority.LOW]: BadgeVariant.GREEN,
  [TaskPriority.MEDIUM]: BadgeVariant.ORANGE,
  [TaskPriority.HIGH]: BadgeVariant.RED,
};

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200 transition-all hover:shadow-lg space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="text-base font-semibold text-gray-900">{task.title}</h3>
        <Badge
          label={convertEnumToString(task.priority)}
          variant={taskPriorityBadgeVariant[task.priority]}
        />
      </div>
      {task.dueDate && (
        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 text-sm px-3 py-2 rounded-lg w-fit hover:bg-blue-100 transition">
          <Icon className="text-blue-500" name="calendar" />
          <span className="font-semibold">
            {formatDateString(task.dueDate, DateFormat.MDY)}
          </span>
        </div>
      )}
    </div>
  );
};
