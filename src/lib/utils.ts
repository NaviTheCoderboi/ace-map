import React from 'react';

/**
 * Hook to inspect values in the console.
 */
export const useInspect = <T>(items: () => T, fn: (v: T) => void) => {
    const values = React.useMemo(() => items(), [items]);

    React.useEffect(() => {
        fn(values);
    }, [values, fn]);

    return values;
};
