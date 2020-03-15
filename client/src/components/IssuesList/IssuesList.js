import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {Paper, List, ListItem, ListItemAvatar, Avatar, ListItemText} from '@material-ui/core';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import DoneIcon from '@material-ui/icons/Done';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import {makeStyles} from '@material-ui/styles';
import {OPEN_ISSUE, PENDING_ISSUE, CLOSED_ISSUE, getIssueColor} from 'utils/dictionary';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    color: theme.palette.text.secondary
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
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

  return (
    <Paper className={classes.root}>
      <List className={classes.list}>
        { props.issues.map(issue => (
          <ListItem button selected={props.activeIssue === issue.id} onClick={() => props.onClick(issue.id)} key={issue.id}>
            <ListItemAvatar>
              <Avatar style={{backgroundColor: getIssueColor(issue.state)}}>
                {renderIssueIcon(issue.state)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={issue.title}/>
          </ListItem> 
        )) }
      </List>
    </Paper>
  );
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