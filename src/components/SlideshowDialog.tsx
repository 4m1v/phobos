import React, { FC, ReactElement, ChangeEvent, useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import {
  makeStyles,
  createStyles,
  Theme,
  Button,
  Slider,
  Typography,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import useCountDown from 'react-countdown-hook';
import BorderLinearProgress from './BorderLinearProgress';

// constants
import { ZOOM_MIN, ZOOM_MAX, FEARFACTORMARKS } from '../utils/constants';

interface SlideshowProps {
  tmp: string;
}

/*
Take in a correctly ordered array of images with their links and ids, and an auto zoom setting (which should be modifiable here)
*/

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      backdropFilter: 'blur(8px)',
      backgroundColor: '#00000080', // dark grey
      zIndex: 99999,
    },
    hidden: {
      display: 'none',
    },
    slider: {
      width: '400px',
      margin: '0 auto',
    },
  }),
);

type SlideshowDialogProps = {
  open: boolean;
  isLast: boolean;
  handleClose: () => void;
  onNext: () => void;
};

const SlideshowDialog: FC<SlideshowDialogProps> = ({ open, isLast, handleClose, onNext }: SlideshowDialogProps) => {
  const classes = useStyles();
  const [scarinessVal, setScarinessVal] = React.useState<number[] | number>([1]);

  const updateScariness = (event: ChangeEvent<Record<string, unknown>>, data: number[] | number) => {
    setScarinessVal(data);
  };

  return (
    <>
      <Dialog open={open} className={classes.root} maxWidth="sm" fullWidth>
        <DialogTitle>Well Done!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">How did you do?</DialogContentText>
          <div className={classes.slider}>
            <Slider
              step={1}
              color="primary"
              valueLabelDisplay="auto"
              min={1}
              max={10}
              value={scarinessVal}
              onChange={updateScariness}
              marks={FEARFACTORMARKS}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              onNext();
            }}
            color="primary"
            autoFocus
          >
            {!isLast ? 'Next' : 'Finish'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SlideshowDialog;
