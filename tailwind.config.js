module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "black-rgba": "rgba(0, 0, 0, 0.20)",
      },
      animation: {
        ping: "ping .23s linear",
      },
      fontFamily: {
        logofont: ["Grand Hotel"],
      },
      keyframes: {
        slideInRight: {
          "0%": { transform: "translateX(-100px)", opacity: "0" },
          "100%": { transform: "translateX(0px)", opacity: "1" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(100px)", opacity: "0" },
          "100%": { transform: "translateX(0px)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        slideInRight: "slideInRight .6s",
        slideInLeft: "slideInLeft .6s",
        fadeIn: "fadeIn 0.15s",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(.96,.06,1,-0.12)",
      },
    },
  },
  plugins: [],
};
