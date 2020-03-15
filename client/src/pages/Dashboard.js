import React, {useState, useCallback, useEffect} from 'react';
import {Grid, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import Toolbar from 'components/Toolbar';
import {fetchJSON} from 'utils/fetchUtils';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));

function Dashboard() {
  const classes = useStyles();
  const [issues, setIssues] = useState([]);
  const [activeIssue, setActiveIssue] = useState(0);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchJSON('http://localhost:3000/api/v1/issues', {}, 
      setIssues, 
      error => {setError(error.message)}
    );
  }, [])

  const renderIssuesList = useCallback(() => {
    return (<Paper className={classes.paper}>
      { issues.map(it => <span>{ it.title }</span>) }
    </Paper>);
  }, [issues, activeIssue])

  const renderActiveIssue = useCallback(() => {
    return <Paper className={classes.paper}>test</Paper>;
  }, [activeIssue])

  return (
    <div className={classes.root}>
      <Toolbar/>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          {renderIssuesList()}
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>details container</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;