'use client'
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { createTheme } from '@mui/material';
import { LinkProps } from '@mui/material/Link';
import { buttonsStyles, underlineStyles } from './styles';

type LinkBehaviorProps = Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] };

const LinkBehavior: ForwardRefRenderFunction<HTMLAnchorElement, LinkBehaviorProps> = (
  props,
  ref
) => {
  const { href, ...other } = props;

  return <RouterLink ref={ref} to={href} {...other} />;
};

declare module '@mui/material/styles' {
  interface Theme {
    underline: {
      default: string;
      hover: string;
    };
  }

  interface Palette {
    white: Palette['primary'];
    greyHeader: Palette['primary'];
  }

  interface PaletteOptions {
    white?: PaletteOptions['primary'];
    greyHeader?: PaletteOptions['primary'];
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    underline?: {
      default?: string;
      hover?: string;
    };
  }

  interface BreakpointOverrides {
    xxl: true;
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

declare module '@mui/material/CircularProgress' {
  interface CircularProgressPropsColorOverrides {
    white: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    hollow: true;
    default: true;
    link: true;
    orange: true;
  }
}

export const muiTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  },
  palette: {
    white: {
      main: '#fff',
    },
    greyHeader: {
      main: '#EAEAEA',
    },
  },
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
    h1: {
      fontSize: '48px',
      lineHeight: 'normal',
    },
    h2: {
      fontSize: '32px',
      lineHeight: 'normal',
    },
    h3: {
      fontSize: '24px',
      lineHeight: 'normal',
    },
    h4: {
      fontSize: '18px',
      lineHeight: 'normal',
    },
    h5: {
      fontSize: '16px',
      lineHeight: 'normal',
    },
    h6: {
      fontSize: '12px',
      lineHeight: 'normal',
    },
    body1: {
      fontSize: '20px',
      lineHeight: 'normal',
    },
    button: {
      fontSize: '24px',
      textTransform: 'none',
      lineHeight: 'normal',
      fontWeight: 400,
    },
  },
  underline: {
    default: underlineStyles.borderBottom,
    hover: underlineStyles.hover.borderBottom,
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: forwardRef(LinkBehavior),
      } as LinkProps,
      styleOverrides: {
        root: {
          color: 'inherit',
          textDecoration: 'none',
          ':hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: forwardRef(LinkBehavior),
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'hollow' },
          style: {
            padding: '12px 24px',
            background: 'none',
            borderRadius: buttonsStyles.borderRadius,
            border: buttonsStyles.hollow.border,
          },
        },
        {
          props: { variant: 'default' },
          style: {
            color: buttonsStyles.default.color,
            backgroundColor: buttonsStyles.default.backgroundColor,
            padding: '12px 24px',
            borderRadius: buttonsStyles.borderRadius,
            ':hover': {
              backgroundColor: buttonsStyles.default.hover.backgroundColor,
            },
          },
        },
        {
          props: { variant: 'orange' },
          style: {
            color: buttonsStyles.orange.color,
            backgroundColor: buttonsStyles.orange.backgroundColor,
            padding: '12px 24px',
            borderRadius: buttonsStyles.borderRadius,
            ':hover': {
              backgroundColor: buttonsStyles.orange.hover.backgroundColor,
            },
          },
        },
        {
          props: { variant: 'link' },
          style: {
            borderRadius: 0,
            color: buttonsStyles.link.color,
            background: 'none',
            padding: '4px 0',
            border: 'none',
            ':hover': {
              background: 'none',
              '::before': {
                borderBottom: underlineStyles.hover.borderBottom,
              },
            },
            '::before': {
              borderBottom: underlineStyles.borderBottom,
              left: 0,
              bottom: 0,
              right: 0,
              content: "''",
              position: 'absolute',
            },
          },
        },
      ],
    },
  },
});
