export const theme = {
  color: {
    white: "#fff",
    black: "#000",
    blue: "#7895B2",
    lightblue: "#AEBDCA",
    beige: "#E8DFCA",
    lightbeige: "#F5EFE6",
    brown: "#454545",
    error: "#bf1650",
    gray: "#C5C6D0",
  },
};

const customMediaQuery = (maxWidth: number): string =>
  `@media (max-width: ${maxWidth}px)`;

export const media = {
  custom: customMediaQuery,
  laptop: customMediaQuery(1440),
  mobile: customMediaQuery(420),
};
