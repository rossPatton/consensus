
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
	darkMode: ["class"],
	content: ["./app/**/*.tsx"],
	theme: {
		extend: {
			colors: {
				black: '#000',
				white: '#fff',
				gray: {
					'1': '#f6f6f6',
					'2': '#efefef',
					'3': '#e2e8f0',
					'4': '#687ea5',
					'5': '#374152'
				},
				red: {
					'1': '#ff9f9f',
					'2': '#dc2849',
					'3': '#9e3501'
				},
				yellow: {
					'1': '#fefcbf',
					'2': '#ffc201'
				},
				green: {
					'1': '#c2f5b9',
					'2': '#a8f7a8'
				},
				blue: {
					'1': '#0b3dff'
				},
				peach: {
					'1': '#fbf1ed',
					'2': '#f8d0bd'
				},
				sky: '#b5c4ce',
				forest: '#385e34',
				cherry: '#db500f',
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					freeworld: '#b0db2a'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			lineHeight: {
				none: '1',
				tight: '1.2',
				normal: '1.5',
				loose: '1.7'
			},
			maxHeight: {
				full: '100%',
				screen: '100vh'
			},
			minHeight: {
				'0': '0',
				full: '100%',
				halfscreen: '50vh',
				screen: '100vh'
			},
			opacity: {
				'0': '0',
				'5': '0.5',
				'10': '1'
			},
			order: {
				'1': '1',
				'2': '2',
				'3': '3',
				first: '-9999',
				last: '9999',
				none: '0'
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			transitionProperty: {
				default: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
				all: 'all'
			},
			transitionTimingFunction: {
				linear: 'linear',
				in: 'cubic-bezier(0.4, 0, 1, 1)',
				out: 'cubic-bezier(0, 0, 0.2, 1)',
				'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)'
			},
			transitionDuration: {
				'150': '150ms',
				'300': '300ms'
			}
		},
		fontFamily: {
			sans: fontFamily.sans,
			founders: ['Founders', ...fontFamily.sans]
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/typography"),
		require("tailwind-scrollbar")({ preferredStrategy: "pseudoelements" }),
		plugin(function ({ addBase }) {
			addBase({
				"@media (prefers-color-scheme: dark)": {
					"h1,h2,h3,h4,h5,h6": {
						color: "#fff",
					},
				},
			})
		}),
	],
} satisfies Config;

export default config;

