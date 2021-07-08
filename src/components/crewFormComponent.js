import React from "react";
import ReactDataGrid from 'react-data-grid';
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Editors, Formatters } from 'react-data-grid-addons';
import dateOfBirthPicker from "./dateOfBirthPicker";
import expiryDatePicker from "./expiryDatePicker";
import issuingDatePicker from "./issuingDatePicker";
import countryCodes from "../functions/countryCodes";
import readXLSCrew from "../functions/readXLSCrew";
import {generateXML} from "../functions/generateXML";
import {readXML} from "../functions/readXML";
let data = require("../data/data");
const editJsonFile = require("edit-json-file");
let file = editJsonFile("src/data/dafta.json");
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
    { key: "Family_name", name: "Family name", editable: true, width: 120 },
    { key: "Given_name", name: "Given name", editable: true, width: 120 },
    { key: "Gender", name: "Gender", editable: true, width: 80, editor: GendersEditor },
    { key: "Rank_of_rating", name: "Rank of rating", editable: true, editor:RanksOfRatingEditor, width: 120},
    { key: "Nationality", name: "Nationality", editable: true, editor:CountryCodesEditor, width: 100 },
    { key: "Country_of_birth", name: "Country of birth", editable: true, editor:CountryCodesEditor, width: 120 },
    { key: "Place_of_birth", name: "Place of birth", editable: true, width: 120 },
    { key: "date_of_birth", name: "Date of birth", editable: true, editor:dateOfBirthPicker, width: 120 },
    { key: "ID_type", name: "ID type", editable: true, width: 80, editor: IDTypesEditor},
    { key: "ID_document_number", name: "ID document number", editable: true, width: 150 },
    { key: "Issuing_state_of_identity_document", name: "Issuing state of identity document", editable: true, editor: issuingDatePicker, width: 250},
    { key: "Expiry_date_of_identity_document", name: "Expiry date of identity document", editable: true, editor: expiryDatePicker, width: 250},
    { key: "Visa_Residence_permit_number", name: "Visa/Residence permit number", editable: true, width: 250 },
];

// const rows = [
//     { NR: 1, },
//     { NR: 2 },
//     { NR: 3 },
//     { NR: 4 },
//     { NR: 5 },
// ];

let rows = data.crew.rows;

class CrewForm extends React.Component{
    state =  {rows:data.crew.rows} ;
    addRow =()=>  {
         console.log("adding row");
        let number = data.crew.rows.length+1
        let row = {NR:number}
        data.crew.rows.push(row)
        this.setState(rows = data.crew.rows)
    }


    handleFileInput=async()=>{


            let rows = readXLSCrew.readXLS().crew;
            //very dirty
            await new Promise(r => setTimeout(r, 100));
                 this.setState(state=>{
                    return {rows:rows}
                })


    }
    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        this.setState(state => {
            const rows = state.rows.slice();
            for (let i = fromRow; i <= toRow; i++) {
                rows[i] = { ...rows[i], ...updated };
            }
            data.crew.rows=rows;
            return { rows:rows };
        });
    };
    readXML=async()=>{
        readXML();
        await new Promise(r => setTimeout(r, 100));
        this.setState(state=>{
            return {rows:data.crew.rows}
        })
        // this.setState(rows = data.crew.rows)
    }

    render() {
        console.log("rows ", this.state.rows);
        return (
            <div><Typography variant="h3" component="h3" gutterBottom>
                Crew list
            </Typography>
                {/*<label htmlFor="file">Upload xls</label>*/}
                {/*<input type="file" name="xlsCrew" id="xlsCrew" onChange={console.log("file submited")}/>*/}
                <Button onClick={generateXML} name="generateXML">Generate XML</Button>
                <div className="file-uploader">
                    <input type="file" id="xlsCrew" onChange={this.handleFileInput}/>
                </div>
                <input type="file" name="file" id="file"/>
                <button onClick={this.readXML} name="submit">Upload File</button>
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