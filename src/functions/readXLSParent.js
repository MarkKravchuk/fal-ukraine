import readXlsxFile from 'read-excel-file'
import readXLSPort from "./readXLSPort";
import readXLSCrew from "./readXLSCrew";

function readXLS(files, onSave) {

    if (!files || files.length === 0) return {};

    let promises;

    for (let i = 0; i < files.length; i++) {
        //store to promises

        readXlsxFile(files[i]).then((rows) => {
            let name = rows[0][0].toLowerCase();
            if (name === "port information") {
                readXLSPort(files[i], onSave)
            } else if (name === "crew list") {
                readXLSCrew(files[i], onSave);
            }
        });
    }
}

export default readXLS;