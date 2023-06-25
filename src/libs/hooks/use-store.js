import React from 'react';

export const useStore = () => {
    const getValue = (key) => {
        const json = sessionStorage.getItem(`${key}`);
        return json ? JSON.parse(json) : undefined;
    };

    const setValue = (key, value) => {
        if (!key) return;
        sessionStorage.setItem(`${key}`, JSON.stringify(value));
    };

    return { getValue, setValue };
};
