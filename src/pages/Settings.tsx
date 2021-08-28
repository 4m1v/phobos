import React, { ChangeEvent, FC, ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Slider, Typography, Checkbox, Button } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';

// components
import PageTitle from '../components/PageTitle';
import Container from '@material-ui/core/Container';

// constants
import { APP_TITLE, PAGE_TITLE_SETTINGS, PAGEMARKS, FEARFACTORMARKS, AUTOZOOMMARKS } from '../utils/constants';

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
    outerBody: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      height: '80vh',
    },
    checkBoxSliderContainer: {
      display: 'flex',
      margin: '30px',
      '& > div': {
        margin: '0 30px',
      },
    },
    startButtonContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    startButtonStyles: {
      padding: '10px 50px',
    },
  }),
);

const Settings: FC<Record<string, never>> = (): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const [sliderPagesVal, setSliderPagesVal] = React.useState<number[] | number>([1]);
  const [sliderFearVal, setSliderFearVal] = React.useState<number[] | number>([20, 40]);
  const [autoZoomVal, setAutoZoomVal] = React.useState(false);
  const [sliderZoomVal, setSliderZoomVal] = React.useState<number[] | number>([1]);
  const [phobiaTitle, setPhobiaTitle] = React.useState('');
  const params: { phobia: string } = useParams();

  React.useEffect(() => {
    setPhobiaTitle(params.phobia);
  }, []);

  const updatePagesRange = (event: ChangeEvent<Record<string, unknown>>, data: number[] | number) => {
    setSliderPagesVal(data);
    console.log(data);
  };
  const updateFearRange = (eevent: ChangeEvent<Record<string, unknown>>, data: number[] | number) => {
    setSliderFearVal(data);
    console.log(data);
  };
  const updateZoomRange = (event: ChangeEvent<Record<string, unknown>>, data: number[] | number) => {
    setSliderZoomVal(data);
    console.log(data);
  };

  const playPhobia = () => {
    // Some promises here.
    history.push('/phobia/play/23213123');
  };

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_SETTINGS} | {APP_TITLE}
        </title>
      </Helmet>
      <Container maxWidth="xs">
        <div className={classes.outerBody}>
          <div className={classes.innerBody}>
            <PageTitle title={PAGE_TITLE_SETTINGS} />
            <Typography align="center">{phobiaTitle}</Typography>
            <div>
              <Typography variant="h5"> PAGES </Typography>
              <Slider
                aria-label="Pages"
                step={1}
                color="primary"
                valueLabelDisplay="auto"
                min={1}
                max={20}
                value={sliderPagesVal}
                onChange={updatePagesRange}
                marks={PAGEMARKS}
              />
            </div>
            <div>
              <Typography variant="h5"> FEAR FACTOR </Typography>
              <Slider
                aria-label="Fear Factor"
                step={1}
                color="secondary"
                marks={FEARFACTORMARKS}
                value={sliderFearVal}
                onChange={updateFearRange}
              />
            </div>
            <div>
              <Typography variant="h5">AUTO ZOOM</Typography>
              <div className={classes.checkBoxSliderContainer}>
                <Checkbox value={autoZoomVal} onClick={() => setAutoZoomVal(!autoZoomVal)} />
                <div style={{ flex: 1 }}>
                  <Typography variant="h6" color={autoZoomVal ? 'textPrimary' : 'textSecondary'}>
                    {' '}
                    ZOOM SPEED{' '}
                  </Typography>
                  <Slider
                    aria-label="Auto Zoom"
                    step={1}
                    color="secondary"
                    marks={AUTOZOOMMARKS}
                    disabled={!autoZoomVal}
                    value={sliderZoomVal}
                    onChange={updateZoomRange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={classes.startButtonContainer}>
            <Button
              className={classes.startButtonStyles}
              variant="contained"
              color="primary"
              size="large"
              onClick={playPhobia}
            >
              Start
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Settings;
