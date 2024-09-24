const {nextui} = require("@nextui-org/react");


/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "primary": "var(--primary)",
        "background": "var(--background)",
        "dark": "var(--dark)",
        "widget": "var(--widget)",
        "widgetDark": "var(--widgetDark)",
        "stroke": "var(--stroke)",
        "strokeWhite": "var(--strokeWhite)",
        "text": "var(--text)",
        "textSoft": "var(--textSoft)",
        "secondary": "var(--secondary)",
        "labelDark": "var(--labelDark)",
        "light": "var(--light)",
        "widgetLight": "var(--widgetLight)",
        "labelLight": "var(--labelLight)",
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}