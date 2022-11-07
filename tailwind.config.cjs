/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
		'node_modules/daisyui/dist/**/*.js',
		'node_modules/react-daisyui/dist/**/*.js',
	],
	theme: {
		fontFamily: {
			sans: ['Lato', 'system-ui', 'sans-serif'],
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('flowbite/plugin'),
		require('daisyui'),
	],
}
