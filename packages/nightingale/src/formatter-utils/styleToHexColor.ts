export const styleToHexColor = {
  orange: "ff5f00",
  grayLight: "808080",
  "gray-light": "808080",
} as const;

export type StyleToHexColor = Readonly<
  Record<keyof typeof styleToHexColor, string>
>;
