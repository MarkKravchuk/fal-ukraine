import xml from 'xml'
import generatePort, {checkRequiredPort} from "./generatePort";
import generateCrew, {checkRequiredCrew} from "./generateCrew";
import generateShip, {checkRequiredShip} from "./generateShip";
import generatePassengers, {checkRequiredPassengers} from "./generatePasssengers";
import generateVoyage, {checkRequiredVoyage} from "./generateVoyage";
import generateShipStores from "./generateShipStores";
import generateHealth from "./generateHealth";
import generateCrewEffects from "./generateCrewEffects";
import generateCargo from "./generateCargo";
import generateSecurity from "./generateSecurity";
import generateWaste from "./generateWaste";
import _ from 'underscore'

function createXML(data, onError) {
    // @FIXME The required fields are not verified yet :(
    const errors = checkRequiredFields(data);
    if (!_.isEmpty(errors)) {
        onError(errors);
        return;
    }

    let EPCRequestBody = [];
    console.log("Generating XML data structure ", data);

    generatePort(data.port, EPCRequestBody);
    generateCrew(data.crew, EPCRequestBody);
    generateShip(data.ship, EPCRequestBody);
    generatePassengers(data.passengers, EPCRequestBody);
    generateVoyage(data.voyage, EPCRequestBody);
    generateShipStores(data.shipStores, EPCRequestBody);
    generateHealth(data.health, EPCRequestBody);
    generateCrewEffects(data.crewEffects, EPCRequestBody);
    generateCargo(data.cargo, data.dpg, EPCRequestBody)
    generateSecurity(data.security, EPCRequestBody);
    generateWaste(data.waste, EPCRequestBody);

    let xmlValue = xml([{
        EPCMessage: [{
            EPCMessageHeader: [
                {ArrivalDeparture: data.port.arrivalDeparture}
            ]
        },
            {
                EPCRequestBody: EPCRequestBody
            }
        ]
    }], {declaration: true});
    downloadXMLfile(xmlValue);
}

function checkRequiredFields(data) {
    const errors = {};
    checkRequiredPort(errors, data.port);
    checkRequiredShip(errors, data.ship);
    checkRequiredCrew(errors, data.crew)
    checkRequiredPassengers(errors, data.passengers);
    checkRequiredVoyage(errors, data.voyage)


    //deleting empty objects
    Object.keys(errors).forEach(el => {
        if (_.isEmpty(errors[el])) delete errors[el];
    })

    return errors;
}

let downloadXMLfile = (xmlValue) => {
    let data = xmlValue;
    let filename = `XML config ${new Date()}.xml`
    let file = new Blob([data], /*{type: type}*/);

    let a = document.createElement("a"),
        url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);

}

// eslint-disable-next-line no-unused-vars
let dataCheck = (data) => {
    let port = data.port;
    let crew = data.crew;
    let passengers = data.passengers;

    if (port.arrivalDeparture === '' || port.arrivalDeparture === null) {
        alert("Please, fill in the required field 'Departure/Arrival' in Port infomation")
        return false
    }
    if (port.portOfCall === '' || port.portOfCall == null) {
        alert("Please, fill in the required field 'Departure/Arrival' in Port infomation")
        return false
    }
    for (let i = 0; i < crew.rows.length; i++) {
        let row = data.crew.rows[i]
        if (row.Family_name === '' || row.Family_name == null) {
            alert("Please, fill in the required field 'Family name' in Crew list")
            return false
        }
        if (row.Given_name === '' || row.Given_name == null) {
            alert("Please, fill in the required field 'Given name' in Crew list")
            return false
        }
        if (row.Rank_of_rating === '' || row.Rank_of_rating == null) {
            alert("Please, fill in the required field 'Rank of rating' in Crew list")
            return false
        }
        if (row.Nationality === '' || row.Nationality == null) {
            alert("Please, fill in the required field 'Nationality' in Crew list")
            return false
        }
        if (row.Country_of_birth === '' || row.Country_of_birth == null) {
            alert("Please, fill in the required field 'Country of birth' in Crew list")
            return false
        }
        if (row.Place_of_birth === '' || row.Place_of_birth == null) {
            alert("Please, fill in the required field 'Place of birth' in Crew list")
            return false
        }
        if (row.date_of_birth === '' || row.date_of_birth == null) {
            alert("Please, fill in the required field 'date of birth' in Crew list")
            return false
        }
        if (row.ID_type === '' || row.ID_type == null) {
            alert("Please, fill in the required field 'ID type' in Crew list")
            return false
        }
        if (row.ID_document_number === '' || row.ID_document_number == null) {
            alert("Please, fill in the required field 'ID document number' in Crew list")
            return false
        }
    }

    for (let i = 0; i < passengers.rows.length; i++) {
        let row = passengers.rows[i]
        if (row.Family_name === '' || row.Family_name == null) {
            alert("Please, fill in the required field 'Family name' in Passenger list")
            return false
        }
        if (row.Given_name === '' || row.Given_name == null) {
            alert("Please, fill in the required field 'Given name' in Passenger list")
            return false
        }
        if (row.Nationality === '' || row.Nationality == null) {
            alert("Please, fill in the required field 'Nationality' in Passenger list")
            return false
        }
        if (row.Country_of_birth === '' || row.Country_of_birth == null) {
            alert("Please, fill in the required field 'Country of birth' in Passenger list")
            return false
        }
        if (row.Place_of_birth === '' || row.Place_of_birth == null) {
            alert("Please, fill in the required field 'Place of birth' in Passenger list")
            return false
        }
        if (row.date_of_birth === '' || row.date_of_birth == null) {
            alert("Please, fill in the required field 'date of birth' in Passenger list")
            return false
        }
        if (row.ID_type === '' || row.ID_type == null) {
            alert("Please, fill in the required field 'ID type' in Passenger list")
            return false
        }
        if (row.ID_document_number === '' || row.ID_document_number == null) {
            alert("Please, fill in the required field 'ID document number' in Passenger list")
            return false
        }
        if (row.Port_of_embarkation === '' || row.Port_of_embarkation == null) {
            alert("Please, fill in the required field 'Port of embarkation' in Passenger list")
            return false
        }
        if (row.Port_of_disembarkation === '' || row.Port_of_disembarkation == null) {
            alert("Please, fill in the required field 'Port of disembarkation' in Passenger list")
            return false
        }
    }
    return true;
}

export default createXML;