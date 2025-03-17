import { TaskStatus, TaskPriority, Task } from '@/entities/Task';
import { convertKeysToCamelCase, supabase } from '@/utils';

export const fetchTasks = async (boardId: string): Promise<Task[]> => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('board_id', boardId)
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return convertKeysToCamelCase(data) || [];
};

export const fetchTaskById = async (id: string): Promise<Task> => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return convertKeysToCamelCase(data);
};

export const addTask = async (
  title: string,
  description: string,
  boardId: string,
  status: TaskStatus = TaskStatus.TO_DO,
  priority: TaskPriority = TaskPriority.MEDIUM,
  dueDate?: string
): Promise<Task> => {
  const { data, error } = await supabase
    .from('tasks')
    .insert([
      {
        title,
        description,
        board_id: boardId,
        status,
        priority,
        due_date: dueDate,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return convertKeysToCamelCase(data);
};

export const updateTask = async (
  id: string,
  title: string,
  description: string,
  status: TaskStatus,
  dueDate: string,
  priority: TaskPriority,
  boardId: string
): Promise<Task> => {
  const { data, error } = await supabase
    .from('tasks')
    .update({
      title,
      description,
      status,
      due_date: dueDate,
      priority,
      board_id: boardId,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return convertKeysToCamelCase(data);
};

export const removeTask = async (id: string): Promise<void> => {
  const { error } = await supabase.from('tasks').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
};

export const moveTask = async (
  id: string,
  newStatus: TaskStatus,
  newBoardId: string,
  newOrderIndex: number
): Promise<void> => {
  const { error } = await supabase
    .from('tasks')
    .update({
      status: newStatus,
      board_id: newBoardId,
      order_index: newOrderIndex,
    })
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
};
