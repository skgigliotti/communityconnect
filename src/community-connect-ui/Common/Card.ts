import styled from "@emotion/styled";
import { colors, fonts, fontWeights, radii } from "../constants";

type CardProps = {
    borderRadius?: string;
    backgroundColor?: string;
    borderColor?: string;
};

export const Card = styled("div")<CardProps>`
    display: grid;
    border-radius: ${props => props.borderRadius ? props.borderRadius : radii.sm};
    margin: 8px 10px;
    width: 100%;
    background-color: ${props => props.backgroundColor ? props.backgroundColor : colors.white};
    border: 1px solid ${props => props.borderColor ? props.borderColor : colors.black};
    box-sizing: border-box;
    font-weight: ${fontWeights.normal};
    font-family: ${fonts.sansSerif};
`;
