import React from "react";
import styled from "@emotion/styled";
import { colors, radii, fonts } from "../constants";
import { fontSizes } from "../constants/fonts";

type StyledButtonLinkProps = {
    backgroundColor?: string;
    color?: string;
    borderRadius?: string;
    fontSize?: string;
};

const StyledButtonLink = styled("a")<StyledButtonLinkProps>`
    border-radius: ${props => props.borderRadius ? props.borderRadius : radii.md};
    background-color: ${props => props.backgroundColor ? props.backgroundColor : colors.gray};
    color: ${props => props.color ? props.color : colors.white}
    font-size: ${props => props.fontSize ? props.fontSize : fontSizes.link};
    font-family: ${fonts.sansSerif};
`;

type Props = {
    children: any;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    href?: string;
    target?: any;
};

export const ButtonLink: React.FC<Props> = ({ children, href, onClick, target }) => (
    <StyledButtonLink href={href} onClick={onClick}>
        { children }
    </StyledButtonLink>
);
