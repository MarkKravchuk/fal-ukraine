import xml from 'xml'
let data = require("../data/data");
const RanksOfRating = ['AbleSeaman', 'Agent', 'AsstFoodBevMngr', 'BarManager', 'BarService', 'Bosun', 'Cadet', 'Captain', 'CargoTechnician', 'CasinoStaff', 'ChiefCook', 'ChiefElectrician', 'ChiefHousekeeper', 'ChiefEngineer', 'ChiefMaster', 'ChiefMate', 'ChiefOfficer', 'ChiefPurser', 'ChiefSteward', 'ClassSurveyor', 'CSO', 'Cook', 'CraneOperator', 'CrewMember', 'CruiseDirector', 'CruiseStaff', 'DeckApprentice', 'DeckFitter', 'DeckOfficer', 'Deckhand', 'Doctor', 'Donkeyman', 'ElectricalEngineer', 'ElectricalOfficer', 'Electrician', 'EngineerCadet', 'EngineeringCrew', 'EngineFitter', 'Entertainment', 'FacilitiesCrew', 'FacilitiesManager', 'FirstAsstEngineer', 'FirstEngineer', 'FirstMate', 'FirstOfficer', 'Fitter', 'FourthOfficer', 'FoodBevMngr', 'FoodService', 'FourthAsstEngineer', 'Greaser', 'Hospitality', 'HotelDirector', 'HotelStaff', 'HousekeepingStaff', 'InformationTechnology', 'JuniorEngineer', 'LaundryMaster', 'Lifeboatman', 'Maitred', 'MarineCrew', 'MarketingRevenueMngr', 'Master', 'MasterFirstClassPilot', 'MateFirstClassPilot', 'Mechanic', 'MedicalStaff', 'Messman', 'Motorman', 'Oiler', 'Operator', 'OrdinarySeaman', 'Owner', 'Painter', 'Porter', 'Provision', 'ProvisionMaster', 'Pumpman', 'QMED', 'RadioOfficer', 'Reeferman', 'Repairman', 'RiddingCrew', 'SafetyAndSecurity', 'SecondAsstEngineer', 'SecondMate', 'SecondOfficer', 'SSO', 'StaffCaptain', 'Steward', 'Superintendent', 'Tankerman', 'ThirdAsstEngineer', 'ThirdMate', 'ThirdOfficer', 'ThirdParty', 'TruckMechanic', 'Tunnelman', 'UtilityPerson', 'VettingInspector', 'Welder', 'Wiper', 'YardPersonnel', 'Other']

export let generateXML  =() =>{
    let port = data.port;
    let crew = data.crew;
    console.log("generatexmldata ",data);
    let ArrivalDepartureDraught;
    let CrewList = [];
    for (let i = 0; i <crew.length ; i++) {
        let CrewMemberData = [];
        console.log("id type ", crew[i].ID_type);
        let RankOfRatingCode = "";
        if(crew[i].Rank_of_rating != null){
            RankOfRatingCode = RanksOfRating.indexOf(crew[i].Rank_of_rating);
        }
        CrewMemberData.push({
        CrewIdDocument :[
                {IdDocument : crew[i].ID_type},
                {IdNumber : crew[i].ID_document_number},
                {IssueDate : crew[i].Issuing_state_of_identity_document},
                {ExpirationDate : crew[i].Expiry_date_of_identity_document},
            ]

        });
        CrewMemberData.push( {Name:[
                {GivenName : crew[i].Given_name},
                {FamilyName : crew[i].Family_name},
            ]});
        CrewMemberData.push({Gender: crew[i].Gender});
        CrewMemberData.push({Duty: [
                {Code: RankOfRatingCode},
                {Text : crew[i].Rank_of_rating}
            ]});
        CrewMemberData.push({DateOfBirth: crew[i].date_of_birth});
        CrewMemberData.push({PlaceOfBirth: crew[i].Place_of_birth});
        CrewMemberData.push({CountryOfBirth: crew[i].Country_of_birth});
        CrewMemberData.push({Nationality: crew[i].Nationality});
        CrewMemberData.push({VisaNumber: crew[i].Visa_Residence_permit_number});
        CrewList.push({CrewMemberData});
    }
    if(port.arrivalDeparture == 'Arrival'){
        ArrivalDepartureDraught = {ArrivalDraught: [
            {ForeDraught: port.arrivalDepartureDraught.foreDraught},
            {MidShipDraught: port.arrivalDepartureDraught.MidShipDraught},
            {Time: port.arrivalDepartureDraught.AftDraught},
        ]}

    }else {
        ArrivalDepartureDraught = {DepartureDraught: [
            {ForeDraught: port.arrivalDepartureDraught.foreDraught},
            {MidShipDraught: port.arrivalDepartureDraught.MidShipDraught},
            {Time: port.arrivalDepartureDraught.AftDraught},
        ]}
    }
    let xmlValue = xml([{
        EPCMessage: [{
            EPCMessageHeader: [
                {ArrivalDeparture:port.arrivalDeparture}
                ]},
            {EPCRequestBody: [
                    {VoyageNumber:port.voyageNumber},
                    {VoyageDescription:[
                                {  PortCall:[
                                        {Port: [
                                                {Name: port.portOfCall.name},
                                                {Facility: port.portFacilityAtArrival.Facility},
                                                {CountryCode: port.portOfCall.CountryCode},
                                                {UNLoCode: port.portOfCall.UNLoCode}
                                            ]}]
                                    }
                                ]

                        },
                    {ETAPortOfCall: port.ETAPortOfCall},
                    {ETDPortOfCall: port.ETDPortOfCall},
                    {ATAPortOfCall: port.ATAPortOfCall},
                    {ATDPortOfCall: port.ATDPortOfCall},
                    {PortOfArrival:[
                            {Name: port.portOfArrival.name},
                            {CountryCode: port.portOfArrival.CountryCode},
                            {UNLoCode: port.portOfArrival.UNLoCode},
                        ]},
                    {LastPortOfCall: [
                            {Name: port.lastPortOfCall.name},
                            {CountryCode: port.lastPortOfCall.CountryCode},
                            {UNLoCode: port.lastPortOfCall.UNLoCode}
                        ]},
                    {NextPortOfCall:[
                            {Name: port.nextPortOfCall.name},
                            {CountryCode: port.nextPortOfCall.CountryCode},
                            {UNLoCode: port.nextPortOfCall.UNLoCode}
                        ]},
                    {Anchorage: port.callAnchorage},
                    {EntryPosition:[
                            {Position:[
                            {Latitude: port.positionPortOfCall.latitude},
                            {Longitude: port.positionPortOfCall.longitude},
                            {Time: port.positionPortOfCall.time}
                        ]}]},
                    {CargoOverview: port.cargoDescription},
                    {NameOfMaster: [
                            {GivenName: port.nameMaster.givenName},
                            {FamilyName: port.nameMaster.familyName},

                        ]},
                    {CallPurpose: [
                            {CallPurposeCode:port.purposesOfCall[0].CallPurposeCode},
                            {CallPurposeText:port.purposesOfCall[0].CallPurposeText}
                        ]},
                            {CallPurpose: [
                                    {CallPurposeCode:port.purposesOfCall[1].CallPurposeCode},
                                    {CallPurposeText:port.purposesOfCall[1].CallPurposeText}
                                ]},
                            {CallPurpose: [
                                    {CallPurposeCode:port.purposesOfCall[2].CallPurposeCode},
                                    {CallPurposeText:port.purposesOfCall[2].CallPurposeText}
                                ]},
                            {CallPurpose: [
                                    {CallPurposeCode:port.purposesOfCall[3].CallPurposeCode},
                                    {CallPurposeText:port.purposesOfCall[3].CallPurposeText}
                                ]},
                            {CallPurpose: [
                                    {CallPurposeCode:port.purposesOfCall[4].CallPurposeCode},
                                    {CallPurposeText:port.purposesOfCall[4].CallPurposeText}
                                ]},
                            {CallPurpose: [
                                    {CallPurposeCode:port.purposesOfCall[5].CallPurposeCode},
                                    {CallPurposeText:port.purposesOfCall[5].CallPurposeText}
                                ]},
                            {CallPurpose: [
                                    {CallPurposeCode:port.purposesOfCall[6].CallPurposeCode},
                                    {CallPurposeText:port.purposesOfCall[6].CallPurposeText}
                                ]},
                            {CallPurpose: [
                                    {CallPurposeCode:port.purposesOfCall[7].CallPurposeCode},
                                    {CallPurposeText:port.purposesOfCall[7].CallPurposeText}
                                ]},
                            {CallPurpose: [
                                    {CallPurposeCode:port.purposesOfCall[8].CallPurposeCode},
                                    {CallPurposeText:port.purposesOfCall[8].CallPurposeText}
                                ]},
                    {AirDraught: port.airDraught},
                   ArrivalDepartureDraught,
                    {Agent: [
                            {Company: port.agent.name},
                            {ContactNumbers:[
                                {BusinessTelephone: port.agent.businessTelephone},
                                {MobileTelephone: port.agent.mobileTelephone},
                                {Telefax: port.agent.telefax},
                                {Email: port.agent.email},
                                ]},
                        ]},
                    {PersonsOnBoard: [
                            {NumberOfPersonsOnBoard: port.personsOnBoard.numberOfPersons},
                            {Passengers: port.personsOnBoard.numberOfPassengers},
                            {Crew: port.personsOnBoard.numberOfCrew},
                        ]},
                    {Stowaways: port.Stowaways},
                    {PeriodOfStay: port.periodOfStay},
                    {CrewList:CrewList}

            ]}
        ]
    }],{declaration: true});
    downloadXMLfile(xmlValue);

}
 let downloadXMLfile = (xmlValue) => {
    let data = xmlValue;
    let filename = `XML config ${new Date()}.xml`
    console.log('downloadXMLfile')
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
        }, 0);

}

export default {generateXML}