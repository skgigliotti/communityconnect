import React, { Component } from 'react';
import { OrganizationCardSaveButtonWrapper } from './OrganizationCardLayout';

export class OrganizationCardSaveButton extends Component {
    constructor(props) {
        super(props)
        this.getButtonText = this.getButtonText.bind(this);
    }

    handleClick = () => {
        this.props.saveItem();
    }

    getButtonText = () => {
        if (this.props.saveExist) {
            return "Saved";
        }
        return "Save";
    }

    render() {
        return (
            <OrganizationCardSaveButtonWrapper
                onClick={this.handleClick}
                title='Add item to Saved Resources'
                aria-label='Add item to Saved Resources'
                saved={this.props.saveExist}
            >
                { this.getButtonText() }
            </OrganizationCardSaveButtonWrapper>
        );
    }
}
