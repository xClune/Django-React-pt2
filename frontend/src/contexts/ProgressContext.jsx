import { createContext } from 'react';

export const Progress = createContext({
    progress: 0,
    setProgress: () => {},
});