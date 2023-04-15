import JSONdb = require("simple-json-db");
import {v4 as uuidv4} from 'uuid';

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
      errors: "", success: true,
      data: this.database.get(id)
    };
  }

  getRegattas(): DatabaseReturn<Array<string>> {
    return this.database.get("regattas");
  }

  updateRegatta(regattaData: RegattaData, id: string): DatabaseReturn<RegattaData> {
    if (!this.database.has(id)) {
      return {
        data: undefined,
        success: false,
        errors: "The id is not in the database"
      }
    }
    //ToDo Validation??
    let regatta: Regatta = this.database.get(id);
    regatta.data = regattaData;
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
    return {data: regatta.data, errors: "", success: false}
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

    //ToDo Update StartTimes, DNS and DNS Reason. AND not to forget division changes

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
      success: false
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
    return {data: regatta.data, errors: "", success: false}
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

    //ToDo Update FinishTimes, DNF and DNF Reason

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
      success: false
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