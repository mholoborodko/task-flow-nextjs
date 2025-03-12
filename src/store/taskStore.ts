import { create } from 'zustand';

export enum TaskStatus {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
};

export type TaskStore = {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  moveTask: (id: string, newStatus: TaskStatus, newIndex: number) => void;
};

export const useTaskStore = create<TaskStore>(set => ({
  tasks: [],
  addTask: task => set(state => ({ tasks: [...state.tasks, task] })),
  removeTask: id =>
    set(state => ({ tasks: state.tasks.filter(task => task.id !== id) })),
  updateTask: (id, updatedTask) =>
    set(state => ({
      tasks: state.tasks.map(task =>
        task.id === id ? { ...task, ...updatedTask } : task
      ),
    })),
  moveTask: (id, newStatus, newIndex) =>
    set(state => {
      const taskToMove = state.tasks.find(task => task.id === id);
      if (!taskToMove) return state;

      const updatedTasks = state.tasks.filter(task => task.id !== id);

      const tasksWithNewStatus = updatedTasks.filter(
        task => task.status === newStatus
      );
      const tasksWithoutNewStatus = updatedTasks.filter(
        task => task.status !== newStatus
      );

      tasksWithNewStatus.splice(newIndex, 0, {
        ...taskToMove,
        status: newStatus,
      });

      return { tasks: [...tasksWithoutNewStatus, ...tasksWithNewStatus] };
    }),
}));
