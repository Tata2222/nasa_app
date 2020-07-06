import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchNeoData } from '../../store/neo';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { getNeoData, getHazardousNeoData, isLoading, getErrorMessage } from '../../store';
import { Loader } from '../Loader';

import { NeoCard } from '../NeoCard';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    maxWidth: 1240,
    marginTop: 20,
    alignContent: 'center',
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export const NeoList = () => {
  const neoData = useSelector(getNeoData);
  const loading = useSelector(isLoading);
  const { errorMessage } = useSelector(getErrorMessage)
  const dispatch = useDispatch();
  const hazardousNeoData = useSelector(getHazardousNeoData);
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchNeoData())
  }, [dispatch])

  return (
    <>
      {loading && <Loader />}
      {errorMessage.length > 0
        && (
        <div className="error">{errorMessage}</div>
      )}
      <Grid container spacing={4}
        style={{ width: '100%' }}
        className={classes.root}

      >
        {neoData.map(neo => (
          <Grid
            item
            xs={12}
            md={12}
            key={neo.links.self}
            className={classes.card}
          >
            <NeoCard
              neo={neo}
              key={neo.links.self}
              isDangerous = {hazardousNeoData.includes(neo.links.self)}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};


 /*direction ="column-reverse"*/
