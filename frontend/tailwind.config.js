import {heroui} from "@heroui/theme/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui({
    themes: {
      light: {
        colors: {
          primary: {
            DEFAULT: "#3B82F6",
            foreground: "#FFFFFF",
          },
          focus: "#3B82F6",
        },
      },
      dark: {
        colors: {
          primary: {
            DEFAULT: "#3B82F6",
            foreground: "#FFFFFF",
          },
          focus: "#3B82F6",
        },
      },
    },
  })],
}