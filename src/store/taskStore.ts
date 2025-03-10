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
  tasks: [
    {
      id: '1',
      title: 'Настроить проект',
      description:
        'Инициализировать Next.js, настроить ESLint, Prettier и Husky',
      status: TaskStatus.TO_DO,
    },
    {
      id: '2',
      title: 'Создать UI-компоненты',
      description: 'Реализовать Button, Modal, TextInput, TaskCard',
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: '3',
      title: 'Добавить drag & drop',
      description: 'Реализовать перетаскивание задач через @hello-pangea/dnd',
      status: TaskStatus.DONE,
    },
    {
      id: '4',
      title: 'Подключить Zustand',
      description: 'Создать хранилище для задач и настроить Zustand',
      status: TaskStatus.TO_DO,
    },
    {
      id: '5',
      title: 'Сохранение в Supabase',
      description: 'Настроить загрузку и сохранение задач в базу данных',
      status: TaskStatus.IN_PROGRESS,
    },
  ],
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
