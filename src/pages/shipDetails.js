import React from "react";
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ShipForm from "../components/shipFormComponent";
import PortForm from "../components/portFormComponent";
import VoyageForm from "../components/voyageFormComponent";
import CrewForm from "../components/crewFormComponent";

import {config} from "../config/shipDetailsConfig";
import {readXML} from "./functions/readXML";

const listOfOptions = [
    {
        label: 'Port',
        value: 'port'
    }, {
        label: 'Ship',
        value: 'ship'
    }, {
        label: 'Crew',
        value: 'crew'
    }, {
        label: 'Passengers',
        value: 'passengers'
    }, {
        label: 'Voyage',
        value: 'voyage'
    }, {
        label: 'Ship stores',
        value: 'ship_stores'
    }, {
        label: 'Crew effects',
        value: 'crew_effects'
    }, {
        label: 'Cargo',
        value: 'cargo'
    }, {
        label: 'Health',
        value: 'health'
    }, {
        label: 'Dangerous goods',
        value: 'dangerous_goods'
    }, {
        label: 'Security',
        value: 'security'
    }, {
        label: 'Waste',
        value: 'waste'
    }
];

const defaultOption = 'Port';

const drawerWidth = config.showDrawerIcons ? 240 : 180;

const styles = (theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
});

class ShipDetails extends React.Component {

    state = {
        activeItem: listOfOptions.indexOf(listOfOptions.find( (a) => a.label === defaultOption))
    }

    render() {
        const { classes } = this.props;
        let { activeItem } = this.state;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Ship details
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <Toolbar />
                    <div className={classes.drawerContainer}>
                        <List>
                            {listOfOptions.map((item, index) => (
                                <ListItem
                                    key={index}
                                    button
                                    selected={activeItem === index}
                                    onClick={() => {
                                        this.setActiveItem(index)
                                    }}>

                                    {config.showDrawerIcons && <ListItemIcon><i>icon</i></ListItemIcon>}
                                    <ListItemText primary={item.label} />

                                </ListItem>
                            ))}
                        </List>
                    </div>
                </Drawer>
                <main className={classes.content}>
                    <Toolbar />
                    {this.getChildComponent()}
                </main>
            </div>
        )
    }

    getChildComponent() {
        let { activeItem } = this.state;

        let selectedItem = listOfOptions[activeItem].value;

        switch (selectedItem) {
            case 'port': return <PortForm/>
            case 'ship': return <ShipForm/>
            case 'voyage': return <VoyageForm/>
            case 'passengers':
            case 'crew': return <CrewForm/>
            case 'ship_stores':
            case 'crew_effects':
            case 'cargo':
            case 'health':
            case 'dangerous_goods':
            case 'security':
            case 'waste':
            default:
                return <h1>Not supported yet</h1>
        }
    }

    setActiveItem(id) {
        this.setState({activeItem: id});
    }

}

export default  withStyles(styles)(ShipDetails);