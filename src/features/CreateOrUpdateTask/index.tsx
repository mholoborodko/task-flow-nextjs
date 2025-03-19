import { FC } from 'react';

import {
  Button,
  DateField,
  Modal,
  SelectField,
  TextAreaField,
  TextInput,
} from '@/components/shared';
import { ModalProps } from '@/components/shared/Modal';
import { TaskPriority, TaskStatus } from '@/entities/Task';
import { enumToOptions } from '@/utils';

import { useTaskForm } from './hooks/useTaskForm';

interface CreateOrUpdateBoardModalProps
  extends Pick<ModalProps, 'isOpen' | 'onClose'> {
  taskId?: string;
  boardId: string;
}

export const CreateOrUpdateTaskModal: FC<CreateOrUpdateBoardModalProps> = ({
  isOpen,
  onClose,
  taskId,
  boardId,
}) => {
  const { form, handleSubmit, isLoading } = useTaskForm({
    taskId: taskId || '',
    boardId,
    closeModal: onClose,
  });

  const taskStatusOptions = enumToOptions(TaskStatus);
  const taskPriorityOptions = enumToOptions(TaskPriority);

  return (
    <Modal
      className="w-[700px]"
      isOpen={isOpen}
      title={!taskId ? 'Create new task' : 'Edit task'}
      onAfterClose={form.reset}
      onClose={onClose}
    >
      <div className="flex flex-col gap-2">
        <TextInput control={form.control} label="Name" name="title" />
        <TextAreaField
          control={form.control}
          label="Description"
          maxLength={500}
          name="description"
        />
        <div className="grid grid-cols-2 items-start gap-4">
          <SelectField
            control={form.control}
            label="Status"
            name="status"
            options={taskStatusOptions}
          />
          <SelectField
            control={form.control}
            label="Priority"
            name="priority"
            options={taskPriorityOptions}
          />
          <DateField control={form.control} label="Due date" name="dueDate" />
        </div>
        <div className="flex justify-end mt-8">
          <Button
            isLoading={isLoading}
            label={!taskId ? 'Create' : 'Save changes'}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </Modal>
  );
};
