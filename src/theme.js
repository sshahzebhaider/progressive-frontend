import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#ff9e24',
      60: '#000066',
    },
    button: {
      50: '#ff9e24',
      60: '#000066',
    },
    customColorScheme: {
      100: '#6ea7dc',
    },
  },
  fonts: {
    lato: `'Lato', sans-serif`,
    robo: `'Roboto', sans-serif`,
    tas: `'Edu TAS Beginner Variable', sans-serif`,
    bitter: `'Bitter Variable', sans-serif`,
  },
});

export default theme;
