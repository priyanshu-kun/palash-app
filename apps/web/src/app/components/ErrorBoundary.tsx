'use client';

import React from 'react';
import { AppError } from '@/lib/error-handler';
import { PrimaryButton } from './ui/buttons';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can log the error to an error reporting service here
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Something went wrong
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {this.state.error instanceof AppError
                  ? this.state.error.message
                  : 'An unexpected error occurred. Please try again later.'}
              </p>
              <div className="mt-5">
                <PrimaryButton
                  className="bg-red-400 hover:bg-red-500"
                  onClick={() => this.setState({ hasError: false, error: null })}
                >
                  Try again
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 