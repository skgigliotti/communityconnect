import React from 'react';
import { ResultList } from "../MapPage";
import * as OrganizationMap from "./OrganizationMap";
import { SplitScreenSlidingPane } from '../SlidingPane';
import { Coordinates } from "community-connect";

type Props = {
    currentPosition: Coordinates;
}

export const MapPage: React.FC<Props> = ({ currentPosition }) => (
    <>
        <SplitScreenSlidingPane>
            <ResultList
                // ref={instance => { this.resultListItem = instance }}
                // cardClick={this.cardClick}
                currentPosition={currentPosition}
                fullWidth={true}
            />
        </SplitScreenSlidingPane>
        <OrganizationMap
            center={currentPosition ? currentPosition.coordinates : null}
        />
    </>
)
