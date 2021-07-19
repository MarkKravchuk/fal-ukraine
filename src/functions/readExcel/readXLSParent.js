import readXlsxFile from 'read-excel-file'
import readXLSPort from "./readXLSPort";
import readXLSCrew from "./readXLSCrew";
import readXLSPassengers from "./readXLSPassengers"
import readXLSShip from "./readXLSShip";
import readXLSVoyage from "./readXLSVoyage";
import readXLSHealth from './readXLSHealth'
import readXLSShipStores from "./readXLSShipStores";

function readXLS(files, setOpenErrorDialog, onSave) {

    if (!files || files.length === 0) return {};

    for (let i = 0; i < files.length; i++) {
        //store to promises

        readXlsxFile(files[i]).then((rows) => {
            try {
                let name = rows[0][0].toLowerCase();

                if (name === "port information") {
                    readXLSPort(files[i], onSave)
                } else if (name === "crew list") {
                    readXLSCrew(files[i], onSave);
                } else if (name === "ship information") {
                    readXLSShip(files[i], onSave);
                } else if (name === "passenger list") {
                    readXLSPassengers(files[i], onSave);
                } else if (name === "voyage information") {
                    readXLSVoyage(files[i], onSave);
                } else if (name === "maritime declaration of health") {
                    readXLSHealth(files[i], onSave);
                } else if (name === "ship stores") {
                    readXLSShipStores(files[i], onSave);
                }
            } catch (e) {
                setOpenErrorDialog({
                    open: true, error: {
                        title: 'Error while reading Excel file',
                        text: 'The file is most likely broken or empty.' +
                            'Developer console can say a little more about the error.'
                    }
                })
            }
        });
    }
}

export default readXLS;