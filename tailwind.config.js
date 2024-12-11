/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E3C04D",
          1: "#E3C04D",
          2: "#E9CD6A",
          3: "#EEE5A2",
          4: "#EDE9C1",
          5: "#F4F1D8",
        },
        gray: {
          DEFAULT: "#B0ADAA",
          1: "#B0ADAA",
          2: "#D6D3D3",
          3: "#F0F0F0",
        },
        kakao: {
          DEFAULT: "#FEE500",
          1: "#FEE500",
        },
      },
      screens: {
        xs: "350px",
      },
      fontFamily: {
        jamsil: ['"The Jamsil"', "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
      },
      animation: {
        fadeIn: "fadeIn 1.5s ease-in-out",
        bounceSlow: "bounce 2s infinite",
        zoomIn: "zoomIn 1.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        zoomIn: {
          "0%": { transform: "scale(0.8)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
