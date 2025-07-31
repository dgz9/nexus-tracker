'use client';
import { useState, useCallback } from 'react';

const useModal = (initialData = null) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(initialData);

  const open = useCallback((modalData = null) => {
    if (modalData !== null) {
      setData(modalData);
    }
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setData(initialData);
  }, [initialData]);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return {
    isOpen,
    data,
    open,
    close,
    toggle,
    setData
  };
};

export default useModal;