import React from 'react';

/**
 * A hook that returns a ref object that indicates whether the component is mounted.
 */
export const useIsMounted = () => {
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        };
    }, []);

    return isMounted;
};
