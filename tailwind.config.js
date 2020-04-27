module.exports = {
  prefix: '',
  important: false,
  separator: ':',
  // blacklisted plugins, ie, we strip these from the output
  corePlugins: {
    backgroundPosition: false,
    backgroundSize: false,
    clear: false,
    fill: false,
    float: false,
    fontSmoothing: false,
    listStylePosition: false,
    objectFit: false,
    objectPosition: false,
    resize: false,
    rotate: false,
    scale: false,
    skew: false,
    stroke: false,
    strokeWidth: false,
    tableLayout: false,
  },
  theme: {
    screens: {
      d: '1024px',
    },
    colors: {
      black: '#000',
      white: '#fff',

      blue: {
        1: '#0b3dff',
      },

      // with colors, 1 === lightest, then darker from there
      gray: {
        1: '#f6f6f6',
        2: '#efefef',
        3: '#e2e8f0',
        4: '#687ea5',
        5: '#2d3748',
      },
      red: {
        1: '#ff9f9f',
        2: '#dc2849',
      },
      yellow: {
        1: '#fefcbf',
        2: '#ffc201',
        3: '#db8546',
      },
      green: {
        1: '#aedfa5',
        2: '#0f0',
      },
    },
    spacing: {
      '0': '0',
      '1': '0.5rem',
      '2': '1rem',
      '3': '2rem',
      '4': '3rem',
      '5': '4rem',
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      '0': 'transparent',
    }),
    backgroundPosition: {},
    backgroundSize: {},
    borderColor: theme => ({
      ...theme('colors'),
      default: theme('colors.gray.3', 'currentColor'),
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
      lab: ['Lab', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', 'system-ui', 'sans-serif'],
      sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"]
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
    inset: { },
    letterSpacing: {
      none: '0',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      normal: '1.5',
      loose: '2',
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
    },
    margin: (theme, { negative }) => ({
      auto: 'auto',
      ...theme('spacing'),
    }),
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
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7',
      '8': '8',
      '9': '9',
      '10': '10',
      '11': '11',
      '12': '12',
    },
    padding: theme => theme('spacing'),
    placeholderColor: {}, // theme => theme('colors'),
    stroke: {},
    strokeWidth: {},
    textColor: theme => theme('colors'),
    textTransform: {},
    width: theme => ({
      auto: 'auto',
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      full: '100%',
      screen: '100vw',
    }),
    minWidth: theme => ({
      ...theme('width'),
      '0': '0',
    }),
    maxWidth: (theme, { breakpoints }) => ({
      none: 'none',
      full: '100%',
      ...theme('width'),
    }),
    zIndex: {
      auto: 'auto',
      '0': '0',
      '10': '10',
      '20': '20',
      '30': '30',
      '40': '40',
      '50': '50',
    },
    gap: theme => theme('spacing'),
    gridTemplateColumns: {
      none: 'none',
      '1': 'repeat(1, minmax(0, 1fr))',
      '2': 'repeat(2, minmax(0, 1fr))',
      '3': 'repeat(3, minmax(0, 1fr))',
      '4': 'repeat(4, minmax(0, 1fr))',
      '5': 'repeat(5, minmax(0, 1fr))',
      '6': 'repeat(6, minmax(0, 1fr))',
      '7': 'repeat(7, minmax(0, 1fr))',
      '8': 'repeat(8, minmax(0, 1fr))',
      '9': 'repeat(9, minmax(0, 1fr))',
      '10': 'repeat(10, minmax(0, 1fr))',
      '11': 'repeat(11, minmax(0, 1fr))',
      '12': 'repeat(12, minmax(0, 1fr))',
    },
    gridColumn: {
      auto: 'auto',
      'span-1': 'span 1 / span 1',
      'span-2': 'span 2 / span 2',
      'span-3': 'span 3 / span 3',
      'span-4': 'span 4 / span 4',
      'span-5': 'span 5 / span 5',
      'span-6': 'span 6 / span 6',
      'span-7': 'span 7 / span 7',
      'span-8': 'span 8 / span 8',
      'span-9': 'span 9 / span 9',
      'span-10': 'span 10 / span 10',
      'span-11': 'span 11 / span 11',
      'span-12': 'span 12 / span 12',
    },
    gridColumnStart: {
      auto: 'auto',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7',
      '8': '8',
      '9': '9',
      '10': '10',
      '11': '11',
      '12': '12',
      '13': '13',
    },
    gridColumnEnd: {
      auto: 'auto',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7',
      '8': '8',
      '9': '9',
      '10': '10',
      '11': '11',
      '12': '12',
      '13': '13',
    },
    gridTemplateRows: {
      none: 'none',
      '1': 'repeat(1, minmax(0, 1fr))',
      '2': 'repeat(2, minmax(0, 1fr))',
      '3': 'repeat(3, minmax(0, 1fr))',
      '4': 'repeat(4, minmax(0, 1fr))',
      '5': 'repeat(5, minmax(0, 1fr))',
      '6': 'repeat(6, minmax(0, 1fr))',
    },
    gridRow: {
      auto: 'auto',
      'span-1': 'span 1 / span 1',
      'span-2': 'span 2 / span 2',
      'span-3': 'span 3 / span 3',
      'span-4': 'span 4 / span 4',
      'span-5': 'span 5 / span 5',
      'span-6': 'span 6 / span 6',
    },
    gridRowStart: {
      auto: 'auto',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7',
    },
    gridRowEnd: {
      auto: 'auto',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7',
    },
    transformOrigin: {},
    scale: {},
    rotate: {},
    translate: {},
    skew: {},
    transitionProperty: {
      // none: 'none',
      // all: 'all',
      default: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
    },
    transitionTimingFunction: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    transitionDuration: {
      // '75': '75ms',
      '150': '150ms',
      '300': '300ms',
    },
  },
  variants: {
    accessibility: ['responsive', 'focus'],
    alignContent: ['responsive'],
    alignItems: ['responsive'],
    backgroundColor: ['hover'],
    borderColor: ['hover'],
    borderRadius: ['responsive'],
    borderStyle: ['responsive'],
    borderWidth: ['responsive'],
    boxShadow: ['responsive'],
    cursor: ['responsive'],
    display: ['responsive'],
    flex: ['responsive'],
    flexDirection: ['responsive'],
    flexGrow: ['responsive'],
    flexShrink: ['responsive'],
    flexWrap: ['responsive'],
    fontFamily: ['responsive'],
    fontSize: ['responsive'],
    fontStyle: ['responsive'],
    justifyContent: ['responsive'],
    letterSpacing: ['responsive'],
    lineHeight: ['responsive'],
    margin: ['responsive'],
    maxWidth: ['responsive'],
    minWidth: ['responsive'],
    order: ['responsive'],
    outline: ['focus'],
    overflow: ['responsive'],
    padding: ['responsive'],
    pointerEvents: ['responsive'],
    position: ['responsive'],
    textAlign: ['responsive'],
    width: ['responsive'],
    zIndex: ['responsive'],
    gap: ['responsive'],
    gridAutoFlow: ['responsive'],
    gridTemplateColumns: ['responsive'],
    gridColumn: ['responsive'],
    gridColumnStart: ['responsive'],
    gridColumnEnd: ['responsive'],
    gridTemplateRows: ['responsive'],
    gridRow: ['responsive'],
    gridRowStart: ['responsive'],
    gridRowEnd: ['responsive'],
  },
  plugins: [],
};
