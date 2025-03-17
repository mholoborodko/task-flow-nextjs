import { TaskPriority, TaskStatus } from '../model';

export type AddTaskRequest = {
  title: string;
  description: string;
  status: TaskStatus;
  due_date: string;
  priority: TaskPriority;
  board_id: string;
};

export interface UpdateTaskRequest extends AddTaskRequest {
  id: string;
}
