import { makeStyles } from '@material-ui/core/styles';

const navBarHeight = '64px';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '80vh',
    padding: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  loadingContainer: {
    position: 'sticky',
    top: navBarHeight,
  },
}));

export default useStyles;
