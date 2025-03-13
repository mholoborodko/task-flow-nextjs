import toast from 'react-hot-toast';
import { create } from 'zustand';

import { Board } from '@/entities/Board';
import { supabase } from '@/utils/supabaseClient';

export type BoardStore = {
  boards: Board[];
  boardById: Board | null;
  isLoading: boolean;
  fetchBoards: () => Promise<void>;
  fetchBoardById: (id: string) => Promise<void>;
  addBoard: (title: string) => Promise<void>;
  removeBoard: (id: string) => Promise<void>;
  updateBoard: (id: string, updatedBoard: Partial<Board>) => Promise<void>;
};

export const useBoardStore = create<BoardStore>(set => ({
  boards: [],
  boardById: null,
  isLoading: true,

  fetchBoards: async () => {
    set({ isLoading: true });

    const { data, error } = await supabase
      .from('boards')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      toast.error(error.message);
    } else {
      set({ boards: data || [] });
    }

    set({ isLoading: false });
  },
  fetchBoardById: async id => {
    set({ isLoading: true });

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

    set({ isLoading: false });
  },

  addBoard: async title => {
    set({ isLoading: true });

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

    set({ isLoading: false });
  },

  removeBoard: async id => {
    set({ isLoading: true });

    const { error } = await supabase.from('boards').delete().eq('id', id);

    if (error) {
      toast.error(error.message);
    } else {
      set(state => ({ boards: state.boards.filter(board => board.id !== id) }));
    }

    set({ isLoading: false });
  },

  updateBoard: async (id, updatedBoard) => {
    set({ isLoading: true });

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

    set({ isLoading: false });
  },
}));
