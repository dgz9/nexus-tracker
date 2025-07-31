'use client';

import { HeroUIProvider, ToastProvider } from '@heroui/react';
import AuthProvider from '../contexts/AuthProvider';
import { ThemeProvider } from '../contexts/ThemeProvider';

export function Providers({ children }) {
  return (
    <ThemeProvider>
      <HeroUIProvider>
        <ToastProvider placement="top-center" />
        <AuthProvider>
          {children}
        </AuthProvider>
      </HeroUIProvider>
    </ThemeProvider>
  );
}