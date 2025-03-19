import { TaskPriority, TaskStatus } from '../model';

export type AddTaskParams = {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  priority: TaskPriority;
  boardId: string;
};

export interface UpdateTaskParams extends AddTaskParams {
  id: string;
}

export type MoveTaskBatchParams = {
  id: string;
  title: string;
  priority: TaskPriority;
  orderIndex: number;
  status: TaskStatus;
}[];
