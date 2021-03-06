function fetchJSON(URL, settings = {}, successCallback = () => {}, failureCallback = () => {}) {
  const commonHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
  return fetch(URL, {...settings, headers: {...commonHeaders, ...settings.headers}})
    .then(checkStatus)
    .then(parseResponseBody)
    .then(successCallback)
    .catch(failureCallback);
}

async function checkStatus(response) {
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error);
  }
  return Promise.resolve(response);
}

async function parseResponseBody(response) {
  const responseBody = await response.text();
  try {
    return Promise.resolve(JSON.parse(responseBody));
  } catch {
    return Promise.resolve(response);
  }
}

function getServerUrl() {
  return process.env.SERVER_URL;
}

export {fetchJSON, getServerUrl};