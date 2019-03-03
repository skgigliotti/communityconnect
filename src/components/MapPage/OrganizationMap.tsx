import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Organization, Resource} from "community-connect";
import * as Map from "./Map";

const googleMapKey = 'AIzaSyAwKdrqS2GfCt9b2K1wAopDc9Ga0N1BVUM';
const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${googleMapKey}&v=3.exp&libraries=geometry,drawing,places`;

const defaultZoom = 12;
const defaultCenter = { lat: 42.3731, lng: -71.0162 };

type Props = {
    center: { lat: number; lng: number; };
    organizations: any;
};

type State = {
    center: { lat: number; lng: number; };
    zoom: any;
    hoveredItem: any;
    mapReference: any;
};

class OrganizationMapClass extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            center: this.props.center ? this.props.center : defaultCenter,
            zoom: defaultZoom,
            hoveredItem: "",
            mapReference: ""
        }
    }

    markerHover = (key: any, event: any) => {
        event.map.getCanvas().style.cursor = 'pointer';
        this.setState({
            hoveredItem: key
        });
    }

    markerEndHover = (key: any, event: any) => {
        event.map.getCanvas().style.cursor = '';
        this.setState({
            hoveredItem: ''
        });
    }

    onOrganizationClick = (key: any, event: any) => {
        const organizationZoom = 11;
        const org = this.props.organizations.find((o: Organization) => o.id === key);

        this.setState({
            // center: [org.position.longitude, org.position.latitude],
            center: { lat: org.position.longitude, lng: org.position.latitude },
            zoom: [organizationZoom]
        });
    }
    /*
    setOpenMarker = index => {
    
        Object.entries(this.props.locationAddressHashTable).forEach(([index2, orgRef]) => {
    
        for (var i of orgRef.orgs) {
            if (Number(i) !== index && orgRef.isOpen) {
                orgRef.isOpen = false;
            }
    
            if (Number(i) === index) {
                orgRef.isOpen = true
                this.setState({
                    center: this.props.organizations[orgRef.orgs[0]].coordinates,
                    zoom: 17,
                });
                break;
            }
        }
    
        });
        this.forceUpdate();
        }
    */
    // onZoomChanged = ref => {
    onZoomChanged = () => {
        this.setState({
            zoom: this.state.mapReference.getZoom()
        })

    }

    mapRef = ( ref: any ) => {
        this.setState({
            mapReference: ref
        })
    }

    render() {
        return (
            <Map
                mapRef={this.mapRef}
                onZoomChanged={this.onZoomChanged}
                // scrollToElement={this.props.scrollToElement}
                // setOpenMarker={this.setOpenMarker}
                googleMapURL={googleMapURL}
                containerElement={<div style={{ height: '100%' }} />}
                mapElement={<div style={{ height: '100%' }} />}
                loadingElement={<div style={{ height: `100%` }} />}
                zoom={this.state.zoom}
                center={this.state.center}
                // resource={this.props.mapResource}
            />
        );
    }
}

function mapStateToProps(state: any, ownProps: any) {
    let currentResource = state.savedResource.length > 0 ? state.savedResource : state.resource;
    let locationArray: any[] = [];
    currentResource.forEach(function (resource: Resource) {
        if (!locationArray[resource.hashCoordinates]) {
            locationArray[resource.hashCoordinates] = {
                coordinates: resource.coordinates,
                groupedResource: [],
                showInfo: false
            }
        }
        locationArray[resource.hashCoordinates].groupedResource.push(resource);
    });
    let resource = Object.values(locationArray);
    return {
        mapResource: resource
    }
}

export const OrganizationMap = connect(mapStateToProps)(OrganizationMapClass);
