import React from "react";
import ReactDataGrid from 'react-data-grid';
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Editors} from 'react-data-grid-addons';
import datePicker from "../pickers/datePicker";
import countryCodes from "../../functions/countryCodes";
import ListOfPorts from "../../config/consts/listOfPortsConst";
const {DropDownEditor} = Editors;

const styles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
});

const ports = ["(...)"];
ListOfPorts.map((port, index) =>
    ports.push( port.code + ' - ' + port.countryCode + ' - ' + port.name)
);
const PortEditor = <DropDownEditor options={ports}/>;
const securityLevels = ["(...)","Security level 1","Security level 2","Security level 3"];
const SecurityEditor = <DropDownEditor options={securityLevels}/>;

const columns = [
    {key: "NR", name: "NR", editable: true, width: 50},
    {key: "date_of_arrival", name: "Date of arrival", editable: true, editor: datePicker},
    {key: "date_of_departure", name: "Date of departure", editable: true, editor: datePicker},
    {key: "port", name: "Port(Locode)", editable: true, editor: PortEditor},
    {key: "port_facility", name: "Port facility(GISIS)", editable: true},
    {key: "security_level", name: "Security level", editable: true, editor:SecurityEditor},
    {key: "security_measures", name: "Special or additional security measures taken by the ship", editable: true, width: 400}
];


function VoyageForm({data, updateData}) {
    function addRow() {
        console.log("adding row");
        let number = data.rows.length + 1
        let row = {NR: number}
        data.rows.push(row);
        updateData(data)
    }

    function deleteRow() {
        data.rows.pop();
        updateData(data)
    }

    function onGridRowsUpdated({fromRow, toRow, updated}){

        const rows = data.rows.slice();
        for (let i = fromRow; i <= toRow; i++) {
            rows[i] = {...rows[i], ...updated};
        }
        data.rows = rows
        updateData(data)
    };


    return (
        <div>
            <Typography variant="h3" component="h3" gutterBottom>
                Voyage information
            </Typography>
            <ReactDataGrid
                columns={columns}
                rowGetter={i => data.rows[i]}
                rowsCount={data.rows.length}
                onGridRowsUpdated={onGridRowsUpdated}
                enableCellSelect={true}
                columnAutoWidth="true"

            />
            <Button variant="primary" onClick={addRow}>Add row</Button>
            <Button variant="primary" onClick={deleteRow}>Delete row</Button>
        </div>
    );

}


export default withStyles(styles)(VoyageForm);