import {Router} from "express";
import {db} from "../index"

export const clientRouter = Router();

clientRouter.get('/start/:id', async function (req, res, next) {
  const dbResult = db.createRegattaStart(req.params.id, req.body.clientId, false);
  res.end(JSON.stringify(dbResult));
});

clientRouter.post('/start/:id', async function (req, res, next) {
  const dbResult = db.updateRegattaStart(req.params.id, req.body.clientId, req.body.data);
  res.end(JSON.stringify(dbResult));
});

clientRouter.delete('/start/:id', async function (req, res, next) {
  db.updateRegattaStart(req.params.id, req.body.clientId, req.body.data);
  const dbResult = db.deleteRegattaStart(req.params.id, req.body.clientId);
  res.end(JSON.stringify(dbResult));
});

clientRouter.get('/finish/:id', async function (req, res, next) {
  const dbResult = db.createRegattaFinish(req.params.id, req.body.clientId, false);
  res.end(JSON.stringify(dbResult));
});

clientRouter.post('/finish/:id', async function (req, res, next) {
  const dbResult = db.updateRegattaFinish(req.params.id, req.body.clientId, req.body.data);
  res.end(JSON.stringify(dbResult));
});

clientRouter.delete('/finish/:id', async function (req, res, next) {
  db.updateRegattaFinish(req.params.id, req.body.clientId, req.body.data);
  const dbResult = db.deleteRegattaFinish(req.params.id, req.body.clientId);
  res.end(JSON.stringify(dbResult));
});
