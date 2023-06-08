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


let i = 14
while (i < 222){
    let row = table[i]

    let index = regattaTag1.races.length
    regattaTag1.races.push({
        number: Number(row[0]),
        name: row[1] + " " + row[3],
        boats:[]
    })

    i++;
    row = table[i]
    while (row[1] === ""){
        if (row[0] === ""){
            i++;
            row =table[i]
            continue;
        }

        const boat = {
            number: Number(row[0]),
            division: 1,
            name: row[2],
            startTime: "",
            endTime: "",
            didNotAttend: false,
            didNotFinish: false,
            reason: "",
            athletes: []
        }

        do {
            //@ts-ignore
            boat.athletes.push(`${row[3]}(${row[4]})`)
            i++
            row = table[i]
        } while (row[0] === "" && row[3] != "")

        regattaTag1.races[index].boats.push(boat)
    }
}

i = 228
while (i < 438){
    let row = table[i]

    let index = regattaTag2.races.length
    regattaTag2.races.push({
        number: Number(row[0]),
        name: row[1] + " " + row[3],
        boats:[]
    })

    i++;
    row = table[i]
    while (row[1] === ""){
        if (row[0] === ""){
            i++;
            row =table[i]
            continue;
        }

        const boat = {
            number: Number(row[0]),
            division: 1,
            name: row[2],
            startTime: "",
            endTime: "",
            didNotAttend: false,
            didNotFinish: false,
            reason: "",
            athletes: []
        }

        do {
            //@ts-ignore
            boat.athletes.push(`${row[3]}(${row[4]})`)
            i++
            row = table[i]
        } while (row != undefined && row[0] === "" && row[3] != "")

        regattaTag2.races[index].boats.push(boat)
        if (row == undefined){
            break;
        }
    }
}

writeFileSync("./RegattaTag1.json", JSON.stringify(regattaTag1));
writeFileSync("./RegattaTag2.json", JSON.stringify(regattaTag2));