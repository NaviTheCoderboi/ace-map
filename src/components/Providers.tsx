'use client';
import type React from 'react';
import { HeroUIProvider } from '@heroui/react';
import { Toaster } from 'sonner';
import { ThemeProvider, useTheme } from '@lib/theme';

const ToastContainer = () => {
    const { theme } = useTheme();

    return (
        <Toaster
            theme={theme}
            richColors
            closeButton
            duration={3000}
            position="top-center"
        />
    );
};

const Providers = (props: { children: React.ReactNode }) => {
    return (
        <ThemeProvider>
            <HeroUIProvider>
                <ToastContainer />
                {props.children}
            </HeroUIProvider>
        </ThemeProvider>
    );
};

export default Providers;
