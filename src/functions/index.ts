import * as express from 'express';
import * as functions from 'firebase-functions';
import { bootstrap } from 'src/main';

const expressServer = express();

exports.testDeployApi11 = functions.runWith({ memory: '1GB' }).https.onRequest(async (request, response) => {
  expressServer(request, response);
  await bootstrap(expressServer);
});
