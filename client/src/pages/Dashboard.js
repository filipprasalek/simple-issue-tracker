import React, {useState, useCallback, useEffect} from 'react';
import {Grid, Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import Toolbar from 'components/Toolbar';
import {fetchAllIssues, updateIssueState, createIssue} from 'lib/apiRequests';
import IssuesList from 'components/IssuesList';
import IssueDetails from 'components/IssueDetails';
import CreateIssueModal from 'components/CreateIssueModal';
import ErrorSnackbar from 'components/ErrorSnackbar';
import {getNextIssueState} from 'utils/dictionary';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  issuesList: {
    minHeight: '80vh',
    maxHeight: '85vh',
    paddingLeft: theme.spacing(1),
    overflowY: 'auto',
    height: '100%'
  },
  issueDetails: {
    minHeight: '80vh',
    paddingRight: theme.spacing(1),
    height: '100%',
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  }
}));

function Dashboard() {
  const classes = useStyles();
  const [issues, setIssues] = useState([]);
  const [activeIssue, setActiveIssue] = useState('');
  const [showCreateIssueModal, setShowCreateIssueModal] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchAllIssues(setIssues, error => {setError(error.message)});
  }, []);

  const onIssueSave = (title, description) => {
    createIssue(title, description, 
      () => {
        setShowCreateIssueModal(false);
        fetchAllIssues(setIssues, error => {setError(error.message)});
      },
      error => {setError(error.message) }
    )
  }

  const onIssueStateUpdate = (issueId, state) => {
    updateIssueState(issueId, getNextIssueState(state), 
        () => {setIssues(issues.map(issue => issue.id === activeIssue ? {...issue, state: getNextIssueState(state)} : issue))}, 
        (error) => {setError(error.message)}
    )
  }

  const renderIssuesList = useCallback(() => (
    <IssuesList 
      onClick={setActiveIssue} 
      activeIssue={activeIssue} 
      issues={issues}
    />
  ), [issues, activeIssue]);

  const renderActiveIssue = useCallback(() => (
    <IssueDetails 
      onStateChange={onIssueStateUpdate} 
      issue={issues.find(it => it.id === activeIssue)}
    />
  ), [issues, activeIssue]);

  const renderCreateIssueModal = useCallback(() => {
    return showCreateIssueModal && 
      (<CreateIssueModal 
        handleClose={() => setShowCreateIssueModal(false)}
        handleSave={onIssueSave}
      />)
  }, [showCreateIssueModal]);

  const renderErrorSnackbar = useCallback(() => {
    return error && <ErrorSnackbar message={error} onClose={() => setError(null)}/>
  }, [error]);

  return (
    <div className={classes.root}>
      {renderCreateIssueModal()}
      {renderErrorSnackbar()}
      <Toolbar onCreateIssueClick={() => setShowCreateIssueModal(true)}/>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Box className={classes.issuesList} component="div">
            {renderIssuesList()}
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box className={classes.issueDetails} component="div">
            {renderActiveIssue()}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;