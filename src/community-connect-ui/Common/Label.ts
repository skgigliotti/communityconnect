import styled from "@emotion/styled";
import { fontSizes, colors } from "../constants";

type LabelProps = {
    fontSize?: string;
    color?: string;
};

export const Label = styled("label")<LabelProps>`
    font-size: ${props => props.fontSize ? props.fontSize : fontSizes.subHeader};
    color: ${props => props.color ? props.color : colors.black};
`;
