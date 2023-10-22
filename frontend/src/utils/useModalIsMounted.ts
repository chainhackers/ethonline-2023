/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { ANIMATION_MS } from '../constants/constants';

export function useModalIsMounted(isOpen: boolean) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen && !isMounted) {
      setIsMounted(true);
    } else if (!isOpen && isMounted) {
      setTimeout(() => {
        setIsMounted(false);
      }, ANIMATION_MS);
    }
  }, [isOpen]);

  return {
    isMounted,
  };
}
