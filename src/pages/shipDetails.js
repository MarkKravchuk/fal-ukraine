import React, {useState} from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import ShipForm from "../components/shipFormComponent";
import PortForm from "../components/portFormComponent";
import VoyageForm from "../components/voyageFormComponent";
import CrewForm from "../components/crewFormComponent";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {config} from "../config/shipDetailsConfig";
import SendIcon from '@material-ui/icons/Send';
import defaultDataConst from "../config/consts/defaultDataConst";
import listOfOptionsConst from "../config/consts/listOfOptionsConst";

import {makeStyles} from "@material-ui/core/styles";

const listOfOptions = listOfOptionsConst;

const defaultOption = 'Port';

const drawerWidth = config.showDrawerIcons ? 240 : 180;

const useStyles = makeStyles((theme) => ({
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
    uploadFile: {
        display: 'none'
    }
}));

function ShipDetails() {

    const classes = useStyles();
    const [activeItem, setActiveItem] = useState(0);

    const [data, setData] = useState(defaultDataConst);
console.log("All the data!!", data);
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Grid container justify={'space-between'}>
                        <Typography variant="h6">
                            Ship details
                        </Typography>
                        <div>
                            <Grid container justify={'flex-start'}>
                                <div style={{marginRight: '30px'}}>
                                    <input
                                        accept="image/*"
                                        className={classes.uploadFile}
                                        id="contained-button-file"
                                        multiple
                                        type="file"
                                    />
                                    <label htmlFor="contained-button-file">
                                        <Button variant="contained" color="default" component="span">
                                            Upload XML
                                        </Button>
                                    </label>
                                </div>
                                <div style={{marginRight: '30px'}}>
                                    <input
                                        className={classes.uploadFile}
                                        id="contained-button-file"
                                        multiple
                                        type="file"
                                    />
                                    <label htmlFor="contained-button-file">
                                        <Button variant="contained" color="default" component="span">
                                            Upload Excel
                                        </Button>
                                    </label>
                                </div>
                                <div style={{marginTop: '6px'}}>
                                    <IconButton color="secondary" size={'small'} aria-label="upload picture" component="span">
                                        <SendIcon />
                                    </IconButton>
                                </div>
                            </Grid>
                        </div>
                    </Grid>
                </Toolbar>
            </AppBar>

            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar/>
                <div className={classes.drawerContainer}>
                    <List>
                        {listOfOptions.map((item, index) => (
                            <ListItem
                                key={index}
                                button
                                selected={activeItem === index}
                                onClick={() => {
                                    setActiveItem(index)
                                }}>

                                {config.showDrawerIcons && <ListItemIcon><i>icon</i></ListItemIcon>}
                                <ListItemText primary={item.label}/>

                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar/>
                {getChildComponent(activeItem, [data, setData])}
            </main>
        </div>
    )
}

function getChildComponent(activeItem, [data, setData]) {
    let selectedItem = listOfOptions[activeItem].value;

    switch (selectedItem) {
        case 'port':
            //@FIXME make it as a better function
            return <PortForm data={data.port} updateData={(dataItem) => {
                // deep copy
                //@FIXME Fix it without using deep copy
                let dataCopy = JSON.parse(JSON.stringify(data));
                let portCopy = dataCopy.port;
                dataCopy.port = {...portCopy, ...dataItem};

                console.log("<<<>>>The data: ", dataCopy);

                setData(dataCopy);
            }}/>
        case 'ship':
            return <ShipForm/>
        case 'voyage':
            return <VoyageForm/>
        case 'passengers':
        case 'crew':
            return <CrewForm/>
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

export default ShipDetails;