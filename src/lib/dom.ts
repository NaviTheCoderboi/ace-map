/**
 * A helper to start a view transition if the browser supports it.
 */
export const startViewTransition = (callback: () => void) => {
    if (document.startViewTransition) {
        return document.startViewTransition(callback);
    }

    callback();
    return undefined;
};
