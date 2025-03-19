import React, { FC, PropsWithChildren, ReactNode } from 'react';

import Loader from './Loader';

interface LoaderContainerProps {
  isLoading: boolean;
  loaderClassName?: string;
  loaderSize?: number;
  isEmpty?: boolean;
  emptyStateComponent?: ReactNode;
  customLoader?: ReactNode;
}

export const LoaderContainer: FC<PropsWithChildren<LoaderContainerProps>> = ({
  isLoading,
  loaderClassName,
  loaderSize,
  isEmpty,
  emptyStateComponent,
  customLoader,
  children,
}) => {
  if (isLoading) {
    return (
      <div className={loaderClassName}>
        {customLoader || <Loader size={loaderSize} />}
      </div>
    );
  }

  return <>{isEmpty ? emptyStateComponent : children}</>;
};
