import React from 'react';
import { Redirect } from 'react-router-dom'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';



/**
 * Table with the most recently updates OU's.
 */
export class PatientTable extends React.Component {
    state = {
        ouClicked: null
    };

    /**
     * Redirects to the details page of the OU clicked.
     * @param {String} id OU id
     */
    onClick = id => {
        this.setState({ ouClicked: id });
    }

    render() {

        return (
            <Table>
                <TableHead>
                    <TableRow>
                        {this.props.data.headers.map(header =>(
                            <TableCell>{header.column}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.data.rows.map(row => (
                        <TableRow key={row[0]} hover={true} onClick={() => this.onClick(row[0])} style={{cursor: 'pointer'}}>
                            {row.map(cell => (
                                <TableCell component="th" scope="row">{cell}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }
}
