import React from "react";
import styled from "@emotion/styled";

type StyledModalProps = {
    isOpen: boolean;
};

const StyledModal = styled("div")<StyledModalProps>`
    display: grid;
    display: ${props => props.isOpen === true ? "grid" : "none"};
    padding: 10px;
`;

type Props = {
    toggle: () => void;
    onClosed?: () => void;
    confirmationToggle: () => void;
};

type State = {
    isOpen: boolean;
}

export class Modal extends React.Component<Props, State> {
    public render() {
        return (
            <StyledModal isOpen={this.state.isOpen}>
                { this.props.children }
                {/* <h1>Alert</h1>
                <p>This action will clear all your saved resources. Do you want to proceed?</p>
                <Footer>
                    <Button onClick={this.props.toggle}>Cancel</Button>{' '}
                    <Button onClick={this.props.confirmationToggle}>Continue</Button>
                </Footer> */}
            </StyledModal>
        )
    }
}
