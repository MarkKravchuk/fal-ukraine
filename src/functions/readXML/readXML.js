import XMLParser from 'react-xml-parser';
import defaultData from '../../config/consts/defaultDataConst'
import readPortXML from "./readPortXML";
import readCrewXML from "./readCrewXML";
import readShipXML from "./readShipXML";

function readXML (fileContent) {
    let xml = new XMLParser().parseFromString(fileContent);

    let data = defaultData;
    readPortXML(data.port, xml);
    readShipXML(data.ship, xml);
    readCrewXML(data.crew, xml);

    console.log("Read from XML data: ", data);

    return data;
}

export default readXML

