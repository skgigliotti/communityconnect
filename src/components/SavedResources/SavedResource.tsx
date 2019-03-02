import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router';

import qs from 'qs-lite';
import { getDistance } from '../../utils/distance.js';
import * as resourceAction from '../../action/resourceDataAction';

import { SavedResourceCard, SavedResourceModal } from "../SavedResources";

class SavedResource extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modal: false
        };

        this.confirmationModalToggle = this.confirmationModalToggle.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.removalConfirmed = this.removalConfirmed.bind(this);
    }

    confirmationModalToggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    };

    removeItem = () => {
        this.confirmationModalToggle();
    };

    removalConfirmed = () => {
        const query = qs.parse(window.location.search.replace('?', ''));
        let resources = [];
        if (query.resources) {
            resources = query.resources.split(',');
        }
        const indexOfResource = resources.indexOf(this.props.organization.id);


        if (this.props.savedResource.some(resource => resource.id === this.props.organization.id)) {
            this.props.actions.removeSavedResource(this.props.organization.id);
            resources.splice(indexOfResource, 1);
        }
        this.props.history.push({
            pathname: window.location.pathname,
            search: `?resources=${resources.join(',')}`,
        });
        this.confirmationModalToggle();
    };

    render() {
        const {
            id,
            name,
            categoryautosortscript,
            overview,
            location,
            website,
            facebookUrl,
            instagramUrl,
            twitterUrl,
            phone
        } = this.props.organization;

        let distance, distanceElement;
        if (this.props.currentPos && this.props.currentPos.coordinates) {
            distance = getDistance(
                { coordinates: this.props.organization.coordinates },
                this.props.currentPos);
            if (distance) {
                distanceElement = <p>Distance from your Location: {distance.toPrecision(4)} miles</p>
            }
        }

        return (
            <>
                <SavedResourceCard 
                    id={id} 
                    website={website}
                    categoryautosortscript={categoryautosortscript}
                    distance={distance}
                    distanceElement={distanceElement}
                    location={location}
                    name={name}
                    overview={overview}
                    phone={phone}
                    facebookUrl={facebookUrl}
                    instagramUrl={instagramUrl}
                    twitterUrl={twitterUrl}
                    removeItem={this.removeItem}
                />
                <SavedResourceModal 
                    isOpen={this.state.modal}
                    name={name}
                    toggle={this.confirmationModalToggle}
                    onClosed={this.toggle}
                />
            </>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        savedResource: state.savedResource
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(resourceAction, dispatch)
    };
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter)(SavedResource);