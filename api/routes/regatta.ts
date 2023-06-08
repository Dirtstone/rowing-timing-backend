import {Router} from "express";
import {db} from "../index"
export const regattaRouter = Router();

regattaRouter.get('/regatta/:id', async function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    const dbResult = db.getRegatta(req.params.id);
    res.end(JSON.stringify(dbResult));
});

regattaRouter.get('/regattas', async function (req, res, next) {
    const dbResult = db.getRegattas();
    res.end(JSON.stringify(dbResult));
});
regattaRouter.post('/regatta/:id', async function (req, res, next) {
    console.log(req.body)
    const dbResult = db.updateRegatta(req.body.regatta, req.params.id);
    res.end(JSON.stringify(dbResult));
});

regattaRouter.put('/regatta', async function (req, res, next) {
    const dbResult = db.createRegatta(req.body.regatta);
    res.end(JSON.stringify(dbResult));
});

regattaRouter.delete('/regatta/:id', async function (req, res, next) {
    const dbResult = db.deleteRegatta(req.params.id);
    res.end(JSON.stringify(dbResult));
});
