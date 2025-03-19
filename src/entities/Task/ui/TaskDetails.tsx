import { useEffect } from 'react';

import {
  ConfirmActionModal,
  Dropdown,
  Icon,
  SideDrawer,
} from '@/components/shared';
import { Badge } from '@/components/shared/Badge';
import { DropdownOption } from '@/components/shared/Dropdown';
import { DateFormat } from '@/constants';
import {
  Task,
  TASK_PRIORITY_BADGE_VARIANT,
  TASK_STATUS_BADGE_VARIANT,
  useDeleteTask,
} from '@/entities/Task';
import { CreateOrUpdateTaskModal } from '@/features';
import { useToggle } from '@/hooks';
import { convertEnumToString, formatDateString } from '@/utils';

type TaskDetailsProps = {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
};

export const TaskDetails: React.FC<TaskDetailsProps> = ({
  task,
  isOpen,
  onClose,
}) => {
  const isDrawerClosed = useToggle(false);
  const shouldDrawerBeOpen = isOpen && !isDrawerClosed.value;

  const createOrUpdateTaskModalSwitcher = useToggle(false);
  const deleteBoardModalSwitcher = useToggle(false);

  const { mutate: removeTask } = useDeleteTask();

  useEffect(() => {
    if (
      createOrUpdateTaskModalSwitcher.value ||
      deleteBoardModalSwitcher.value
    ) {
      isDrawerClosed.on();
      onClose();
    }
  }, [
    createOrUpdateTaskModalSwitcher.value,
    deleteBoardModalSwitcher.value,
    isDrawerClosed,
    onClose,
  ]);

  useEffect(() => {
    if (
      !createOrUpdateTaskModalSwitcher.value &&
      !deleteBoardModalSwitcher.value &&
      isOpen
    ) {
      isDrawerClosed.off();
    }
  }, [
    createOrUpdateTaskModalSwitcher.value,
    deleteBoardModalSwitcher.value,
    isDrawerClosed,
    isOpen,
  ]);

  const options: DropdownOption[] = [
    {
      label: 'Edit',
      onSelect: createOrUpdateTaskModalSwitcher.on,
    },
    {
      label: 'Delete',
      className: 'text-red-500',
      onSelect: deleteBoardModalSwitcher.on,
    },
  ];

  return (
    <>
      <SideDrawer
        isOpen={shouldDrawerBeOpen}
        title="Task Details"
        width="500px"
        onClose={() => {
          isDrawerClosed.on();
          onClose();
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto space-y-6 p-2">
            <div className="border-b pb-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {task.title}
                </h3>
                <Dropdown options={options}>
                  {() => (
                    <button className="flex-center p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors">
                      <Icon name="more" size={20} />
                    </button>
                  )}
                </Dropdown>
              </div>
              {task.createdAt && (
                <div className="flex items-center gap-2 mt-2 text-gray-700">
                  <Icon className="text-blue-500" name="clock" />
                  <span className="font-medium">
                    Created at:{' '}
                    {formatDateString(task.createdAt, DateFormat.MDYH)}
                  </span>
                </div>
              )}
              {task.dueDate && (
                <div className="flex items-center gap-2 mt-2 text-gray-700">
                  <Icon className="text-red-500" name="calendar" />
                  <span className="font-medium">
                    Due date: {formatDateString(task.dueDate, DateFormat.MDY)}
                  </span>
                </div>
              )}
            </div>
            <div className="border-b pb-4 grid grid-cols-2 gap-4 items-center">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 font-medium">Status:</span>
                <Badge
                  label={convertEnumToString(task.status)}
                  variant={TASK_STATUS_BADGE_VARIANT[task.status]}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 font-medium">Priority:</span>
                <Badge
                  label={convertEnumToString(task.priority)}
                  variant={TASK_PRIORITY_BADGE_VARIANT[task.priority]}
                />
              </div>
            </div>
            <div className="pb-4">
              <span className="text-gray-500 font-medium">Description:</span>
              <p className="text-gray-600 mt-1">
                {task.description || 'No description available'}
              </p>
            </div>
          </div>
        </div>
      </SideDrawer>
      <CreateOrUpdateTaskModal
        boardId={task.boardId}
        isOpen={createOrUpdateTaskModalSwitcher.value}
        taskId={task.id}
        onClose={createOrUpdateTaskModalSwitcher.off}
      />
      <ConfirmActionModal
        actionMessage="Are you sure you want to delete this task?"
        isOpen={deleteBoardModalSwitcher.value}
        title="Delete task"
        onClose={deleteBoardModalSwitcher.off}
        onConfirm={() => removeTask(task.id)}
      />
    </>
  );
};
