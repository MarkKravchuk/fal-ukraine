import readXlsxFile from 'read-excel-file'
import moment from "moment";
let data = require("../data/data");
 export  function readXLSCrew(){
     let crew = [];

    let file = document.getElementById("xlsCrew");
      readXlsxFile(file.files[0]).then((rows) => {
        console.log("crew ", rows);
        for (let i = 4; i <rows.length; i++) {
            let dateOfBirth = "";
            if(rows[i][8]!=null){
                dateOfBirth = moment(rows[i][8]).format("MM/DD/YYYY")
            }
            let expiryDate = "";
            if(rows[i][13]!=null){
                expiryDate = moment(rows[i][13]).format("MM/DD/YYYY")
            }
            let Issuing_state_of_identity_document = "";
            if(rows[i][12]!=null){
                Issuing_state_of_identity_document = moment(rows[i][13]).format("MM/DD/YYYY")
            }
            let row = {NR:rows[i][1],Family_name:rows[i][2],Given_name:rows[i][3],Rank_of_rating:rows[i][4],Nationality:rows[i][5],Country_of_birth:rows[i][6],Place_of_birth:rows[i][7],date_of_birth:dateOfBirth,ID_type:rows[i][9]
                ,ID_document_number:rows[i][10],Issuing_state_of_identity_document:Issuing_state_of_identity_document,Expiry_date_of_identity_document:expiryDate,Visa_Residence_permit_number:rows[i][11],Gender:rows[i][14]}
            crew.push(row)
        }


    })
     data.crew = crew;
     return {crew};
}
export default {readXLS: readXLSCrew}
