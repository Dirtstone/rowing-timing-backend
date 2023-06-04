
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
            "Felix Vollbrechtttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt",
            "Jan-Hinnerk Blanke",
            "Ole Blanke"
          ],
          startTime: new Date("2023-04-14T16:32:13.375Z"),
          endTime: new Date("2023-04-14T16:34:13.379Z"),
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
          name: "Ruderklub Heidelber",
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
          name: "Ruderklub Darmstadt",
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
          name: "Ruderklub München",
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
          name: "Ruderklub Fallersleben",
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
            timeMilli: getBoatTimeMilli(boat.startTime, boat.endTime),
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
              timeMilli: getBoatTimeMilli(boat.startTime, boat.endTime),
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

function getBoatTimeMilli(startTime: Date | undefined, endTime: Date | undefined): number {      //Funktion zum berechen der Zeit
  if (startTime && endTime) {
    const milliseconds = endTime.getTime() - startTime.getTime();
    return milliseconds;
  }    
  return 0; 
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
            if (aSeconds !== bSeconds) {
              return aSeconds - bSeconds;
            } else {
               return a.timeMilli - b.timeMilli;
            }
          }
        } else {
          return 0;
        }
      });

    }

  }
  return regatta;
}

function printRegattaergebnisse(regattaPrint: RegattaPdf, savePaper: boolean): void {
  const doc = new PDFDocument({
    bufferPages: true,
    layout: 'landscape',
    size: 'A4',
  });
  
  doc.pipe(fs.createWriteStream('Rennergebnisse.pdf'));

  doc.fontSize(90);
  doc.text("Landesentscheid Niedersachsen", {align: 'center'});
  doc.fontSize(40);
  doc.text("Scharnebeck 2023", {align: 'center'});
  doc.moveDown();
  doc.fontSize(60);
  doc.text("Regattaergebnis", {align: 'center'});
  doc.addPage();


  doc.fontSize(20);
  
  for (const race of regattaPrint.races) {
   

    for (const division of race.divisions) {
      doc.text(race.name, {continued: true, align: 'left'})
      doc.text("Abteilung: " + division.number, {continued: false, align: 'right'});
      doc.moveTo(doc.page.margins.left, doc.y);
      doc.lineWidth(2);
      doc.lineTo(doc.page.width - doc.page.margins.right, doc.y);
      doc.stroke();
      doc.lineWidth(1);
      doc.moveDown(0.2);

      for (const boat of division.boats) {
        doc.text(boat.name, doc.page.margins.right, doc.y, {continued: true});
        doc.text(boat.time, {align: 'right'});
        doc.text(boat.athletes.join(", "), doc.page.margins.left + 20, doc.y);
      }
      doc.text(" ");
      doc.text(" ");

      if (!savePaper) {
        doc.addPage();
      } 
    }
  }
  
  
  //Global Edits to All Pages (Header/Footer, etc)
  let pages = doc.bufferedPageRange();
  doc.fontSize(14);
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
  
    doc.text("Veröffentlicht am " + (new Date()).toLocaleDateString(),
    doc.page.margins.left,
    doc.page.height - (oldBottomMargin/2) + 3, 
    { align: 'left' }
    );
  
    doc.page.margins.bottom = oldBottomMargin; // ReProtect bottom margin
  }
  
  doc.end();

}








const regattaPdf = convertRegattaDataToRegattaPdf(regatta);
const sortedRegatta = sortDivisionsByTime(regattaPdf);
//console.log(JSON.stringify(sortedRegatta, null, 2));
printRegattaergebnisse(sortedRegatta, false);