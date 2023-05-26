import {Router} from "express";

export const analysisRouter = Router();


analysisRouter.get('/:id', async function (req, res, next) {
    if (req.params.id){
        //ToDo Return list of warnings and errors in regatta with id
    }else{
        //ToDo Error
    }
});

analysisRouter.post('/:id', async function (req, res, next) {
    if (req.params.id){
        //ToDo Fix errors with updated object (Needs more information than just regatta uuid
    }else{
        //ToDo Error
    }
});