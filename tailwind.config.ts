import type { Config } from "tailwindcss";
import ThemeDefault from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./nuxt.config.ts"
  ],
  theme: {
    extend: {
      screens: {
        mobile: { max: "480px" },
        "small-tablet": { max: "768px" },
        tablet: { max: "1024px" },
        ...ThemeDefault.screens
      },
      colors: {
        primary: {
          100: "#fce7d3",
          200: "#f9cfa7",
          300: "#f5b77c",
          400: "#f29f50",
          500: "#ef8721",
          600: "#bf6c1d",
          700: "#8f5116",
          800: "#60360e",
          900: "#301b07"
        },
        black: "#101010"
      }
    }
  },
  darkMode: "class"
};
