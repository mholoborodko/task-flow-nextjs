import { TaskStatus, TaskPriority } from '@/entities/Task';
import { supabase } from '@/utils';

export const fetchTasks = async (boardId: string) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('board_id', boardId)
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

export const fetchTaskById = async (id: string) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const addTask = async (
  title: string,
  description: string,
  boardId: string,
  status: TaskStatus = TaskStatus.TO_DO,
  priority: TaskPriority = TaskPriority.MEDIUM,
  dueDate?: string
) => {
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

  return data;
};

export const updateTask = async (
  id: string,
  title: string,
  description: string,
  status: TaskStatus,
  due_date: string,
  priority: TaskPriority,
  board_id: string
) => {
  const { data, error } = await supabase
    .from('tasks')
    .update({
      title,
      description,
      status,
      due_date,
      priority,
      board_id,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const removeTask = async (id: string) => {
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
) => {
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
