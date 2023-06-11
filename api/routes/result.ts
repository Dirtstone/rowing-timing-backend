import {Router} from "express";
import {getRegattaResult} from "../pdf_builder/pdf_builder";
import {db} from "../index";
import{stringify} from 'csv'
import {getRegattaCSVData} from "../csvExport/CSVExport";

export const resultRouter = Router();

resultRouter.get('/list/:id', async function (req, res, next) {
  const regattaData = db.getRegattas();
  if (!regattaData.success || !regattaData.data){
    res.status(500)
    res.end()
    return
  }

  for (let regatta of regattaData.data){
    if (req.params.id === regatta.uuid){
      const dbResult = db.getRegatta(req.params.id);
      if (dbResult.success && dbResult.data){
        getRegattaResult(res, dbResult.data.data);
        return
      }else {
        res.status(500)
        res.end()
        return
      }
    }
  }
  res.status(404)
  res.end()
});

resultRouter.get('/certificates/:id', async function (req, res, next) {
  const regattaData = db.getRegattas();
  if (!regattaData.success || !regattaData.data){
    res.status(500)
    res.end()
    return
  }

  for (let regatta of regattaData.data){
    if (req.params.id === regatta.uuid){
      const dbResult = db.getRegatta(req.params.id);
      if (dbResult.success && dbResult.data){
        const csvData = getRegattaCSVData(dbResult.data.data);

        // Convert the CSV data to a string
        await stringify(csvData, (err, output) => {
          if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
          }

          // Set the response headers for CSV download
          res.setHeader('Content-Type', 'text/csv');
          res.setHeader('Content-Disposition', 'attachment; filename="data.csv"');

          // Send the CSV data as the response
          res.status(200).send(output);
          res.end()
          return;
        });
        return
      }else {
        res.status(500)
        res.end()
        return
      }
    }
  }
  res.status(404)
  res.end()
});