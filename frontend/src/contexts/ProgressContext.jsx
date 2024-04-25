import { createContext } from 'react';

export const Progress = createContext({
    progress: null,
    setProgress: () => {},
});