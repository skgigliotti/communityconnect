import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, compose} from 'redux';
import {withRouter} from 'react-router';
import qs from 'qs-lite';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { History, Organization, Coordinates } from "community-connect";
import {getDistance} from '../../utils';
import * as resourceAction from '../../action/resourceDataAction';


import { Card, SaveButton } from "../common";

type Props = {
    index: string;
    cardClick: (id: string) => void;
    organization: Organization; 
    savedResource: any;
    actions: any;
    saveable: boolean;
    history: History;
    currentPosition: Coordinates;
};

type State = {
    saveExist: boolean;
};

class OrganizationCardClass extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            saveExist: false
        }
        // console.log(this.state.saveExist)
    }
    static getDerivedStateFromProps(props: Props){
        if(!props.savedResource.some((resource: any) => resource.id === props.organization.id)){
            return { saveExist: false }
        }
        else{
            return { saveExist: true }
        }
    }
    cardClick = (e: React.MouseEvent) => {
        if (this.props.cardClick && e.currentTarget && e.currentTarget.id) {
            this.props.cardClick(e.currentTarget.id);
        }
    }
    saveItem = () => {
        if (!this.state.saveExist) {
            this.props.actions.addSavedResource(this.props.organization);
        }
        const query = qs.parse(window.location.search.replace('?', ''));
        let resources = [];

        if (query.resources) {
            resources = query.resources.split(',');
        }

        const indexOfResource = resources.indexOf(this.props.organization.id);
        if (indexOfResource >= 0) {
            //resources.splice(indexOfResource, 1);
        } else {
            resources.push(this.props.organization.id);
        }

        this.props.history.push({
            pathname: window.location.pathname,
            search: `?resources=${resources.join(',')}`,
        });

    }

    saveButton() {
        if (this.props.saveable) {
            return <SaveButton saveItem={this.saveItem} saveExist={this.state.saveExist}/>;
        }
        return;
    }

    // Takes a ref to the links that change color when hovered over.
    changeColor(link: any) {
        console.log(link);
        return link && link.childNodes[0].classList.toggle('text-black-50');
    }

    validatedUrl(website: string) {
        if (website === "")
            return website;

        let http = website.substr(0, 7);
        let https = website.substr(0, 8);
        const scheme = "http://";
        const tlsScheme = "https://";
        if (http === scheme) {
            return website;
        }
        if (https === tlsScheme) {
            return website;
        }
        return scheme + website;
    }

    render() {
        const {
            name, 
            categoryAutoSortScript, 
            overview, 
            location, 
            website, 
            facebookUrl,
            instagramUrl, 
            twitterUrl, 
            phone, 
            latitude, 
            longitude
        } = this.props.organization;
        let distance, distanceElement, directionUrl, encodedCoordinates;
        let url = this.validatedUrl(website);
        if (this.props.currentPosition && this.props.organization.coordinates) {
            distance = getDistance(this.props.organization.coordinates, this.props.currentPosition);
            if (distance) {
                distanceElement = <p>Distance from your Location: {distance} miles</p>
            }
        }
        // vars to hold refs to social icons and external link to the website
        let socialFb: HTMLAnchorElement | null, 
            socialIg: HTMLAnchorElement | null, 
            socialTw: HTMLAnchorElement | null, 
            link: HTMLAnchorElement | null, 
            mapUrl: HTMLAnchorElement | null;

        encodedCoordinates = encodeURIComponent(latitude + "," + longitude);
        directionUrl = "https://www.google.com/maps?saddr=My+Location&daddr=" +
            encodedCoordinates;

        return (
            <Card ref="cardRef" id={this.props.index} onClick={this.cardClick}>
                <h1>{this.saveButton()}</h1>
                <h3>{name}</h3>
                <h3>{categoryAutoSortScript}</h3>
                {distance && {distanceElement}}
                {
                    location &&
                        <p>
                            <span>
                                <FontAwesomeIcon
                                    icon='map-marker-alt'
                                    className='text-danger'
                                />
                            </span>
                            {location}
                        </p>
                }
                {
                    directionUrl &&
                        <div className='col-sm-6'>
                            <a href={directionUrl}
                                target="_blank"
                                ref={node => mapUrl = node}
                                onMouseEnter={() => {this.changeColor(mapUrl)}}
                                onMouseLeave={() => {this.changeColor(mapUrl)}}>
                                    <FontAwesomeIcon icon="map-marked-alt" className="text-black-50 mr-1"/>
                                    Get Directions
                            </a>
                        </div>
                }
                {
                    overview &&
                        <p>{overview}</p>
                }
                {
                    website && 
                        <div className='col-sm-6'>
                            <a href={url} 
                                target="_blank" 
                                ref={node => { link = node}}
                                onMouseEnter={() => { this.changeColor(link)}}
                                onMouseLeave={() => { this.changeColor(link)}}>
                                <FontAwesomeIcon icon="external-link-alt" className="text-black-50 mr-1"/>
                                Go to website
                            </a>
                    </div>
                }
                { 
                    phone &&
                        <p><span><FontAwesomeIcon icon='phone' size='1x'/></span> {phone}</p>
                }
                {
                    (facebookUrl || instagramUrl || twitterUrl) &&
                        <>
                            {
                                facebookUrl &&
                                    <a href={facebookUrl}
                                        data-type="social" 
                                        ref={node => socialFb = node}
                                        onMouseEnter={() => this.changeColor(socialFb)} 
                                        onMouseLeave={() => this.changeColor(socialFb)}
                                    >
                                        <FontAwesomeIcon icon={['fab', 'facebook-square']} title="Facebook Page"/>
                                    </a>
                            }
                            {
                                instagramUrl &&
                                    <a href={instagramUrl}
                                        data-type="social"
                                        ref={ node => socialIg = node }
                                        onMouseEnter={() => this.changeColor(socialIg)}
                                        onMouseLeave={() => this.changeColor(socialIg)}
                                    >
                                        <FontAwesomeIcon
                                            icon={['fab', 'instagram']}
                                            size='2x'
                                            title="Instagram Page"/>
                                    </a>
                            }
                            {
                                twitterUrl &&
                                    <a href={twitterUrl}
                                        data-type="social"
                                        ref={node => socialTw = node}
                                        onMouseEnter={() => this.changeColor(socialTw)}
                                        onMouseLeave={() => this.changeColor(socialTw)}
                                        aria-label="Twitter Page"
                                    >
                                        <FontAwesomeIcon icon={['fab', 'twitter']} size='2x'
                                                        title="Twitter Page"/>
                                    </a>
                            }
                        </>
                }
            </Card>
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


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(OrganizationCardClass);
