import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  toolbar: {
    marginBottom: theme.spacing(2)
  },
  addIcon: {
    marginLeft: theme.spacing(1)
  },
  title: {
    marginRight: '1em',
    paddingRight: '1em'
  },
}));

function IssuesToolbar(props) {
  const classes = useStyles();
  return(
    <div className={classes.toolbar}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" color="inherit">
            Issue Tracker
          </Typography>
          <span className={classes.grow} />
          <Button onClick={props.onCreateIssueClick} color="inherit">
            Create new issue 
            <AddIcon className={classes.addIcon}/>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default IssuesToolbar;

IssuesToolbar.propTypes = {
  onCreateIssueClick: PropTypes.func.isRequired
}