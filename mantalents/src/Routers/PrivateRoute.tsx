import { Redirect, Route, RouteProps } from 'react-router-dom'

interface PrivateRouteProps extends RouteProps {
    isAuthenticated: boolean;
    component: any;
}


export const PrivateRoute = (props: PrivateRouteProps) => {
    const { component: Component, isAuthenticated, ...rest } = props;
    return (
        <Route { ...rest }
            render={ (props) => (
                ( isAuthenticated )
                    ? <Component { ...props } />
                    : <Redirect to="/auth" />
            )} 
        />
    )
}



