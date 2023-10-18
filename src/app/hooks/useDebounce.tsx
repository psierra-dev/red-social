"use client";
import { useEffect, useState } from "react";

const useDebounce = (value: string | number, delay: number = 2000) => {
  const [debouncedValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebounceValue(value), delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return { debouncedValue };
};

export default useDebounce;
