const readCargoXML = (cargo,dpg, xml) => {
    let Consignment = xml.getElementsByTagName('Consignment');
    cargo.rows = [];
    dpg.rows = [];
    console.log("Consignment ",Consignment)

    try {
        cargo.portOfLoading = Consignment[0].children.find(el => el.name === "PortOfLoading")
            .children.find(el => el.name === 'Port').children.find(el => el.name === 'UNLoCode').value;
        console.log("loading ",Consignment[0].children.find(el => el.name === "PortOfLoading")
            .children.find(el => el.name === 'Port').children.find(el => el.name === 'UNLoCode'))
    }catch (e) {
        cargo.portOfLoading = '';
    }



    // console.log("Consignment ", Consignment)
    // if (Consignment.length > 0) {
    //     for (let i = 0; i < Consignment[0].children.length; i++) {
    //         let PortCall = Consignment[0].children[i]
    //         if (PortCall) {
    //
    //             let port = '';
    //             if (PortCall.children[2]) {
    //                 port = PortCall.children[2].children[3].value + ' - ' + PortCall.children[2].children[2].value + ' - ' + PortCall.children[2].children[0].value;
    //             }
    //
    //             // console.log("PortCall ", PortCall)
    //             let row = {
    //                 NR: i + 1,
    //                 Date_of_arrival: PortCall.children[0].value,
    //                 Date_of_departure: PortCall.children[1].value,
    //                 Port: port,
    //                 Port_facility: PortCall.children[2].children[1].value,
    //                 Security_level: PortCall.children[3].value,
    //                 Security_measures: PortCall.children[4].value
    //             }
    //
    //             cargo.rows.push(row)
    //         }
    //
    //     }
    // }
};

export default readCargoXML;