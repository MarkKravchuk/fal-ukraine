import XMLParser from 'react-xml-parser';
import defaultData from '../../config/consts/defaultDataConst'
import readPortXML from "./readPortXML";
import readCrewXML from "./readCrewXML";
import readShipXML from "./readShipXML";
import readPassengersXML from "./readPassengersXML";
import readVoyageXML from "./readVoyageXML";
import readShipStoresXML from "./readShipStoresXML";
import readCrewEffectsXML from "./readCrewEffectsXML";

function readXML(fileContent) {
    let xml = new XMLParser().parseFromString(fileContent);

    console.log("reading xml ")
    let data = defaultData;
    readPortXML(data.port, xml);
    readShipXML(data.ship, xml);
    readCrewXML(data.crew, xml);
    readPassengersXML(data.passengers, xml);
    readVoyageXML(data.voyage, xml);
    readShipStoresXML(data.shipStores,xml);
    readCrewEffectsXML(data.crewEffects,xml);


    console.log("Read from XML data: ", data);

    return data;
}

export default readXML

