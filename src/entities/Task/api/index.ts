import {
  TaskStatus,
  Task,
  AddTaskParams,
  UpdateTaskParams,
  TaskPriority,
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
    .order('order_index', { ascending: true });

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

export const addTask = async (task: AddTaskParams): Promise<Task> => {
  const { data: existingTasks, error: fetchError } = await supabase
    .from('tasks')
    .select('order_index')
    .eq('board_id', task.boardId)
    .order('order_index', { ascending: false });

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  const newOrderIndex =
    existingTasks.length > 0 ? existingTasks[0].order_index + 1 : 0;

  const taskWithSnakeCase = convertKeysToSnakeCase({
    ...task,
    order_index: newOrderIndex,
  });

  const { data, error } = await supabase
    .from('tasks')
    .insert([taskWithSnakeCase])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return convertKeysToCamelCase(data);
};

export const updateTask = async (task: UpdateTaskParams) => {
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

export const moveTaskBatch = async (
  tasks: {
    id: string;
    title: string;
    priority: TaskPriority;
    orderIndex: number;
    status: TaskStatus;
  }[]
) => {
  if (tasks.length === 0) return;

  tasks.sort((a, b) => a.orderIndex - b.orderIndex);

  const updates = tasks.map(({ id, title, priority, orderIndex, status }) => ({
    id,
    title,
    priority,
    order_index: orderIndex,
    status,
  }));

  const { error } = await supabase
    .from('tasks')
    .upsert(updates, { onConflict: 'id' });

  if (error) {
    throw new Error(error.message);
  }
};
