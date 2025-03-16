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
