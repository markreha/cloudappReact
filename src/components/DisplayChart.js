import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chart from "react-google-charts";

const options = 
{
    title: "Weather IoT Data",
    curveType: "function",
    legend: { position: "bottom" }
};

// Display Weather Data Table Component
class DisplayChart extends Component
{
    // Initialize the component
    componentWillMount()
    {
        // Setup the Chart Data from the JSON based Props Data
        const chartData = [['Date', 'Temperatue', 'Humidity', 'Pressure']]
        for (let i = 0;i < this.props.reportData.data.length;++i) 
        {
            chartData.push([new Date(this.props.reportData.data[i].date.replace(' ', 'T')), this.props.reportData.data[i].temperature, this.props.reportData.data[i].humidity, this.props.reportData.data[i].pressure])
        }
        this.setState({dataLoadingStatus: 'ready', chartData: chartData,})
    }

    // Button Click Handler to navigate back to the Weather Component
    handleReportClick = (event) => 
    {
         this.props.history.push('/weather');
    }

    // Render the Component: Data Table Grid
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
                        <Chart
                            chartType="LineChart"
                            width="100%"
                            height="400px"
                            data={this.state.chartData}
                            options={options}
                        />
                   </Grid> 
                </Grid>
            );
        }
    }
}   
    
export default DisplayChart;