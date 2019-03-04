import React from "react";
import styled from "@emotion/styled";
import { colors, radii, fonts } from "../constants";
import { fontSizes } from "../constants/fonts";

type StyledButtonProps = {
    backgroundColor?: string;
    color?: string;
    borderRadius?: string;
    fontSize?: string;
};

const StyledButton = styled("button")<StyledButtonProps>`
    border-radius: ${props => props.borderRadius ? props.borderRadius : radii.md};
    background-color: ${props => props.backgroundColor ? props.backgroundColor : colors.gray};
    color: ${props => props.color ? props.color : colors.white};
    font-size: ${props => props.fontSize ? props.fontSize : fontSizes.link};
    font-family: ${fonts.sansSerif};
`;

type Props = {
    children?: any;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    backgroundColor?: string;
    color?: string;
    borderRadius?: string;
    fontSize?: string;
};

export const Button: React.FC<Props> = ({ children, onClick, backgroundColor, color, borderRadius, fontSize }) => (
    <StyledButton 
        onClick={onClick}
        backgroundColor={backgroundColor}
        color={color}
        borderRadius={borderRadius}
        fontSize={fontSize}>
        { children }
    </StyledButton>
);
