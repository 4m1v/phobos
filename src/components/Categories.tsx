import { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { Chip, makeStyles, createStyles, Theme } from '@material-ui/core';

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(2.5),
      },
    },
  }),
);

interface CategoriesProps {
  categories: string[];
}

// functional component
const Categories = ({ categories }: CategoriesProps): ReactElement => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {categories.map((category) => (
        <Chip
          key={category}
          label={category}
          variant="outlined"
          color="primary"
          onClick={() => history.push(`/phobia/${category}`)}
          style={{
            padding: 25,
            fontSize: 20,
          }}
          clickable
        />
      ))}
    </div>
  );
};

export default Categories;
