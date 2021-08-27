import React, { FC, ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Typography, makeStyles, createStyles } from '@material-ui/core';

// components
import BodyContainer from '../components/BodyContainer';
import PageTitle from '../components/PageTitle';

// constants
import { APP_TITLE, PAGE_TITLE_PHOBIA } from '../utils/constants';

// define css-in-js
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flex: 1,
    },
    innerBody: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      height: '500px',
      padding: '10px 0',
    },
  }),
);

interface ParamType {
  phobia: string;
}

const Phobia: FC<Record<string, never>> = (): ReactElement => {
  const { phobia } = useParams<ParamType>();
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>
          {phobia} | {APP_TITLE}
        </title>
      </Helmet>
      <div className={classes.root}>
        <BodyContainer>
          <div className={classes.innerBody}>
            <PageTitle title={PAGE_TITLE_PHOBIA} />
            <div>
              <Typography variant="h5">{phobia}</Typography>
            </div>
          </div>
        </BodyContainer>
      </div>
    </>
  );
};

export default Phobia;
