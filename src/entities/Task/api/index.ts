import {
  TaskStatus,
  Task,
  AddTaskRequest,
  UpdateTaskRequest,
} from '@/entities/Task';
import {
  convertKeysToCamelCase,
  convertKeysToSnakeCase,
  supabase,
} from '@/utils';

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

export const addTask = async (task: AddTaskRequest): Promise<Task> => {
  const { data, error } = await supabase
    .from('tasks')
    .insert([convertKeysToSnakeCase(task)])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return convertKeysToCamelCase(data);
};

export const updateTask = async (task: UpdateTaskRequest) => {
  const { id, ...updateFields } = task;

  const { data, error } = await supabase
    .from('tasks')
    .update(convertKeysToSnakeCase(updateFields))
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
