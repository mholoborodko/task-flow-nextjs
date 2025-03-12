import { create } from 'zustand';

export type Board = {
  id: string;
  title: string;
};

export type BoardStore = {
  boards: Board[];
  addBoard: (board: Board) => void;
  removeBoard: (id: string) => void;
  updateBoard: (id: string, updatedBoard: Partial<Board>) => void;
};

export const useBoardStore = create<BoardStore>(set => ({
  boards: [],
  addBoard: board => set(state => ({ boards: [...state.boards, board] })),
  removeBoard: id =>
    set(state => ({ boards: state.boards.filter(board => board.id !== id) })),
  updateBoard: (id, updatedBoard) =>
    set(state => ({
      boards: state.boards.map(board =>
        board.id === id ? { ...board, ...updatedBoard } : board
      ),
    })),
}));
