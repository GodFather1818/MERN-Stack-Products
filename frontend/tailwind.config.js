/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {},
      fontFamily: {
        "RJ": ["Rajdhani", "sans-serif"],
        "DS": ["Dancing Script", "cursive"],
        "RW": ["Raleway", "sans-serif"],
        "MO" : ["Montserrat", "sans-serif"],
        "PL" : ["Playwrite DE Grund", "cursive"],
        "RO" : ["Roboto Mono", "monospace"],
        
      }
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

