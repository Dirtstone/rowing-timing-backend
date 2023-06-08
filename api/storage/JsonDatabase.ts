import JSONdb = require("simple-json-db");
import {v4 as uuidv4} from 'uuid';

import {DatabaseReturn, Regatta, RegattaData, RegattaInfo} from './types'

export class JsonDatabase {
  database: any;

  constructor(path: string) {
    this.database = new JSONdb(path);
  }

  createRegatta(regattaData: RegattaData): DatabaseReturn<string> {
    //ToDo Validation??
    let uuid = uuidv4();
    const regattaInfo: RegattaInfo = {
      finishClientId: "",
      startClientId: ""
    }
    this.database.set(uuid, {info: regattaInfo, data: regattaData});
    let regattas = this.database.get("regattas");
    regattas.push(uuid)
    this.database.set("regattas", regattas);
    return {data: uuid, errors: "", success: true};
  }

  getRegatta(id: string): DatabaseReturn<Regatta> {
    if (!this.database.has(id)) {
      return {
        data: undefined,
        success: false,
        errors: "The id is not in the database"
      }
    }
    return {
      errors: "",
      success: true,
      data: this.database.get(id)
    };
  }

  getRegattas(): DatabaseReturn<Array<{uuid: string, name: string}>> {
    let data: {uuid: string, name: string}[] = [];
    let regattas = this.database.get("regattas");
    for (let regatta of regattas){
      data.push({uuid: regatta, name: this.database.get(regatta).data.name})
    }

    return {success: true, errors: "", data: data};
  }

  updateRegatta(regattaData: Regatta, id: string): DatabaseReturn<RegattaData> {
    if (!this.database.has(id)) {
      return {
        data: undefined,
        success: false,
        errors: "The id is not in the database"
      }
    }
    //ToDo Validation??
    let regatta: Regatta = this.database.get(id);
    regatta.data = regattaData.data;
    this.database.set(id, regatta)

    return {
      data: regatta.data,
      errors: "",
      success: true
    }
  }

  createRegattaStart(regattaId: string, clientId: string, overwrite: boolean): DatabaseReturn<RegattaData> {
    if (!this.database.has(regattaId)) {
      return {
        data: undefined,
        success: false,
        errors: "The id is not in the database"
      }
    }
    let regatta: Regatta = this.database.get(regattaId)

    if (overwrite || !regatta.info.startClientId) {
      regatta.info.startClientId = clientId;
    } else {
      return {
        data: undefined,
        errors: "There is already a client set",
        success: false
      }
    }

    this.database.set(regattaId, regatta);
    return {data: regatta.data, errors: "", success: true}
  }

  updateRegattaStart(id: string, clientId: string, data: RegattaData): DatabaseReturn<RegattaData> {
    if (!this.database.has(id)) {
      return {
        data: undefined,
        success: false,
        errors: "The id is not in the database"
      }
    }

    let regatta: Regatta = this.database.get(id);

    if (regatta.info.startClientId == clientId) {
      return {
        data: undefined,
        errors: "Another client took over the Start role. To avoid synchronization Issues only one active client is allowed",
        success: false
      }
    }

    for (let i = 0; i < data.races.length; i++){
      for (let j = 0; j< data.races[i].boats.length; j++){
        //@ts-ignore
        regatta.data.races[i].boats[j].startTime = data.races[i].boats[j].startTime;
        regatta.data.races[i].boats[j].didNotAttend = data.races[i].boats[j].didNotAttend;
        if (regatta.data.races[i].boats[j].didNotAttend){
          regatta.data.races[i].boats[j].reason = data.races[i].boats[j].reason
        }

        if (regatta.data.races[i].boats[j].division != data.races[i].boats[j].division){
          regatta.data.races[i].boats[j].division = data.races[i].boats[j].division;
        }
      }
    }

    this.database.set(id, regatta);
    return {
      data: regatta.data,
      errors: "",
      success: true
    }
  }

  deleteRegattaStart(regattaId: string, clientId: string): DatabaseReturn<void> {
    if (!this.database.has(regattaId)) {
      return {
        data: undefined,
        success: false,
        errors: "The id is not in the database"
      }
    }

    let regatta: Regatta = this.database.get(regattaId);
    if (regatta.info.startClientId == clientId) {
      regatta.info.startClientId = "";
    }

    this.database.set(regattaId, regatta);
    return {
      data: undefined,
      errors: "",
      success: true
    }
  }

  createRegattaFinish(regattaId: string, clientId: string, overwrite: boolean): DatabaseReturn<RegattaData> {
    if (!this.database.has(regattaId)) {
      return {
        data: undefined,
        success: false,
        errors: "The id is not in the database"
      }
    }
    let regatta: Regatta = this.database.get(regattaId)

    if (overwrite || !regatta.info.finishClientId) {
      regatta.info.finishClientId = clientId;
    } else {
      return {
        data: undefined,
        errors: "There is already a client set",
        success: false
      }
    }

    this.database.set(regattaId, regatta);
    return {data: regatta.data, errors: "", success: true}
  }


  updateRegattaFinish(id: string, clientId: string, data: RegattaData): DatabaseReturn<RegattaData> {
    if (!this.database.has(id)) {
      return {
        data: undefined,
        success: false,
        errors: "The id is not in the database"
      }
    }

    let regatta: Regatta = this.database.get(id);

    if (regatta.info.finishClientId == clientId) {
      return {
        data: undefined,
        errors: "Another client took over the Finish role. To avoid synchronization Issues only one active client is allowed",
        success: false
      }
    }

    for (let i = 0; i < data.races.length; i++){
      for (let j = 0; j< data.races[i].boats.length; j++){
        regatta.data.races[i].boats[j].endTime = data.races[i].boats[j].endTime;
        regatta.data.races[i].boats[j].didNotFinish = data.races[i].boats[j].didNotFinish;
        if (!regatta.data.races[i].boats[j].didNotAttend && regatta.data.races[i].boats[j].didNotFinish){
          regatta.data.races[i].boats[j].reason = data.races[i].boats[j].reason
        }
      }
    }

    this.database.set(id, regatta);
    return {
      data: regatta.data,
      errors: "",
      success: true
    }
  }

  deleteRegattaFinish(regattaId: string, clientId: string): DatabaseReturn<void> {
    if (!this.database.has(regattaId)) {
      return {
        data: undefined,
        success: false,
        errors: "The id is not in the database"
      }
    }

    let regatta: Regatta = this.database.get(regattaId);
    if (regatta.info.finishClientId == clientId) {
      regatta.info.finishClientId = "";
    }

    this.database.set(regattaId, regatta);
    return {
      data: undefined,
      errors: "",
      success: true
    }
  }

  deleteRegatta(id: string): DatabaseReturn<void> {
    if (!this.database.has(id)) {
      return {
        data: undefined,
        success: false,
        errors: "The id is not in the database"
      }
    }
    this.database.delete(id);

    let regattas: string[] = this.database.get("regattas");
    const index = regattas.indexOf(id);
    regattas.splice(index, 1);
    this.database.set("regattas", regattas);

    return {
      data: undefined,
      errors: "",
      success: true
    }
  }

}