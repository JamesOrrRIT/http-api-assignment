const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/success': jsonHandler.success,
    '/badRequest': jsonHandler.badRequest,
    '/unauthorized': jsonHandler.unauthorized,
    '/forbidden': jsonHandler.forbidden,
    '/internal': jsonHandler.interal,
    '/notImplemented': jsonHandler.notImplemented,
    notFound: jsonHandler.notFound,
  },
  HEAD: {
    notFound: jsonHandler.notFoundMeta,
  },
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  const acceptedTypes = request.headers.accept.split(',');

  if (!urlStruct[request.method]) {
    return urlStruct.HEAD.notFound(request, response, acceptedTypes);
  }

  if (urlStruct[request.method][parsedUrl.pathname]) {
    return urlStruct[request.method][parsedUrl.pathname](request, response, acceptedTypes, params);
  }
  return urlStruct[request.method].notFound(request, response, acceptedTypes, params);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});