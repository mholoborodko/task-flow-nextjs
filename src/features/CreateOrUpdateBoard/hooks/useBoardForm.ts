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
}

const defaultValues: BoardFormData = {
  title: '',
};

export function useBoard({ closeModal }: UseBoardProps) {
  const { addBoard } = useBoardStore();

  const form = useForm<BoardFormData>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (values: BoardFormData) => {
    await addBoard(values.title);
    closeModal();
    toast.success('New board created successfully');
    //TODO add during update
    // Board updated successfully
  };

  return { form, handleSubmit: form.handleSubmit(handleSubmit) };
}
