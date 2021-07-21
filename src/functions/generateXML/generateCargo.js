import listOfPortsConst from "../../config/consts/listOfPortsConst";

const generateCargo = (cargo, EPCRequestBody) => {

    let CargoConsignmentsData = [];
    let rows = cargo.rows;
    let portOfLoading = listOfPortsConst.find(function (element) {
        return element.code === cargo.portOfLoading;
    });
    let portOfDischarge = listOfPortsConst.find(function (element) {
        return element.code === cargo.portOfDischarge;
    });

    CargoConsignmentsData.push({
        PortOfLoading: [
            {
                Port: [
                    {Name: portOfLoading.name},
                    {CountryCode: portOfLoading.countryCode},
                    {UNLoCode: portOfLoading.code}
                ]
            }]
    });
    CargoConsignmentsData.push({
        PortOfDischarge: [
            {
                Port: [
                    {Name: portOfDischarge.name},
                    {CountryCode: portOfDischarge.countryCode},
                    {UNLoCode: portOfDischarge.code}
                ]
            }]
    });
    for (let i = 0; i < rows.length; i++) {
        let CargoItem = [];

        CargoItem.push({ItemNumber: rows[i].Seq});
        CargoItem.push({ShippingMarks: rows[i].Shipping_marks});
        CargoItem.push({NoOfPackages: rows[i].Number_of_packages});
        CargoItem.push({PackageType: rows[i].Kind_of_packages});
        CargoItem.push({
            GrossQuantity: [
                {Content: rows[i].Gross_quantity},
                {UnitCode: rows[i].Gross_Unit}
            ]
        });
        CargoItem.push({
            NetQuantity: [
                {Content: rows[i].Net_quantity},
                {UnitCode: rows[i].Net_Unit}
            ]
        });
        CargoItem.push({
            GoodsType: [
                {HSCode: rows[i].HS_code},
                {Description: rows[i].Description_of_goods}
            ]
        });
        CargoItem.push({
            Measurement: [
                {Content: rows[i].Measurement},
                {UnitCode: rows[i].Measurement_Unit}
            ]
        });
        CargoItem.push({CustomStatus: rows[i].Custom_status});
        CargoItem.push({
            Container: [
                {MarksAndNumber: rows[i].Transport_unit},
                {SizeAndType: rows[i].Size_and_type},
                {SealNumber: rows[i].Seal_number},
            ]
        });
        CargoConsignmentsData.push({CargoItem: CargoItem});
    }
    CargoConsignmentsData.push({CargoItemListSize: rows.length});

    EPCRequestBody.push({CargoConsignmentsData: CargoConsignmentsData})
};

export default generateCargo;