import React from 'react';
import { ResultList, OrganizationMap } from "../MapPage";
import { SplitScreenSlidingPane } from '../SlidingPane';
import { Coordinates } from "community-connect";

type Props = {
    currentPosition: Coordinates;
}

export const MapPage: React.FC<Props> = ({ currentPosition }) => (
    <>
        <SplitScreenSlidingPane>
            <ResultList
                ref={instance => { this.resultListItem = instance }}
                cardClick={this.cardClick}
                currentPos={currentPosition}
                fullWidth={true}
            />
        </SplitScreenSlidingPane>
        <OrganizationMap
            center={currentPosition ? currentPosition.coordinates : null}
        />
    </>
)
