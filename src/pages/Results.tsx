import React, { FC, ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

// components
import PageTitle from '../components/PageTitle';
import Container from '@material-ui/core/Container';
import LineGraph from '../components/LineGraph';

// constants
import { APP_TITLE } from '../utils/constants';

import { resultRequest } from '../utils/requests';
import { Session, Slide } from '../api';

// define css-in-js
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {},
    body: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(2.5),
      },
      margin: theme.spacing(5),
      marginTop: theme.spacing(10),
      maxWidth: theme.spacing(100),
    },
  }),
);

const parseResults = (res: Session): { x: number; y: number }[] => {
  return res.slides.map((slide: Slide) => ({
    x: slide.order + 1,
    y: slide.scariness,
  }));
};

const Results: FC<Record<string, never>> = (): ReactElement => {
  const classes = useStyles();
  const params: { sessionID: string } = useParams();

  const [results, setResults] = React.useState<{ x: number; y: number }[]>([]);
  React.useEffect(() => {
    resultRequest(params.sessionID)
      .then((info) => {
        setResults(parseResults(info));
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <Helmet>
        <title>Results | {APP_TITLE}</title>
      </Helmet>
      <Container maxWidth="sm" className={classes.root}>
        <div className={classes.body}>
          <PageTitle title="Awesome Job!" />
          <Typography>Here are your results</Typography>
        </div>
        <LineGraph data={results} />
      </Container>
    </>
  );
};

export default Results;
