'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { FORM_ERRORS } from '@/constants';
import { useAddBoard, useBoardById, useUpdateBoard } from '@/entities/Board';

export const formSchema = z.object({
  title: z.string().trim().min(1, FORM_ERRORS.required),
  description: z.string(),
});

export type BoardFormData = z.infer<typeof formSchema>;

interface UseBoardProps {
  closeModal: () => void;
  boardId: string;
}

export const defaultValues: BoardFormData = {
  title: '',
  description: '',
};

export function useBoard({ closeModal, boardId }: UseBoardProps) {
  const { data: board } = useBoardById(boardId);

  const { mutate: addBoard, isPending: isAdding } = useAddBoard();
  const { mutate: updateBoard, isPending: isUpdating } = useUpdateBoard();

  const form = useForm<BoardFormData>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (board) {
      form.reset({ title: board.title, description: board.description });
    }
  }, [board, form]);

  const handleSubmit = form.handleSubmit(values => {
    if (boardId) {
      updateBoard(
        { boardId, ...values },
        {
          onSuccess: () => {
            toast.success('Board updated successfully');
            closeModal();
          },
        }
      );
    } else {
      addBoard(
        { ...values },
        {
          onSuccess: () => {
            toast.success('New board created successfully');
            closeModal();
          },
        }
      );
    }
  });

  return {
    form,
    handleSubmit,
    isLoading: isAdding || isUpdating,
  };
}
