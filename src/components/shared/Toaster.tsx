'use client';

import { Toaster as HotToaster } from 'react-hot-toast';

export const Toaster = () => {
  return <HotToaster position="top-center" toastOptions={{ duration: 2000 }} />;
};
