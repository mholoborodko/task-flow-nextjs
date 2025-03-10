import { Droppable, Draggable } from '@hello-pangea/dnd';

import { Task, TaskStatus, useTaskStore } from '@/store/taskStore';

import { TaskCard } from './TaskCard';

interface TaskListProps {
  status: TaskStatus;
  tasks: Task[];
}

const TaskList = ({ status, tasks }: TaskListProps) => {
  const { removeTask } = useTaskStore();
  const filteredTasks = tasks.filter(task => task.status === status);

  return (
    <Droppable droppableId={String(status)}>
      {provided => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md min-h-[300px]"
        >
          <h2 className="text-lg font-semibold mb-2">{status}</h2>
          <div className="flex flex-col gap-3">
            {filteredTasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard task={task} onDelete={removeTask} />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskList;
