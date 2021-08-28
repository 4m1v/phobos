import { FC, ReactNode, useReducer } from 'react';
import { makeStyles, createStyles, Theme, CssBaseline } from '@material-ui/core';

// components
import Header from './Header';

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flexGrow: 1,
      // padding: theme.spacing(3),
      minHeight: '100vh',
      background: theme.palette.background.paper,
    },
    /*
    toolbar: {
      ...theme.mixins.toolbar,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: DRAWER_WIDTH,
    },
    */
  }),
);

// define interface to represent component props
interface LayoutProps {
  toggleTheme: () => void;
  useDefaultTheme: boolean;
  children: ReactNode;
}

// functional component
const Layout: FC<LayoutProps> = ({ toggleTheme, useDefaultTheme, children }: LayoutProps) => {
  const classes = useStyles();
  const [open, toggle] = useReducer((open) => !open, true);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header open={open} handleMenuOpen={toggle} toggleTheme={toggleTheme} useDefaultTheme={useDefaultTheme} />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default Layout;
