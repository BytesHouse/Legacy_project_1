/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        25: "6.25rem",
        6.25: "1.5625rem",
        22.5: "5.625rem",
        15: "3.75rem",
      },
      dropShadow: {
        logo: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
      borderColor: {
        "gray-1": "#EBEAED",
        "gray-2": "#E2E5E9",
      },
      textColor: {
        "c-gray": "#686B6F",
        "carbon-black": "#2F323A",
        "c-blue": "#166aff",
        "primary-40": "#FA292B",
        "tertiary-40": "#2B980F",
      },
      fontFamily: {
        sans: ["var(--font-lato)", ...fontFamily.sans],
      },
      fontSize: {
        xxs: ["11px", "13px"],
        xs: ["12px", "19px"],
        xs2: ["13px", "15.6px"],
        sm: ["14px", "22px"],
        "2xl": ["24px", "29px"],
        "3xl": ["32px", "36px"],
      },
      boxShadow: {
        snow: "0px 0px 14px 2px rgba(255, 255, 255, 0.34), 0px 0px 61px -9px #FFFFFF",
        sidebar: "-18px 78px 144px -60px rgba(126, 126, 126, 0.41)",
        menu: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        search: "0px 32px 24px -30px rgba(0, 0, 0, 0.09)",
        land: "-100px 0px 140px -40px rgba(0, 0, 0, 0.2)",
        search: "0px 32px 24px -30px rgba(0, 0, 0, 0.09)",
        popup: "-30px 34px 114px -40px rgba(0, 0, 0, 0.8)",
        results: "0px 40px 90px 40px rgba(0, 0, 0, 0.11)",
      },
      backgroundColor: {
        "white-1": "#F8F9FB",
        "c-gray": "#686B6F",
        "black-blue": "#1C202C",
        "label-gray": "#EBEAED",
      },
      container: {
        center: true,
        padding: "1.25rem",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        purple: "#6734BA",
        "hover-violet": "#7D4AD0",
        gray: "#F9F9FA",
        "black-txt": "#2E2E2F",
        "gray-fa": "#FAFAFA",
        "primary-40": "#FA292B",
        "green-zinc": "#20AC93",
        "tertiary-40": "#2B980F",
        "yellow-70": "#FAB543",
        "gray-7": "#CFD8DC",
        "black-focus": "#2F323A",
        "black-carbon": "#37383A",
        "label-gray": "#EBEAED",
        "gray-2": "#E2E5E9",
        "gray-light-bord": "#CCCCCC",
        "pewter-gray": "#87949E",
        "blue-black": "#434C5F",
        "light-gray": "#F9F8F8",
        "gray-40": "#A2A2A2",
        "gray-3": "#626262",
        "gray-4": "#808285",
        "white-1": "#F8F9FB",
        "c-gray": "#686B6F",
        "black-blue": "#1C202C",
        "status-red": "#FA292B",
        "gray-f2": "#F2F2F3",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          "@screen sm": {
            maxWidth: "640px",
          },
          "@screen md": {
            maxWidth: "768px",
          },
          "@screen lg": {
            maxWidth: "1124px",
          },
          "@screen xl": {
            maxWidth: "1124px",
          },
        },
      });
    },
  ],
};
