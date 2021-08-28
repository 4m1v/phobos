import { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { Chip, Tooltip, Theme, makeStyles, createStyles } from '@material-ui/core';

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
  categories: { id: string; description: string }[];
}

// functional component
const Categories = ({ categories }: CategoriesProps): ReactElement => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {categories.map((category) => (
        <Tooltip key={category.id} title={category.description} aria-label={category.description}>
          <Chip
            key={category.id}
            label={category.id}
            variant="outlined"
            color="primary"
            onClick={() => history.push(`/phobia/${category.id}`)}
            style={{
              padding: 25,
              fontSize: 20,
            }}
            clickable
          />
        </Tooltip>
      ))}
    </div>
  );
};

export default Categories;
