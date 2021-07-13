import React from "react";
import ReactDataGrid from 'react-data-grid';
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Editors} from 'react-data-grid-addons';
import dateOfBirthPicker from "../pickers/dateOfBirthPicker";
import expiryDatePicker from "../pickers/expiryDatePicker";
import issuingDatePicker from "../pickers/issuingDatePicker";
import countryCodes from "../../functions/countryCodes";
import ListOfPorts from '../../config/consts/listOfPortsConst'
const {DropDownEditor} = Editors;

const styles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
});

const genders = ["(...)", 'Male', 'Female']
const GendersEditor = <DropDownEditor options={genders}/>;

const idTypes = ["(...)", 'Musterbook', 'Passport', 'Residential permit', 'Picture id', 'Others']
const IDTypesEditor = <DropDownEditor options={idTypes}/>;

const RanksOfRating = ["(...)", 'AbleSeaman', 'Agent', 'AsstFoodBevMngr', 'BarManager', 'BarService', 'Bosun', 'Cadet', 'Captain', 'CargoTechnician', 'CasinoStaff', 'ChiefCook', 'ChiefElectrician', 'ChiefHousekeeper', 'ChiefEngineer', 'ChiefMaster', 'ChiefMate', 'ChiefOfficer', 'ChiefPurser', 'ChiefSteward', 'ClassSurveyor', 'CSO', 'Cook', 'CraneOperator', 'CrewMember', 'CruiseDirector', 'CruiseStaff', 'DeckApprentice', 'DeckFitter', 'DeckOfficer', 'Deckhand', 'Doctor', 'Donkeyman', 'ElectricalEngineer', 'ElectricalOfficer', 'Electrician', 'EngineerCadet', 'EngineeringCrew', 'EngineFitter', 'Entertainment', 'FacilitiesCrew', 'FacilitiesManager', 'FirstAsstEngineer', 'FirstEngineer', 'FirstMate', 'FirstOfficer', 'Fitter', 'FourthOfficer', 'FoodBevMngr', 'FoodService', 'FourthAsstEngineer', 'Greaser', 'Hospitality', 'HotelDirector', 'HotelStaff', 'HousekeepingStaff', 'InformationTechnology', 'JuniorEngineer', 'LaundryMaster', 'Lifeboatman', 'Maitred', 'MarineCrew', 'MarketingRevenueMngr', 'Master', 'MasterFirstClassPilot', 'MateFirstClassPilot', 'Mechanic', 'MedicalStaff', 'Messman', 'Motorman', 'Oiler', 'Operator', 'OrdinarySeaman', 'Owner', 'Painter', 'Porter', 'Provision', 'ProvisionMaster', 'Pumpman', 'QMED', 'RadioOfficer', 'Reeferman', 'Repairman', 'RiddingCrew', 'SafetyAndSecurity', 'SecondAsstEngineer', 'SecondMate', 'SecondOfficer', 'SSO', 'StaffCaptain', 'Steward', 'Superintendent', 'Tankerman', 'ThirdAsstEngineer', 'ThirdMate', 'ThirdOfficer', 'ThirdParty', 'TruckMechanic', 'Tunnelman', 'UtilityPerson', 'VettingInspector', 'Welder', 'Wiper', 'YardPersonnel', 'Other']
const RanksOfRatingEditor = <DropDownEditor options={RanksOfRating}/>;

const countryCodesList = countryCodes.getCountriesWithCodes();
countryCodesList.unshift("(...)")
const CountryCodesEditor = <DropDownEditor options={countryCodesList}/>;

const yesNo = ["(...)", 'yes', 'no']
const TransitEditor = <DropDownEditor options={yesNo}/>;

const ports = ["(...)"];
ListOfPorts.map((port, index) =>
        ports.push( port.code + ' - ' + port.countryCode + ' - ' + port.name)
    );
const PortEditor = <DropDownEditor options={ports}/>;


const columns = [
    {key: "NR", name: "NR", editable: true, width: 50},
    {key: "Family_name", name: "Family name", editable: true, width: 120},
    {key: "Given_name", name: "Given name", editable: true, width: 120},
    {key: "Gender", name: "Gender", editable: true, width: 80, editor: GendersEditor},
    {key: "Rank_of_rating", name: "Rank of rating", editable: true, editor: RanksOfRatingEditor, width: 120},
    {key: "Nationality", name: "Nationality", editable: true, editor: CountryCodesEditor, width: 100},
    {key: "Country_of_birth", name: "Country of birth", editable: true, editor: CountryCodesEditor, width: 120},
    {key: "Place_of_birth", name: "Place of birth", editable: true, width: 120},
    {key: "date_of_birth", name: "Date of birth", editable: true, editor: dateOfBirthPicker, width: 120},
    {key: "ID_type", name: "ID type", editable: true, width: 80, editor: IDTypesEditor},
    {key: "ID_document_number", name: "ID document number", editable: true, width: 150},
    {
        key: "Issuing_state_of_identity_document",
        name: "Issuing state of identity document",
        editable: true,
        editor: issuingDatePicker,
        width: 250
    },
    {
        key: "Expiry_date_of_identity_document",
        name: "Expiry date of identity document",
        editable: true,
        editor: expiryDatePicker,
        width: 250
    },
    {key: "Port_of_embarkation", name: "Port of embarkation", editable: true, width: 150,editor:PortEditor},
    {key: "Port_of_disembarkation", name: "Port of disembarkation", editable: true, width: 170,editor:PortEditor},
    {key: "Transit", name: "Transit", editable: true, width: 80, editor:TransitEditor},
    {key: "Visa_Residence_permit_number", name: "Visa/Residence permit number", editable: true, width: 250},
];

function PassengersForm({data, updateData}) {
    function addRow() {
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
                Passenger list
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
    );

}


export default withStyles(styles)(PassengersForm);