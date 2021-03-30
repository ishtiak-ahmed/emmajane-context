import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContenxt } from '../../../App';

const PrivateRoute = ({ children, ...rest }) => {
    console.log(children)
    const [loggedinUser] = useContext(UserContenxt)
    console.log('private route ', loggedinUser)
    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedinUser.email ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;

