export default (ship, xml) => {


    let shipId = xml.getElementsByTagName('ShipID')[0];

    if (shipId) {
        shipId = shipId.children;
        ship.name = shipId.find(el => el.name === 'ShipName').value;
        ship.iMOnumber = shipId.find(el => el.name === 'IMONumber').value;
        ship.mmsiNumner = shipId.find(el => el.name === 'MMSINumber').value;
        ship.callSign = shipId.find(el => el.name === 'CallSign').value;
        ship.otherInfo = shipId.find(el => el.name === 'Comment').value;
    }

    ship.flagState = xml.getElementsByTagName('FlagState')[0].value;
    ship.grossTonnage = xml.getElementsByTagName('GrossTonnage')[0].value;
    ship.netTonnage = xml.getElementsByTagName('NetTonnage')[0].value;
    if (xml.getElementsByTagName('RegistryCertificate')) {
        ship.port = xml.getElementsByTagName('IssueLocation')[0];
        if (ship.port) ship.port = ship.port.children.find(el => el.name === 'UNLoCode').value;
        ship.issueDate = xml.getElementsByTagName('IssueDate')[0].value;
        ship.certificateNumber = xml.getElementsByTagName('Number')[0].value;
    }
    ship.shipType = xml.getElementsByTagName('ShipTypeContent')[0].value;
    ship.builtYear = xml.getElementsByTagName('YearOfBuilt')[0].value;
    ship.deadWeight = xml.getElementsByTagName('DeadWeight')[0].value;
    ship.beam = xml.getElementsByTagName('Beam')[0].value;
    ship.summerDraught = xml.getElementsByTagName('SummerDraught')[0].value;
    ship.length = xml.getElementsByTagName('LengthOverall')[0].value;

    ship.companyName = xml.getElementsByTagName('Organisation')[0].children[0].value;

    let company = xml.getElementsByTagName('Company')[1];
    console.log('FUCKING COMPANY');
    if (company) {
        ship.phone = company.children.find(el => el.name === "Contact").children
            .find(el => el.name === "ContactNumbers").children.find(el => el.name === "BusinessTelephone").value;
        ship.fax = company.children.find(el => el.name === "Contact").children
            .find(el => el.name === "ContactNumbers").children.find(el => el.name === "Telefax").value;
        ship.email = company.children.find(el => el.name === "Contact").children
            .find(el => el.name === "ContactNumbers").children.find(el => el.name === "EMail").value;
        ship.iMOCompany =  company.children.find(el => el.name === "IMOCompanyId").value;
    }
}