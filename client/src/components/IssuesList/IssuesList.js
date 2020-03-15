import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {Paper, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Typography, Box} from '@material-ui/core';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import DoneIcon from '@material-ui/icons/Done';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import {makeStyles} from '@material-ui/styles';
import {OPEN_ISSUE, PENDING_ISSUE, CLOSED_ISSUE, getIssueColor} from 'utils/dictionary';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    color: theme.palette.text.secondary,
    padding: theme.spacing(1)
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  emptyIssueMessage: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}));

function IssuesList(props) {
  const classes = useStyles();

  const renderIssueIcon = useCallback((state) => {
    switch(state) {
      case OPEN_ISSUE:
        return <RadioButtonUncheckedIcon/>;
      case PENDING_ISSUE:
        return <HourglassEmptyIcon/>;
      case CLOSED_ISSUE:
        return <DoneIcon/>;
      default:
        return;
    }
  }, []);

  const renderEmptyListMessage = useCallback(() => (
    <Paper elevation={3} className={classes.root}>
      <Box className={classes.emptyIssueMessage} component="div">
        <Typography align='center' variant="subtitle1">
          No issues found
        </Typography>
      </Box>
    </Paper>
  ), []);

  const renderIssueList = useCallback(() => (
    <List className={`${classes.list} ${classes.root}`}>
      { props.issues.map(issue => (
        <div key={issue.id}>
          <ListItem button selected={props.activeIssue === issue.id} onClick={() => props.onClick(issue.id)} >
            <ListItemAvatar>
              <Avatar style={{backgroundColor: getIssueColor(issue.state)}}>
                {renderIssueIcon(issue.state)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={issue.title}/>
          </ListItem> 
          <Divider component="li" />
        </div>
      ))}
    </List>
  ), [props.issues, props.activeIssue]);

  return (props.issues && props.issues.length !== 0) ? renderIssueList() : renderEmptyListMessage();
}

export default IssuesList;

IssuesList.propTypes = {
  issues: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    state: PropTypes.oneOf([OPEN_ISSUE, PENDING_ISSUE, CLOSED_ISSUE])
  })).isRequired,
  activeIssue: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}