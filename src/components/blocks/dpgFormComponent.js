import React from "react";
import ReactDataGrid from 'react-data-grid';
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Editors} from 'react-data-grid-addons';
import dgClassifications from "../../config/consts/dgClassifications";
import IMOHazardClasses from "../../config/consts/IMOHazardClasses";
import packingGroups from "../../config/consts/packingGroups";
import pollutionCodes from "../../config/consts/pollutionCodes";

const {DropDownEditor} = Editors;

const styles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
});

const dgClassificationEditor = <DropDownEditor options={dgClassifications}/>;
const IMOHazardEditor = <DropDownEditor options={IMOHazardClasses}/>;
const packingGroupsEditor = <DropDownEditor options={packingGroups}/>;
const pollutionCodesEditor = <DropDownEditor options={pollutionCodes}/>;
const columns = [
    {key: "Container_number", name: "Container number", editable: true, width: 150},
    {key: "Textual_reference", name: "Textual reference", editable: true, width: 150},
    {key: "DG_Classification", name: "DG Classification", editable: true, width: 150, editor: dgClassificationEditor},
    {key: "IMO_hazard_classes", name: "IMO hazard classes", editable: true, width: 150, editor: IMOHazardEditor},
    {key: "UN_number", name: "UN number", editable: true, width: 150},
    {key: "Packing_group", name: "Packing group", editable: true, width: 150, editor: packingGroupsEditor},
    {key: "Subsidiary_risk", name: "Subsidiary risk", editable: true, width: 150},
    {key: "Flash_point", name: "Flash point", editable: true, width: 150},
    {key: "pollution_code", name: "MARPOL pollution code", editable: true, width: 200, editor: pollutionCodesEditor},
    {key: "EmS", name: "EmS", editable: true, width: 50},
    {key: "Additional_information", name: "Additional information", editable: true, width: 180},
    {key: "Segregation_information", name: "Segregation information", editable: true, width: 180},
    {key: "On_board_location", name: "On board location", editable: true, width: 150},

];


function DPGForm({data, updateData, cargoData}) {

    function addRow() {
        console.log("adding row");
        let number = data.rows.length + 1
        let row = {Seq: number}
        data.rows.push(row);
        updateData(data)
    }

    function deleteRow() {
        data.rows.pop();
        updateData(data)
    }

    function onGridRowsUpdated({fromRow, toRow, updated}) {

        const rows = data.rows.slice();
        for (let i = fromRow; i <= toRow; i++) {
            rows[i] = {...rows[i], ...updated};
        }
        data.rows = rows;
        updateData(data)
    };


    return <>
        <div>
            <Typography variant="h3" component="h3" gutterBottom>
                DPG Information
            </Typography>
            <ReactDataGrid
                columns={columns}
                rowGetter={i => data.rows[i]}
                rowsCount={data.rows.length}
                onGridRowsUpdated={onGridRowsUpdated}
                enableCellSelect={true}

            />
            <Button variant="primary" onClick={addRow}>Add row</Button>
            <Button variant="primary" onClick={deleteRow}>Delete row</Button>
        </div>

    </>
}


export default withStyles(styles)(DPGForm);