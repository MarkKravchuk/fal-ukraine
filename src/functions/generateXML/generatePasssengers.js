import listOfPortsConst from "../../config/consts/listOfPortsConst";

export default (passengers, EPCRequestBody) => {

    let rows = passengers.rows;

    let PassengerList = [];
    for (let i = 0; i < rows.length; i++) {
        let PassengerData = [];
        let embarkationPort = {};
        if(rows[i].Port_of_embarkation && rows[i].Port_of_embarkation!=''){
            let embarkationPortCode = rows[i].Port_of_embarkation.split(' -')[0]
            embarkationPort = listOfPortsConst.find(function (element) {
                return element.code === embarkationPortCode;
            });
        }

        let disembarkationPort = {};
        if(rows[i].Port_of_disembarkation && rows[i].Port_of_disembarkation!=''){
            let disembarkationPortCode = rows[i].Port_of_disembarkation.split(' -')[0]
            disembarkationPort = listOfPortsConst.find(function (element) {
                return element.code === disembarkationPortCode;
            });
        }
        let nationalityCode = '';
        let countryOfBirthCode = '';
        if(rows[i].Nationality && rows[i].Nationality !== ''){
            let nationality = rows[i].Nationality.split('- ');
            nationalityCode = nationality[1];
        }
        if (rows[i].Country_of_birth && rows[i].Country_of_birth !== ''){
            let countryOfBirth = rows[i].Country_of_birth.split('- ');
            countryOfBirthCode = countryOfBirth[1];
        }

        PassengerData.push({
            PassengerIdDocument: [
                {IdDocument: rows[i].ID_type},
                {IdNumber: rows[i].ID_document_number},
                {IssueDate: rows[i].Issuing_state_of_identity_document},
                {ExpirationDate: rows[i].Expiry_date_of_identity_document},
            ]
        });
        PassengerData.push({
            Name: [
                {GivenName: rows[i].Given_name},
                {FamilyName: rows[i].Family_name},
            ]
        });
        PassengerData.push({Gender: rows[i].Gender});
        PassengerData.push({DateOfBirth: rows[i].date_of_birth});
        PassengerData.push({PlaceOfBirth: rows[i].Place_of_birth});
        PassengerData.push({CountryOfBirth: countryOfBirthCode});
        PassengerData.push({Nationality: nationalityCode});
        if (embarkationPort && embarkationPort!={}){
            PassengerData.push({EmbarkationPort:[
                    {Name:embarkationPort.name},
                    {CountryCode:embarkationPort.countryCode},
                    {UNLoCode:embarkationPort.code},
                ]})
        }

        if (embarkationPort && embarkationPort!={}){
            PassengerData.push({DebarkationPort:[
                    {Name:disembarkationPort.name},
                    {CountryCode:disembarkationPort.countryCode},
                    {UNLoCode:disembarkationPort.code},
                ]})
        }
        PassengerData.push({VisaNumber: rows[i].Visa_Residence_permit_number});
        PassengerList.push({PassengerData});
    }

    EPCRequestBody.push( {PassengerList: PassengerList})
}