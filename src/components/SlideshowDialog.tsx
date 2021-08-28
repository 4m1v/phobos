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
      backdropFilter: 'blur(8px)',
      // backgroundColor: '#00000080', // dark grey
      zIndex: 99999,
    },
    hidden: {
      display: 'none',
    },
    slider: {
      width: '300px',
      margin: '0 auto',
    },
  }),
);

type SlideshowDialogProps = {
  open: boolean;
  isLast: boolean;
  scariness: number;
  setScariness: (data: number | number[]) => void;
  handleClose: () => void;
  onNext: () => void;
  onFinish: () => void;
};

const SlideshowDialog: FC<SlideshowDialogProps> = ({
  open,
  isLast,
  scariness,
  setScariness,
  handleClose,
  onNext,
  onFinish,
}: SlideshowDialogProps) => {
  const classes = useStyles();

  const updateScariness = (event: ChangeEvent<Record<string, unknown>>, data: number | number[]) => {
    setScariness(data);
  };

  return (
    <>
      <Dialog open={open} className={classes.root} maxWidth="xs" fullWidth>
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
              value={scariness}
              onChange={updateScariness}
              marks={FEARFACTORMARKS}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              if (!isLast) {
                onNext();
              } else {
                onFinish();
              }
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
