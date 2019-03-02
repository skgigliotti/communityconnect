import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router';

import qs from 'qs-lite';
import { History, Resource } from "community-connect";
// import { getDistance } from '../../utils';
import * as resourceAction from '../../action/resourceDataAction';

import { SavedResourceCard, SavedResourceModal } from "../SavedResources";
import { Coordinates, Organization } from "community-connect";

type Props = {
    organization: Organization;
    savedResource: any;
    actions: any;
    history: History;
    currentPosition: Coordinates;
};

type State = {
    modal: boolean;
};

class SavedResourceClass extends Component<Props, State> {
    constructor(props: Props) {
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


        if (this.props.savedResource.some((resource: Resource) => resource.id === this.props.organization.id)) {
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
        const { name } = this.props.organization;
        // let distance;
        // if (this.props.currentPosition && this.props.currentPosition.coordinates) {
        //     distance = getDistance(this.props.organization.coordinates, this.props.currentPosition);
        //     // where does this get used?
        //     // if (distance) {
        //     //     distanceElement = <p>Distance from your Location: {distance.toPrecision(4)} miles</p>
        //     // }
        // }

        return (
            <>
                <SavedResourceCard organization={this.props.organization} />
                <SavedResourceModal 
                    isOpen={this.state.modal}
                    name={name}
                    toggle={this.confirmationModalToggle}
                />
            </>
        );
    }
}

function mapStateToProps(state: any, ownProps: any) {
    return {
        savedResource: state.savedResource
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        actions: bindActionCreators(resourceAction, dispatch)
    };
}


export const SavedResource = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter)(SavedResourceClass);
