import readXlsxFile from 'read-excel-file'
export let readXLS = () =>{
    let port = {
        arrivalDeparture: '',
        voyageNumber:'',
        portOfCall:{
            name:'',
            CountryCode:'',
            UNLoCode:'',
        },
        portFacilityAtArrival: {
            Facility:''
        },
        ETAPortOfCall: '',
        ETDPortOfCall: '',
        ATAPortOfCall: '',
        ATDPortOfCall: '',
        portOfArrival: {
            name:'',
            CountryCode:'',
            UNLoCode:'',
        },
        lastPortOfCall: {
            name:'',
            CountryCode:'',
            UNLoCode:'',
        },
        nextPortOfCall: {
            name:'',
            CountryCode:'',
            UNLoCode:'',
        },
        callAnchorage: '',
        positionPortOfCall: {
            latitude:'',
            longitude:'',
            time:'',
        },
        cargoDescription: '',
        nameMaster: {
            familyName:'',
            givenName:'',
        },
        purposesOfCall: [{
            CallPurposeCode : '',
            CallPurposeText : '',
        },{
            CallPurposeCode : '',
            CallPurposeCText : '',
        },{
            CallPurposeCode : '',
            CallPurposeText : '',
        },{
            CallPurposeCode : '',
            CallPurposeText : '',
        },{
            CallPurposeCode : '',
            CallPurposeText : '',
        },{
            CallPurposeCode : '',
            CallPurposeText : '',
        },{
            CallPurposeCode : '',
            CallPurposeText : '',
        },{
            CallPurposeCode : '',
            CallPurposeText : '',
        },{
            CallPurposeCode : '',
            CallPurposeText : '',
        },
        ],
        airDraught: '',
        arrivalDepartureDraught:{
            foreDraught:'',
            MidShipDraught:'',
            AftDraught:'',
        },
        agent:{
            name:'',
            mobileTelephone:'',
            businessTelephone:'',
            telefax:'',
            email:'',
        },
        personsOnBoard:{
            numberOfPersons:'',
            numberOfCrew:'',
            numberOfPassengers:'',
        },
        Stowaways:'Stowaways',
        periodOfStay:''

    }
    let file = document.getElementById("xls");
    readXlsxFile(file.files[0]).then((rows) => {
        console.log("rows ", rows)
        // `rows` is an array of rows
        // each row being an array of cells.
        let Row2 = rows[2];
        let Row5 = rows[5];
        let Row6 = rows[6];
        let Row8 = rows[8];
        let Row10 = rows[10];
        let Row13 = rows[13];
        let Row14 = rows[14];
        let Row15 = rows[15];
        let Row17 = rows[17];
        let Row19 = rows[19];
        let Row20 = rows[20];
        let Row21 = rows[21];
        let Row24 = rows[24];
        let Row25 = rows[25];
        let Row27 = rows[27];
        let Row28 = rows[28];
        port.arrivalDeparture = Row2[2]

        console.log("Port ", port)
    }).then(console.log("finish"))
}
export default {readXLS}
