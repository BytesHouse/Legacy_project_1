import { useCallback } from "react";

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const getState = useCallback(() => {
    try {
      const state = window?.localStorage.getItem(key);
      if (state) {
        return JSON.parse(state) as T;
      }
    } catch {
      // safe catch
    }

    return defaultValue;
  }, []);

  const saveState = useCallback((obj: T) => {
    window?.localStorage.setItem(key, JSON.stringify(obj));
  }, []);

  return { getState, saveState };
};
