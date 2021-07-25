import listOfPortsConst from "../../config/consts/listOfPortsConst";

const generateWaste = (waste, EPCRequestBody) => {
    let WasteInformation = [];
    let rows = waste.rows;
    let lastPortDelivered = listOfPortsConst.find(function (element) {
        return element.code === waste.LastPortDelivered;
    });


    WasteInformation.push({WasteDeliveryStatus: waste.WasteDeliveryStatus});
    WasteInformation.push({
        LastPortDelivered: [
            {
                Port: [
                    {Name: lastPortDelivered.name},
                    {CountryCode: lastPortDelivered.countryCode},
                    {UNLoCode: lastPortDelivered.code}
                ]
            }]
    });
    WasteInformation.push({LastPortDeliveredDate: waste.LastPortDeliveredDate});
    for (let i = 0; i < rows.length; i++) {
        let WasteDisposalInformation = [];
        let PortOfDelivery = {};
        if (rows[i].PortOfDelivery && rows[i].PortOfDelivery !== '') {
            let DeliveryPortCode = rows[i].PortOfDelivery.split(' -')[0]
            PortOfDelivery = listOfPortsConst.find(function (element) {
                return element.code === DeliveryPortCode;
            });
        }
        let wasteTypeCode = '';
        let wasteTypeDescription = '';
        if (rows[i].WasteType && rows[i].WasteType !== '' && rows[i].WasteType !== '[Waste type]') {
            let wasteType = rows[i].WasteType.split(" : ");
            wasteTypeCode = wasteType[0];
            wasteTypeDescription = wasteType[1];
        }

        WasteDisposalInformation.push({
            WasteType: [
                {Code: wasteTypeCode},
                {Description: wasteTypeDescription},
            ]
        });
        WasteDisposalInformation.push({ToBeDelivered: rows[i].WasteToBeDelivered});
        WasteDisposalInformation.push({MaxStorage: rows[i].MaxStorage});
        WasteDisposalInformation.push({RetainedOnboard: rows[i].WasteAmount});
        WasteDisposalInformation.push({EstimateGenerated: rows[i].EstimatedWaste});
        if (PortOfDelivery && PortOfDelivery !== {}) {
            WasteDisposalInformation.push({
                DisposedOfInPort: [
                    {Name: PortOfDelivery.name},
                    {CountryCode: PortOfDelivery.countryCode},
                    {UNLoCode: PortOfDelivery.code},
                ]
            })
        }


        WasteInformation.push({WasteDisposalInformation: WasteDisposalInformation});
    }

    EPCRequestBody.push({WasteInformation: WasteInformation})
};

export default generateWaste;