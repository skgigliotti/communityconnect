import React from 'react';
import styled from "@emotion/styled";
import qs from 'qs-lite';
import { Link, Route } from "react-router-dom";
import shareIcon from '../../share-symbol.svg';
import SavedResources from './SavedResourcesContainer';
import { Button, Card } from "../../community-connect-ui/Common";

/*
const ToHomeButton = () => {
    return (
        <Button tag={Link} to="/" type="Map">To Home</Button>
    )
}*/

//Commenting this part for now
//Duplicate functionality || Gives the same result as toShareButton function
/*
const ToMapButton = () => {
    return (
        <Button tag={Link} to="/" type="Map">To Map</Button>
    )
}*/

const ToShareButton = () => {
    const query = qs.parse(window.location.search.replace('?', ''));
    let resources = [];
    let tempUrl = "";
    if (query.resources) {
        resources = query.resources.split(',');
        tempUrl = `/?resources=${resources.join(',')}`
    }

    return (
        <Button
            tag={Link} type="Map" to={tempUrl} target="_blank">
            <img src={shareIcon} alt="" />
        </Button>
    )
}

const SavedResourcePanelHeader = styled("h2")`

`;

const SavedResourcePanelCardBody = styled("div")`

`;

export const SavedResourcePanel = () => (
    <Card>
        <SavedResourcePanelHeader>Saved Resources
            <Route exact path='/admin' component={ToShareButton} />
        </SavedResourcePanelHeader>
        <SavedResourcePanelCardBody>
            <SavedResources />
        </SavedResourcePanelCardBody>
    </Card>
);
