/* Similar ao useState porém com uma diferença: persiste
 o state no sessionStorage e também atualiza o mesmo sempre
  que o valor do state for alterado! */

import { useCallback, useState } from "react";

interface IUseSessionStorage<T> {
  key: string;
  initialValue: T;
}
export default function useSessionStorage<T>({ key, initialValue }: IUseSessionStorage<T>) {
  const [state, setState] = useState(() => {
    try {
      const storedValue = sessionStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      try {
        const valueToStore = value instanceof Function ? value(state) : value;
        setState(valueToStore);
        sessionStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.log(error);
      }
    },
    [key, state]
  );

  return [state, setValue];
}
