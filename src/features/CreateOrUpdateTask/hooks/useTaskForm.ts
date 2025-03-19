'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { FORM_ERRORS } from '@/constants';
import {
  TaskPriority,
  TaskStatus,
  useAddTask,
  useTaskById,
  useUpdateTask,
} from '@/entities/Task';

export const formSchema = z
  .object({
    title: z.string().trim().min(1, FORM_ERRORS.required),
    description: z.string(),
    status: z.nativeEnum(TaskStatus).nullable(),
    priority: z.nativeEnum(TaskPriority).nullable(),
    dueDate: z.string().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.status === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['status'],
        message: FORM_ERRORS.required,
      });
    }

    if (data.priority === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['priority'],
        message: FORM_ERRORS.required,
      });
    }

    if (data.dueDate === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['dueDate'],
        message: FORM_ERRORS.required,
      });
    }

    return z.NEVER;
  });

export type TaskFormData = z.infer<typeof formSchema>;

interface UseTaskProps {
  closeModal: () => void;
  taskId: string;
  boardId: string;
}

export const defaultValues: TaskFormData = {
  title: '',
  description: '',
  status: null,
  priority: null,
  dueDate: null,
};

export function useTaskForm({ closeModal, taskId, boardId }: UseTaskProps) {
  const { data: task } = useTaskById(taskId);

  const { mutate: addTask, isPending: isAdding } = useAddTask();
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();

  const form = useForm<TaskFormData>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (task) {
      form.reset({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
      });
    }
  }, [task, form]);

  const handleSubmit = form.handleSubmit(values => {
    const mutationBody = {
      boardId,
      ...values,
      status: values.status || TaskStatus.TO_DO,
      priority: values.priority || TaskPriority.LOW,
      dueDate: values.dueDate || '',
    };
    if (taskId) {
      updateTask(
        {
          id: taskId,
          ...mutationBody,
        },
        {
          onSuccess: () => {
            toast.success('Task updated successfully');
            closeModal();
          },
        }
      );
    } else {
      addTask(
        {
          ...mutationBody,
        },
        {
          onSuccess: () => {
            toast.success('New task created successfully');
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
