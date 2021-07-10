const defaultDateTime = new Date();
defaultDateTime.setHours(0);
defaultDateTime.setMinutes(0);

defaultDateTime.getFullYear()
defaultDateTime.getMonth()
defaultDateTime.getDate()
defaultDateTime.getHours();
defaultDateTime.getMinutes()

export default {
    port: {
        arrivalDeparture: '',
        voyageNumber: '',
        ETAPortOfCall: defaultDateTime,
        ETDPortOfCall: defaultDateTime,
        ATAPortOfCall: defaultDateTime,
        ATDPortOfCall: defaultDateTime,
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
            time: defaultDateTime
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
    }
}
