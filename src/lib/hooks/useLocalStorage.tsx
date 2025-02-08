import React from 'react';

/**
 * A hook to use local storage with React.
 */
export const useLocalStorage = <T,>(
    key: string,
    initialValue: T
): [T, (value: T) => void] => {
    const [storedValue, setStoredValue] = React.useState<T>(() => {
        if (typeof window !== 'undefined') {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }
        return initialValue;
    });

    const setValue = (value: T) => {
        setStoredValue(value);
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(value));
        }
    };

    return [storedValue, setValue];
};
