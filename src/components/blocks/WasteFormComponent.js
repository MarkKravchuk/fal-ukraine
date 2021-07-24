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
import TextField from "@material-ui/core/TextField";

const {DropDownEditor} = Editors;

const styles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
});


const columns = [
    {key: "NR", name: "Seq", editable: true, width: 50},
    {key: "Number_of_packages", name: "Number of packages", editable: true, width: 150},
];
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        marginLeft: theme.spacing(0),
        minWidth: 200,
    }
}));


function WasteForm({data, updateData}) {
    const classes = useStyles();
    const widthOfLongQuestion = {width: '65%'}

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

    function onGridRowsUpdated({fromRow, toRow, updated}) {

        const rows = data.rows.slice();
        for (let i = fromRow; i <= toRow; i++) {
            rows[i] = {...rows[i], ...updated};
        }
        data.rows = rows;
        updateData(data)
    };

    function correctDateTime(date) {
        date = "" + date;
        return date.substr(0, 16);
    }

    return <>
        <div>
            <Typography variant="h3" component="h3" gutterBottom>
                Waste information
            </Typography>
            <div style={widthOfLongQuestion}>
                <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    fullWidth
                >
                    <InputLabel className={classes.labelControl} id="enum-1-label">Are you delivering all,some or none
                        of your waste into port reception facility? </InputLabel>
                    <Select
                        labelId="enum-1-label"
                        value={data.WasteDeliveryStatus}
                        className={classes.selectControl}
                        onChange={(e) => {
                            updateData({WasteDeliveryStatus: e.target.value})
                        }}
                    >
                        <MenuItem value={'All'}>All</MenuItem>
                        <MenuItem value={'Some'}>Some</MenuItem>
                        <MenuItem value={'None'}>None</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Typography variant="h4" component="h3" gutterBottom className={classes.formControl}>
                Last port and date when ship-generated waste was delivered
            </Typography>
            <div className={'flex-parent'}>
                <div className={'flex-item-40'}>

                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                        margin={"normal"}
                    >
                        <InputLabel id="last-port-label">Port</InputLabel>

                        <Select
                            labelId="port-of-label-label"
                            value={data.LastPortDelivered}
                            onChange={(e) => {
                                updateData({LastPortDelivered: e.target.value})
                            }}
                        >
                            {ListOfPorts.map((port, index) =>
                                <MenuItem key={index} value={`${port.code}`}>
                                    {`${port.code} - ${port.countryCode} - ${port.name}`}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </div>

                <div className={'flex-item-60'}>
                    <Grid container justify="space-around">
                        <TextField
                            label="Date of issue"
                            type="date"
                            style={{minWidth: '225px'}}
                            variant={'outlined'}
                            className={classes.formControl}
                            value={correctDateTime(data.LastPortDeliveredDate)}
                            onChange={(e) =>
                                updateData({LastPortDeliveredDate: e.target.value})}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </div>

            </div>
            <Typography variant="h4" component="h3" gutterBottom className={classes.formControl}>
                Waste items
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


export default withStyles(styles)(WasteForm);