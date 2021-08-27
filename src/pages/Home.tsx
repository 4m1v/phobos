import { FC, ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles, createStyles } from '@material-ui/core/styles';

// components
import PageTitle from '../components/PageTitle';
import Categories from '../components/Categories';

// constants
import { APP_TITLE, PAGE_TITLE_HOME, PHOBIAS } from '../utils/constants';

// define css-in-js
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
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
        <PageTitle title={PAGE_TITLE_HOME} />
        <Categories categories={PHOBIAS} />
      </div>
    </>
  );
};

export default Home;
