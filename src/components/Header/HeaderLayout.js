import styled from "@emotion/styled";
import { colors, radii, spacing, fontSizes } from "../../community-connect-ui/Constants";

export const Input = styled("input")`
    border-radius: ${radii[0]};
    border: 1px solid ${colors.lightgray};
    padding-left: ${spacing[0]};
    font-size: ${fontSizes[1]};
`;

export const DropDownCategory = styled("div")`
    overflow: auto;
    height: 50vh;
`;

export const NavItem = styled("div")`
    position: absolute;
    right: 11px;
    top: 11px;
    width: 200px;
`;

export const SavedResourcesButton = styled("button")`
    background-color: ${colors.gray};
    color: ${colors.white};
    font-size: ${fontSizes[1]};
    border-radius: ${radii[0]};
    border: none;
    padding: ${spacing[0]} ${spacing[1]};
    margin-right: ${spacing[1]};
    width: 200px;
`;

export const Badge = styled("span")`
    border: 1px solid ${colors.white};
    border-radius: ${radii[0]};
    padding: ${spacing[0]};
    background-color: ${colors.turquoise};
    display: inline;
`;
