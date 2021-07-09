const defaultDateTime = new Date();
defaultDateTime.setHours(0);
defaultDateTime.setMinutes(0);

export default {
    port: {
        arrivalDeparture: '',
        voyageNumber: '',
        ETAPortOfCall: defaultDateTime,
        ETDPortOfCall: defaultDateTime,
        ATAPortOfCall: defaultDateTime,
        ATDPortOfCall: defaultDateTime,
        callAnchorage: '',
        positionPortOfCall: '',
        portFacilityArrival: '',
        cargoDescription: '',
        nameMaster: '',
        airDraught: '',
        purposesOfCall: [''],
        portOfArrival: '',
        lastPortOfCall: '',
        nextPortOfCall: '',
    },
    crew: {
        sosite: 'hui'
    }
}
