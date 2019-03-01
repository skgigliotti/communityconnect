import React, { Component } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';

import Header from '../components/Header/Header';
import MapPage from '../components/MapPage/MapPage';
import AdminPage from '../components/AdminPage/AdminPage';
import { SplitScreenTogglePane } from '../components/SlidingPane/SplitScreenSlidingPane';
import SavedResourcePanel from '../components/SavedResources/SavedResourcePanel';
import Loader from 'react-loader-spinner'


class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: {}
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
                                lat: parseFloat(position.coords.latitude),
                                lng: parseFloat(position.coords.longitude)
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
function mapStateToProps(state, ownProps) {
    let { isFetchingResource } = state;
    return {
        isFetchingResource: isFetchingResource
    }
}
export default connect(mapStateToProps)(AppContainer);
