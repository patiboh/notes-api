const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true
};

export function success(body) {
  return buildResponse(200, body, headers);
}

export function failure(body) {
  return buildResponse(500, body);
}

function buildResponse(statusCode, body, headers) {
  return {
    statusCode,
    headers,
    body: JSON.stringify(body)
  };
}
