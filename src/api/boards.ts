import { supabase } from '@/utils/supabaseClient';

export const fetchBoards = async () => {
  const { data, error } = await supabase
    .from('boards')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

export const fetchBoardById = async (id: string) => {
  const { data, error } = await supabase
    .from('boards')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const addBoard = async (title: string) => {
  const { data, error } = await supabase
    .from('boards')
    .insert([{ title }])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updateBoard = async (
  id: string,
  updatedBoard: { title: string }
) => {
  const { error } = await supabase
    .from('boards')
    .update(updatedBoard)
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
};

export const removeBoard = async (id: string) => {
  const { error } = await supabase.from('boards').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
};
