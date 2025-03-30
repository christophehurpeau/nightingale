export const styleToHexColor = {
  orange: "ff5f00",
} as const;

export type StyleToHexColor = Readonly<
  Record<keyof typeof styleToHexColor, string>
>;
