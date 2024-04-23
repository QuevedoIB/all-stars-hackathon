import { useCallback, useState } from "react";

export type ToggleValues = [boolean, (status?: boolean) => void];

export default function useToggle({ initialValue = false } = {}): ToggleValues {
  const [toggled, setToggled] = useState(initialValue);

  const handleToggle = useCallback((forceToggle?: boolean) => {
    setToggled((currentValue) => forceToggle ?? !currentValue);
  }, []);

  return [toggled, handleToggle];
}
