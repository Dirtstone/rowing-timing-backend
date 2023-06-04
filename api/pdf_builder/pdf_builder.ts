
// @ts-nocheck
const PDFDocument = require('pdfkit');
const fs = require('fs');
const { text } = require('pdfkit');
import {RegattaData}from '../storage/types'


const regatta: RegattaData = {
  name: "Test Regatta Landesentscheid",
  races: [
    {
      number: 1,
      name: "Jungen 4+ 14 Jahre",
      boats: [
        {
          number: 1, //Needs to be unique and identifiable
          name: "Ruderklub Normannia Braunschweig",
          athletes: [
            "Malte Meiners",
            "Felix Vollbrecht",
            "Jan-Hinnerk Blanke",
            "Ole Blanke"
          ],
          startTime: new Date("2023-04-14T16:32:13.375Z"),
          endTime: new Date("2023-04-14T16:34:23.375Z"),
          didNotAttend: false,
          reason: "",
          division: 1
        },
        {
          number: 2, //Needs to be unique and identifiable
          name: "Ruderklub Otterndorf",
          athletes: [
            "Gustav Rundholz",
            "Felix Vollbrecht",
            "Jan-Hinnerk Blanke",
            "Ole Blanke"
          ],
          startTime: new Date("2023-04-14T16:32:13.375Z"),
          endTime: new Date("2023-04-14T16:34:13.375Z"),
          didNotAttend: false,
          reason: "",
          division: 1
        },
        {
          number: 3, //Needs to be unique and identifiable
          name: "Ruderklub Otterndorf",
          athletes: [
            "Jesus Christus",
            "Felix Vollbrecht",
            "Jan-Hinnerk Blanke",
            "Ole Blanke"
          ],
          startTime: new Date("2023-04-14T16:32:13.375Z"),
          endTime: new Date("2023-04-14T16:35:13.375Z"),
          didNotAttend: false,
          reason: "",
          division: 1
        },
        {
          number: 4, //Needs to be unique and identifiable
          name: "Ruderklub Otterndorf",
          athletes: [
            "Andi Bar",
            "Felix Vollbrecht",
            "Jan-Hinnerk Blanke",
            "Ole Blanke"
          ],
          startTime: new Date("2023-04-14T16:32:13.375Z"),
          endTime: new Date("2023-04-14T16:34:23.375Z"),
          didNotAttend: false,
          reason: "",
          division: 1
        },
        {
          number: 5, //Needs to be unique and identifiable
          name: "Ruderklub Otterndorf",
          athletes: [
            "Reiner Zufall",
            "Felix Vollbrecht",
            "Jan-Hinnerk Blanke",
            "Ole Blanke"
          ],
          startTime: new Date("2023-04-14T16:32:13.375Z"),
          endTime: new Date("2023-04-14T16:37:13.375Z"),
          didNotAttend: false,
          reason: "",
          division: 1
        },
        {
          number: 6, //Needs to be unique and identifiable
          name: "Ruderklub Otterndorf",
          athletes: [
            "Joe Mama",
            "Felix Vollbrecht",
            "Jan-Hinnerk Blanke",
            "Ole Blanke"
          ],
          startTime: undefined,
          endTime: undefined,
          didNotAttend: true,
          reason: "DNS",
          division: 1
        },
        {
          number: 7, //Needs to be unique and identifiable
          name: "Ruderklub Normannia Braunschweig",
          athletes: [
            "Malte Meiners",
            "Felix Vollbrecht",
            "Jan-Hinnerk Blanke",
            "Ole Blanke"
          ],
          startTime: new Date("2023-04-14T16:32:13.375Z"),
          endTime: undefined,
          didNotAttend: false,
          reason: "DNF",
          division: 2
        },
        {
          number: 8, //Needs to be unique and identifiable
          name: "Ruderklub Otterndorf",
          athletes: [
            "Malte Meiners",
            "Felix Vollbrecht",
            "Jan-Hinnerk Blanke",
            "Ole Blanke"
          ],
          startTime: new Date("2023-04-14T16:32:13.375Z"),
          endTime: new Date("2023-04-14T16:39:13.375Z"),
          didNotAttend: false,
          reason: "",
          division: 2
        },
        {
          number: 9, //Needs to be unique and identifiable
          name: "Ruderklub Otterndorf",
          athletes: [
            "Malte Meiners",
            "Felix Vollbrecht",
            "Jan-Hinnerk Blanke",
            "Ole Blanke"
          ],
          startTime: new Date("2023-04-14T16:32:13.375Z"),
          endTime: new Date("2023-04-14T16:38:13.375Z"),
          didNotAttend: false,
          reason: "",
          division: 2
        },
        {
          number: 10, //Needs to be unique and identifiable
          name: "Ruderklub Otterndorf",
          athletes: [
            "Malte Meiners",
            "Felix Vollbrecht",
            "Jan-Hinnerk Blanke",
            "Ole Blanke"
          ],
          startTime: undefined,
          endTime: undefined,
          didNotAttend: false,
          reason: "",
          division: 2
        },
        {
          number: 11, //Needs to be unique and identifiable
          name: "Ruderklub Otterndorf",
          athletes: [
            "Malte Meiners",
            "Felix Vollbrecht",
            "Jan-Hinnerk Blanke",
            "Ole Blanke"
          ],
          startTime: undefined,
          endTime: undefined,
          didNotAttend: false,
          reason: "",
          division: 2
        },
        {
          number: 12, //Needs to be unique and identifiable
          name: "Ruderklub Otterndorf",
          athletes: [
            "Malte Meiners",
            "Felix Vollbrecht",
            "Jan-Hinnerk Blanke",
            "Ole Blanke"
          ],
          startTime: undefined,
          endTime: undefined,
          didNotAttend: false,
          reason: "",
          division: 2
        }
      ]
    },
    {
      name: "Mädchen 4+ 14 Jahre",
      number: 2,
      boats: [
        {
          number: 1,
          name: "asv",
          athletes: [],
          startTime: undefined,
          endTime: undefined,
          didNotAttend: false,
          reason: "",
          division: 1
        },
        {
          number: 2,
          name: "asv",
          athletes: [],
          startTime: undefined,
          endTime: undefined,
          didNotAttend: false,
          reason: "",
          division: 1
        }
      ]
    }
  ]
}



type RegattaPdf = {
  name: string,
  races: {
    number: number,
    name: string,
    divisions: {
      number: number,
      boats: {
        number: number,
        name: string,
        time: string,
        athletes: string[],
        timeMilli: number,
      }[]
    }[]
  }[]
}


/*
function convertRegattaDataToRegattaPdf(pRegatta: RegattaData) {                                      //Convert RegattaData type to RegattaPdf type

  let regattaRead: RegattaPdf = {
    name: pRegatta.name,                                                                              //Copy Regatta name
    races: []         
  };                                                               

  for (let i = 0; i < pRegatta.races.length; i++) {                                                    //For-Loop for every race   i

    let race = {
      name: pRegatta.races[i].name,
      number: pRegatta.races[i].number,
      division: [],
    };                                           

    for (let n = 0; n < pRegatta.races[i].boats.length; n++) {                                         //For-Loop for every boat (every race)  n
      
      for (let k = 0; k < pRegatta.races[i].boats.length; k++) {                                       //For-Loop for division assignment  (ervery boat(every race)) k

        if (pRegatta.races[i].boats[n].division == k + 1) {                                            //division assignment

          regattaRead.races[i].divisions[k].number = k + 1;
          regattaRead.races[i].divisions[k].boats[n].number = pRegatta.races[i].boats[n].number;       //Copy boat number
          regattaRead.races[i].divisions[k].boats[n].name = pRegatta.races[i].boats[n].name;           //Copy boat/club name
          regattaRead.races[i].divisions[k].boats[n].athletes = pRegatta.races[i].boats[n].athletes;   //Copy athletes
          regattaRead.races[i].divisions[k].boats[n].reason = pRegatta.races[i].boats[n].reason;       //Copy fail reasons

          regattaRead.races[i].divisions[k].boats[n].time = (pRegatta.races[i].boats[n].endTime ?? 999999999).valueOf() - (pRegatta.races[i].boats[n].startTime ?? 0).valueOf()   //Get time, if failed time is 999999999 Miliseconds (more that 10 days)

        }
        
      }

    }

    regattaRead.races.push(race);

  }

  for (let i = 0; i < regattaRead.races.length; i++) {                      //For-Loop for every race
    
    for (let n = 0; n < regattaRead.races[i].divisions[n].boats.length; n++) {       //For-Loop for every division

      var sortedArray: { number: number, name: string, time: number, rank: number, athletes: string[], reason: string,}[] = regattaRead.races[i].divisions[n].boats.sort((n1,n2) => {       //Sorting the divisions to put fastest first
        if (n1.time > n2.time) {
          return 1;
        }

        if (n1.time < n2.time) {
          return -1;
        }

        return 0;
      });

      regattaRead.races[i].divisions[n].boats = sortedArray;        //Sortet divisions get copied into the regattaRead object

      for (let k = 0; k < regattaRead.races[i].divisions[n].boats.length; k++) {

        regattaRead.races[i].divisions[n].boats[k].rank = k + 1;
        
      }
      
    }

  }

  return regattaRead;

}

console.log(convertRegattaDataToRegattaPdf(regatta));

function convertRegattaDataToRegattaPdf(pRegatta: RegattaData) { 

  let regattaRead: RegattaPdf = {
    name: pRegatta.name,                                                                              //Copy Regatta name
    races: []         
  }; 

  for(let races of regatta.races) {

    let race = {
      name: races.name,
      number: races.number,
      division: [],
    };   

    for(let boats of races.boats) {

      let boat = {
        number: boats.number,
        name: boats.name,
        time: ,
        rank: ,
        athletes: boats.athletes,
        reason: boats.reason,
      };

      race.push()

    }

    regattaRead.races.push(race);

  }
}


/*
const doc = new PDFDocument({
    bufferPages: true
  });
  
  doc.pipe(fs.createWriteStream('Rennergebnisse.pdf'));

  var number_of_races = pRegatta.races.length;
  for(let n = 0; n < number_of_races; n++) {

    doc.fontSize(14);
    doc.text("Rennen: " +pRegatta.races[n].name);
    doc.fontSize(10);

    var number_of_divisions = Array.realLength= Object.keys(pRegatta.races[n].divisions).filter(function(el){return !(+el % 1) && +el>=0 && +el < Math.pow(2,32) ;}).length
    for(let k = 0; k < number_of_divisions; k++) {

      doc.text("Abteilung: " + pRegatta.races[n].divisions[k].number, doc.page.margins.left);
      doc.text("Rang   ", {continued: true});
      doc.text("StNr   ", {continued: true});
      doc.text("Boot/Mannschaft", {continued: true});
      doc.text("Ergebnis", {continued: false, align: 'right'});

      var number_of_boats = pRegatta.races[n].divisions[k].boats.length;
      for(let b = 0; b < number_of_boats; b++) {

        doc.text(pRegatta.races[n].divisions[k].boats[b].number + "  ", {continued: true});
        
        var number_of_athletes = Array.realLength= Object.keys(pRegatta.races[n].divisions[k].boats[b].athletes).filter(function(el){return !(+el % 1) && +el>=0 && +el < Math.pow(2,32) ;}).length
        for(let m = 0; m < number_of_athletes; m++) {
          
          if (m < (number_of_athletes - 1)) {
            doc.text(pRegatta.races[n].divisions[k].boats[b].athletes[m] + ", ", {continued: true});
          } else {
            doc.text(pRegatta.races[n].divisions[k].boats[b].athletes[m], {continued: true});
          }

        }

        if (pRegatta.races[n].divisions[k].boats[b].startTime == undefined && pRegatta.races[n].divisions[k].boats[b].endTime == undefined) {
          doc.text
        }

      }

    }

    doc.addPage();
  }
  





  //Global Edits to All Pages (Header/Footer, etc)
  let pages = doc.bufferedPageRange();
  for (let i = 0; i < pages.count; i++) {
    doc.switchToPage(i);
  
    //Footer: Add page number
    let oldBottomMargin = doc.page.margins.bottom;
    doc.page.margins.bottom = 0 //Dumb: Have to remove bottom margin in order to write into it
    
    doc.lineCap('butt')
       .moveTo(doc.page.width - doc.page.margins.right, doc.page.height - (oldBottomMargin / 2))
       .lineTo(doc.page.margins.left, doc.page.height - (oldBottomMargin / 2))
       .stroke();
    
    doc
      .text(
        `Seite: ${i + 1}/${pages.count}`,
        0,
        doc.page.height - (oldBottomMargin/2) - 12, 
        { align: 'right' }
      );

    doc.text(`Version 1.0`,
    0,
    doc.page.height - (oldBottomMargin/2) + 3, 
    { align: 'right' }
    );

    doc.text(`Ruderjugend Niedersachsen`,
    doc.page.margins.left,
    doc.page.height - (oldBottomMargin/2) - 12, 
    { align: 'left' }
    );

    doc.text("Veröffentlicht am 11.06.2023",
    doc.page.margins.left,
    doc.page.height - (oldBottomMargin/2) + 3, 
    { align: 'left' }
    );

    doc.page.margins.bottom = oldBottomMargin; // ReProtect bottom margin
  }

  doc.end();
}
*/


function convertRegattaDataToRegattaPdf(regattaData: RegattaData): RegattaPdf {     //RegattaData-Type zum RegattaPdf-Type umwandeln
  const regattaPdf: RegattaPdf = {
    name: regattaData.name,
    races: []
  };

  for (const race of regattaData.races) {     //Alle Rennen von regattaData durchlaufen und Daten umspeichern
    let racePdf : {
      number: number,
      name: string,
      divisions: {
        number: number,
        boats: {
          number: number,
          name: string,
          time: string,
          athletes: string[],
          timeMilli: number,
        }[]
      }[]
    } = {
      number: race.number,
      name: race.name,
      divisions: []
    };
    for (const boat of race.boats) {          //Alle Bote von regattaData durchlaufen und Daten umspeichern
      

      const divisionIndex = racePdf.divisions.findIndex((divisionObj) => divisionObj.number === boat.division);  //Wenn Division vorhanden, dann Rückgabe des Indexes der Division im divisions Array, wenn nich dann Rückgabe = -1

      if (divisionIndex !== -1) {
        let division = racePdf.divisions[divisionIndex];
        if (division) {
          division.boats.push({
            number: boat.number,
            name: boat.name,
            time: getBoatTime(boat.startTime, boat.endTime),
            athletes: boat.athletes,
            timeMilli: 0,
          });
        }
      } else {
        let division = { 
            number: boat.division,
            boats: [{
              number: boat.number,
              name: boat.name,
              time: getBoatTime(boat.startTime, boat.endTime),
              athletes: boat.athletes,
              timeMilli: 0,
            }]
        };
        racePdf.divisions.push(division);
      }

    }

    regattaPdf.races.push(racePdf);           //Rennen wird in Array geschoben
  }

  return regattaPdf;                          //Rückgabe von regattaPdf
}

function getBoatTime(startTime: Date | undefined, endTime: Date | undefined): string {      //Funktion zum berechen der Zeit
  if (startTime && endTime) {
    const milliseconds = endTime.getTime() - startTime.getTime();
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  
    const minutesString = String(minutes).padStart(2, '0');
    const secondsString = String(seconds).padStart(2, '0');
  
  return `${minutesString}:${secondsString}`;
  }
  if (!startTime) {
    return "DNS";
  } else {
    return "DNF";
  }       
}

function sortDivisionsByTime(regatta: RegattaPdf): RegattaPdf {
  for (const race of regatta.races) {
    for(const division of race.divisions) {
      division.boats = division.boats.sort((a, b) => {
        // Die Zeit-Strings in Minuten und Sekunden aufteilen
        if (a.time !== "DNS" && a.time !== "DNF" && b.time !== "DNS" && b.time !== "DNF") {
          let [aMinutes, aSeconds] = a.time.split(":").map(Number);
          let [bMinutes, bSeconds] = b.time.split(":").map(Number);

          // Vergleich der Zeiten (aufsteigende Reihenfolge)
          if (aMinutes !== bMinutes) {
            return aMinutes - bMinutes;
          } else {
            return aSeconds - bSeconds;
          }
        } else {
          return 0;
        }
      });

    }

  }


  /*sortedRegatta.races.forEach((race) => {
    race.divisions.forEach((division) => {
      division.boats.sort((a, b) => {
        // Die Zeit-Strings in Minuten und Sekunden aufteilen
        if (a.time !== "DNS" && a.time !== "DNF" && b.time !== "DNS" && b.time !== "DNF") {
          let [aMinutes, aSeconds] = a.time.split(":").map(Number);
          let [bMinutes, bSeconds] = b.time.split(":").map(Number);

          // Vergleich der Zeiten (aufsteigende Reihenfolge)
          if (aMinutes !== bMinutes) {
            return aMinutes - bMinutes;
          } else {
            return aSeconds - bSeconds;
          }
        } else {
          return -1;
        }
      });
    });
  });
*/
  return regatta;
}





const regattaPdf = convertRegattaDataToRegattaPdf(regatta);
const sortedRegatta = sortDivisionsByTime(regattaPdf);
console.log(JSON.stringify(sortedRegatta, null, 2));