import React, { Component } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';

type Props = {
    open: boolean;
    resource: any;
};

type State = {
    open: boolean;
}
export class OrganizationMarker extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            open: this.props.open
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.open !== this.props.open) {
            this.setState({ open: this.props.open })
        }
    }
    //scrollToElement and handleClickOfInfoWindow is currently non-functional

    scrollToElement = (e: Event) => {
        /*this.props.setOpenMarker(this.props.orgIndexes[0])
        if(this.props.orgIndexes.length === 1){
        this.props.scrollToElement(this.props.orgIndexes[0])
        }*/
        this.setState({ open: true });
    }

    handleClickOfInfoWindow = (e: any) => {
        if (e.currentTarget && e.currentTarget.id) {
            const element = document.getElementById(e.currentTarget.id);
            if (element) {
                element.scrollIntoView();
            }
        }
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        let { resource } = this.props;
        return (
            <Marker
                // optimize={false}
                position={resource.coordinates}
                onClick={this.scrollToElement}
            >
                {
                    this.state.open &&
                        <InfoWindow onCloseClick={this.handleClose}>
                            {
                                resource.groupedResource.map((resource: any) =>
                                    <div key={resource.id} id={resource.id} onClick={this.handleClickOfInfoWindow}>
                                        <h3>{resource.name}</h3>
                                        <div>{resource.combinedaddress}</div>
                                        <div>{resource.tags}</div>
                                        <a href={`tel:${resource.phone}`}>{resource.phone}</a>
                                    </div>
                                )
                            }
                        </InfoWindow>
                }
            </Marker>
        );
    }
}
