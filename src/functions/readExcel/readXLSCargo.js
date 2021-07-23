import readXlsxFile from 'read-excel-file'
import data from '../../config/consts/defaultDataConst'

function readXLSCargo(file, onSave) {
    data.cargo.rows = [];
    data.cargo.portOfLoading = '';
    data.cargo.portOfDischarge = '';
    let cargo = data.cargo;
    readXlsxFile(file).then((rows) => {
        console.log("cargo ", rows);
        console.log("portOfLoading ", rows[72][3])
        cargo.portOfLoading = rows[72][3];
        cargo.portOfDischarge = rows[73][3];
        for (let i = 45; i < 54; i++) {
            let row = {
                Seq: rows[i][1],
                Number_of_packages: rows[i][2],
                Kind_of_packages: rows[i][3],
                Transport_unit: rows[i][5],
                Description_of_goods: rows[i][6],
                HS_code: rows[i][8],
                Shipping_marks: rows[i][7],
                Gross_quantity: rows[i][9],
                Gross_Unit: rows[i][10],
                Net_quantity: rows[i][11],
                Net_Unit: rows[i][12],
                Measurement: rows[i][13],
                Measurement_Unit: rows[i][18],
                Seal_number: rows[i][14],
                Custom_status: rows[i][16],
                Size_and_type: rows[i][17],
            }
            cargo.rows.push(row)
        }

        onSave({cargo});

    })
}

export default readXLSCargo;
