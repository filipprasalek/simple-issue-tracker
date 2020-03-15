import React from 'react';
import PropTypes from 'prop-types';
import {Snackbar, SnackbarContent} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles(theme => ({
  failure: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function ErrorSnackbar(props) {
  const classes = useStyles();
  return (
    (<Snackbar open={true} autoHideDuration={15000} onClose={props.onClose}>
       <SnackbarContent
        className={classes.failure}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <ErrorIcon className={classes.icon}/>
            {props.message}
          </span>
        }
      />
     </Snackbar>)
  );
} 

export default ErrorSnackbar;

ErrorSnackbar.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
}