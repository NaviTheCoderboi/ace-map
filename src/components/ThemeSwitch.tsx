'use client';
import { MdSunny as _Sun } from 'react-icons/md';
import { AiFillMoon as _Moon } from 'react-icons/ai';
import { Switch } from '@heroui/switch';
import React from 'react';
import { useTheme } from '@lib/theme';
import { useIsMounted } from '@lib/hooks/useIsMounted';
import { motion } from 'framer-motion';

const ThemeSwitch = () => {
    const isMounted = useIsMounted();
    const { theme, setTheme } = useTheme();

    if (!isMounted) return null;

    const Moon = motion.create(_Moon);
    const Sun = motion.create(_Sun);

    return (
        <>
            <Switch
                aria-label="Toggle theme"
                defaultSelected={theme === 'dark'}
                color="secondary"
                startContent={
                    <Sun
                        initial={{ y: 50 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                }
                endContent={
                    <Moon
                        initial={{ y: 50 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                }
                size="lg"
                onValueChange={(v) => {
                    setTheme(v ? 'dark' : 'light');
                }}
            />
        </>
    );
};

export default ThemeSwitch;
