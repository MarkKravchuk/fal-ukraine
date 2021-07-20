import React from "react";
import ReactDataGrid from 'react-data-grid';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Editors} from 'react-data-grid-addons';
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import ListOfPorts from "../../config/consts/listOfPortsConst";
import MenuItem from "@material-ui/core/MenuItem";

const {DropDownEditor} = Editors;

const styles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
});

const units = ["[Unit]", "KGM", "TNE"];
const UnitEditor = <DropDownEditor options={units}/>;

const columns = [
    {key: "Seq", name: "NR", editable: true, width: 50},
    {key: "Name_of_article", name: "Name of article", editable: true},
    {key: "Quantity", name: "Quantity", editable: true},
    {key: "Unit", name: "Unit", editable: true, editor: UnitEditor},
    {key: "Location_on_board", name: "Location on board", editable: true},
];
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        marginLeft :  theme.spacing(0),
        minWidth: 200,
    }
}));


function CargoForm({data, updateData}) {
    const classes = useStyles();
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
        data.rows = rows
        updateData(data)
    };


    return <>
        <div>
            <Typography variant="h3" component="h3" gutterBottom>
                Ship stores
            </Typography>
            {/*Port of arrival / last port of call / next port of call*/}
            <Grid container justify="space-between" style={{marginTop: '30px'}}>
                <FormControl
                    variant="outlined"
                    className={classes.formControl}
                >
                    <InputLabel id="port-of-loading-label">Port of loading</InputLabel>

                    <Select
                        labelId="port-of-loading-label"
                        value={data.portOfLoading}
                        onChange={(e) => {
                            updateData({portOfLoading: e.target.value})
                        }}
                    >
                        {ListOfPorts.map((port, index) =>
                            <MenuItem key={index} value={`${port.code}`}>
                                {`${port.code} - ${port.countryCode} - ${port.name}`}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>


            </Grid>
            <Grid>
                <FormControl
                    variant="outlined"
                    className={classes.formControl}
                >
                    <InputLabel id="portOfDischarge-label">Port of Discharge</InputLabel>
                    <Select
                        labelId="portOfDischarge-label"
                        value={data.portOfDischarge}
                        onChange={(e) => {
                            updateData({portOfDischarge: e.target.value})
                        }}
                    >
                        {ListOfPorts.map((port, index) =>
                            <MenuItem key={index} value={`${port.code}`}>
                                {`${port.code} - ${port.countryCode} - ${port.name}`}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
            </Grid>
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

    </>
}


export default withStyles(styles)(CargoForm);