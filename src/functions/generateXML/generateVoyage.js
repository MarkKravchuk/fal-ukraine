
export default (voyage, EPCRequestBody) => {

    let rows = voyage.rows;
    // let CrewList = [];
    // for (let i = 0; i < rows.length; i++) {
    //     let CrewMemberData = [];
    //     let nationalityCode = '';
    //     let countryOfBirthCode = '';
    //     let IssuingCode = '';
    //     if(rows[i].Nationality && rows[i].Nationality !== ''){
    //         let nationality = rows[i].Nationality.split('- ');
    //         nationalityCode = nationality[1];
    //     }
    //     if (rows[i].Country_of_birth && rows[i].Country_of_birth !== ''){
    //         let countryOfBirth = rows[i].Country_of_birth.split('- ');
    //         countryOfBirthCode = countryOfBirth[1];
    //     }
    //
    //     if (rows[i].Issuing_state_of_identity_document && rows[i].Issuing_state_of_identity_document !== ''){
    //         let Issuing_state_of_identity_document = rows[i].Issuing_state_of_identity_document.split('- ');
    //         IssuingCode = Issuing_state_of_identity_document[1];
    //     }
    //
    //
    //
    //     CrewMemberData.push({
    //         CrewIdDocument: [
    //             {IdDocument: rows[i].ID_type},
    //             {IdNumber: rows[i].ID_document_number},
    //             {IssuingCountry: IssuingCode},
    //             {ExpirationDate: rows[i].Expiry_date_of_identity_document},
    //         ]
    //     });
    //     CrewMemberData.push({
    //         Name: [
    //             {GivenName: rows[i].Given_name},
    //             {FamilyName: rows[i].Family_name},
    //         ]
    //     });
    //     CrewMemberData.push({Gender: rows[i].Gender});
    //     CrewMemberData.push({
    //         Duty: [
    //             {Code: RankOfRatingCode},
    //             {Text: rows[i].Rank_of_rating}
    //         ]
    //     });
    //     CrewMemberData.push({DateOfBirth: rows[i].date_of_birth});
    //     CrewMemberData.push({PlaceOfBirth: rows[i].Place_of_birth});
    //     CrewMemberData.push({CountryOfBirth: countryOfBirthCode});
    //     CrewMemberData.push({Nationality: nationalityCode});
    //     CrewMemberData.push({VisaNumber: rows[i].Visa_Residence_permit_number});
    //     CrewList.push({CrewMemberData});
    // }
    //
    // EPCRequestBody.push( {CrewList: CrewList})
}