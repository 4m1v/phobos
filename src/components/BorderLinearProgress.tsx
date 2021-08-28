import { Theme, LinearProgress, createStyles, withStyles } from '@material-ui/core';

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 20,
      marginBottom: '20px',
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      opacity: '80%',
      transition: '0.08s linear',
    },
  }),
)(LinearProgress);

export default BorderLinearProgress;
