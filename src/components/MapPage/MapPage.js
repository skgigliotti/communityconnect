import React from 'react';

import ResultList from './ResultList';
import OrganizationMap from './OrganizationMap';
import { SplitScreenSlidingPane } from './SplitScreenSlidingPane';
import { Container, StaticPane } from "./MapPageLayout";


// type Props = {
//     currentPosition: string;
// }
const MapPage = ({ currentPosition }) => (
    <Container>
        <SplitScreenSlidingPane>
            <ResultList
                ref={instance => { this.resultListItem = instance }}
                cardClick={this.cardClick}
                currentPos={currentPosition}
                fullWidth={true}
            />
        </SplitScreenSlidingPane>
        <StaticPane>
            <OrganizationMap center={currentPosition ? currentPosition.coordinates : null} />
        </StaticPane>
    </Container>
);

export default MapPage;
