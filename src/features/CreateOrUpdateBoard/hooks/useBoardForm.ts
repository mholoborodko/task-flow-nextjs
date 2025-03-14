'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { useBoardStore } from '@/store/useBoardStore';

export const formSchema = z.object({
  title: z.string().trim().min(1, 'Required'),
});

export type BoardFormData = z.infer<typeof formSchema>;

interface UseBoardProps {
  closeModal: () => void;
  boardId: string | undefined;
}

const defaultValues: BoardFormData = {
  title: '',
};

export function useBoard({ closeModal, boardId }: UseBoardProps) {
  const { addBoard, updateBoard } = useBoardStore();

  const form = useForm<BoardFormData>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (values: BoardFormData) => {
    if (boardId) {
      await updateBoard(boardId, { title: values.title });
      toast.success('Board updated successfully');
    } else {
      await addBoard(values.title);
      toast.success('New board created successfully');
    }
    closeModal();
  };

  return { form, handleSubmit: form.handleSubmit(handleSubmit) };
}
