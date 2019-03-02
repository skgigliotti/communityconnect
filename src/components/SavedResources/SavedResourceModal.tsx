import React from "react";
import styled from "@emotion/styled";
import { Button, Modal } from "../../community-connect-ui/common";

const StyledSavedResourceModal = styled(Modal)`

`;

const SavedResourceModalHeader = styled("h1")`

`;

const SavedResourceModalBody = styled("div")`

`;

const SavedResourceModalFooter = styled("div")`

`;

type Props = {
    isOpen: boolean;
    name: string;
    toggle: () => void;
}
export const SavedResourceModal: React.FC<Props> = ({ isOpen, name, toggle }) => (
    <StyledSavedResourceModal>
        <SavedResourceModalHeader>Are you sure?</SavedResourceModalHeader>
        <SavedResourceModalBody>
            Would you like to remove '{name}'' from your saved resources?
        </SavedResourceModalBody>
        <SavedResourceModalFooter>
            <Button color="primary" onClick={this.removalConfirmed}>Yes</Button>{' '}
            <Button color="secondary" onClick={this.confirmationModalToggle}>No</Button>
        </SavedResourceModalFooter>
    </StyledSavedResourceModal>
);
