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
}));
