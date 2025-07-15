'use client';

import { useState } from 'react';
import { AppError, ValidationError, AuthenticationError } from '@/lib/error-handler';

export const TestErrorBoundary = () => {
  const [errorType, setErrorType] = useState<string>('');

  const throwError = (type: string) => {
    switch (type) {
      case 'validation':
        throw new ValidationError('This is a validation error test');
      case 'auth':
        throw new AuthenticationError('This is an authentication error test');
      case 'runtime':
        throw new Error('This is a runtime error test');
      case 'app':
        throw new AppError('This is a custom app error test', 400, 'TEST_ERROR');
      default:
        throw new Error('Unknown error type');
    }
  };

  if (errorType) {
    throwError(errorType);
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-4">Error Boundary Test</h2>
      <div className="space-y-2">
        <button
          onClick={() => setErrorType('validation')}
          className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Test Validation Error
        </button>
        <button
          onClick={() => setErrorType('auth')}
          className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
        >
          Test Authentication Error
        </button>
        <button
          onClick={() => setErrorType('runtime')}
          className="w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
        >
          Test Runtime Error
        </button>
        <button
          onClick={() => setErrorType('app')}
          className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
        >
          Test Custom App Error
        </button>
      </div>
    </div>
  );
}; 