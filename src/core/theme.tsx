import resolveConfig from "tailwindcss/resolveConfig";

import tailwindConfig from "~/tailwind.config";

const { theme } = resolveConfig(tailwindConfig);

export const themeColors = theme?.colors as Record<
  string,
  Record<string, string>
>;

export const easeOut = [0.16, 1, 0.3, 1];
