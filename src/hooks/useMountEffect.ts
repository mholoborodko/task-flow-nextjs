import { useEffect, useRef } from 'react';

export const useMountEffect = (callback: () => void) => {
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      callback();
    }
  }, [callback]);
};
