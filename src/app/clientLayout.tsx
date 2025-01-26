'use client'; // Mark this as a Client Component

import { useDisableErrorOverlay } from './useDisableErrorOverlay';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useDisableErrorOverlay(); // Disable the error overlay

  return <>{children}</>;
}