import { useEffect, useMemo, useRef, useState } from "react";
import debounce from "lodash/debounce";

export const useDebounceValue = <T>(value: T, delay = 200) => {
  const [current, setCurrent] = useState<T>(value);

  const previousValue = useRef(value);

  const debouncedSetValue = useMemo(
    () => debounce(() => setCurrent(value), delay),
    [delay, value]
  );

  useEffect(() => {
    if (value !== previousValue.current) {
      debouncedSetValue();
      previousValue.current = value;
      window.stop();
      return debouncedSetValue.cancel;
    }
  }, [debouncedSetValue, value]);

  return current;
};
