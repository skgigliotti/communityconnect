import React from 'react';
import {withScriptjs, withGoogleMap, GoogleMap} from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import { Resource } from "community-connect";
import { OrganizationMarker } from '../MapPage';

type Props = {
    mapRef: any;
    onMarkerClick: () => void;
    resource: Resource;
}
export const Map = withScriptjs(withGoogleMap((props: Props) => (
    <GoogleMap
        {...props}
        ref={props.mapRef}
    >
        <MarkerClusterer
            averageCenter={true}
            enableRetinaIcons={true}
            gridSize={60}
            ref={props.onMarkerClick}
            defaultMaxZoom={16}
        >
            {
                props.resource.filter(( resource: Resource ) => resource.coordinates).map((resource: Resource, index: any) =>
                    <OrganizationMarker
                        key={index}
                        open={resource.showInfo}
                        resource={resource}
                    />
                )
            }
        </MarkerClusterer>
    </GoogleMap>
)));
