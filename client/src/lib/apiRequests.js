import {fetchJSON, getServerUrl} from 'utils/fetchUtils';
import {ISSUES_ENDPOINT} from 'utils/dictionary';

export function fetchAllIssues(onSuccess, onFailure) {
  return fetchJSON(`${getServerUrl()}/${ISSUES_ENDPOINT}`, {}, 
    onSuccess, 
    onFailure
  );
} 

export function createIssue(title, description, onSuccess, onFailure) {
  return fetchJSON(`${getServerUrl()}/${ISSUES_ENDPOINT}`, 
    {method: 'POST', body: JSON.stringify({ title: title, description: description })}, 
    onSuccess, 
    onFailure
  );
}

export function updateIssueState(issueId, desiredState, onSuccess, onFailure) {
  return fetchJSON(`${getServerUrl()}/${ISSUES_ENDPOINT}/${issueId}/state`, 
    {method: 'PUT', body: JSON.stringify({ state: desiredState })}, 
    onSuccess, 
    onFailure
  );
} 