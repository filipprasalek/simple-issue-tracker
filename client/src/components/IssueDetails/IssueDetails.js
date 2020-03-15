import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {Paper, Typography, Chip, Box, Divider, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {OPEN_ISSUE, PENDING_ISSUE, getIssueColor} from 'utils/dictionary';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    color: theme.palette.text.secondary
  },
  wrapper: {
    paddingLeft: theme.spacing(4),
  },
  title: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2)
  },
  issueState: {
    marginBottom: theme.spacing(2)
  },
  chip: {
    color: 'white',
    marginRight: theme.spacing(2)
  },
  body: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  }
}));

function IssueDetails(props) {
  const classes = useStyles();

  const getButtonText = useCallback(() => {
    switch(props.issue.state) {
      case OPEN_ISSUE:
        return 'Assign';
      case PENDING_ISSUE:
        return 'Resolve';
      default:
        return '';  
    }
  }, [props.issue])

  const renderChangeStateButton = useCallback(() => {
    if ([OPEN_ISSUE, PENDING_ISSUE].includes(props.issue.state)) {
      return <Button variant="contained" onClick={() => props.onStateChange(props.issue.id, props.issue.state)} size="small">{getButtonText()}</Button>;
    }
  }, [props.issue]);

  const renderIssueDetails = useCallback(() => {
    return (
      <Box className={classes.wrapper} component="div">
        <Typography className={classes.title} variant="h4">
          {props.issue.title}
        </Typography>
        <Box className={classes.issueState} component="div">
          <Chip className={classes.chip} style={{backgroundColor: getIssueColor(props.issue.state)}} label={props.issue.state}/>
          {renderChangeStateButton()}
        </Box>
        <Divider />
        <Typography className={classes.body} variant="body1" color="textSecondary">
            {props.issue.description}
        </Typography>
      </Box>
    );
  }, [props.issue]);

  return (
    <Paper className={classes.root}>
        {props.issue && renderIssueDetails()}
    </Paper>
  );
}

export default IssueDetails;

IssueDetails.propTypes = {
  issue: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired
  }),
  onStateChange: PropTypes.func
};