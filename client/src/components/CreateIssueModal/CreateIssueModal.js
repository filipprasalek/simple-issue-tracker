import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Dialog, DialogTitle, DialogActions, DialogContent, Button} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center'
  }, 
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2)
  }
}));

function CreateIssueModal(props) {
  const classes = useStyles();
  const [issueTitle, setIssueTitle] = useState('');
  const [issueDescription, setIssueDescription] = useState('');

  const renderForm = useCallback(() => (
    <React.Fragment>
      <TextField
        value={issueTitle}
        onChange={e => setIssueTitle(e.target.value)}
        margin="dense"
        autoComplete='off'
        label="Title"
        variant="outlined"
        fullWidth
        />
      <TextField
        value={issueDescription}
        onChange={e => setIssueDescription(e.target.value)}
        margin="dense"
        autoComplete='off'
        label="Description"
        multiline
        rows="8"
        variant="outlined"
        fullWidth
      />
    </React.Fragment>
  ), [issueTitle, issueDescription])

  return (
    <Dialog maxWidth="sm" onClose={props.handleClose} aria-labelledby="simple-dialog-title" open={true} fullWidth={true}>
      <DialogTitle className={classes.title} id="simple-dialog-title">Create issue</DialogTitle>
      <DialogContent>
        {renderForm()}
      </DialogContent>
      <DialogActions className={classes.buttons}> 
          <Button onClick={props.handleClose} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={() => props.handleSave(issueTitle, issueDescription)} color="primary" variant="contained">
            Create
          </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateIssueModal;

CreateIssueModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired
};
