import React from "react";
import styled from "@emotion/styled";

const StyledButton = styled("a")`

`;

type Props = {
    children: any;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    href?: string;
    target?: any;
};

export const Button: React.FC<Props> = ({ children, href, onClick, target }) => (
    <StyledButton href={href} onClick={onClick}>
        { children }
    </StyledButton>
);
