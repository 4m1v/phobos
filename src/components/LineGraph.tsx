import * as React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ResponsiveLine } from '@nivo/line';

// https://codesandbox.io/embed/youthful-glitter-txvx8?fontsize=14&hidenavigation=1&theme=dark
const dataDefault = [
  {
    x: 1,
    y: 2,
  },
  {
    x: 2,
    y: 3,
  },
  {
    x: 3,
    y: 5,
  },
  {
    x: 4,
    y: 6,
  },
  {
    x: 5,
    y: 6,
  },
  {
    x: 6,
    y: 5,
  },
  {
    x: 7,
    y: 4,
  },
  {
    x: 8,
    y: 7,
  },
  {
    x: 9,
    y: 6,
  },
  {
    x: 10,
    y: 6,
  },
  {
    x: 11,
    y: 8,
  },
  {
    x: 12,
    y: 8,
  },
];

const useStyles = makeStyles(() => ({
  container: {
    height: '50vh',
  },
  graph: {
    borderRadius: '3px',
  },
}));

interface Props {
  data?: { x: number; y: number }[];
}

const LineGraph = ({ data = dataDefault }: Props): React.ReactElement => {
  const classes = useStyles();
  const colors = useTheme().palette;

  const theme = {
    background: 'transparent',
    textColor: '#000000',
    fontSize: 14,
    axis: {
      domain: {
        line: {
          stroke: '#777777',
          strokeWidth: 1,
        },
      },
      ticks: {
        line: {
          stroke: '#777777',
          strokeWidth: 1,
        },
      },
    },
    grid: {
      line: {
        stroke: '#dddddd22',
        strokeWidth: 1,
      },
    },
  };

  const toDisplay = [
    {
      id: 'Scariness Ratings',
      data,
    },
  ];

  return (
    <div className={classes.container}>
      <ResponsiveLine
        data={toDisplay}
        theme={theme}
        colors={() => colors.secondary.light}
        curve="linear"
        enableArea
        margin={{ top: 20, right: 60, bottom: 50, left: 50 }}
        yScale={{
          type: 'linear',
          min: 0,
          max: 10,
          // stacked: true,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Scariness',
          legendOffset: -30,
          legendPosition: 'middle',
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Image Number',
          legendOffset: 40,
          legendPosition: 'middle',
        }}
        pointSize={10}
        pointColor={colors.secondary.dark}
        pointBorderWidth={2}
        pointBorderColor={colors.secondary.light}
      />
    </div>
  );
};

export default LineGraph;
