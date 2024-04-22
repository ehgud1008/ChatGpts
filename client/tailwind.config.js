/** @type {import('tailwindcss').Config} */
export default {
  content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/flowbite/**/*.js",
        ],
  theme: {
    extend: {
      colors: {
        'chat-dark': '#0f172a',
        'chat-light': '#334155',
        'chat-accent': '#22d3ee',
      }
    },
  },
  plugins: [],
}

