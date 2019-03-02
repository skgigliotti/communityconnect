import React, { Component } from 'react';
import styled from "@emotion/styled";
import { Button } from "../../community-connect-ui/common";

type StyledProps = {
    display: boolean;
}
const StyledSplitScreenSlidingPane = styled("div")<StyledProps>`
    display: ${props => props.display === true ? "block": "none"}
`;

type State = {
    isOpen: boolean;
}

export class SplitScreenSlidingPane extends Component<{}, State> {
    state = {
        isOpen: true,
    }

    toggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    render() {
        // if (this.state.isOpen) {
        //     classNames.push(styles.open);
        // }

        return (
            <StyledSplitScreenSlidingPane display={this.state.isOpen}>
                <Button onClick={this.toggle}>☰</Button>
                { this.props.children }
            </StyledSplitScreenSlidingPane>
        );
    }
}
