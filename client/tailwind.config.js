/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#446DF6",
        dark_2: "#151515"
      },
      fontFamily: {
        "pro": ['Source Sans Pro', 'sans-serif'],
        "dancing": ['Dancing Script', "cursive"],
        "inter": ['Inter', "sans-serif"],
        "lora": ['Lora', 'serif'],
      }
    },
    screens: {
      xs: "370px",
      sm: "450px",
      md: "768px",
      lg: "970px",
      xl: "1024px"
    }
  },
  plugins: [],
}

