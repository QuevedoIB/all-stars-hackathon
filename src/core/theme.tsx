import resolveConfig from "tailwindcss/resolveConfig";

import tailwindConfig from "../../tailwind.config";

const { theme } = resolveConfig(tailwindConfig);
export const themeColors = theme?.colors as Record<
  string,
  Record<string, string>
>;

export const easeInExpo = [0.7, 0, 0.84, 0];
export const easeOutExpo = [0.16, 1, 0.3, 1];
export const easeInOutExpo = [0.87, 0, 0.13, 1];
