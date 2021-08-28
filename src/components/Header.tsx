import { ReactElement } from 'react';
import clsx from 'clsx';
import { AppBar, Toolbar, Typography, IconButton, Tooltip, createStyles, makeStyles, Theme } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import { useHistory } from 'react-router-dom';

// constants
import { APP_TITLE, DRAWER_WIDTH } from '../utils/constants';

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    toolbar: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
  }),
);

// define interface to represent component props
interface HeaderProps {
  open: boolean;
  handleMenuOpen: () => void;
  toggleTheme: () => void;
  useDefaultTheme: boolean;
}

const Header = ({ open, handleMenuOpen, toggleTheme, useDefaultTheme }: HeaderProps): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const goHome = () => {
    history.push('/');
  };
  return (
    <AppBar
      position="fixed"
      elevation={0}
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar className={classes.toolbar}>
        <div className={classes.title} style={{ cursor: 'pointer' }}>
          <Typography variant="h6" noWrap onClick={goHome}>
            {APP_TITLE}
          </Typography>
        </div>
        <IconButton onClick={toggleTheme}>
          {useDefaultTheme ? (
            <Tooltip title="Switch to dark mode" placement="bottom">
              <Brightness3Icon />
            </Tooltip>
          ) : (
            <Tooltip title="Switch to light mode" placement="bottom">
              <Brightness7Icon />
            </Tooltip>
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
