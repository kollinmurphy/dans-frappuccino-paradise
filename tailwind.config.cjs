/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  important: true,
	theme: {
		extend: {
		},
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					"primary": "#DD7230",
					"secondary": "#F0B92D",
					"accent": "#2E1F27",
					"neutral": "#eee",
					"base-100": "#fff",
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
