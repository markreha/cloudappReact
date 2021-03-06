import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, List, ListItem, withStyles, Grid, SwipeableDrawer } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const styleSheet = 
{
  list : 
  {
    width : 200,
  },
  padding : 
  {
    paddingRight : 30,
    cursor : "pointer",
  },

  sideBarIcon : 
  {
    padding : 0,
    color : "white",
    cursor : "pointer",
  },

  logoIcon :
  {
    paddingTop: 5,
    paddingRight: 5,
  }
}

class NavBar extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {drawerActivate:false, drawer:false};
    this.createDrawer = this.createDrawer.bind(this);
    this.destroyDrawer = this.destroyDrawer.bind(this);
  }

  componentWillMount()
  {
    if(window.innerWidth <= 600)
    {
      this.setState({drawerActivate:true});
    }

    window.addEventListener('resize',()=>
    {
      if(window.innerWidth <= 600)
      {
        this.setState({drawerActivate:true});
      }
      else
      {
        this.setState({drawerActivate:false})
      }
    });
  }

  //Small Screens
  createDrawer()
  {
    const {classes} = this.props
    return (
      <div>
        <AppBar position="sticky">
          <Toolbar>
            <Grid container direction = "row" justify = "space-between" alignItems="center">
              <MenuIcon
                className = {this.props.classes.sideBarIcon}
                onClick={()=>{this.setState({drawer:true})}} />

              <div class="logo-img"><img src="/assets/images/logo-sm.jpg" height="45px" className = {classes.logoIcon} alt="logo"/></div>
              <Typography color="inherit" variant = "h5">The Cloud Workshop</Typography>
              <Typography color="inherit" variant = "h5"></Typography>
            </Grid>
          </Toolbar>
        </AppBar>

        <SwipeableDrawer
         open={this.state.drawer}
         onClose={()=>{this.setState({drawer:false})}}
         onOpen={()=>{this.setState({drawer:true})}}>

           <div
             tabIndex={0}
             role="button"
             onClick={()=>{this.setState({drawer:false})}}
             onKeyDown={()=>{this.setState({drawer:false})}}>

            <List className = {this.props.classes.list}>
               <ListItem key = {1} button divider {...{ onClick: () => window.open('/', '_self') }}> Home </ListItem>
               <ListItem key = {2} button divider {...{ onClick: () => window.open('https://github.com/markreha/cloudworkshop/tree/master/sdk', '_blank').focus() }}> SDK </ListItem>
               <ListItem key = {3} button divider {...{ onClick: () => window.open('https://github.com/markreha', '_blank').focus() }}> GitHub </ListItem>
               <ListItem key = {3} button divider {...{ onClick: () => alert('IoT Reporting Application\nVersion: 1.00') }}> About </ListItem>
             </List>

         </div>
       </SwipeableDrawer>

      </div>
    );
  }

  //Larger Screens
  destroyDrawer()
  {
    const {classes} = this.props
    return (
      <AppBar position="sticky">
        <Toolbar>
          <div class="logo-img"><img src="/assets/images/logo-sm.jpg" height="45px" className = {classes.logoIcon} alt="logo"/></div>
          <Typography variant = "button" style={{flexGrow:1}} color="inherit">The Cloud Workshop</Typography>
          <Typography variant = "button" className = {classes.padding} color="inherit" {...{ onClick: () => window.open('/', '_self') }}>Home</Typography>
          <Typography variant = "button" className = {classes.padding} color="inherit" {...{ onClick: () => window.open('https://github.com/markreha/cloudworkshop/tree/master/sdk', '_blank').focus() }}>SDK</Typography>
          <Typography variant = "button" className = {classes.padding} color="inherit" {...{ onClick: () => window.open('https://github.com/markreha', '_blank').focus() }}>GitHub</Typography>
          <Typography variant = "button" className = {classes.padding} color="inherit" {...{ onClick: () => alert('IoT Reporting Application\nVersion: 1.00') }}>About</Typography>
        </Toolbar>
      </AppBar>
    )
  }

  render()
  {
    return(
      <div>
        {this.state.drawerActivate ? this.createDrawer() : this.destroyDrawer()}
      </div>
    );
  }
}

NavBar.propTypes = 
{
  classes : PropTypes.object.isRequired
};

export default withStyles(styleSheet)(NavBar);