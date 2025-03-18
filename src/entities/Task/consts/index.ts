import { BadgeVariant } from '@/components/shared/Badge';

import { TaskPriority, TaskStatus } from '../model';

export const TASK_PRIORITY_BADGE_VARIANT = {
  [TaskPriority.LOW]: BadgeVariant.GREEN,
  [TaskPriority.MEDIUM]: BadgeVariant.ORANGE,
  [TaskPriority.HIGH]: BadgeVariant.RED,
};

export const TASK_STATUS_BADGE_VARIANT = {
  [TaskStatus.TO_DO]: BadgeVariant.ORANGE,
  [TaskStatus.IN_PROGRESS]: BadgeVariant.BLUE,
  [TaskStatus.DONE]: BadgeVariant.GREEN,
};
