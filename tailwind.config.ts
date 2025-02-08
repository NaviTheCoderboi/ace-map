import { heroui } from '@heroui/react';
import type { Config } from 'tailwindcss';

export default {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@heroui/theme/dist/components/(button|chip|date-input|input|navbar|progress|select|skeleton|spinner|toggle|ripple|form|listbox|divider|popover|scroll-shadow).js'
    ],
    theme: {
        extend: {}
    },
    darkMode: 'class',
    plugins: [heroui()]
} satisfies Config;
