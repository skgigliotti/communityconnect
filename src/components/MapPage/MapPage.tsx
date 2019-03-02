import React from 'react';

import ResultList from './Map/ResultList';
import OrganizationMap from './Map/OrganizationMap';
import { SplitScreenSlidingPane } from '../SlidingPane/SplitScreenSlidingPane';


const MapPage = ({ currentPosition }) => (
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

export default MapPage;
