import * as React from 'react';
import clsx from 'clsx';

import BodyContainerStyles from './styles/BodyContainerStyles';

import Container from '@material-ui/core/Container';

interface Props {
  disableGutters?: boolean;
  fixed?: boolean;
  maxWidth?: 'lg' | 'md' | 'sm' | 'xl' | 'xs' | false;
  loading?: boolean;
  noHide?: boolean;
  className?: string;
  children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal;
}

/**
 * Main CSS body container for all pages.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const BodyContainer = ({
  disableGutters,
  fixed,
  maxWidth = 'xs',
  loading = false,
  noHide = false,
  className,
  children,
}: Props) => {
  const classes = BodyContainerStyles({ loading });

  // Reset scroll
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Render elements but dont show */}
      <div className={clsx({ [classes.hide]: !noHide && loading })}>
        <Container
          disableGutters={disableGutters}
          fixed={fixed}
          maxWidth={maxWidth}
          className={clsx(classes.root, className)}
        >
          {/* Conditionally hide children while loading: noHide false ==> hide children when loading */}
          {/* Not working with refs, when nohide is off */}
          {/* {!noHide ? !loading && children : children} */}

          {children}
        </Container>
      </div>
    </>
  );
};

export default BodyContainer;
