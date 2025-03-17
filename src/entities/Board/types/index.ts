export type AddBoardRequest = {
  title: string;
  description: string;
};

export interface UpdateBoardRequest extends AddBoardRequest {
  boardId: string;
}
