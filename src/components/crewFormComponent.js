import React from "react";
import ReactDataGrid from 'react-data-grid';
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Editors, Formatters } from 'react-data-grid-addons';
import dateOfBirthPicker from "./dateOfBirthPicker";
import expiryDatePicker from "./expiryDatePicker";
import countryCodes from "../functions/countryCodes";
import readXLSCrew from "../functions/readXLSCrew";
const { DropDownEditor } = Editors;
const { DropDownFormatter } = Formatters;

const styles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
});

const genders = ["(...)",'Male','Female']
const GendersEditor = <DropDownEditor options={genders}  />;

const idTypes = ["(...)",'Musterbook','Passport','Residential permit', 'Picture id','Others']
const IDTypesEditor = <DropDownEditor options={idTypes}  />;

const RanksOfRating = ["(...)", 'AbleSeaman', 'Agent', 'AsstFoodBevMngr', 'BarManager', 'BarService', 'Bosun', 'Cadet', 'Captain', 'CargoTechnician', 'CasinoStaff', 'ChiefCook', 'ChiefElectrician', 'ChiefHousekeeper', 'ChiefEngineer', 'ChiefMaster', 'ChiefMate', 'ChiefOfficer', 'ChiefPurser', 'ChiefSteward', 'ClassSurveyor', 'CSO', 'Cook', 'CraneOperator', 'CrewMember', 'CruiseDirector', 'CruiseStaff', 'DeckApprentice', 'DeckFitter', 'DeckOfficer', 'Deckhand', 'Doctor', 'Donkeyman', 'ElectricalEngineer', 'ElectricalOfficer', 'Electrician', 'EngineerCadet', 'EngineeringCrew', 'EngineFitter', 'Entertainment', 'FacilitiesCrew', 'FacilitiesManager', 'FirstAsstEngineer', 'FirstEngineer', 'FirstMate', 'FirstOfficer', 'Fitter', 'FourthOfficer', 'FoodBevMngr', 'FoodService', 'FourthAsstEngineer', 'Greaser', 'Hospitality', 'HotelDirector', 'HotelStaff', 'HousekeepingStaff', 'InformationTechnology', 'JuniorEngineer', 'LaundryMaster', 'Lifeboatman', 'Maitred', 'MarineCrew', 'MarketingRevenueMngr', 'Master', 'MasterFirstClassPilot', 'MateFirstClassPilot', 'Mechanic', 'MedicalStaff', 'Messman', 'Motorman', 'Oiler', 'Operator', 'OrdinarySeaman', 'Owner', 'Painter', 'Porter', 'Provision', 'ProvisionMaster', 'Pumpman', 'QMED', 'RadioOfficer', 'Reeferman', 'Repairman', 'RiddingCrew', 'SafetyAndSecurity', 'SecondAsstEngineer', 'SecondMate', 'SecondOfficer', 'SSO', 'StaffCaptain', 'Steward', 'Superintendent', 'Tankerman', 'ThirdAsstEngineer', 'ThirdMate', 'ThirdOfficer', 'ThirdParty', 'TruckMechanic', 'Tunnelman', 'UtilityPerson', 'VettingInspector', 'Welder', 'Wiper', 'YardPersonnel', 'Other']
const RanksOfRatingEditor = <DropDownEditor options={RanksOfRating}  />;

const countryCodesList = countryCodes.getCountryCodes();
countryCodesList.unshift("(...)")
const CountryCodesEditor = <DropDownEditor options={countryCodesList}/>;


const columns = [
    { key: "NR", name: "NR", editable: true, width: 50},
    { key: "Family name", name: "Family name", editable: true },
    { key: "Given name", name: "Given name", editable: true },
    { key: "Gender", name: "Gender", editable: true, width: 80, editor: GendersEditor },
    { key: "Rank of rating", name: "Rank of rating", editable: true, editor:RanksOfRatingEditor },
    { key: "Nationality", name: "Nationality", editable: true, editor:CountryCodesEditor },
    { key: "Country of birth", name: "Country of birth", editable: true, editor:CountryCodesEditor },
    { key: "Place of birth", name: "Place of birth", editable: true },
    { key: "date_of_birth", name: "Date of birth", editable: true, editor:dateOfBirthPicker },
    { key: "ID type", name: "ID type", editable: true, width: 80, editor: IDTypesEditor},
    { key: "ID document number", name: "ID document number", editable: true },
    { key: "Issuing state of identity document", name: "Issuing state of identity document", editable: true },
    { key: "Expiry_date_of_identity_document", name: "Expiry date of identity document", editable: true, editor: expiryDatePicker},
    { key: "Visa/Residence permit number", name: "Visa/Residence permit number", editable: true },
];

const rows = [
    { NR: 1, },
    { NR: 2 },
    { NR: 3 },
    { NR: 4 },
    { NR: 5 },
];




class CrewForm extends React.Component{
    state = { rows };
    addRow =()=>  {
         console.log("adding row")
        this.setState(state=>{
            let rows = state.rows;
            console.log("setting state ", rows)
            let number = state.rows.length+1
            console.log("nr ", number)
            let row = {NR:number}
            rows.push(row)
            console.log("rows set ", rows)
            return {rows}
        })
    }

    handleFileInput=()=>{
        console.log("Handle upload");

        this.setState(state=>{
            let rows = readXLSCrew.readXLS().crew;
            return {rows}
        })
    }
    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        this.setState(state => {
            const rows = state.rows.slice();
            for (let i = fromRow; i <= toRow; i++) {
                rows[i] = { ...rows[i], ...updated };
            }
            return { rows };
        });
    };
    render() {
        console.log("rows ", this.state.rows);
        return (
            <div><Typography variant="h3" component="h3" gutterBottom>
                Crew list
            </Typography>
                {/*<label htmlFor="file">Upload xls</label>*/}
                {/*<input type="file" name="xlsCrew" id="xlsCrew" onChange={console.log("file submited")}/>*/}
                {/*<Button onClick={this.setState(readXLSCrew)} name="submit">Upload XLS</Button>*/}
                <div className="file-uploader">
                    <input type="file" id="xlsCrew" onChange={this.handleFileInput}/>
                </div>
                <ReactDataGrid
                    columns={columns}
                    rowGetter={i => this.state.rows[i]}
                    rowsCount={this.state.rows.length}
                    onGridRowsUpdated={this.onGridRowsUpdated}
                    enableCellSelect={true}
                />
                <Button variant="primary" onClick={this.addRow}>Add row</Button>
            </div>

        );
    }







}


export default withStyles(styles)(CrewForm);