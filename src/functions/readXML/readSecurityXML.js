const readSecurityXML = (security, xml) => {
    security.vaildISSC = xml.getElementsByTagName('ValidISSC')[0].value;
    security.noValid = xml.getElementsByTagName('ValidISSCReasonForNoValidISSC')[0].value;
    security.issued = xml.getElementsByTagName('Issuer')[0].value;
    security.isscType = xml.getElementsByTagName('CertificateStatus')[0].value;
    security.expiryDate = xml.getElementsByTagName('ExpiryDate')[0].value;
    security.securityLevel = xml.getElementsByTagName('CurrentShipSecurityLevel')[0].value;
    security.securityRelatedMatter = xml.getElementsByTagName('SecurityRelatedMatterToReport')[0].value;
    security.approvedSSP = xml.getElementsByTagName('ValidSSC')[0];
    security.firstName = xml.getElementsByTagName('CSO')[0].children.find(el => el.name === "Person")
        .children.find(el => el.name === 'GivenName').value;
    security.familyName = xml.getElementsByTagName('CSO')[0].children.find(el => el.name === "Person")
        .children.find(el => el.name === 'FamilyName').value;
    security.phone = xml.getElementsByTagName('CSO')[0].children.find(el => el.name === "ContactNumbers")
        .children.find(el => el.name === 'MobileTelephone').value;
    security.fax = xml.getElementsByTagName('CSO')[0].children.find(el => el.name === "ContactNumbers")
        .children.find(el => el.name === 'Telefax').value;
    security.email = xml.getElementsByTagName('CSO')[0].children.find(el => el.name === "ContactNumbers")
        .children.find(el => el.name === 'EMail').value;

    if (xml.getElementsByTagName("ShipToShipActivityList")) {
        security.rows = [];
        let rows = xml.getElementsByTagName('ShipToShipActivity');
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            let dateFrom = row.children.find(el => el.name === 'FromDateTime').value;
            let dateDeparture = row.children.find(el => el.name === 'FromDateTime').value;
            let NR = i + 1;
            let shipActivity = row.children.find(el => el.name === 'Activity').value;
            let securityMeasure = row.children.find(el => el.name === 'AdditionalSecurityMeasures').value;
            let locationName = row.children.find(el => el.name === 'Location')
                .children.find(el => el.name === 'Name').value;
            console.log('row.children.find(el => el.name === "Location")', row.children.find(el => el.name === 'Location'))
            console.log()
            console.log()
            console.log()
            let latitude = row.children.find(el => el.name === 'Location')
                .children.find(el => el.name === 'Position').children.find(el => el.name === 'Latitude').value;
            let longitude = row.children.find(el => el.name === 'Location')
                .children.find(el => el.name === 'Position').children.find(el => el.name === 'Longitude').value;
            let port = row.children.find(el => el.name === 'Location')
                .children.find(el => el.name === 'Port').children.find(el => el.name === 'UNLoCode').value;

            security.rows.push({
                NR,
                dateFrom,
                dateDeparture,
                shipActivity,
                securityMeasure,
                locationName,
                latitude,
                longitude,
                port
            })
        }
    }
};
export default readSecurityXML;