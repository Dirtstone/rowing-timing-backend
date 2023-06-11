import {Router} from "express";
import {db} from "../index"

export const clientRouter = Router();

clientRouter.get('/start/:id', async function (req, res, next) {
  if (typeof req.query.clientId != "string" || req.query.clientId == ""){
    res.status(500);
    res.end("The client Id must be a not empty string");
    return;
  }
  const dbResult = db.createRegattaStart(req.params.id, req.query.clientId, false);
  res.end(JSON.stringify(dbResult));
});

clientRouter.post('/start/:id', async function (req, res, next) {
  if (typeof req.body.clientId != "string" || req.body.clientId == ""){
    res.status(500);
    res.end("The client Id must be a not empty string");
    return;
  }
  if (!("regatta" in req.body)){
    res.status(500);
    res.end("The regatta must be given");
    return;
  }
  if (!("clientId" in req.body)){
    res.status(500);
    res.end("The regatta must be given");
    return;
  }

  const dbResult = db.updateRegattaStart(req.params.id, req.body.clientId, req.body.regatta);
  res.end(JSON.stringify(dbResult));
});

clientRouter.delete('/start/:id', async function (req, res, next) {
  if (typeof req.query.clientId != "string" || req.query.clientId == ""){
    res.status(500);
    res.end("The client Id must be a not empty string");
    return;
  }

  const dbResult = db.deleteRegattaStart(req.params.id, req.query.clientId);
  res.end(JSON.stringify(dbResult));
});

clientRouter.get('/finish/:id', async function (req, res, next) {
  if (typeof req.query.clientId != "string" || req.query.clientId == ""){
    res.status(500);
    res.end("The client Id must be a not empty string");
    return;
  }

  const dbResult = db.createRegattaFinish(req.params.id, req.query.clientId, false);
  res.end(JSON.stringify(dbResult));
});

clientRouter.post('/finish/:id', async function (req, res, next) {
  if (typeof req.body.clientId != "string" || req.body.clientId == ""){
    res.status(500);
    res.end("The client Id must be a not empty string");
    return;
  }
  if (!("regatta" in req.body)){
    res.status(500);
    res.end("The regatta must be given");
    return;
  }
  if (!("clientId" in req.body)){
    res.status(500);
    res.end("The regatta must be given");
    return;
  }

  const dbResult = db.updateRegattaFinish(req.params.id, req.body.clientId, req.body.regatta);
  res.end(JSON.stringify(dbResult));
});

clientRouter.delete('/finish/:id', async function (req, res, next) {
  if (typeof req.query.clientId != "string" || req.query.clientId == ""){
    res.status(500);
    res.end("The client Id must be a not empty string");
    return;
  }

  const dbResult = db.deleteRegattaFinish(req.params.id, req.query.clientId);
  res.end(JSON.stringify(dbResult));
});
