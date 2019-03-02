import React from "react";
import styled from "@emotion/styled";
import { Button } from ".";

const StyledModal = styled("div")`
    display: grid;
`;

const Footer = styled("div")`
`;

export const Modal = () => (
    <StyledModal isOpen={this.state.modal} toggle={this.modalToggle} onClosed={this.toggle}>
        <h1>Alert</h1>
        <p>This action will clear all your saved resources. Do you want to proceed?</p>
        <Footer>
            <Button color="primary" onClick={this.modalToggle}>Cancel</Button>{' '}
            <Button color="secondary" onClick={this.confirmationModalToggle}>Continue</Button>
        </Footer>
    </StyledModal>
);
