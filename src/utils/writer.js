var ResponsePayload = function (code, payload) {
  this.code = code;
  this.payload = payload;
}

exports.respondWithCode = function (code, payload) {
  return new ResponsePayload(code, payload);
}

var writeJson = exports.writeJson = function (response, arg1, arg2) {
  var code;
  var payload;

  if (arg1 && arg1 instanceof ResponsePayload) {
    writeJson(response, arg1.payload, arg1.code);
    return;
  }

  if (arg2 && Number.isInteger(arg2)) {
    code = arg2;
  }
  else {
    if (arg1 && Number.isInteger(arg1)) {
      code = arg1;
    }
  }
  if (code && arg1) {
    payload = arg1;
  }
  else if (arg1) {
    payload = arg1;
  }

  if (!code) {
    if (!(payload instanceof Error))
      // if no response code was given and no error occurred, we default to 200
      code = 200;
    else
    // if an error occurred we default to 500
    {
      console.log(payload);
      code = 500;
      payload = {
        messaggio: "Errore interno",
        errore: payload.message
      }
    }
  }
  try {
    payload = JSON.stringify(payload, null, 2);
  } catch (err) {
    console.log(err);
    code = 500;
    payload = {
      messaggio: "Errore interno",
      errore: err.message
    }
    payload = JSON.stringify(payload, null, 2);
  } finally {
    //console.log(code, payload);
    response.writeHead(code, { 'Content-Type': 'application/json' });
    response.end(payload);
  }
}
