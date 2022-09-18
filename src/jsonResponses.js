const respondJSON = (request, response, status, object) => {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    response.writeHead(status, headers);
    response.write(JSON.stringify(object));
    response.end();
  };
  
  const respondXML = (request, response, status, content) => {
    response.writeHead(status, { 'Content-Type': 'text/xml' });
    response.write(content);
    response.end();
  };
  
  const respondJSONMeta = (request, response, status) => {
    const headers = {
      'Content-Type': 'application/json',
    };

    response.writeHead(status, headers);
    response.end();
  };
  
  const success = (request, response, acceptedTypes) => {
    const responseJSON = {
      message: 'This was a successful response.',
    };
  
    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} </response>`;

      return respondXML(request, response, 200, responseXML);
    }
  
    console.log('Success!');
    return respondJSON(request, response, 200, responseJSON);
  };
  
  const badRequest = (request, response, acceptedTypes, params) => {
    const responseJSON = {
      message: 'This request has the required parameters.',
    };
  
    if (!params.valid || params.valid !== 'true') {
      responseJSON.message = 'Missing valid query parameter set to true';
      responseJSON.id = 'badRequest';
      if (acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
        responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
        responseXML = `${responseXML} </response>`;
  
        return respondXML(request, response, 400, responseXML);
      }
      return respondJSON(request, response, 400, responseJSON);
    }

    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} </response>`;
  
      return respondXML(request, response, 200, responseXML);
    }

    return respondJSON(request, response, 200, responseJSON);
  };
  
  const unauthorized = (request, response, acceptedTypes, params) => {
    const responseJSON = {
      message: 'You have successfully viewed this content.',
    };
  
    if (!params.loggedIn || params.loggedIn !== 'yes') {
      responseJSON.message = 'Missing loggedIn query parameter set to yes.';
      responseJSON.id = 'unauthorized';

      if (acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
        responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
        responseXML = `${responseXML} </response>`;
  
        return respondXML(request, response, 401, responseXML);
      }
      
      return respondJSON(request, response, 401, responseJSON);
    }

    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} </response>`;

      return respondXML(request, response, 200, responseXML);
    }

    return respondJSON(request, response, 200, responseJSON);
  };
  
  const notFound = (request, response, acceptedTypes) => {
    const responseJSON = {
      message: 'The page you are looking for was not found.',
      id: 'notFound',
    };

    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
      responseXML = `${responseXML} </response>`;
  
      return respondXML(request, response, 404, responseXML);
    }

    return respondJSON(request, response, 404, responseJSON);
  };
  
  const forbidden = (request, response, acceptedTypes) => {
    const responseJSON = {
      message: 'You do not have access to this content.',
      id: 'forbidden',
    };

    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
      responseXML = `${responseXML} </response>`;
  
      return respondXML(request, response, 403, responseXML);
    }

    return respondJSON(request, response, 403, responseJSON);
  };
  
  const interal = (request, response, acceptedTypes) => {
    const responseJSON = {
      message: 'Internal Server Error. Something went wrong.',
      id: 'interal',
    };

    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
      responseXML = `${responseXML} </response>`;

      return respondXML(request, response, 500, responseXML);
    }

    return respondJSON(request, response, 500, responseJSON);
  };
  
  const notImplemented = (request, response, acceptedTypes) => {
    const responseJSON = {
      message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
      id: 'notImplemented',
    };

    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
      responseXML = `${responseXML} </response>`;
  
      return respondXML(request, response, 501, responseXML);
    }

    return respondJSON(request, response, 501, responseJSON);
  };
  
  const notFoundMeta = (request, response) => {
    respondJSONMeta(request, response, 404);
  };
  
  module.exports = {
    success,
    badRequest,
    unauthorized,
    notFound,
    forbidden,
    interal,
    notImplemented,
    notFoundMeta,
  };