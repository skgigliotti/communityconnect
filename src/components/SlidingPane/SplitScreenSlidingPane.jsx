import React, { Component } from 'react';
import styled from "@emotion/styled";

const StyledSplitScreenSlidingPane = styled("div")`
    display: ${props => props.display === true ? "block": "none"}
`;

export class SplitScreenSlidingPane extends Component {
    state = {
        isOpen: true,
    }

    toggle = (e) => {
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
                <button onClick={this.toggle}>☰</button>
                {this.props.children}
            </StyledSplitScreenSlidingPane>
        );
    }
}
