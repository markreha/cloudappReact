import React from 'react';
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import './App.css';
import NavBar from './components/NavBar';
import Weather from './components/Weather';
import DisplayReport from './components/DisplayReport';
import DisplayChart from './components/DisplayChart';

const history = createBrowserHistory();

// Main Application Component
class App extends React.Component 
{
  // State kept in this Parent Component
  state = { reportType: 0, reportData: [ ] };

  // Callback to save the Report Type and Report Data from a Child Component to this Parent Component
  setReportData = (reportType, data) =>
  {
    this.setState({reportType: reportType});
    this.setState({reportData: data});
  }

  // Handle navigation to the Weather Component
  handleWeatherClick = (event) => 
  {
    history.push('/weather/');
  }

  // Handle navigation to the Report Components
  handleReportClick = (event) => 
  {
    history.push('/report/');
  }

  // Render the Component: Main Application NavBar, Icon, and IoT Measures selection with the Routes to all the Components
  render() 
  {
    return (
        <div>
          <NavBar />
          <div>
            <Grid container spacing={3}>
              <Grid item xs={12} align="center">
                <Typography variant = "h5" color="inherit">IoT Measures</Typography>
                <Button href="#" color="primary" onClick={this.handleWeatherClick}>Weather</Button>
              </Grid>
            </Grid>
          </div>
          <Router history={history}>
            <Route exact path="/weather" render = { () => <Weather history={history} setReportData={this.setReportData} /> } />
          </Router>
          <Router history={history}>
              <Route exact path="/report" render = { () => this.state.reportType === 0 ? <DisplayReport history={history} reportData={this.state.reportData} /> : <DisplayChart history={history} reportData={this.state.reportData} /> } />
          </Router>
        </div>
    );
  }
}

export default App;
