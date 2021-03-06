import { ReactElement } from 'react';
import { createStyles, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    title: {},
  }),
);

interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps): ReactElement => {
  const classes = useStyles();
  return (
    <Typography variant="h4" className={classes.title} color="textSecondary" align="center">
      {title}
    </Typography>
  );
};

export default PageTitle;
