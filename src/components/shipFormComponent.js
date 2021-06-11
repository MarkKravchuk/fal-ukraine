import React from "react";

import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
});

class ShipForm extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Standard"/>
                <TextField id="standard-basic" label="Standard"/>
                <TextField id="standard-basic" label="Standard"/>
                <TextField id="filled-basic" label="Filled" variant="filled"/>
                <TextField id="outlined-basic" label="Outlined" variant="outlined"/>
            </form>
        )
    }

}


export default withStyles(styles)(ShipForm);