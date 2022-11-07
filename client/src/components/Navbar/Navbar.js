import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button, Box } from '@material-ui/core';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import BusinessIcon from '@material-ui/icons/Business';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import memoriesLogo from '../../images/memoriesLogo.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';

const drawerWidth = 240;
const navItems = [{id:1, nav:'Accueil', ic:<HomeWorkIcon/>, path:'/post' },{id:2, nav:'Procédures',ic:<SupervisorAccountIcon/>, path:'/project'  }, {id:3, nav:'Traitements',ic:<BusinessIcon/>, path:'/post'  }];

const Navbar = (props) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();




  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="transparent">
      <Link className={classes.brandContainer} sx={{ color: '#FF6600' }}>
     <div><SortByAlphaIcon/></div> 
      </Link>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {navItems.map((navItem) => (
                  <Button className={classes.box}  key={navItem.id} sx={{ color: '#FF6600' }}>
                 <p>{navItem.ic}  {navItem.nav}</p>  
                  </Button>
                ))}
              </Box>
      <Toolbar className={classes.toolbar}>

        {user?.result ? (<>
              
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name.substring(0, 10)}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Déconnexion</Button>
          </div>
          </>
        ) : (
          <Button component={Link} to="/auth" variant="contained" className={classes.orange} >Connexion</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
