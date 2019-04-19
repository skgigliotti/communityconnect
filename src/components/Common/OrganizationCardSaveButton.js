import React, { Component } from 'react';
import { OrganizationCardSaveButtonWrapper } from './OrganizationCardLayout';

export class OrganizationCardSaveButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            saved: false
        };
        this.getButtonText = this.getButtonText.bind(this);
    }

    handleClick = () => {
        this.props.saveItem();
        this.setState({ saved: true });
    }

    getButtonText = () => {
        if (this.state.saved) {
            return "Saved"
        }
        return "Save"
    }

    render() {
        return (
            <OrganizationCardSaveButtonWrapper
                onClick={this.handleClick}
                title='Add item to Saved Resources'
                aria-label='Add item to Saved Resources'
                saved={this.state.saved}
            >
                { this.getButtonText() }
            </OrganizationCardSaveButtonWrapper>
        );
    }
}
