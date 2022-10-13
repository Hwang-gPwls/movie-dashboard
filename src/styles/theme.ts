export const theme = {
  color: {
    white: "#fff",
    black: "#000",
    blue: "#7895B2",
    lightblue: "#AEBDCA",
    beige: "#E8DFCA",
    lightbeige: "#F5EFE6",
  },
};

const customMediaQuery = (maxWidth: number): string =>
  `@media (max-width: ${maxWidth}px)`;

export const media = {
  custom: customMediaQuery,
  laptop: customMediaQuery(1440),
  mobile: customMediaQuery(420),
};
