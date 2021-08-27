import { ReactElement } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
// @ts-ignore
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-blue.css';

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
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {categories.map((category) => (
        <AwesomeButton key={category} type="primary" style={{ margin: 10 }}>
          {category}
        </AwesomeButton>
      ))}
    </div>
  );
};

export default Categories;
