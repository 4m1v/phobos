import { ReactElement } from 'react';
import clsx from 'clsx';
import { AppBar, Toolbar, Typography, IconButton, Tooltip, createStyles, makeStyles, Theme } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { useHistory } from 'react-router-dom';

// constants
import { APP_TITLE, DRAWER_WIDTH } from '../utils/constants';

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    /*
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
    */
    container: {
      width: '100%',
      position: 'fixed',
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: theme.spacing(1),
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
    <div className={classes.container}>
      <IconButton onClick={goHome}>
        <Tooltip title="Go home" placement="bottom">
          <HomeRoundedIcon />
        </Tooltip>
      </IconButton>
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
    </div>
  );
};

export default Header;
