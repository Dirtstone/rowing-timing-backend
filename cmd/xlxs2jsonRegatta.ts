import {readFileSync, writeFileSync} from "fs"
import {RegattaData} from "../api/storage/types"
const csv: string = readFileSync("test.csv").toString()

const rows = csv.split("\n");
let table = []

for (let row of rows){
  const newRow = row.split(";")
  table.push(newRow);
}

let regattaTag1: RegattaData = {
  name: table[0][0] + " Tag1",
  races: []
}

let regattaTag2: RegattaData = {
  name: table[0][0] + " Tag2",
  races: []
}

for (let i = 5; i < 73; i++){
  const row = table[i]

  let raceIndex = regattaTag1.races.findIndex((race)=> race.number === Number(row[0]))

  if (raceIndex === -1){
    raceIndex = regattaTag1.races.length;
    regattaTag1.races.push({
      number: Number(row[0]),
      name: row[1],
      boats: []
    });
  }

  let athletes: string[] = []
  for (let j = 0; j < 4; j++){
    if (row[(j * 2) + 3] !== ""){
      athletes.push(`${row[(j * 2) + 3]}(${row[(j * 2) + 4]})`)
    }
  }

  regattaTag1.races[raceIndex].boats.push({
    number: 1,
    division: 1,
    name: row[2],
    startTime: "",
    endTime: "",
    didNotAttend: false,
    didNotFinish: false,
    reason: "",
    athletes: athletes
  })

}

for (let i = 76; i < 141; i++){
  const row = table[i]

  let raceIndex = regattaTag2.races.findIndex((race)=> race.number === Number(row[0]))

  if (raceIndex === -1){
    raceIndex = regattaTag2.races.length;
    regattaTag2.races.push({
      number: Number(row[0]),
      name: row[1],
      boats: []
    });
  }

  let athletes: string[] = []
  for (let j = 0; j < 4; j++){
    if (row[(j * 2) + 3] !== ""){
      athletes.push(`${row[(j * 2) + 3]}(${row[(j * 2) + 4]})`)
    }
  }

  regattaTag2.races[raceIndex].boats.push({
    number: 1,
    division: 1,
    name: row[2],
    startTime: "",
    endTime: "",
    didNotAttend: false,
    didNotFinish: false,
    reason: "",
    athletes: athletes
  })
}

writeFileSync("./RegattaTag1.json", JSON.stringify(regattaTag1));
writeFileSync("./RegattaTag2.json", JSON.stringify(regattaTag2));