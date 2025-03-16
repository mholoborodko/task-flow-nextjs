import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

import { Icon } from '@/components/shared/Icon';
import { useToggle } from '@/hooks';

interface DescriptionProps {
  text: string;
}

export const ExpandableDescription: React.FC<DescriptionProps> = ({ text }) => {
  const isExpanded = useToggle(false);

  return (
    <div
      className="p-2 md:p-3 rounded-lg bg-gray-100 border border-gray-300 cursor-pointer transition hover:bg-gray-200"
      onClick={isExpanded.toggle}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-700">Description</span>
        <Icon
          className={clsx(
            'text-gray-500 transition-transform duration-200',
            isExpanded.value && 'rotate-180'
          )}
          name="chevron-down"
          size={20}
        />
      </div>
      <AnimatePresence>
        {isExpanded.value && (
          <motion.div
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-2 p-2 rounded-lg bg-white shadow-sm"
            exit={{ opacity: 0, height: 0 }}
            initial={{ opacity: 0, height: 0 }}
          >
            <p className="text-gray-700">{text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
