'use client';

import React from 'react';
import { cn } from '@/app/lib/utils';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    color?: 'primary' | 'secondary' | 'white';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'md',
    className = '',
    color = 'primary'
}) => {
    const sizeClasses = {
        sm: 'w-5 h-5',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    const colorClasses = {
        primary: 'text-blue-600',
        secondary: 'text-gray-600',
        white: 'text-white'
    };

    return (
        <div className="flex items-center justify-center ">
            <div
                className={cn(
                    'animate-spin rounded-full border-2 border-solid border-black border-t-transparent',
                    sizeClasses[size],
                    colorClasses[color],
                    className
                )}
                role="status"
                aria-label="loading"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

interface LoadingScreenProps extends LoadingSpinnerProps {
    text?: string;
    fullScreen?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
    text,
    fullScreen = false,
    ...spinnerProps
}) => {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center gap-4',
                fullScreen ? 'fixed inset-0 bg-white/70 z-[1000] backdrop-blur-lg ' : 'p-4'
            )}
        >
            <LoadingSpinner {...spinnerProps} />
            {text && (
                <p className="text-gray-600 animate-pulse font-medium">
                    {text}
                </p>
            )}
        </div>
    );
};

export default LoadingSpinner;
