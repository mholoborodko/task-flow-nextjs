import { Droppable, Draggable } from '@hello-pangea/dnd';

import { Task, TaskStatus } from '@/entities/Task';
import { convertEnumToString } from '@/utils';

import { Icon } from './Icon';
import { TaskCard } from './TaskCard';

interface TaskListProps {
  status: TaskStatus;
  tasks: Task[];
}

const statusIcons = {
  [TaskStatus.TO_DO]: <Icon className="text-yellow-500" name="folder" />,
  [TaskStatus.IN_PROGRESS]: <Icon className="text-blue-500" name="clock" />,
  [TaskStatus.DONE]: <Icon className="text-green-500" name="check-circle" />,
};

export const TaskList = ({ status, tasks }: TaskListProps) => {
  return (
    <Droppable droppableId={String(status)}>
      {provided => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="bg-white p-5 rounded-2xl shadow-md min-h-[200px] sm:min-h-[300px] border border-gray-200 flex flex-col"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-gray-900 font-semibold">
              {statusIcons[status]}
              <h2 className="text-lg">{convertEnumToString(status)}</h2>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 max-h-[calc(100vh-250px)] pb-4">
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="cursor-grab active:cursor-grabbing"
                    >
                      <TaskCard task={task} />
                    </div>
                  )}
                </Draggable>
              ))
            ) : (
              <p className="text-gray-500 text-sm italic">No tasks yet</p>
            )}
          </div>

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskList;
