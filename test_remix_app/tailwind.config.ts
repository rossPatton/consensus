import type { Config } from "tailwindcss";
const baseSans = ["Helvetica Neue", 'HelveticaNeue', 'Helvetica', 'system-ui', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', 'Arial', "Noto Sans", 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"];


export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      d: '1024px',
    },
    colors: {
      black: '#000',
      white: '#fff',

      // with colors, 1 === lightest, then darker from there
      gray: {
        1: '#f6f6f6',
        2: '#efefef',
        3: '#e2e8f0',
        4: '#687ea5',
        5: '#374152',
      },
      red: {
        1: '#ff9f9f',
        2: '#dc2849',
        3: '#9e3501',
      },
      yellow: {
        1: '#fefcbf',
        2: '#ffc201',
      },
      green: {
        1: '#c2f5b9',
        2: '#a8f7a8',
      },
      blue: {
        1: '#0b3dff',
      },
      peach: {
        1: '#fbf1ed',
        2: '#f8d0bd',
      },
      sky: '#b5c4ce',
      forest: '#385e34',
      cherry: '#db500f',
    },
    spacing: {
      '0': '0',
      '1/2': '.25rem',
      '1': '.5rem',
      '2': '1rem',
      '3': '2rem',
      '4': '3rem',
      '5': '4rem',
    },
    backgroundColor: theme => ({
      ...theme.colors,
      '0': 'transparent',
    }),
    backgroundPosition: {},
    backgroundSize: {},
    borderColor: theme => ({
      ...theme.colors,
      // default: theme('colors.gray.3', 'currentColor'),
    }),
    borderRadius: {
      'default': '.25rem',
      '0': '0',
      lg: '.5rem',
      circ: '50%', // circle
    },
    borderWidth: {
      default: '1px',
      '0': '0',
      '2': '2px',
    },
    boxShadow: {
      default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
    },
    cursor: {
      default: 'default',
      ptr: 'pointer',
      disabled: 'not-allowed',
    },
    fill: {},
    flex: {
      '1': '1 1 0%',
      auto: '1 1 auto',
      initial: '0 1 auto',
      none: 'none',
    },
    flexGrow: {
      '0': '0',
      default: '1',
    },
    flexShrink: {
      '0': '0',
      default: '1',
    },
    fontFamily: {
      founders: ['Founders', ...baseSans],
      sans: baseSans,
    },
    // numbers => header sizes basically
    // base default size everywhere
    // sm => small html tag
    fontSize: {
      sm: '0.875rem',
      base: '1rem',
      3: '1.25rem',
      2: '1.5rem',
      1: '2rem',
    },
    fontWeight: {
      normal: '400',
      semibold: '500',
      bold: '700',
    },
    inset: {},
    letterSpacing: {
      none: '0',
    },
    lineHeight: {
      none: '1',
      tight: '1.2',
      normal: '1.5',
      loose: '1.7',
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
    },
    // margin: (theme) => ({
    //   ...theme.spacing,
    //   auto: 'auto',
    // }),
    maxHeight: {
      full: '100%',
      screen: '100vh',
    },
    minHeight: {
      '0': '0',
      full: '100%',
      halfscreen: '50vh',
      screen: '100vh',
    },
    objectPosition: {},
    opacity: {
      '0': '0',
      '5': '0.5',
      '10': '1',
    },
    order: {
      first: '-9999',
      last: '9999',
      none: '0',
      '1': '1',
      '2': '2',
      '3': '3',
    },
    // padding: theme => theme('spacing'),
    placeholderColor: {}, // theme => theme('colors'),
    stroke: {},
    strokeWidth: {},
    // textColor: theme => theme('colors'),
    textTransform: {},
    width: () => ({
      auto: 'auto',
      '1/12': '8.333%',
      '2/12': '16.666%',
      '3/12': '25%',
      '4/12': '33.333%',
      '5/12': '41.666%',
      '6/12': '50%',
      '7/12': '58.333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '83.333%',
      '11/12': '91.666667%',
      full: '100%',
      screen: '100vw',
    }),
    // minWidth: theme => ({
    //   ...theme('width'),
    //   '0': '0',
    // }),
    // maxWidth: (theme, { breakpoints }) => ({
    //   none: 'none',
    //   full: '100%',
    //   ...theme('width'),
    // }),
    zIndex: {
      auto: 'auto',
      '0': '0',
      '10': '10',
      '20': '20',
      '30': '30',
      '40': '40',
      '50': '50',
    },
    transitionProperty: {
      default: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
      all: 'all',
    },
    transitionTimingFunction: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    transitionDuration: {
      '150': '150ms',
      '300': '300ms',
    },
    extend: {
      fontFamily: {
        sans: [
          '"Founders"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
  },
} satisfies Config;
