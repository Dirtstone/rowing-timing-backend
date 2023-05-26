import {Router} from "express";

export const resultRouter = Router();


resultRouter.get('/list/:id', async function (req, res, next) {
        //ToDo Return pdf(s) with result of regatta with id
});

resultRouter.post('/certificates/:id', async function (req, res, next) {
  res.status(501);
});