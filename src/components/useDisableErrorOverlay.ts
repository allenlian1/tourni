'use client'; // Mark this as a Client Component

import { useEffect } from 'react';

export const useDisableErrorOverlay = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const errorOverlay = require('react-error-overlay');
      errorOverlay.stopReportingRuntimeErrors(); // Disable the error overlay
    }
  }, []);
};  