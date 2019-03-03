import styled from "@emotion/styled";
import { fontSizes, colors, radii } from "../constants";

type BadgeProps = {
    fontSize?: string;
    borderRadius?: string;
    borderColor?: string;
    color?: string;
};

export const Badge = styled("span")<BadgeProps>`
    font-size: ${props => props.fontSize ? props.fontSize : fontSizes.subText};
    color: ${props => props.color ? props.color : colors.white};
    border-radius: ${props => props.borderRadius ? props.borderRadius : radii.sm};
    border: 1px solid ${props => props.borderColor ? props.borderColor : colors.gray};
`;
