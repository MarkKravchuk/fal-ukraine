import xml from 'xml'
import generatePort from "./generatePort";
import generateCrew from "./generateCrew";
import generateShip from "./generateShip";
import generatePassengers from "./generatePasssengers";
import generateVoyage from "./generateVoyage";

function createXML(data) {
    // @FIXME The required fields are not verified yet :(
    let EPCRequestBody = [];
    console.log("Generating XML data structure ", data);

    generatePort(data.port, EPCRequestBody);
    generateCrew(data.crew, EPCRequestBody);
    generateShip(data.ship, EPCRequestBody);
    generatePassengers(data.passengers, EPCRequestBody);
    generateVoyage(data.voyage,EPCRequestBody);

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

let downloadXMLfile = (xmlValue) => {
    let data = xmlValue;
    let filename = `XML config ${new Date()}.xml`
    var file = new Blob([data], /*{type: type}*/);

    var a = document.createElement("a"),
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

let dataCheck = (data) => {
    let port = data.port;
    let crew = data.crew;
    let passengers = data.passengers;

    if (port.arrivalDeparture == '' || port.arrivalDeparture == null) {
        alert("Please, fill in the required field 'Departure/Arrival' in Port infomation")
        return false
    }
    if (port.portOfCall == '' || port.portOfCall == null) {
        alert("Please, fill in the required field 'Departure/Arrival' in Port infomation")
        return false
    }
    for (let i = 0; i < crew.rows.length; i++) {
        let row = data.crew.rows[i]
        if (row.Family_name == '' || row.Family_name == null) {
            alert("Please, fill in the required field 'Family name' in Crew list")
            return false
        }
        if (row.Given_name == '' || row.Given_name == null) {
            alert("Please, fill in the required field 'Given name' in Crew list")
            return false
        }
        if (row.Rank_of_rating == '' || row.Rank_of_rating == null) {
            alert("Please, fill in the required field 'Rank of rating' in Crew list")
            return false
        }
        if (row.Nationality == '' || row.Nationality == null) {
            alert("Please, fill in the required field 'Nationality' in Crew list")
            return false
        }
        if (row.Country_of_birth == '' || row.Country_of_birth == null) {
            alert("Please, fill in the required field 'Country of birth' in Crew list")
            return false
        }
        if (row.Place_of_birth == '' || row.Place_of_birth == null) {
            alert("Please, fill in the required field 'Place of birth' in Crew list")
            return false
        }
        if (row.date_of_birth == '' || row.date_of_birth == null) {
            alert("Please, fill in the required field 'date of birth' in Crew list")
            return false
        }
        if (row.ID_type == '' || row.ID_type == null) {
            alert("Please, fill in the required field 'ID type' in Crew list")
            return false
        }
        if (row.ID_document_number == '' || row.ID_document_number == null) {
            alert("Please, fill in the required field 'ID document number' in Crew list")
            return false
        }
    }

    for (let i = 0; i < passengers.rows.length; i++) {
        let row = passengers.rows[i]
        if (row.Family_name == '' || row.Family_name == null) {
            alert("Please, fill in the required field 'Family name' in Passenger list")
            return false
        }
        if (row.Given_name == '' || row.Given_name == null) {
            alert("Please, fill in the required field 'Given name' in Passenger list")
            return false
        }
        if (row.Nationality == '' || row.Nationality == null) {
            alert("Please, fill in the required field 'Nationality' in Passenger list")
            return false
        }
        if (row.Country_of_birth == '' || row.Country_of_birth == null) {
            alert("Please, fill in the required field 'Country of birth' in Passenger list")
            return false
        }
        if (row.Place_of_birth == '' || row.Place_of_birth == null) {
            alert("Please, fill in the required field 'Place of birth' in Passenger list")
            return false
        }
        if (row.date_of_birth == '' || row.date_of_birth == null) {
            alert("Please, fill in the required field 'date of birth' in Passenger list")
            return false
        }
        if (row.ID_type == '' || row.ID_type == null) {
            alert("Please, fill in the required field 'ID type' in Passenger list")
            return false
        }
        if (row.ID_document_number == '' || row.ID_document_number == null) {
            alert("Please, fill in the required field 'ID document number' in Passenger list")
            return false
        }
        if (row.Port_of_embarkation == '' || row.Port_of_embarkation == null) {
            alert("Please, fill in the required field 'Port of embarkation' in Passenger list")
            return false
        }
        if (row.Port_of_disembarkation == '' || row.Port_of_disembarkation == null) {
            alert("Please, fill in the required field 'Port of disembarkation' in Passenger list")
            return false
        }
    }
    return true;
}

export default createXML;