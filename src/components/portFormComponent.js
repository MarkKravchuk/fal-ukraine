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
import {readXML} from '../functions/readXML'
import {readXLSPort} from '../functions/readXLSPort'
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

const defaultDateTime = new Date();
defaultDateTime.setHours(0);
defaultDateTime.setMinutes(0);


 let port = {
    arrivalDeparture: 'Departure',
    voyageNumber:'1',
    portOfCall:{
        name:'name',
        CountryCode:'CountryCode',
        UNLoCode:'UNLoCode',
    },
    portFacilityAtArrival: {
        Facility:'Facility'
    },
    ETAPortOfCall: 'ETAPortOfCall',
    ETDPortOfCall: 'ETDPortOfCall',
    ATAPortOfCall: 'ATAPortOfCall',
    ATDPortOfCall: 'ATDPortOfCall',
    portOfArrival: {
        name:'name',
        CountryCode:'CountryCode',
        UNLoCode:'UNLoCode',
    },
    lastPortOfCall: {
        name:'name',
        CountryCode:'CountryCode',
        UNLoCode:'UNLoCode',
    },
    nextPortOfCall: {
        name:'name',
        CountryCode:'CountryCode',
        UNLoCode:'UNLoCode',
    },
    callAnchorage: 'callAnchorage',
    positionPortOfCall: {
        latitude:'latitude',
        longitude:'longitude',
        time:'time',
    },
    cargoDescription: 'cargoDescription',
    nameMaster: {
        familyName:'familyName',
        givenName:'givenName',
    },
    purposesOfCall: [{
        CallPurposeCode : 'CallPurposeCode',
        CallPurposeText : 'CallPurposeCText',
    },{
        CallPurposeCode : 'CallPurposeCode',
        CallPurposeText : 'CallPurposeCText',
    },{
        CallPurposeCode : 'CallPurposeCode',
        CallPurposeText : 'CallPurposeCText',
    },{
        CallPurposeCode : 'CallPurposeCode',
        CallPurposeText : 'CallPurposeCText',
    },{
        CallPurposeCode : 'CallPurposeCode',
        CallPurposeText : 'CallPurposeCText',
    },{
        CallPurposeCode : '',
        CallPurposeText : '',
    },{
        CallPurposeCode : '',
        CallPurposeText : '',
    },{
        CallPurposeCode : '',
        CallPurposeText : '',
    },{
        CallPurposeCode : '',
        CallPurposeText : '',
    },
    ],
    airDraught: 'airDraught',
    arrivalDepartureDraught:{
        foreDraught:'foreDraught',
        MidShipDraught:'MidShipDraught',
        AftDraught:'AftDraught',
    },
    agent:{
        name:'name',
        mobileTelephone:'mobileTelephone',
        businessTelephone:'businessTelephone',
        telefax:'telefax',
        email:'email',
    },
    personsOnBoard:{
        numberOfPersons:'personsOnBoard',
        numberOfCrew:'numberOfCrew',
        numberOfPassengers:'numberOfPassengers',
    },
    Stowaways:'Stowaways',
    periodOfStay:'periodOfStay'

};
  function getPort() {
    return port;
}

export default function PortForm(props) {

    const classes = useStyles();
    const [data, setData] = React.useState({
        arrivalDeparture: '',
        ETAPortOfCall: defaultDateTime,
        ETDPortOfCall: defaultDateTime,
        ATAPortOfCall: defaultDateTime,
        ATDPortOfCall: defaultDateTime,
        callAnchorage: '',
        positionPortOfCall: '',
        portFacilityArrival: '',
        cargoDescription: '',
        nameMaster: '',
        airDraught: '',
        purposesOfCall: ['']
    });

    let setDataProp = function (dataItem) {
        // deep copy
        let dataCopy = JSON.parse(JSON.stringify(data));

        dataCopy = {...dataCopy, ...dataItem};

        setData(dataCopy);
    }

     // generateXML(port)
    console.log('data: ', data);

    return <>
        <Typography variant="h3" component="h3" gutterBottom>
            Port information
        </Typography>
        <input type="file" name="file" id="file"/>
        <button onClick={readXML} name="submit">Upload File</button>
        <input type="file" name="xls" id="xls"/>
        <button onClick={readXLSPort} name="submit">Upload XLS</button>
        <FormControl
            variant="outlined"
            required
            className={classes.formControl}
        >

            <InputLabel id="departure-arrival-label">Departure / Arrival</InputLabel>
            <Select
                labelId="departure-arrival-label"
                id="arrival-departure"
                value={data.arrivalDeparture}
                onChange={(e) => {
                    setDataProp({arrivalDeparture: e.target.value})
                }}
            >
                <MenuItem value={'Arrival'}>Arrival</MenuItem>
                <MenuItem value={'Departure'}>Departure</MenuItem>
            </Select>
        </FormControl>

        <Typography variant="h5" component="h5" gutterBottom style={{marginTop: '20px'}}>
            Port of call
        </Typography>

        <div className={'flex-parent'}>
            <div className={'flex-item-40'}>
                <TextField id="port-call-field" label="Port of call" margin={'normal'} fullWidth variant="outlined"/>
            </div>
            <div className={'flex-item-60'}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-between">
                        <KeyboardTimePicker
                            margin="normal"
                            id="ETA-port-of-call"
                            label="ETA to port of call"
                            value={data.ETAPortOfCall}
                            onChange={(e) => setDataProp({ETAPortOfCall: e})}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                        <KeyboardTimePicker
                            margin="normal"
                            id="ETD-port-of-call"
                            label="ETD from port of call"
                            value={data.ETDPortOfCall}
                            onChange={(e) => setDataProp({...data, ...{ETDPortOfCall: e}})}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                    </Grid>

                    <Grid container justify="space-between">
                        <KeyboardTimePicker
                            variant={'outlined'}
                            margin="normal"
                            id="ATA-port-of-call"
                            label="ATA to port of call"
                            value={data.ATAPortOfCall}
                            onChange={(e) => setDataProp({...data, ...{ATAPortOfCall: e}})}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />

                        <KeyboardTimePicker
                            margin="normal"
                            id="ATD-port-of-call"
                            label="ATD from port of call"
                            value={data.ATDPortOfCall}
                            onChange={(e) => setDataProp({ATDPortOfCall: e})}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
            </div>
        </div>

        <Grid container justify="space-between" style={{marginTop: '30px'}}>

            <FormControl
                variant="outlined"
                required
                className={classes.formControlNoMargin}
            >
                <InputLabel id="call-anchorage-label">Call at anchorage</InputLabel>
                <Select
                    labelId="call-anchorage-label"
                    id="call-anchorage"
                    value={data.callAnchorage}
                    onChange={(e) => {
                        setDataProp({callAnchorage: e.target.value})
                    }}
                >
                    <MenuItem value={'yes'}>Yes</MenuItem>
                    <MenuItem value={'no'}>No</MenuItem>
                </Select>
            </FormControl>

            <FormControl
                variant="outlined"
                required
                className={classes.formControlNoMargin}
            >
                <TextField id="position-port-of-call" label="Position in port of call"
                           variant="outlined"/>
            </FormControl>
            <TextField id="port-facility" label="Port facility at arrival" variant="outlined"/>

        </Grid>

        <TextField
            style={{marginTop: '30px'}}
            id="cargo-description"
            label="Brief description of onboard cargo"
            multiline
            fullWidth
            rowsMax={4}
            value={data.cargoDescription}
            onChange={(e) => setDataProp({cargoDescription: e.target.value})}
            variant="outlined"
        />

        <div className={'flex-parent'} style={{marginTop: '30px'}}>

            <div className={'flex-item-30'}>

                <TextField
                    id="name-master-field"
                    label="Name of master"
                    value={data.nameMaster}
                    onChange={(e) => setDataProp({nameMaster: e.target.value})}
                    variant="outlined"
                />

                <TextField
                    style={{marginTop: '20px'}}
                    id="air-draught-field"
                    label="Air draught"
                    value={data.airDraught}
                    onChange={(e) => setDataProp({airDraught: e.target.value})}
                    variant="outlined"
                />

            </div>

            <div className={'flex-item-70'}>

                <Grid container justify={'space-around'}>

                    <Typography variant="h6" component="p" style={{marginTop: '5px'}} gutterBottom>
                        Purpose of call:
                    </Typography>

                    <div>
                        {data.purposesOfCall.map((item, index) => <div key={index}>
                            <TextField
                                id={`purpose-of-call-${index}`}
                                label={index === 0 ? 'Call purpose' : `Call purpose (${index})`}
                                value={item}
                                onChange={(e) => {
                                    let purposeArr = data.purposesOfCall;
                                    purposeArr[index] = e.target.value;
                                    setDataProp({purposesOfCall: purposeArr})
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
                                        setDataProp({purposesOfCall: ['']})
                                    } else {
                                        let slicedData = JSON.parse(JSON.stringify(data.purposesOfCall));
                                        slicedData.splice(index, 1);
                                        setDataProp({purposesOfCall: slicedData})
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
                            onClick={() => setDataProp({purposeOfCall: data.purposesOfCall.push('')})}
                            startIcon={<AddIcon/>}
                        >
                            Add new row
                        </Button>

                    </div>

                </Grid>

            </div>
        </div>

        <Grid container justify={'space-between '}>
            <TextField id="port-call-field" label="Fore draught" margin={'normal'} variant="outlined"/>
            <TextField id="port-call-field" label="Mid-ship draught" margin={'normal'} variant="outlined"/>
            <TextField id="port-call-field" label="Aft draught" margin={'normal'}   variant="outlined"/>
        </Grid>

    </>
}
export {getPort}