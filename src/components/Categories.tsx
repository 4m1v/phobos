import { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
// @ts-ignore
import { AwesomeButton } from 'react-awesome-button';
// @ts-ignore
import ReactWordcloud from 'react-wordcloud';

interface CategoriesProps {
  categories: string[];
}

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      background: theme.palette.background.paper,
    },
  }),
);

// functional component
const Categories = ({ categories }: CategoriesProps): ReactElement => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ReactWordcloud
        callbacks={{
          onWordClick: (word) => history.push(`/phobia/${word.text}`),
        }}
        options={{
          deterministic: true,
          enableTooltip: false,
          fontFamily: 'sans-serif',
          fontSizes: [30, 30],
          fontStyle: 'italic',
          padding: 30,
          rotations: 0,
        }}
        words={categories.map((category) => {
          return { text: category, value: 1 };
        })}
      />
    </div>
  );
};

export default Categories;
