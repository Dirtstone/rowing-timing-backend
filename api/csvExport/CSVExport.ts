import {RegattaData} from "../storage/types";
import {getBoatTime} from "../pdf_builder/pdf_builder";

export function getRegattaCSVData(regatta: RegattaData): Array<Array<string>>{
  let result : string[][] = [];

  for (const race of regatta.races){
    for (const boat of race.boats){
      for (const athlete of boat.athletes){
        let boatTime = getBoatTime(boat.startTime, boat.endTime)
        result.push([String(race.number), race.name, String(boat.number), boat.name, boat.athletes.join(", "), boatTime])
      }
    }
  }

  return result
}