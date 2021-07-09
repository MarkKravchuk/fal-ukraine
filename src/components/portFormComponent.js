import React from "react";
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'
import '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import {generateXML} from '../functions/generateXML'
import {readXLSPort} from '../functions/readXLSPort'
import {readXML} from '../functions/readXML'

import ListOfPorts from './../config/consts/listOfPortsConst'

import './portFormComponent.css'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    formControlNoMargin: {
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
    },
}));


function PortForm({data, updateData}) {

    const classes = useStyles();
    console.log('THe data', data)

    return <>
        <Typography variant="h3" component="h3" gutterBottom>
            Port information
        </Typography>

        <FormControl
            variant="outlined"
            className={classes.formControlNoMargin}
        >
            <InputLabel id="departure-arrival-label">Departure / Arrival</InputLabel>

            <Select
                labelId="departure-arrival-label"
                value={data.arrivalDeparture}
                onChange={(e) => {
                    updateData({arrivalDeparture: e.target.value})
                }}
            >
                <MenuItem value={'Arrival'}>Arrival</MenuItem>
                <MenuItem value={'Departure'}>Departure</MenuItem>
            </Select>
        </FormControl>

        <FormControl
            variant="outlined"
            required
            style={{marginLeft: '10%'}}
            className={classes.formControlNoMargin}
        >
            <TextField
                label="Voyage Number:"
                value={data.voyageNumber}
                onChange={(e) => updateData({voyageNumber: e.target.value})}
                variant="outlined"
            />
        </FormControl>

        {/*</Grid>*/}

        <Typography variant="h5" component="h5" gutterBottom style={{marginTop: '20px'}}>
            Port of call
        </Typography>

        {/*Port of call and all time pickers*/}
        <div className={'flex-parent'}>
            <div className={'flex-item-40'}>

                <FormControl
                    variant="outlined"
                    className={classes.formControlNoMargin}
                    margin={"normal"}
                >
                    <InputLabel id="port-of-call-label">Port of call</InputLabel>

                    <Select
                        labelId="port-of-call-label"
                        value={data.portOfCall}
                        onChange={(e) => {
                            updateData({portOfCall: e.target.value})
                        }}
                    >
                        {ListOfPorts.map((port, index) =>
                            <MenuItem value={`${port.code}`}>
                                {`${port.code} - ${port.countryCode} - ${port.name}`}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>

                <TextField
                    style={{marginTop: '15px'}}
                    id="port-facility"
                    label="Port facility at arrival"
                    variant="outlined"
                    margin={"normal"}
                />
            </div>

            <div className={'flex-item-60'}>
                <Grid container justify="space-between">
                    <TextField
                        label="ETA to port of call"
                        type="datetime-local"
                        variant={'outlined'}
                        margin={"normal"}
                        value={null}
                        onChange={(e) =>
                            updateData({ETAPortOfCall: e.target.value})}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }}
                    />
                    <TextField
                        label="ETD to port of call"
                        type="datetime-local"
                        variant={'outlined'}
                        margin={"normal"}
                        value={data.ETDPortOfCall}
                        onChange={(e) =>
                            updateData({ETDPortOfCall: e.target.value})}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>

                <Grid container justify="space-between">
                    <TextField
                        label="ATA to port of call"
                        type="datetime-local"
                        variant={'outlined'}
                        margin={"normal"}
                        value={data.ATAPortOfCall}
                        onChange={(e) =>
                            updateData({ATAPortOfCall: e.target.value})}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        label="ATD to port of call"
                        type="datetime-local"
                        variant={'outlined'}
                        margin={"normal"}
                        value={data.ATDPortOfCall}
                        onChange={(e) =>
                            updateData({ATDPortOfCall: e.target.value})}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
            </div>
        </div>

        {/*Port of arrival / last port of call / next port of call*/}
        <Grid container justify="space-between" style={{marginTop: '30px'}}>

            <FormControl
                variant="outlined"
                required
                className={classes.formControlNoMargin}
            >
                <InputLabel id="port-of-arrival-label">Port of arrival</InputLabel>
                <Select
                    labelId="port-of-arrival-label"
                    value={data.portOfArrival}
                    onChange={(e) => {
                        updateData({portOfArrival: e.target.value})
                    }}
                >
                    <MenuItem value={'port 1'}>Port 1</MenuItem>
                    <MenuItem value={'port 2'}>Port 2</MenuItem>
                    <MenuItem value={'default'}>Port default</MenuItem>
                </Select>
            </FormControl>

            <FormControl
                variant="outlined"
                required
                className={classes.formControlNoMargin}
            >
                <InputLabel id="last-port-call-label">Last port of call</InputLabel>
                <Select
                    labelId="last-port-call-label"
                    value={data.lastPortOfCall}
                    onChange={(e) => {
                        updateData({lastPortOfCall: e.target.value})
                    }}
                >
                    <MenuItem value={'port 1'}>Port 1</MenuItem>
                    <MenuItem value={'port 2'}>Port 2</MenuItem>
                    <MenuItem value={'default'}>Port default</MenuItem>
                </Select>
            </FormControl>


            <FormControl
                variant="outlined"
                // required
                className={classes.formControlNoMargin}
            >
                <InputLabel id="next-port-call-label">Next port of call</InputLabel>
                <Select
                    labelId="next-port-call-label"
                    value={data.nextPortOfCall}
                    onChange={(e) => {
                        updateData({nextPortOfCall: e.target.value})
                    }}
                >
                    <MenuItem value={'port 1'}>Port 1</MenuItem>
                    <MenuItem value={'port 2'}>Port 2</MenuItem>
                    <MenuItem value={'default'}>Port default</MenuItem>
                </Select>
            </FormControl>
        </Grid>

        <FormControl
            variant="outlined"
            required
            className={classes.formControlNoMargin}
            style={{marginTop: "30px"}}
        >
            <InputLabel id="next-port-call-label">Call at anchorage</InputLabel>
            <Select
                labelId="next-port-call-label"
                value={data.nextPortOfCall}
                onChange={(e) => {
                    updateData({nextPortOfCall: e.target.value})
                }}
            >
                <MenuItem value={'port 1'}>Port 1</MenuItem>
                <MenuItem value={'port 2'}>Port 2</MenuItem>
                <MenuItem value={'default'}>Port default</MenuItem>
            </Select>
        </FormControl>

        <Typography variant="h5" component="h5" style={{marginTop: '30px'}} gutterBottom>
            Position at port of call
        </Typography>

        {/*Latitude, longitute and time*/}
        <Grid container justify="space-between" style={{marginTop: '30px'}}>

            <TextField
                label="Latitude"
                value={data.cargoDescription}
                onChange={(e) => updateData({cargoDescription: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Longtitude"
                value={data.cargoDescription}
                onChange={(e) => updateData({cargoDescription: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Time"
                value={data.cargoDescription}
                onChange={(e) => updateData({cargoDescription: e.target.value})}
                variant="outlined"
            />

        </Grid>

        <TextField
            style={{marginTop: '30px'}}
            id="cargo-description"
            label="Brief description of onboard cargo"
            multiline
            fullWidth
            rowsMax={4}
            value={data.cargoDescription}
            onChange={(e) => updateData({cargoDescription: e.target.value})}
            variant="outlined"
        />

        <Typography variant="h5" component="h5" style={{marginTop: '30px'}} gutterBottom>
            Name of master
        </Typography>

        <Grid container justify={'flex-start'}>

            <TextField
                label="Family name"
                value={data.cargoDescription}
                onChange={(e) => updateData({cargoDescription: e.target.value})}
                variant="outlined"
            />

            <TextField
                style={{marginLeft: '10%'}}
                label="Given name"
                value={data.cargoDescription}
                onChange={(e) => updateData({cargoDescription: e.target.value})}
                variant="outlined"
            />

        </Grid>

        <Typography variant="h5" component="h5" style={{marginTop: '30px'}} gutterBottom>
            Purpose of call
        </Typography>
        <div style={{marginTop: "20px"}}>
            {data.purposesOfCall.map((item, index) => <div key={index}>
                <TextField
                    id={`purpose-of-call-${index}`}
                    label={index === 0 ? 'Call purpose' : `Call purpose (${index})`}
                    value={item}
                    onChange={(e) => {
                        let purposeArr = data.purposesOfCall;
                        purposeArr[index] = e.target.value;
                        updateData({purposesOfCall: purposeArr})
                    }}
                    variant="outlined"
                />

                <IconButton
                    style={{
                        marginLeft: '10px',
                        marginBottom: '20px'
                    }}
                    color={'secondary'}
                    aria-label="delete"
                    variant={'outlined'}
                    onClick={() => {
                        if (index === 0 && data.purposesOfCall.length === 1) {
                            updateData({purposesOfCall: ['']})
                        } else {
                            let slicedData = JSON.parse(JSON.stringify(data.purposesOfCall));
                            slicedData.splice(index, 1);
                            updateData({purposesOfCall: slicedData})
                        }
                    }}
                >
                    <DeleteIcon/>
                </IconButton>

            </div>)}

            <Button
                style={{marginTop: '15px'}}
                variant="outlined"
                color="primary"
                disabled={data.purposesOfCall[data.purposesOfCall.length - 1] === ''}
                className={classes.button}
                onClick={() => updateData({purposeOfCall: data.purposesOfCall.push('')})}
                startIcon={<AddIcon/>}
            >
                Add new row
            </Button>

        </div>

        <TextField
            style={{marginTop: '20px'}}
            id="air-draught-field"
            label="Air draught"
            value={data.airDraught}
            onChange={(e) => updateData({airDraught: e.target.value})}
            variant="outlined"
        />


        <Typography variant="h5" component="h5" style={{marginTop: '30px'}} gutterBottom>
            {data.arrivalDeparture} draught
        </Typography>

        <Grid container justify={'space-between'}>
            <TextField id="port-call-field" label="Fore draught" margin={'normal'} variant="outlined"/>
            <TextField id="port-call-field" label="Mid-ship draught" margin={'normal'} variant="outlined"/>
            <TextField id="port-call-field" label="Aft draught" margin={'normal'} variant="outlined"/>
        </Grid>


        <Typography variant="h5" component="h5" style={{marginTop: '30px'}} gutterBottom>
            Name and contact details of ship's agent
        </Typography>

        <Grid container justify={'space-between'}>
            <TextField
                style={{width: 'calc(90% - 220px)'}}
                label="Name"
                multiline
                rowsMax={2}
                value={data.cargoDescription}
                onChange={(e) => updateData({cargoDescription: e.target.value})}
                variant="outlined"
            />

            <TextField label="Mobile telephone" variant="outlined"/>
        </Grid>

        <Grid container justify={'space-between'}>
            <TextField id="port-call-field" label="Business telephone" margin={'normal'} variant="outlined"/>
            <TextField id="port-call-field" label="Telefax" margin={'normal'} variant="outlined"/>
            <TextField id="port-call-field" label="Email" margin={'normal'} variant="outlined"/>
        </Grid>

        <Typography variant="h5" component="h5" style={{marginTop: '30px'}} gutterBottom>
            Number of persons on board
        </Typography>

        <Grid container justify={'space-between'}>
            <TextField label="Number of persons" margin={'normal'} variant="outlined"/>
            <TextField label="Number of crew" margin={'normal'} variant="outlined"/>
            <TextField label="Number of passengers" margin={'normal'} variant="outlined"/>
        </Grid>
        <TextField label="Have any stowaways been found on boards" margin={'normal'} variant="outlined"/> <br/>
        <TextField label="Period of stay" margin={'normal'} variant="outlined"/>
    </>
}

export default PortForm;
