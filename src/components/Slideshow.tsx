import React, { FC, useState, useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { makeStyles, createStyles, Theme, Slider, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useCountDown from 'react-countdown-hook';

// constants
import { ZOOM_MIN, ZOOM_MAX } from '../utils/constants';
import SlideshowDialog from './SlideshowDialog';

import { playRequest, feedbackRequest } from '../utils/requests';

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100vh',
      background: theme.palette.background.paper,
    },
    hudTop: {
      // position: 'fixed',
    },
    hudBottom: {
      position: 'fixed',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      bottom: 0,
      padding: theme.spacing(1),
      paddingBottom: theme.spacing(4),
      width: '100%',
    },
    zoomSlider: {
      maxWidth: theme.spacing(70),
      marginLeft: theme.spacing(5),
    },
    roundHeader: {
      // display: 'flex',
      // justifyContent: 'space-between',
      // width: '100vw',
    },
    mediaContainer: {
      zIndex: -1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height: '85vh',
      marginTop: theme.spacing(1),
    },
    mediaInnerContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    hiddenFade: {
      opacity: 0,
      visibility: 'hidden',
      transition: 'opacity 0.75s ease-in-out, visibility 0.75s',
    },
  }),
);

const Slideshow: FC<Record<string, never>> = () => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const zoomIncrement = 50;
  const [zoom, setZoom] = useState<number>(ZOOM_MIN);
  const [mediaContSize, setMediaContSize] = useState(10);
  const [mediaHundredWidth, setMediaHundredWidth] = useState(false);
  const media = useRef<HTMLImageElement>(null);

  const [barTimer, setBarTimer] = useState<number>(0);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const initialTime = 3000;
  const interval = 50;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [timeLeft, { start, pause, resume, reset }] = useCountDown(initialTime, interval);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [scariness, setScariness] = React.useState<number>(1);

  const params: { sessionID: string } = useParams();

  // Slideshow state
  const sessionPageMax = sessionStorage.getItem('pageMax');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageMax, setPageMax] = useState(sessionPageMax ? JSON.parse(sessionPageMax) : 1);
  const [pageCurr, setPageCurr] = useState(1);
  const [imageUrl, setImageUrl] = useState('');
  const [imageId, setImageId] = useState('');

  const resetZoom = () => {
    setZoom(ZOOM_MIN);
  };

  useEffect(() => {
    playRequest(params.sessionID)
      .then((info) => {
        setImageUrl(info.url);
        setImageId(info.id);
      })
      .catch((e) => console.log(e));
    resetZoom();
  }, [pageCurr]);

  useEffect(() => {
    setMediaContSize(100 * (zoom / ZOOM_MAX));
    if (zoom === ZOOM_MAX) {
      start();
      setTimerStarted(true);
    } else {
      pause();
      reset();
      setTimerStarted(false);
    }
  }, [zoom]);

  useEffect(() => {
    if (!timerStarted) {
      setBarTimer(0);
    } else {
      setBarTimer(Math.round(100 - (timeLeft / initialTime) * 100));
    }
  }, [timeLeft, timerStarted]);

  useEffect(() => {
    if (timerStarted && barTimer === 100) {
      setDialogOpen(true);
    }
  }, [barTimer, timerStarted]);

  // Determine whether the media's size should be limited by the width or height of its container
  useEffect(() => {
    if (media != null && media.current != null) {
      const scaleWithWidth = window.innerWidth / media.current.width;
      setMediaHundredWidth(scaleWithWidth * media.current.height < window.innerHeight);
    }
  }, [zoom, media]);

  return (
    <main>
      {/* TODO Change isLast */}
      <SlideshowDialog
        open={dialogOpen}
        isLast={pageMax == pageCurr}
        scariness={scariness}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setScariness={(newScariness: any) => setScariness(newScariness)}
        handleClose={() => setDialogOpen(false)}
        onNext={() => {
          feedbackRequest(imageId, params.sessionID, scariness).catch((e) => console.log(e));
          setPageCurr(Math.min(pageCurr + 1, pageMax));
        }}
        onFinish={() => {
          feedbackRequest(imageId, params.sessionID, scariness).catch((e) => console.log(e));
          history.push(`/phobia/results/${params.sessionID}`);
        }}
      />

      <div className={classes.hudTop}>
        <div className={classes.roundHeader}>
          {/* <Button variant="contained">Help</Button> info about the image, source */}
        </div>
      </div>

      <div className={classes.mediaContainer}>
        <div
          className={classes.mediaInnerContainer}
          style={{
            width: `${mediaContSize}%`,
            height: `${mediaContSize}%`,
          }}
        >
          {imageUrl && (
            <img
              src={imageUrl}
              // src="https://www.abc.net.au/cm/rimage/12555382-1x1-xlarge.jpg?v=2" // square
              // src="https://images.pexels.com/photos/255419/pexels-photo-255419.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" // wide
              // src="http://wvs.topleftpixel.com/photos/scotia_plaza_tall_stitched.jpg" // tall
              // src="https://i.pinimg.com/originals/6d/c2/1b/6dc21b2e583b755504a37c0bded0b54a.gif" // gif
              alt="Something"
              ref={media}
              style={{
                width: mediaHundredWidth ? '100%' : 'auto',
                height: mediaHundredWidth ? 'auto' : '100%',
                borderWidth: `${timerStarted ? '5px' : '0px'}`,
                borderStyle: 'solid',
                borderImage: `conic-gradient(
                ${theme.palette.primary.main},
                ${theme.palette.primary.main} ${barTimer}%,
                ${theme.palette.background.paper} ${barTimer + 0.5}%,
                ${theme.palette.background.paper}
              ) 1`,
              }}
            />
          )}
        </div>
      </div>

      <div className={classes.hudBottom}>
        <Typography variant="h6">
          {pageCurr} / {pageMax}
        </Typography>
        <Slider
          value={zoom}
          step={zoomIncrement}
          valueLabelDisplay="on"
          valueLabelFormat={(value) => <div>🖐️</div>}
          min={ZOOM_MIN}
          max={ZOOM_MAX}
          marks={[
            {
              value: ZOOM_MAX,
              label: '🏁',
            },
          ]}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(event, newZoom: any) => {
            setZoom(newZoom);
          }}
          className={classes.zoomSlider}
        />
      </div>
    </main>
  );
};

export default Slideshow;
