import {
  makeStyles,
  createStyles,
  Theme,
  Button,
  LinearProgress,
  Slider,
  Typography,
  withStyles,
} from '@material-ui/core';

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 20,
      // borderRadius: 5,
      marginBottom: '20px',
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      // borderRadius: 5,
      // backgroundColor: '#1a90ff',
      opacity: '80%',
      transition: '0.08s linear',
    },
  }),
)(LinearProgress);

export default BorderLinearProgress;
