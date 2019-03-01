import React from "react";
import { Button, Modal } from "../Common";

export const HeaderModal = ({ modalToggle, confirmationModalToggle }) => (
    <Modal>
        <h1>Alert</h1>
        <h2>This action will clear all your saved resources. Do you want to proceed?</h2>
        <>
            <Button color="primary" onClick={modalToggle}>Cancel</Button>{' '}
            <Button color="secondary" onClick={confirmationModalToggle}>Continue</Button>
        </>
    </Modal>
);
