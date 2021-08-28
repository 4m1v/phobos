import { FC, ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles, createStyles, Theme, Typography } from '@material-ui/core';

// components
import Categories from '../components/Categories';

import logo from '../img/phoboss.png';

// constants
import { APP_TITLE, PAGE_TITLE_HOME, PHOBIAS } from '../utils/constants';

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    body: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(2.5),
      },
      margin: theme.spacing(5),
      marginTop: theme.spacing(10),
      maxWidth: theme.spacing(100),
    },
    logo: {
      margin: '20px auto',
      maxWidth: '300px',
      imageRendering: 'pixelated',
    },
  }),
);

const Home: FC<Record<string, never>> = (): ReactElement => {
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_HOME} | {APP_TITLE}
        </title>
      </Helmet>
      <div className={classes.root}>
        <div className={classes.body}>
          {/* <PageTitle title={PAGE_TITLE_HOME} /> */}
          <img src={logo} alt="phobos logo" className={classes.logo} />
          <Typography align="justify" variant="body1">
            Welcome to <i>Phobos!!!</i> Just click on a phobia and start your journey to overcome your fears 😊.
            Don&apos;t worry, we won&apos;t bombard you with the scarist images.Instead, you&apos;ll be in control!
            We&apos;ll show you some very mild images and let you slowly zoom 🔍 so you can face your fears at a pace
            you feel comfortable with 🧸.
          </Typography>
          <Categories categories={PHOBIAS} />
        </div>
      </div>
    </>
  );
};

export default Home;
