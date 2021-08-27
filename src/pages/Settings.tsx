import React, { FC, ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Slider, Typography, Checkbox, Button } from '@material-ui/core';

// components
import PageTitle from '../components/PageTitle';
import BodyContainer from '../components/BodyContainer';

// constants
import { APP_TITLE, PAGE_TITLE_SETTINGS } from '../utils/constants';

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
    autoZoomContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '25px 0',
    },
  }),
);

const pageMarks = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 100,
    label: '100',
  },
];
const fearFactorMarks = [
  {
    value: 0,
    label: '😀',
  },
  {
    value: 100,
    label: '💀',
  },
];
const autoZoomMarks = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 100,
    label: '100',
  },
];

const Settings: FC<Record<string, never>> = (): ReactElement => {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_SETTINGS} | {APP_TITLE}
        </title>
      </Helmet>
      <div className={classes.root}>
        <BodyContainer>
          <div className={classes.innerBody}>
            <PageTitle title={PAGE_TITLE_SETTINGS} />
            <div>
              <Typography variant="h5"> PAGES </Typography>
              <Slider
                aria-label="Pages"
                step={1}
                color="primary"
                valueLabelDisplay="auto"
                min={1}
                max={100}
                marks={pageMarks}
              />
            </div>
            <div>
              <Typography variant="h5"> FEAR FACTOR </Typography>
              <Slider
                aria-label="Fear Factor"
                step={1}
                color="secondary"
                defaultValue={[20, 40]}
                marks={fearFactorMarks}
              />
            </div>
            <div className={classes.autoZoomContainer}>
              <Typography variant="h5">AUTO ZOOM</Typography>
              <Checkbox />
            </div>
            <div>
              <Typography variant="h6"> ZOOM SPEED </Typography>
              <Slider aria-label="Auto Zoom" step={1} color="secondary" marks={autoZoomMarks} />
            </div>
          </div>
          <div>
            <Button variant="contained" color="primary" fullWidth>
              Start
            </Button>
          </div>
        </BodyContainer>
      </div>
    </>
  );
};

export default Settings;
