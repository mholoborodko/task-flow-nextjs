export type AddBoardRequest = {
  title: string;
  description: string;
};

export type UpdateBoardRequest = {
  boardId: string;
  title: string;
  description: string;
};
