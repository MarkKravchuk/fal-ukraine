import XMLParser from 'react-xml-parser';
import data from './../config/consts/defaultDataConst'

function readXML (fileContent) {
    let port = data.port;
    let xml = new XMLParser().parseFromString(fileContent);
    port.arrivalDeparture = xml.getElementsByTagName('arrivalDeparture')[0].value;
    port.voyageNumber = xml.getElementsByTagName('voyageNumber')[0].value;
    port.portOfCall = xml.getElementsByTagName('PortCall')[0].children[0].children[3].value;
    port.portFacilityAtArrival = xml.getElementsByTagName('PortCall')[0].children[0].children[1].value;
    port.ETAPortOfCall = xml.getElementsByTagName('ETAPortOfCall')[0].value;
    port.ETDPortOfCall = xml.getElementsByTagName('ETDPortOfCall')[0].value;
    port.ATAPortOfCall = xml.getElementsByTagName('ATAPortOfCall')[0].value;
    port.ATDPortOfCall = xml.getElementsByTagName('ATDPortOfCall')[0].value;
    if (xml.getElementsByTagName('PortOfArrival')[0]){
        port.portOfArrival = xml.getElementsByTagName('PortOfArrival')[0].children[2].value;
    }
    if (xml.getElementsByTagName('LastPortOfCall')[0]){
        port.lastPortOfCall = xml.getElementsByTagName('LastPortOfCall')[0].children[2].value;
    }
    if(xml.getElementsByTagName('NextPortOfCall')[0]){
        port.nextPortOfCall = xml.getElementsByTagName('NextPortOfCall')[0].children[2].value;
    }
    port.callAnchorage = xml.getElementsByTagName('Anchorage')[0].value;
    port.position.latitude = xml.getElementsByTagName('EntryPosition')[0].children[0].children[0].value;
    port.position.longitude = xml.getElementsByTagName('EntryPosition')[0].children[0].children[1].value;
    port.position.time = xml.getElementsByTagName('EntryPosition')[0].children[0].children[2].value;
    port.cargoDescription = xml.getElementsByTagName('CargoOverview')[0].value;
    port.nameOfMaster.givenName = xml.getElementsByTagName('NameOfMaster')[0].children[0].value;
    port.nameOfMaster.familyName = xml.getElementsByTagName('NameOfMaster')[0].children[1].value;

    port.callPurpose = [];
    for (let i = 0; i < 9; i++) {
        try {
            let code = xml.getElementsByTagName('CallPurpose')[i].children[1].value;
            // Our app identifies calls of purposes only by the code
            port.callPurpose.push(code)
        } catch (e) {}
    }

    port.airDraught = xml.getElementsByTagName('AirDraught')[0].value;
    if (xml.getElementsByTagName('arrivalDeparture')[0].value === 'Arrival') {
        port.arrivalDraught.foreDraught = xml.getElementsByTagName('ArrivalDraught')[0].children[0].value;
        port.arrivalDraught.midShipDraught = xml.getElementsByTagName('ArrivalDraught')[0].children[1].value;
        port.arrivalDraught.aftDraught = xml.getElementsByTagName('ArrivalDraught')[0].children[2].value;
    } else {
        port.arrivalDraught.foreDraught = xml.getElementsByTagName('DepartureDraught')[0].children[0].value;
        port.arrivalDraught.midShipDraught = xml.getElementsByTagName('DepartureDraught')[0].children[1].value;
        port.arrivalDraught.aftDraught = xml.getElementsByTagName('DepartureDraught')[0].children[2].value;
    }
    port.agent.company = xml.getElementsByTagName('Agent')[0].children[0].value;
    port.agent.contactNumbers.mobileTelephone = xml.getElementsByTagName('Agent')[0].children[1].children[1].value;
    port.agent.contactNumbers.businessTelephone = xml.getElementsByTagName('Agent')[0].children[1].children[0].value;
    port.agent.contactNumbers.telefax = xml.getElementsByTagName('Agent')[0].children[1].children[2].value;
    port.agent.contactNumbers.EMail = xml.getElementsByTagName('Agent')[0].children[1].children[3].value;
    port.personsOnBoard.numberOfPersonsOnBoard = xml.getElementsByTagName('PersonsOnBoard')[0].children[0].value;
    port.personsOnBoard.crew = xml.getElementsByTagName('PersonsOnBoard')[0].children[2].value;
    port.personsOnBoard.passengers = xml.getElementsByTagName('PersonsOnBoard')[0].children[1].value;
    port.stowaways = xml.getElementsByTagName('Stowaways')[0].value;
    port.periodOfStay = xml.getElementsByTagName('periodOfStay')[0].value;
    console.log("Port ", port);

    let crewList = xml.getElementsByTagName('CrewList');
    data.crew.rows = [];
    let crew = data.crew;
    if (crewList.length > 0) {
        console.log("crewList ",crewList[0].children);
        for (let i = 0; i <crewList[0].children.length; i++) {
            let CreMemberData = crewList[0].children[i];
            let row = {NR:i+1,Family_name: CreMemberData.children[1].children[1].value,Given_name:CreMemberData.children[1].children[0].value,
                Gender:CreMemberData.children[2].value, Rank_of_rating:CreMemberData.children[3].children[1].value, Nationality:CreMemberData.children[7].value,
                Country_of_birth:CreMemberData.children[6].value, Place_of_birth:CreMemberData.children[5].value,date_of_birth:CreMemberData.children[4].value,
                ID_type:CreMemberData.children[0].children[0].value, ID_document_number:CreMemberData.children[0].children[1].value,
                Issuing_state_of_identity_document:CreMemberData.children[0].children[2].value, Expiry_date_of_identity_document: CreMemberData.children[0].children[3].value,
                Visa_Residence_permit_number:CreMemberData.children[8].value
            }
            crew.rows.push(row)
        }
    }



    let realData = {port, crew};

    console.log("THE READ DATA: ", realData);

    return realData;
}

// export let readXML = () => {
//     console.log("readXML")
//     let XMLParser = require('react-xml-parser');
//     let readXML = () => {
//         console.log("readXML1")
//         let port = data.port;
//         // let crew = data.crew;
//
//         let file = document.getElementById("file").files[0];
//
//         console.log('do upload', file)
//
//         var reader = new FileReader();
//         reader.onload = (() => {
//             return (e) => {
//                 let fileContent = e.target.result;
//                 let xml = new XMLParser().parseFromString(fileContent);
//                 port.arrivalDeparture = xml.getElementsByTagName('arrivalDeparture')[0].value;
//                 port.voyageNumber = xml.getElementsByTagName('voyageNumber')[0].value;
//                 port.portOfCall.name = xml.getElementsByTagName('PortCall')[0].children[0].children[0].value;
//                 port.portOfCall.CountryCode = xml.getElementsByTagName('PortCall')[0].children[0].children[2].value;
//                 port.portOfCall.UNLoCode = xml.getElementsByTagName('PortCall')[0].children[0].children[3].value;
//                 port.portFacilityAtArrival.Facility = xml.getElementsByTagName('PortCall')[0].children[0].children[1].value;
//                 port.ETAPortOfCall = xml.getElementsByTagName('ETAPortOfCall')[0].value;
//                 port.ETDPortOfCall = xml.getElementsByTagName('ETDPortOfCall')[0].value;
//                 port.ATAPortOfCall = xml.getElementsByTagName('ATAPortOfCall')[0].value;
//                 port.ATDPortOfCall = xml.getElementsByTagName('ATDPortOfCall')[0].value;
//                 port.portOfArrival.name = xml.getElementsByTagName('PortOfArrival')[0].children[0].value;
//                 port.portOfArrival.CountryCode = xml.getElementsByTagName('PortOfArrival')[0].children[1].value;
//                 port.portOfArrival.UNLoCode = xml.getElementsByTagName('PortOfArrival')[0].children[2].value;
//                 port.lastPortOfCall.name = xml.getElementsByTagName('LastPortOfCall')[0].children[0].value;
//                 port.lastPortOfCall.CountryCode = xml.getElementsByTagName('LastPortOfCall')[0].children[1].value;
//                 port.lastPortOfCall.UNLoCode = xml.getElementsByTagName('LastPortOfCall')[0].children[2].value;
//                 port.nextPortOfCall.name = xml.getElementsByTagName('NextPortOfCall')[0].children[0].value;
//                 port.nextPortOfCall.CountryCode = xml.getElementsByTagName('NextPortOfCall')[0].children[1].value;
//                 port.nextPortOfCall.UNLoCode = xml.getElementsByTagName('NextPortOfCall')[0].children[2].value;
//                 port.callAnchorage = xml.getElementsByTagName('Anchorage')[0].value;
//                 port.positionPortOfCall.latitude = xml.getElementsByTagName('EntryPosition')[0].children[0].children[0].value;
//                 port.positionPortOfCall.longitude = xml.getElementsByTagName('EntryPosition')[0].children[0].children[1].value;
//                 port.positionPortOfCall.time = xml.getElementsByTagName('EntryPosition')[0].children[0].children[2].value;
//                 port.cargoDescription = xml.getElementsByTagName('CargoOverview')[0].value;
//                 port.nameMaster.givenName = xml.getElementsByTagName('NameOfMaster')[0].children[0].value;
//                 port.nameMaster.familyName = xml.getElementsByTagName('NameOfMaster')[0].children[1].value;
//                 port.purposesOfCall[0].CallPurposeCode = xml.getElementsByTagName('CallPurpose')[0].children[0].value;
//                 port.purposesOfCall[0].CallPurposeText = xml.getElementsByTagName('CallPurpose')[0].children[1].value;
//                 port.purposesOfCall[1].CallPurposeCode = xml.getElementsByTagName('CallPurpose')[1].children[0].value;
//                 port.purposesOfCall[1].CallPurposeText = xml.getElementsByTagName('CallPurpose')[1].children[1].value;
//                 port.purposesOfCall[2].CallPurposeCode = xml.getElementsByTagName('CallPurpose')[2].children[0].value;
//                 port.purposesOfCall[2].CallPurposeText = xml.getElementsByTagName('CallPurpose')[2].children[1].value;
//                 port.purposesOfCall[3].CallPurposeCode = xml.getElementsByTagName('CallPurpose')[3].children[0].value;
//                 port.purposesOfCall[3].CallPurposeText = xml.getElementsByTagName('CallPurpose')[3].children[1].value;
//                 port.purposesOfCall[4].CallPurposeCode = xml.getElementsByTagName('CallPurpose')[4].children[0].value;
//                 port.purposesOfCall[4].CallPurposeText = xml.getElementsByTagName('CallPurpose')[4].children[1].value;
//                 port.purposesOfCall[5].CallPurposeCode = xml.getElementsByTagName('CallPurpose')[5].children[0].value;
//                 port.purposesOfCall[5].CallPurposeText = xml.getElementsByTagName('CallPurpose')[5].children[1].value;
//                 port.purposesOfCall[6].CallPurposeCode = xml.getElementsByTagName('CallPurpose')[6].children[0].value;
//                 port.purposesOfCall[6].CallPurposeText = xml.getElementsByTagName('CallPurpose')[6].children[1].value;
//                 port.purposesOfCall[7].CallPurposeText = xml.getElementsByTagName('CallPurpose')[7].children[1].value;
//                 port.purposesOfCall[7].CallPurposeCode = xml.getElementsByTagName('CallPurpose')[7].children[0].value;
//                 port.purposesOfCall[8].CallPurposeText = xml.getElementsByTagName('CallPurpose')[8].children[1].value;
//                 port.purposesOfCall[8].CallPurposeCode = xml.getElementsByTagName('CallPurpose')[8].children[0].value;
//                 port.airDraught = xml.getElementsByTagName('AirDraught')[0].value;
//                 if (xml.getElementsByTagName('arrivalDeparture')[0].value === 'Arrival') {
//                     port.arrivalDepartureDraught.foreDraught = xml.getElementsByTagName('ArrivalDraught')[0].children[0].value;
//                     port.arrivalDepartureDraught.MidShipDraught = xml.getElementsByTagName('ArrivalDraught')[0].children[1].value;
//                     port.arrivalDepartureDraught.AftDraught = xml.getElementsByTagName('ArrivalDraught')[0].children[2].value;
//                 } else {
//                     port.arrivalDepartureDraught.foreDraught = xml.getElementsByTagName('DepartureDraught')[0].children[0].value;
//                     port.arrivalDepartureDraught.MidShipDraught = xml.getElementsByTagName('DepartureDraught')[0].children[1].value;
//                     port.arrivalDepartureDraught.AftDraught = xml.getElementsByTagName('DepartureDraught')[0].children[2].value;
//                 }
//                 port.agent.name = xml.getElementsByTagName('Agent')[0].children[0].value;
//                 port.agent.mobileTelephone = xml.getElementsByTagName('Agent')[0].children[1].children[1].value;
//                 port.agent.businessTelephone = xml.getElementsByTagName('Agent')[0].children[1].children[0].value;
//                 port.agent.telefax = xml.getElementsByTagName('Agent')[0].children[1].children[2].value;
//                 port.agent.email = xml.getElementsByTagName('Agent')[0].children[1].children[3].value;
//                 port.personsOnBoard.numberOfPersons = xml.getElementsByTagName('PersonsOnBoard')[0].children[0].value;
//                 port.personsOnBoard.numberOfCrew = xml.getElementsByTagName('PersonsOnBoard')[0].children[2].value;
//                 port.personsOnBoard.numberOfPassengers = xml.getElementsByTagName('PersonsOnBoard')[0].children[1].value;
//                 port.Stowaways = xml.getElementsByTagName('Stowaways')[0].value;
//                 port.periodOfStay = xml.getElementsByTagName('periodOfStay')[0].value;
//                 console.log("Port ", port);
//
//                 let crewList = xml.getElementsByTagName('CrewList');
//                 let crew = [];
//                 console.log("crewList ",crewList[0].children);
//                 for (let i = 0; i <crewList[0].children.length; i++) {
//                     let CreMemberData = crewList[0].children[i];
//                     let row = {NR:i+1,Family_name: CreMemberData.children[1].children[1].value,Given_name:CreMemberData.children[1].children[0].value,
//                         Gender:CreMemberData.children[2].value, Rank_of_rating:CreMemberData.children[3].children[1].value, Nationality:CreMemberData.children[7].value,
//                         Country_of_birth:CreMemberData.children[6].value, Place_of_birth:CreMemberData.children[5].value,date_of_birth:CreMemberData.children[4].value,
//                         ID_type:CreMemberData.children[0].children[0].value, ID_document_number:CreMemberData.children[0].children[1].value,
//                         Issuing_state_of_identity_document:CreMemberData.children[0].children[2].value, Expiry_date_of_identity_document: CreMemberData.children[0].children[3].value,
//                         Visa_Residence_permit_number:CreMemberData.children[8].value
//                     }
//                     crew.push(row)
//                 }
//                 data.crew.rows = crew;
//
//                 let realData = {port, crew};
//
//                 console.log(data.crew)
//
//
//             };
//         })();
//         reader.readAsText(file);
//
//
//     }
//     readXML()
// }
// export default {readXML};

export default readXML

