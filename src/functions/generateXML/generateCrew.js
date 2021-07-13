const RanksOfRating = ['AbleSeaman', 'Agent', 'AsstFoodBevMngr', 'BarManager', 'BarService', 'Bosun', 'Cadet', 'Captain', 'CargoTechnician', 'CasinoStaff', 'ChiefCook', 'ChiefElectrician', 'ChiefHousekeeper', 'ChiefEngineer', 'ChiefMaster', 'ChiefMate', 'ChiefOfficer', 'ChiefPurser', 'ChiefSteward', 'ClassSurveyor', 'CSO', 'Cook', 'CraneOperator', 'CrewMember', 'CruiseDirector', 'CruiseStaff', 'DeckApprentice', 'DeckFitter', 'DeckOfficer', 'Deckhand', 'Doctor', 'Donkeyman', 'ElectricalEngineer', 'ElectricalOfficer', 'Electrician', 'EngineerCadet', 'EngineeringCrew', 'EngineFitter', 'Entertainment', 'FacilitiesCrew', 'FacilitiesManager', 'FirstAsstEngineer', 'FirstEngineer', 'FirstMate', 'FirstOfficer', 'Fitter', 'FourthOfficer', 'FoodBevMngr', 'FoodService', 'FourthAsstEngineer', 'Greaser', 'Hospitality', 'HotelDirector', 'HotelStaff', 'HousekeepingStaff', 'InformationTechnology', 'JuniorEngineer', 'LaundryMaster', 'Lifeboatman', 'Maitred', 'MarineCrew', 'MarketingRevenueMngr', 'Master', 'MasterFirstClassPilot', 'MateFirstClassPilot', 'Mechanic', 'MedicalStaff', 'Messman', 'Motorman', 'Oiler', 'Operator', 'OrdinarySeaman', 'Owner', 'Painter', 'Porter', 'Provision', 'ProvisionMaster', 'Pumpman', 'QMED', 'RadioOfficer', 'Reeferman', 'Repairman', 'RiddingCrew', 'SafetyAndSecurity', 'SecondAsstEngineer', 'SecondMate', 'SecondOfficer', 'SSO', 'StaffCaptain', 'Steward', 'Superintendent', 'Tankerman', 'ThirdAsstEngineer', 'ThirdMate', 'ThirdOfficer', 'ThirdParty', 'TruckMechanic', 'Tunnelman', 'UtilityPerson', 'VettingInspector', 'Welder', 'Wiper', 'YardPersonnel', 'Other']

export default (crew, EPCRequestBody) => {

    let CrewList = [];
    for (let i = 0; i < crew.length; i++) {
        let CrewMemberData = [];
        console.log("id type ", crew[i].ID_type);
        let RankOfRatingCode = "";
        if (crew[i].Rank_of_rating !== '') {
            RankOfRatingCode = RanksOfRating.indexOf(crew[i].Rank_of_rating) + 1;
        }

        let nationality = crew[i].Nationality.split(' ');
        let nationalityCode = nationality[3];
        let countryOfBirth = crew[i].Country_of_birth.split(' ');
        let countryOfBirthCode = countryOfBirth[3];
        CrewMemberData.push({
            CrewIdDocument: [
                {IdDocument: crew[i].ID_type},
                {IdNumber: crew[i].ID_document_number},
                {IssueDate: crew[i].Issuing_state_of_identity_document},
                {ExpirationDate: crew[i].Expiry_date_of_identity_document},
            ]
        });
        CrewMemberData.push({
            Name: [
                {GivenName: crew[i].Given_name},
                {FamilyName: crew[i].Family_name},
            ]
        });
        CrewMemberData.push({Gender: crew[i].Gender});
        CrewMemberData.push({
            Duty: [
                {Code: RankOfRatingCode},
                {Text: crew[i].Rank_of_rating}
            ]
        });
        CrewMemberData.push({DateOfBirth: crew[i].date_of_birth});
        CrewMemberData.push({PlaceOfBirth: crew[i].Place_of_birth});
        CrewMemberData.push({CountryOfBirth: countryOfBirthCode});
        CrewMemberData.push({Nationality: nationalityCode});
        CrewMemberData.push({VisaNumber: crew[i].Visa_Residence_permit_number});
        CrewList.push({CrewMemberData});
    }

    EPCRequestBody.push( {CrewList: CrewList})
}