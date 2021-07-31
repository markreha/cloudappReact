import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import axios from 'axios';

// Weather IoT Data Query Form Component
class Weather extends Component
{
    constructor(props) 
    {
        super(props);

        // Setup default dates
        var fromDate = new Date();
        fromDate.setHours(-fromDate.getTimezoneOffset()/60);
        fromDate.setMinutes(0);
        fromDate.setSeconds(0);
        fromDate.setMilliseconds(0);
        var toDate = new Date(fromDate.getTime()+1000*60*60*24);

        // Set Component State
        this.state = 
        {
            reportType: 0,
            fromDate: fromDate.toISOString().slice(0, -1),
            toDate: toDate.toISOString().slice(0, -1),
            deviceId: 0
        }
    }

    // Form onChange Handler for the Report Type Selection form element
    updateReportType = (event) => 
    {
        this.setState({reportType: event.target.value});
    }

    // Form onChange Handler for the From Date form element
    updateFromDate = (event) => 
    {
        if (isNaN(Date.parse(event.target.value)))
            return;
        var fromDate = new Date(event.target.value).toISOString().replace('T', ' ')
        this.setState({fromDate: fromDate});
    }

    // Form onChange Handler for the From To form element
    updateToDate = (event) => 
    {
        if (isNaN(Date.parse(event.target.value)))
            return;
        var toDate = new Date(event.target.value).toISOString().replace('T', ' ')
        this.setState({toDate: toDate});
    }

    // Form onChange Handler for the From Device Selection form element
    updateDeviceId = (event) => 
    {
        this.setState({deviceId: event.target.value});
    }

    // Form submit handler
    handleFormSubmit = async(event) => 
    {
        // Disable this form from being submitted again
        event.preventDefault();

        // Make REST API call to get the Weather Data
        let url = "https://mark-servicesapp.herokuapp.com/rest/weather/get/" + this.state.deviceId + "/" + this.state.fromDate.replace('T', ' ') + "/" + this.state.toDate.replace('T', ' ');
        const res = await axios.get(url, { auth: {username: 'CHANGEME', password: 'CHANGEME' }});
        if(res.status !== 200)
        {
            // If not 200 response then Display error
            alert('This REST API request failed.');
        }
        else
        {
            // IF 200 response then save the JSON Response Report Data in the Parent
            this.props.setReportData(this.state.reportType, res.data);

            // Navigate to the Report Component
            this.props.history.push('/report');
        }
    }

    // Render the Component: Weather Query Form
    render() 
    {    
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <form noValidate autoComplete="off" onSubmit={this.handleFormSubmit}>
                        <TextField id="reportType" name="reportType" style={{ width: "250px" }} margin="dense" label="Report Type" select value={this.state.reportType} onChange={this.updateReportType} helperText="Please select the Report Type" >
                            <MenuItem value={0}>Table</MenuItem>
                            <MenuItem value={1}>Chart</MenuItem>
                        </TextField> <br/>
                        <TextField id="fromDate" name="fromDate" style={{ width: "250px" }} margin="dense" label="From Date" type="datetime-local" onChange={this.updateFromDate} defaultValue={this.state.fromDate} InputLabelProps={{ shrink: true, }} helperText="Please select the Report Start Date" /> <br/>
                        <TextField id="toDate" name="toDate" style={{ width: "250px" }} margin="dense" label="To Date" type="datetime-local" onChange={this.updateToDate} defaultValue={this.state.toDate} InputLabelProps={{ shrink: true, }} helperText="Please select the Report End Date" /> <br/>
                        <TextField id="deviceId" name="deviceId" style={{ width: "250px" }} margin="dense" label="IoT Device" select value={this.state.deviceId} onChange={this.updateDeviceId} helperText="Please select the IoT Device" > 
                            <MenuItem value={0}>Rasberry Pi</MenuItem>
                            <MenuItem value={1}>Arduino</MenuItem>
                        </TextField> <br/>
                        <Button variant="contained" color="primary" type="submit">Display</Button>
                    </form>
                </Grid>
            </Grid>
        );
    }
}

export default Weather;
