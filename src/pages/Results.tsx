import React, { ChangeEvent, FC, ReactElement } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Slider, Typography, Checkbox, Button } from '@material-ui/core';

// components
import PageTitle from '../components/PageTitle';
import Container from '@material-ui/core/Container';
import LineGraph from '../components/LineGraph';

// constants
import { APP_TITLE, PAGE_TITLE_SETTINGS, PAGEMARKS, FEARFACTORMARKS, AUTOZOOMMARKS } from '../utils/constants';

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

const parseResults = (res: Session) => {
  return res.slides.map((slide: Slide) => ({
    x: slide.order,
    y: slide.scariness,
  }));
};

const Results: FC<Record<string, never>> = (): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const params: { sessionID: string } = useParams();

  const [results, setResults] = React.useState<any>([]);
  React.useEffect(() => {
    resultRequest(params.sessionID).then((info) => {
\      setResults(parseResults(info));
    });
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
