import React, { Component } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';

import { Coordinates } from "community-connect";
import { Header } from '../components/Header';
import { MapPage } from '../components/MapPage';
import { AdminPage } from '../components/AdminPage';
import { SplitScreenTogglePane } from '../components/SlidingPane/SplitScreenTogglePane';
import { SavedResourcePanel } from '../components/SavedResources/SavedResourcePanel';
import Loader from 'react-loader-spinner'

type Props = {
    isFetchingResource: boolean;
};

type State = {
    isSavedResourcePaneOpen: boolean;
    position: Coordinates; 
};

class AppContainer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isSavedResourcePaneOpen: false,
            position: {
                coordinates: {
                    lat: 0,
                    lng: 0
                }
            }
        }
        this.toggleSavedResourcesPane = this.toggleSavedResourcesPane.bind(this);
    }

    getLocation = () => {
        if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
                position => {
                    this.setState({
                        position: {
                            coordinates: {
                                lat: parseFloat(position.coords.latitude.toString()),
                                lng: parseFloat(position.coords.longitude.toString())
                            }
                        }
                    })
                },
                error => {
                });
        }
    }

    componentDidMount() {
        this.getLocation();
    }

    toggleSavedResourcesPane = () => {
        this.setState({
            isSavedResourcePaneOpen: !this.state.isSavedResourcePaneOpen
        });
    }

    render() {
        let { isFetchingResource } = this.props;
        return (
            <>
                <Header
                    toggleSavedResourcesPane={this.toggleSavedResourcesPane}
                />
                    {
                        isFetchingResource && 
                            <Loader
                                type="TailSpin"
                                color="#00BFFF"
                                height="50"
                                width="50"
                            />
                    }
                    {
                        !isFetchingResource &&
                            <>
                                <Route exact path='/admin' render={(props) => <AdminPage currentPosition={this.state.position} />} />
                                <Route exact path='/' render={(props) => <MapPage currentPosition={this.state.position} />} />
                                <SplitScreenTogglePane isOpen={this.state.isSavedResourcePaneOpen}>
                                    <SavedResourcePanel />
                                </SplitScreenTogglePane>
                            </>
                    }
            </>
        );
    }
}
function mapStateToProps(state: any, ownProps: any) {
    let { isFetchingResource } = state;
    return {
        isFetchingResource: isFetchingResource
    }
}
export default connect(mapStateToProps)(AppContainer);
