import React, { Component } from 'react';
import { OrganizationCardSaveButtonWrapper } from './OrganizationCardLayout';

export class OrganizationCardSaveButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            animateButtonInside: '',
            animateButtonOutside: [''],
        };
        this.buttonSign = this.buttonSign.bind(this);
    }

    handleClick = () => {
        this.props.saveItem();
    }

    buttonSign() {
        if (this.props.saveExist)
            return String.fromCharCode(0x2713)
        else
            return '+'
    }

    render() {
        return (
            <OrganizationCardSaveButtonWrapper onClick={this.handleClick}>
                <button>
                    <span
                        title='Add item to Saved Resources'
                        aria-label='Add item to Saved Resources'
                    >
                        { this.buttonSign() }
                    </span>
                </button>
            </OrganizationCardSaveButtonWrapper>
        );
    }
}
