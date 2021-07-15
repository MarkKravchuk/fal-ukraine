import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import ReactDataGrid from "react-data-grid";
import Button from "@material-ui/core/Button";
import datePicker from "../pickers/datePicker";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    formControlNoMargin: {
        minWidth: 225,
    },
    button: {
        margin: theme.spacing(1),
    },
    topMargin: {
        marginTop: theme.spacing(5)
    }
}));

const HealthFormComponent = ({data, updateData}) => {

    const classes = useStyles();

    const marginTop = {marginTop: '30px'};
    const miniMarginTop = {marginTop: '10px'};
    const emptyDIV = <div style={{width: '225px'}}/>;
    const widthOfLongQuestion = {width: '60%'}


    return <>
        <Typography variant="h3" component="h3" gutterBottom>
            Maritime Declaration of Health
        </Typography>

        <Typography style={marginTop} variant="h5" classes={classes.topMargin} component="h5" gutterBottom>
            Health questions
        </Typography>

        <Grid container style={marginTop} classes={classes.topMargin} justify="space-between">
            <div style={widthOfLongQuestion}>
                <FormControl
                    variant="outlined"
                    className={classes.formControlNoMargin}
                    fullWidth
                >
                    <InputLabel id="enum-1-label">(1) Has any person died on board during the voyage otherwise than as a
                        result of accident? </InputLabel>
                    <Select
                        labelId="enum-1-label"
                        value={data.enum1}
                        onChange={(e) => {
                            updateData({enum1: e.target.value})
                        }}
                    >
                        <MenuItem value={'Yes'}>Yes</MenuItem>
                        <MenuItem value={'No'}>No</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <TextField
                label="Total no. of death"
                value={data.nrOfDeath}
                onChange={(e) =>
                    updateData({nrOfDeath: e.target.value})}
                variant="outlined"
            />
        </Grid>

        <Grid container style={marginTop} classes={classes.topMargin} justify="space-between">
            <div style={widthOfLongQuestion}>
                <FormControl
                    variant="outlined"
                    className={classes.formControlNoMargin}
                    fullWidth
                >
                    <InputLabel id="enum-2-label">(2) Is there on board or has there been during the international
                        voyage any case of disease which you suspect to be of an infectious nature?</InputLabel>
                    <Select
                        labelId="enum-2-label"
                        value={data.enum2}
                        onChange={(e) => {
                            updateData({enum2: e.target.value})
                        }}
                    >
                        <MenuItem value={'Yes'}>Yes</MenuItem>
                        <MenuItem value={'No'}>No</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </Grid>

        <Grid container style={marginTop} classes={classes.topMargin} justify="space-between">
            <div style={widthOfLongQuestion}>
                <FormControl
                    variant="outlined"
                    className={classes.formControlNoMargin}
                    fullWidth
                >
                    <InputLabel id="enum-3-label">(3) Has the total number of ill passengers during the voyage been
                        greater than normal/expected?</InputLabel>
                    <Select
                        labelId="enum-3-label"
                        value={data.enum3}
                        onChange={(e) => {
                            updateData({enum3: e.target.value})
                        }}
                    >
                        <MenuItem value={'Yes'}>Yes</MenuItem>
                        <MenuItem value={'No'}>No</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <TextField
                label="How many ill persons?"
                value={data.nrOfIll}
                onChange={(e) =>
                    updateData({nrOfIll: e.target.value})}
                variant="outlined"
            />
        </Grid>

        <Grid container style={marginTop} classes={classes.topMargin} justify="space-between">
            <div style={widthOfLongQuestion}>
                <FormControl
                    variant="outlined"
                    className={classes.formControlNoMargin}
                    fullWidth
                >
                    <InputLabel id="enum-4-label">(4) Is there any ill person on board now?</InputLabel>
                    <Select
                        labelId="enum-4-label"
                        value={data.enum4}
                        onChange={(e) => {
                            updateData({enum4: e.target.value})
                        }}
                    >
                        <MenuItem value={'Yes'}>Yes</MenuItem>
                        <MenuItem value={'No'}>No</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </Grid>

        <Grid container style={marginTop} classes={classes.topMargin} justify="space-between">
            <div style={widthOfLongQuestion}>
                <FormControl
                    variant="outlined"
                    className={classes.formControlNoMargin}
                    fullWidth
                >
                    <InputLabel id="enum-5-label">(5) Was a medical practitioner consulted?</InputLabel>
                    <Select
                        labelId="enum-5-label"
                        value={data.enum5}
                        onChange={(e) => {
                            updateData({enum5: e.target.value})
                        }}
                    >
                        <MenuItem value={'Yes'}>Yes</MenuItem>
                        <MenuItem value={'No'}>No</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </Grid>

        <Grid container style={marginTop} classes={classes.topMargin} justify="space-between">
            <div style={widthOfLongQuestion}>
                <FormControl
                    variant="outlined"
                    className={classes.formControlNoMargin}
                    fullWidth
                >
                    <InputLabel id="enum-6-label">(6) Are you aware of any condition on board which may lead to
                        infection or spread of disease?</InputLabel>
                    <Select
                        labelId="enum-6-label"
                        value={data.enum6}
                        onChange={(e) => {
                            updateData({enum6: e.target.value})
                        }}
                    >
                        <MenuItem value={'Yes'}>Yes</MenuItem>
                        <MenuItem value={'No'}>No</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </Grid>

        <Grid container style={marginTop} classes={classes.topMargin} justify="space-between">
            <div style={widthOfLongQuestion}>
                <FormControl
                    variant="outlined"
                    className={classes.formControlNoMargin}
                    fullWidth
                >
                    <InputLabel id="enum-7-label">(7) Has any sanitary measure (e.g. quarantine, isolation, disinfection
                        or decontamination) been applied on board?</InputLabel>
                    <Select
                        labelId="enum-7-label"
                        value={data.enum7}
                        onChange={(e) => {
                            updateData({enum7: e.target.value})
                        }}
                    >
                        <MenuItem value={'Yes'}>Yes</MenuItem>
                        <MenuItem value={'No'}>No</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </Grid>

        <div style={{width: '470px', position: 'relative', marginTop: '30px'}}>
            <ReactDataGrid
                columns={[
                    {key: "type", name: "Type", editable: true, width: 150},
                    {key: "place", name: "Place", editable: true, width: 150},
                    {key: "date", name: "Date", editable: true, editor: datePicker, width: 150}
                ]}
                rowGetter={i => data.sanitaryMeasures[i]}
                rowsCount={data.sanitaryMeasures.length}
                onGridRowsUpdated={({fromRow, toRow, updated}) => {
                    const sanitaryMeasures = data.sanitaryMeasures.slice();
                    for (let i = fromRow; i <= toRow; i++) {
                        sanitaryMeasures[i] = {...sanitaryMeasures[i], ...updated};
                    }
                    updateData({sanitaryMeasures})
                }}
                enableCellSelect={true}
            />
            <Button variant="primary" onClick={() => {
                let sanitaryMeasures = data.sanitaryMeasures;
                sanitaryMeasures.push({});
                updateData({sanitaryMeasures})
            }}>
                Add row
            </Button>
            <Button variant="primary" onClick={() => {
                let sanitaryMeasures = data.sanitaryMeasures;
                sanitaryMeasures.pop();
                updateData({sanitaryMeasures});
            }}>Delete row</Button>
        </div>

        <Grid container style={marginTop} classes={classes.topMargin} justify="space-between">
            <div style={widthOfLongQuestion}>
                <TextField
                    label="(8) Have any stowaways been found on board?"
                    margin={'normal'}
                    fullWidth
                    value={data.enum8}
                    onChange={(e) => {
                        let enum8 = e.target.value;
                        updateData({enum8})
                    }}
                    variant="outlined"
                />
            </div>

            <TextField
                label="If yes, where did they join the ship (if known)?"
                margin={'normal'}
                value={data.joinedStowaways}
                onChange={(e) => {
                    let joinedStowaways = e.target.value;
                    updateData({joinedStowaways})
                }}
                variant="outlined"
            />
        </Grid>

        <Typography style={marginTop} variant="p" classes={classes.topMargin} component="p" gutterBottom>
            Note: In the absence of a surgeon, the master should regard the following symptoms as grounds for suspecting
            the existence of a disease of an infectious nature:
            (a) fever, persisting for several days or accompanied by (i) prostration; (ii) decreased consciousness;
            (iii) glandular swelling; (iv) jaundice; (v) cough or shortness of breath; (vi) unusual bleeding; or (vii)
            paralysis.
            (b) with or without fever: (i) any acute skin rash or eruption; (ii) severe vomiting (other than sea
            sickness); (iii) severediarrhoea; or (iv) recurrent convulsions.
        </Typography>

        <ReactDataGrid
            columns={[
                {key: "number", name: "NR", editable: true, width: 150},
                {key: "place", name: "Place", editable: true, width: 150},
                {key: "date", name: "Date", editable: true, editor: datePicker, width: 150}
            ]}
            rowGetter={i => data.sanitaryMeasures[i]}
            rowsCount={data.sanitaryMeasures.length}
            onGridRowsUpdated={({fromRow, toRow, updated}) => {
                const sanitaryMeasures = data.sanitaryMeasures.slice();
                for (let i = fromRow; i <= toRow; i++) {
                    sanitaryMeasures[i] = {...sanitaryMeasures[i], ...updated};
                }
                updateData({sanitaryMeasures})
            }}
            enableCellSelect={true}
        />
        <Button variant="primary" onClick={() => {
            let sanitaryMeasures = data.sanitaryMeasures;
            sanitaryMeasures.push({});
            updateData({sanitaryMeasures})
        }}>
            Add row
        </Button>
        <Button variant="primary" onClick={() => {
            let sanitaryMeasures = data.sanitaryMeasures;
            sanitaryMeasures.pop();
            updateData({sanitaryMeasures});
        }}>Delete row</Button>

    </>
}

export default HealthFormComponent;