import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles =makeStyles(() => ({
  root: {
    position: 'absolute',
    width: '100%',
  },
}));

export const Loader = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress />
    </div>
  );
}
