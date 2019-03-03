import React from "react";
import styled from "@emotion/styled";

type StyledSplitScreenTogglePaneProps = {
    isOpen: boolean;
};

const StyledSplitScreenTogglePane = styled("div")<StyledSplitScreenTogglePaneProps>`
    display: ${ props => props.isOpen === true ? "block" : "none"};
`;

type Props = {
    isOpen: boolean;
}

export const SplitScreenTogglePane: React.FC<Props> = ({ children, isOpen }) => (
    <StyledSplitScreenTogglePane isOpen={isOpen}>
        { children }
    </StyledSplitScreenTogglePane>
);
