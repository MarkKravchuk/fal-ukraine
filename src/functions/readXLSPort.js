import readXlsxFile from 'read-excel-file'
let data = require("../data/data")
export let readXLSPort = () =>{
    let port = data.port
    let file = document.getElementById("xls");
    readXlsxFile(file.files[0]).then((rows) => {
        console.log("rows ", rows)
        // `rows` is an array of rows
        // each row being an array of cells.
        let Row2 = rows[2];
        let Row5 = rows[5];
        let Row6 = rows[6];
        let Row8 = rows[8];
        let Row9 = rows[9];
        let Row10 = rows[10];
        let Row13 = rows[13];
        let Row14 = rows[14];
        let Row15 = rows[15];
        let Row17 = rows[17];
        let Row20 = rows[20];
        let Row21 = rows[21];
        let Row24 = rows[24];
        let Row25 = rows[25];
        let Row27 = rows[27];
        let Row28 = rows[28];
        port.arrivalDeparture = Row2[2];
        port.voyageNumber = Row27[2];
        port.portOfCall.UNLoCode =  Row5[2];
        port.portFacilityAtArrival = Row8[6];
        port.ETAPortOfCall = Row5[4];
        port.ETDPortOfCall = Row5[6];
        port.ATAPortOfCall = Row6[4];
        port.ATDPortOfCall = Row6[6];
        port.portOfArrival.UNLoCode = Row28[2];
        port.lastPortOfCall.UNLoCode = Row28[4];
        port.nextPortOfCall.UNLoCode = Row28[6];
        port.callAnchorage = Row8[2];
        port.positionPortOfCall.latitude = Row9[3];
        port.positionPortOfCall.longitude = Row9[4];
        port.positionPortOfCall.time = Row8[4];
        port.cargoDescription = Row10[2];
        port.nameMaster.familyName = Row13[2];
        port.nameMaster.givenName = Row14[2];
        port.purposesOfCall[0].CallPurposeCode = Row13[4];
        port.purposesOfCall[1].CallPurposeCode = Row14[4];
        port.purposesOfCall[2].CallPurposeCode = Row15[4];
        port.airDraught = Row15[2];
        port.arrivalDepartureDraught.foreDraught = Row17[2];
        port.arrivalDepartureDraught.MidShipDraught = Row17[4];
        port.arrivalDepartureDraught.AftDraught = Row17[6];
        port.agent.name = Row20[2];
        port.agent.mobileTelephone = Row20[4];
        port.agent.telefax = Row21[4];
        port.agent.email = Row20[6];
        port.personsOnBoard.numberOfPersons = Row24[2];
        port.personsOnBoard.numberOfCrew = Row24[4];
        port.personsOnBoard.numberOfPassengers = Row24[6];
        port.Stowaways = Row25[3];
        port.periodOfStay= Row27[4];

        console.log("Port ", port);
        data.port = port
        return port;
    }).then(console.log("finish"))
}
export default {readXLS: readXLSPort}
