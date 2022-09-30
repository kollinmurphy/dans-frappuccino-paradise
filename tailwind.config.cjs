/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
		},
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					"primary": "#DD7230",
					"secondary": "#E7E393",
					"accent": "#F4C95D",
					"neutral": "#F6AA1C",
					"base-100": "#2E1F27",
					"info": "#F6AA1C",
					"success": "#2E5B24",
					"warning": "#BC3908",
					"error": "#621708",
				},
			},
		],
	},
	plugins: [require('daisyui')],
}
