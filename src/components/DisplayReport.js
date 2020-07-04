import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Display Weather Line Chart Component
class DisplayReport extends Component
{   
    // Button Click Handler to navigate back to the Weather Component
    handleReportClick = (event) => 
    {
         this.props.history.push('/weather');
    }

    // Render the Component: Line Chart
    render() 
    {    
        if(this.props.reportData.data === undefined)
        {
            return (
                <Grid container spacing={3}>
                    <Grid item xs={12} align="center">                
                        <Typography variant = "h6" style={{color: "red"}}>Invalid Report Data</Typography>
                    </Grid>
                </Grid>
            );
        }
        else
        {
            return (
                <Grid container spacing={3}>
                    <Grid item xs={12} align="center">
                    <div style={{width:"75%"}}>               
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell width="20%" align="center">Temperature</TableCell>
                                    <TableCell width="20%" align="center">Pressure</TableCell>
                                    <TableCell width="20%" align="center">Humidity</TableCell>
                                    <TableCell width="40%" align="center">Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.props.reportData.data.map(row => (
                                <TableRow key={row.deviceId}>
                                    <TableCell align="center">{row.temperature}</TableCell>
                                    <TableCell align="center">{row.pressure}</TableCell>
                                    <TableCell align="center">{row.humidity}</TableCell>
                                    <TableCell align="center">{new Date(row.date.replace(' ', 'T')).toDateString() + " " + new Date(row.date.replace(' ', 'T')).toLocaleTimeString()}</TableCell>
                                </TableRow>
                            ))}   
                            </TableBody>
                        </Table>
                        </div>                
                    </Grid> 
                </Grid>
            );
        }
    }
}   
    
export default DisplayReport;