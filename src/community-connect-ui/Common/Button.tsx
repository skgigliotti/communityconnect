import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const StyledButton = styled("button")`

`;

type Props = {
    children: any;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    href?: string | Link;
    target?: any;
};

export const Button: React.FC<Props> = ({ children, href, onClick, target }) => (
    <StyledButton href={href} onClick={onClick}>
        { children }
    </StyledButton>
);
