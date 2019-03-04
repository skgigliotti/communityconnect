import React from "react";
import styled from "@emotion/styled";
import onClickOutside from "react-onclickoutside";

type StyledModalProps = {
    isOpen: boolean;
};

const StyledModal = styled("div")<StyledModalProps>`
    display: ${props => props.isOpen === true ? "grid" : "none"};
    position: absolute;
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

class ModalComponent extends React.Component<Props, State> {
    public state = {
        isOpen: true
    }
    public handleClickOutisde = (event: any) => {
        this.setState({
            isOpen: false,
        })
    }
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

export const Modal = onClickOutside(ModalComponent);
