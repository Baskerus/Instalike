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
          "0%": { transform: "translateX(-100px)" },
          "100%": { transform: "translateX(0px)" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(100px)" },
          "100%": { transform: "translateX(0px)" },
        },
        slideInTop: {
          "0%": { transform: "translateY(-20px)" },
          "100%": { transform: "translateY(0px)" },
        },
        slideInBottom: {
          "0%": { transform: "translateY(40px)" },
          "100%": { transform: "translateY(0px)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        slideInRight: "slideInRight .6s",
        slideInLeft: "slideInLeft .6s",
        slideInLeftFast: "slideInLeft .3s",
        slideInTopFaster: "slideInTop .15s",
        slideInTopFast: "slideInTop .25s",
        slideInTop: "slideInTop .4s",
        slideInTopSlow: "slideInTop .5s",
        slideInBottom: "slideInBottom .45s",
        slideInBottomFast: "slideInBottom .35s",
        slideInBottomFaster: "slideInBottom .15s",
        fadeIn: "fadeIn .3s",
        fadeInSlow: "fadeIn 0.6s",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(.96,.06,1,-0.12)",
      },
      screens: {
        "hover-hover": { raw: "(hover: hover)" },
      },
    },
  },
  plugins: [],
};
