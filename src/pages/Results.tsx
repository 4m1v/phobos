import React, { ChangeEvent, FC, ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Slider, Typography, Checkbox, Button } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';

// components
import PageTitle from '../components/PageTitle';
import Container from '@material-ui/core/Container';
import LineGraph from '../components/LineGraph';

// constants
import { APP_TITLE, PAGE_TITLE_SETTINGS, PAGEMARKS, FEARFACTORMARKS, AUTOZOOMMARKS } from '../utils/constants';

// define css-in-js
const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  }),
);

const Results: FC<Record<string, never>> = (): ReactElement => {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_SETTINGS} | {APP_TITLE}
        </title>
      </Helmet>
      <Container maxWidth="sm" className={classes.root}>
        <LineGraph />
      </Container>
    </>
  );
};

export default Results;
