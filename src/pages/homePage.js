import React from "react";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


export default class HomePage extends React.Component {

    state = {
        rows: [
            {
                id: 1,
                ship: 'Ship 1',
                imo: 9,
                portCall: 11,
                agent: 'Vasya',
                ETA: '11:11:11'
            }, {
                id: 2,
                ship: 'Ship 2',
                imo: 3,
                portCall: 15,
                agent: 'Ivanushka',
                ETA: '66:66:66'
            }
        ]

    }

    render() {

        let {rows} = this.state;

        let {history} = this.props;

        return (
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Ship</TableCell>
                            <TableCell align="right">IMO</TableCell>
                            <TableCell align="right">Port&nbsp;call</TableCell>
                            <TableCell align="right">Agent</TableCell>
                            <TableCell align="right">ETA</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id} onClick={(e) => {
                                history.push(`/details/${row.id}`);
                            }}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.ship}</TableCell>
                                <TableCell align="right">{row.imo}</TableCell>
                                <TableCell align="right">{row.portCall}</TableCell>
                                <TableCell align="right">{row.agent}</TableCell>
                                <TableCell align="right">{row.ETA}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )

    }

}