export const OPEN_ISSUE = 'OPEN';
export const PENDING_ISSUE = 'PENDING';
export const CLOSED_ISSUE = 'CLOSED'; 

export const getNextIssueState = (state) => {
  switch(state) {
    case OPEN_ISSUE: 
      return PENDING_ISSUE;
    case PENDING_ISSUE:
      return CLOSED_ISSUE;
    default:
      return state;
  }
}

export const getIssueColor = (state) => {
  switch(state) {
    case OPEN_ISSUE: 
      return '#32CD32';
    case PENDING_ISSUE:
      return '#FF7F50';
    case CLOSED_ISSUE:
      return '#DC143C';
    default:
      return '#D3D3D3';
  }
}

export const ISSUES_ENDPOINT = 'api/v1/issues';