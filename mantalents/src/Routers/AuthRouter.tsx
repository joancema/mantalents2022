import {  Switch, Redirect } from 'react-router-dom'
import { LoginPage } from '../pages/loginPage';
import { AppRouter } from './AppRouter';
import {
    BrowserRouter as Router,
  } from 'react-router-dom';
import { RegisterPage } from '../pages/registerPage';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

export const AuthRouter=()=>{
    const { auth, verificaToken } = useContext( AuthContext );


    useEffect( () => {
        verificaToken();
    },[verificaToken])

    
    return (
        <Router>
            <Switch>
                <PrivateRoute isAuthenticated={auth.logged }  path="/app" component={AppRouter }/ >
                <PublicRoute isAuthenticated={auth.logged} exact path="/auth/login" component={LoginPage }/>
                <PublicRoute isAuthenticated={auth.logged} exact path="/auth/register" component={RegisterPage }/>
                <Redirect to ="/auth/login"/>
            </Switch>
        </Router>
    )
}