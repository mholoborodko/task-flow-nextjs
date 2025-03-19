import React from 'react';

import { Icon } from '@/components/shared';
import { Badge } from '@/components/shared/Badge';
import { DateFormat } from '@/constants';
import {
  Task,
  TASK_PRIORITY_BADGE_VARIANT,
  TaskDetails,
} from '@/entities/Task';
import { useToggle } from '@/hooks';
import { convertEnumToString, formatDateString } from '@/utils';

type TaskCardProps = {
  task: Task;
};

export const TaskCard: React.FC<TaskCardProps> = React.memo(({ task }) => {
  const drawerSwitcher = useToggle(false);

  return (
    <div
      className="bg-white p-5 rounded-xl shadow-md border border-gray-200 transition-all hover:shadow-lg space-y-4 cursor-pointer"
      onClick={drawerSwitcher.on}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-base font-semibold text-gray-900">{task.title}</h3>
        <Badge
          label={convertEnumToString(task.priority)}
          variant={TASK_PRIORITY_BADGE_VARIANT[task.priority]}
        />
      </div>
      {task.dueDate && (
        <div className="flex items-center gap-2 bg-gradient-to-r from-rose-50 to-rose-100 text-rose-800 text-sm px-3 py-2 rounded-lg w-fit hover:from-rose-100 hover:to-rose-200 transition">
          <Icon className="text-rose-600" name="calendar" />
          <span className="font-semibold">
            {formatDateString(task.dueDate, DateFormat.MDY)}
          </span>
        </div>
      )}
      <TaskDetails
        isOpen={drawerSwitcher.value}
        task={task}
        onClose={drawerSwitcher.off}
      />
    </div>
  );
});
