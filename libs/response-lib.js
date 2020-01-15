const HEADERS = {
  'Access-Control-Allow-Origin': 'https://dev.notes.fat-fuzzy.rocks',
  'Access-Control-Allow-Credentials': 'true'
};

export function success(body) {
  return buildResponse(200, body);
}

export function failure(body) {
  return buildResponse(500, body);
}

function buildResponse(statusCode, body, headers = HEADERS) {
  return {
    statusCode,
    headers,
    body: JSON.stringify(body)
  };
}
