// const defaultDateTime = new Date();
// defaultDateTime.setHours(0);
// defaultDateTime.setMinutes(0);
//
// defaultDateTime.getFullYear()
// defaultDateTime.getMonth()
// defaultDateTime.getDate()
// defaultDateTime.getHours();
// defaultDateTime.getMinutes()

export default {
    port: {
        arrivalDeparture: '',
        voyageNumber: '',
        ETAPortOfCall: '',
        // ETAPortOfCall: defaultDateTime,
        ETDPortOfCall: '',
        // ETDPortOfCall: defaultDateTime,
        ATAPortOfCall: '',
        // ATAPortOfCall: defaultDateTime,
        ATDPortOfCall: '',
        // ATDPortOfCall: defaultDateTime,
        callAnchorage: '',
        portOfCall: '',
        positionPortOfCall: '',
        portFacilityAtArrival: '',
        cargoDescription: '',
        airDraught: '',
        callPurpose: [''],
        portOfArrival: '',
        lastPortOfCall: '',
        nextPortOfCall: '',
        position: {
            latitude: '',
            longitude: '',
            time: ''
            // time: defaultDateTime
        },
        nameOfMaster: {
            givenName: '',
            familyName: '',
        },
        arrivalDraught: {
            foreDraught: "",
            midShipDraught: '',
            aftDraught: '',
        },
        agent: {
            company: '',
            contactNumbers: {
                businessTelephone: '',
                mobileTelephone: '',
                telefax: '',
                EMail: ''
            }
        },
        personsOnBoard: {
            numberOfPersonsOnBoard: '',
            crew: '',
            passengers: '',
        },
        stowaways: '',
        periodOfStay: '',

    },
    crew: {
        rows: [
            { "NR": 1 }
        ]
    },
    ship: {
        name: '',
        iMOnumber: '',
        otherInfo: '',
        callSign: '',
        mmsiNumner: '',
        flagState: '',
        shipType: '',
        grossTonnage: '',
        netTonnage: '',
        port: '',
        issueDate: '',
        certificateNumber: '',
        companyName: '',
        iMOCompany: '',
        phone: '',
        fax: '',
        email: '',
        builtYear: '',
        deadWeight: '',
        length: '',
        beam: '',
        summerDraught: ''
    }
}
