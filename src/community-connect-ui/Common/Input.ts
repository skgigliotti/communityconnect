import styled from "@emotion/styled";
import { colors, radii, spacing } from "../constants";

type InputProps = {
    color?: string;
    borderRadius?: string;
    padding?: string;
};

export const Input = styled("input")<InputProps>`
    color: ${props => props.color ? props.color : colors.gray}
    border-radius: ${props => props.borderRadius ? props.borderRadius : radii.sm}
    padding: ${props => props.padding ? props.padding : spacing.sm};
    margin: 5px;
`;
