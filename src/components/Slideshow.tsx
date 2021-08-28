import React, { FC, ReactElement, useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  makeStyles,
  createStyles,
  Theme,
  Button,
  LinearProgress,
  Slider,
  Typography,
  withStyles,
} from '@material-ui/core';
import useCountDown from 'react-countdown-hook';

// constants
import { ZOOM_MIN, ZOOM_MAX } from '../utils/constants';

interface SlideshowProps {
  tmp: string;
}

/*
Take in a correctly ordered array of images with their links and ids, and an auto zoom setting (which should be modifiable here)
*/
const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 25,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  }),
)(LinearProgress);

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100vh',
      background: theme.palette.background.paper,
    },
    roundUi: {
      // position: 'fixed',
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
      width: '100%',
      height: '77vh',
    },
    mediaInnerContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    slideBarContainer: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      padding: '0 35%',
      paddingTop: '20px',
    },
  }),
);

const Slideshow: FC<Record<string, never>> = () => {
  const classes = useStyles();
  const zoomIncrement = 50;
  const [zoom, setZoom] = useState<number>(ZOOM_MIN);
  const [mediaContSize, setMediaContSize] = useState(10);
  const [mediaHundredWidth, setMediaHundredWidth] = useState(false);
  const media = useRef<HTMLImageElement>(null);
  const [finishedSlide, setFinishedSlide] = useState(false);

  const initialTime = 5000;
  const interval = 100;
  // Set the media container size according to zoom

  // const intervalRef: { current: NodeJS.Timeout | null } = useRef(null);
  useEffect(() => {
    setMediaContSize(100 * (zoom / ZOOM_MAX));
  }, [zoom]);

  // Determine whether the media's size should be limited by the width or height of its container
  useEffect(() => {
    if (media != null && media.current != null) {
      const scaleWithWidth = window.innerWidth / media.current.width;
      setMediaHundredWidth(scaleWithWidth * media.current.height < window.innerHeight);
    }
  }, [zoom, media]);

  return (
    <main>
      <div className={classes.roundUi}>
        <div className={classes.roundHeader}>
          <Button variant="contained">Back</Button>
          {
            // Max zoom timer
            // <BorderLinearProgress variant="determinate" value={Math.round((timeLeft / initialTime) * 100)} />
          }
          <Button variant="contained">Help</Button>
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
          <img
            src="https://www.abc.net.au/cm/rimage/12555382-1x1-xlarge.jpg?v=2" // square
            // src="https://images.pexels.com/photos/255419/pexels-photo-255419.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" // wide
            // src="http://wvs.topleftpixel.com/photos/scotia_plaza_tall_stitched.jpg" // tall
            // src="https://i.pinimg.com/originals/6d/c2/1b/6dc21b2e583b755504a37c0bded0b54a.gif" // gif
            alt="Something"
            ref={media}
            style={{
              width: mediaHundredWidth ? '100%' : 'auto',
              height: mediaHundredWidth ? 'auto' : '100%',
            }}
          />
        </div>
      </div>
      <div className={classes.slideBarContainer}>
        {
          // Image number
        }
        {
          // Zoom timer

          <Slider
            value={zoom}
            step={zoomIncrement}
            min={ZOOM_MIN}
            max={ZOOM_MAX}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(event, newValue: any) => {
              setZoom(newValue);
            }}
          />
        }
      </div>
      <Button variant="contained">Auto</Button>
    </main>
  );
};

export default Slideshow;
