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
    removalConfirmed?: () => void;
    confirmationModalToggle: () => void;
}
export const SavedResourceModal: React.FC<Props> = ({ isOpen, name, toggle, removalConfirmed, confirmationModalToggle }) => (
    <StyledSavedResourceModal
        toggle={toggle}
        confirmationToggle={confirmationModalToggle} 
    >
        <SavedResourceModalHeader>Are you sure?</SavedResourceModalHeader>
        <SavedResourceModalBody>
            Would you like to remove '{name}'' from your saved resources?
        </SavedResourceModalBody>
        <SavedResourceModalFooter>
            <Button onClick={removalConfirmed}>Yes</Button>{' '}
            <Button onClick={confirmationModalToggle}>No</Button>
        </SavedResourceModalFooter>
    </StyledSavedResourceModal>
);
