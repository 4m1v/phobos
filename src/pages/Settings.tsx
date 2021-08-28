import React, { ChangeEvent, FC, ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { Slider, Typography, Checkbox, Button } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';

// components
import PageTitle from '../components/PageTitle';
import Container from '@material-ui/core/Container';

// constants
import { APP_TITLE, PAGE_TITLE_SETTINGS, PAGEMARKS, FEARFACTORMARKS, AUTOZOOMMARKS } from '../utils/constants';

import { startRequest } from '../utils/requests';

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      height: '80vh',
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '10px 0',
      margin: theme.spacing(5),
      marginTop: theme.spacing(10),
    },
    settingsGrid: {
      display: 'grid',
      gridTemplateColumns: '200px 400px',
      justifyItems: 'start',
      gridColumnGap: theme.spacing(5),
      gridRowGap: theme.spacing(5),
      paddingRight: theme.spacing(15),
      marginTop: theme.spacing(15),
    },
    settingsGridLabel: {
      justifySelf: 'end',
    },
    autoZoomContainer: {
      height: theme.spacing(15),
    },
    startButtonContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(10),
    },
    startButtonStyles: {
      padding: '10px 50px',
    },
  }),
);

const Settings: FC<Record<string, never>> = (): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const [sliderPagesVal, setSliderPagesVal] = React.useState<number[] | number>(1);
  const [sliderFearVal, setSliderFearVal] = React.useState<number[]>([2, 4]);
  const [autoZoomVal, setAutoZoomVal] = React.useState(false);
  const [sliderZoomVal, setSliderZoomVal] = React.useState<number[] | number>([1]);
  const [phobiaTitle, setPhobiaTitle] = React.useState('');
  const params: { category: string } = useParams();

  React.useEffect(() => {
    setPhobiaTitle(params.category);
  }, []);

  const updatePagesRange = (event: ChangeEvent<Record<string, unknown>>, data: number[] | number) => {
    setSliderPagesVal(data);
    console.log(data);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateFearRange = (eevent: ChangeEvent<Record<string, unknown>>, data: any) => {
    setSliderFearVal(data);
    console.log(data);
  };
  const updateZoomRange = (event: ChangeEvent<Record<string, unknown>>, data: number[] | number) => {
    setSliderZoomVal(data);
    console.log(data);
  };

  const playPhobia = () => {
    // Some promises here.
    startRequest(sliderFearVal[0], sliderFearVal[1], phobiaTitle)
      .then((dataID) => {
        console.log(dataID);
        history.push(`/phobia/play/${dataID.sessionId}`);
      })
      .catch((err) => {
        console.log(err);
      });
    sessionStorage.setItem('pageMax', JSON.stringify(sliderPagesVal));
  };

  const capitalise = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_SETTINGS} | {APP_TITLE}
        </title>
      </Helmet>
      <Container maxWidth="xs">
        <div className={classes.root}>
          <div className={classes.body}>
            <PageTitle title={capitalise(phobiaTitle) + ' ' + PAGE_TITLE_SETTINGS} />
            <div className={classes.settingsGrid}>
              <Typography variant="h5" className={classes.settingsGridLabel}>
                Images
              </Typography>
              <Slider
                aria-label="Images"
                step={1}
                color="primary"
                valueLabelDisplay="on"
                min={1}
                max={20}
                value={sliderPagesVal}
                onChange={updatePagesRange}
                marks={PAGEMARKS}
              />
              <Typography variant="h5" className={classes.settingsGridLabel}>
                Fear Factor
              </Typography>
              <Slider
                aria-label="Fear Factor"
                step={1}
                color="secondary"
                valueLabelDisplay="on"
                min={1}
                max={10}
                marks={FEARFACTORMARKS}
                value={sliderFearVal}
                onChange={updateFearRange}
              />
              <Typography variant="h5" className={classes.settingsGridLabel}>
                Auto Zoom
              </Typography>
              <Checkbox value={autoZoomVal} onClick={() => setAutoZoomVal(!autoZoomVal)} />
              {autoZoomVal && (
                <>
                  <Typography
                    variant="h6"
                    color={autoZoomVal ? 'textPrimary' : 'textSecondary'}
                    className={classes.settingsGridLabel}
                  >
                    Speed
                  </Typography>
                  <Slider
                    aria-label="Auto Zoom"
                    step={1}
                    color="secondary"
                    min={1}
                    max={10}
                    marks={AUTOZOOMMARKS}
                    disabled={!autoZoomVal}
                    value={sliderZoomVal}
                    onChange={updateZoomRange}
                  />
                </>
              )}
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
        </div>
      </Container>
    </>
  );
};

export default Settings;
