import { TaskPriority, TaskStatus } from '../model';

export type AddTaskRequest = {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  priority: TaskPriority;
  boardId: string;
};

export interface UpdateTaskRequest extends AddTaskRequest {
  id: string;
}
