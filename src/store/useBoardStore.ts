import toast from 'react-hot-toast';
import { create } from 'zustand';

import { Board } from '@/entities/Board';
import { supabase } from '@/utils/supabaseClient';

export type BoardStore = {
  boards: Board[];
  boardById: Board | null;
  isLoadingBoards: boolean;
  fetchBoards: () => Promise<void>;
  fetchBoardById: (id: string) => Promise<void>;
  addBoard: (title: string) => Promise<void>;
  removeBoard: (id: string) => Promise<void>;
  updateBoard: (id: string, updatedBoard: Partial<Board>) => Promise<void>;
};

export const useBoardStore = create<BoardStore>(set => ({
  boards: [],
  boardById: null,
  isLoadingBoards: true,
  isDeletingBoard: false,
  fetchBoards: async () => {
    set({ isLoadingBoards: true });

    const { data, error } = await supabase
      .from('boards')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      toast.error(error.message);
    } else {
      set({ boards: data || [] });
    }

    set({ isLoadingBoards: false });
  },
  fetchBoardById: async id => {
    const { data, error } = await supabase
      .from('boards')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      toast.error(error.message);
      set({ boardById: null });
    } else {
      set({ boardById: data });
    }
  },

  addBoard: async title => {
    const { data, error } = await supabase
      .from('boards')
      .insert([{ title }])
      .select()
      .single();

    if (error) {
      toast.error(error.message);
    } else {
      set(state => ({ boards: [...state.boards, data] }));
    }
  },

  removeBoard: async id => {
    const { error } = await supabase.from('boards').delete().eq('id', id);

    if (error) {
      toast.error(error.message);
    } else {
      set(state => ({ boards: state.boards.filter(board => board.id !== id) }));
    }
    toast.success('Board deleted successfully');
  },

  updateBoard: async (id, updatedBoard) => {
    const { error } = await supabase
      .from('boards')
      .update(updatedBoard)
      .eq('id', id);

    if (error) {
      toast.error(error.message);
    } else {
      set(state => ({
        boards: state.boards.map(board =>
          board.id === id ? { ...board, ...updatedBoard } : board
        ),
      }));
    }
  },
}));
