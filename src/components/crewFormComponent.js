import React from "react";
import ReactDataGrid from 'react-data-grid';
import ReactDOM from "react-dom"
import {withStyles} from '@material-ui/core/styles';

const styles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
});

const columns = [
    { key: "NR", name: "NR", editable: true },
    { key: "Family name", name: "Family name", editable: true },
    { key: "Given name", name: "Given name", editable: true },
    { key: "Rank of rating", name: "Rank of rating", editable: true },
    { key: "Nationality", name: "Nationality", editable: true },
    { key: "Country of birth", name: "Country of birth", editable: true },
    { key: "Place of birth", name: "Place of birth", editable: true },
    { key: "Date of birth", name: "Date of birth", editable: true },
    { key: "ID type", name: "ID type", editable: true },
    { key: "ID document number", name: "ID document number", editable: true },
    { key: "Issuing state of identity document", name: "Issuing state of identity document", editable: true },
    { key: "Expiry date of identity document", name: "Expiry date of identity document", editable: true },
    { key: "Visa/Residence permit number", name: "Visa/Residence permit number", editable: true },
];

const rows = [
    { NR: 1 },
    { NR: 2 },
    { NR: 3 },
    { NR: 4 },
    { NR: 5 },
];

class CrewForm extends React.Component{

    state = { rows };

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
        return (
            <ReactDataGrid
                columns={columns}
                rowGetter={i => this.state.rows[i]}
                rowsCount={12}
                onGridRowsUpdated={this.onGridRowsUpdated}
                enableCellSelect={true}
            />
        );
    }


    // const [gridState, setGridState] = React.useState(rows);
    //
    // return (
    //     <ReactDataGrid
    //         columns={columns}
    //         rows={gridState}
    //         rowGetter={i => gridState[i]}
    //         rowsCount={3}
    //     />
    // );




}

const rootElement = document.getElementById("root");
ReactDOM.render(<CrewForm />, rootElement);
export default withStyles(styles)(CrewForm);