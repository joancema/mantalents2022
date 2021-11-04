import { Redirect, Route, RouteProps } from 'react-router-dom'

interface PublicRouteProps extends RouteProps {
    isAuthenticated: boolean;
    component: any;
}


export const PublicRoute = (props: PublicRouteProps) => {
    const { component: Component, isAuthenticated, ...rest } = props;
    return (
        <Route { ...rest }
            render={ (props) => (
                ( !isAuthenticated )
                    ? <Component { ...props } />
                    : <Redirect to="/app" />
            )} 
        />
    )
}



