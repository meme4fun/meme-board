import { useEffect, useState } from 'react';

export function useCSR() {
  const [s, set] = useState(false);

  useEffect(() => set(true), []);
  return s;
}
