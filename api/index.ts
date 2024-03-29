import Express from "express";
import logger from 'morgan';
import * as http from 'http'
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
import {JsonDatabase} from "./storage/JsonDatabase";
import {testRegatta} from "./storage/test"

const app = Express();
const server = new http.Server(app);

// @ts-ignore
let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

export const db = new JsonDatabase("./data/data.json");
//db.createRegatta(testRegatta)

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
import * as path from "path";
app.use('/client', clientRouter)

app.use('/', Express.static(path.join(__dirname, '../ui/dist/spa/')))

server.listen(3000, function () {
    console.log('Listening on port 3000!');
});
server.timeout = 0;
