import Express from "express";
import logger from 'morgan';
import * as http from 'http'
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
import {JsonDatabase} from "./storage/JsonDatabase";


const app = Express();
const server = new http.Server(app);

// @ts-ignore
let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

export const db = new JsonDatabase("./data/data.json");

app.use(allowCrossDomain);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

import {regattaRouter} from "./routes/regatta";
app.use('/', regattaRouter);

import {analysisRouter} from "./routes/analysis";
app.use('/analysis', analysisRouter);

import {resultRouter} from "./routes/result";
app.use('/result', resultRouter);

import {clientRouter} from "./routes/client";
app.use('/client', clientRouter)

server.listen(3000, function () {
    console.log('Listening on port 3000!');
});
server.timeout = 0;
