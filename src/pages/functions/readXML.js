import xmlFile from '../../XML/example.xml'
let XMLParser = require('react-xml-parser');
export let readXML  =() =>{
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
        periodOfStay:''

    }

    let file = document.getElementById("file").files[0];

    console.log('doupload',file)

    var reader = new FileReader();
    reader.onload = (() => {
        return (e) => {
            let fileContent = e.target.result;
            let xml = new XMLParser().parseFromString(fileContent);
            port.arrivalDeparture = xml.getElementsByTagName('arrivalDeparture')[0].value;
            console.log("Port ", port);

        };
    })();
    reader.readAsText(file);


}
export default {readXML}