import React from 'react';
// import { Link } from 'react-router-dom'
import { ButtonLink } from '../../community-connect-ui/common';

const NotFoundPage = () => (
    <>
        <h2>Error 404</h2>
        <h4>Page Not Found</h4>
        <p>
            The resource you are trying to access could not be found. 
            Navigate back to the Home Page and try again.
        </p>
        {/* <Button tag={Link} to="/">Go Home</Button> */}
        <ButtonLink href="/">Go Home</ButtonLink>
    </>
)

export default NotFoundPage;
