import styled from '@emotion/styled';
import { breakPoints, spacing } from '../../community-connect-ui/Constants';

export const Results = styled("div")`
    display: grid;
    gap: ${spacing[1]};
    padding: 0 ${spacing[1]};
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 50px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    width: 100%;
`;

export const Container = styled("div")`
    position: absolute;
    width: 100%;
    /* 55px is the height of the header*/
    height:calc(100% - 55px); 
    z-index: 0;
`;

export const StaticPane = styled("div")`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 30%;
    overflow: auto;
    @media screen and max-width(${breakPoints[1]}) {
        left: 0;
        z-index: 5;
    }
`;

