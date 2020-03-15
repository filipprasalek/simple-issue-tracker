import {fetchJSON, getServerUrl} from 'utils/fetchUtils';
import {ISSUES_ENDPOINT} from 'utils/dictionary';

export function fetchAllIssues(onSuccess, onFailure) {
  fetchJSON(`${getServerUrl()}/${ISSUES_ENDPOINT}`, {}, 
    onSuccess, 
    onFailure
  );
} 

export function createIssue(onSuccess, onFailure) {
  fetchJSON(`${getServerUrl()}/${ISSUES_ENDPOINT}`, 
    {method: 'POST'}, 
    onSuccess, 
    onFailure
  );
}

export function updateIssueState(issueId, desiredState, onSuccess, onFailure) {
  fetchJSON(`${getServerUrl()}/${ISSUES_ENDPOINT}/${issueId}/state`, 
      {method: 'PUT', body: JSON.stringify({ state: desiredState })}, 
      onSuccess, 
      (er) => console.log(er)
  );
} 