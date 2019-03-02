import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';

import { 
    Badge, 
    Button, 
    Collapse, 
    Nav, 
    Navbar, 
    NavbarBrand, 
    NavbarToggler 
} from "../../community-connect-ui/Common";
import { AdminModal } from ".";

type Props = {
    savedResource: {
        length: number;
    },
};

type State = {
    collapsed: boolean;
    modal: boolean;
};

class HeaderClass extends Component<Props, State> {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.modalOpen = this.modalOpen.bind(this);
        this.modalToggle = this.modalToggle.bind(this);
        this.confirmationModalToggle = this.confirmationModalToggle.bind(this);
        this.state = {
            collapsed: true,
            modal: false,
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    modalOpen() {
        if (this.props.savedResource.length > 0)
            this.modalToggle();
        else
            window.location.reload();
    }

    modalToggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    confirmationModalToggle = () => {
        window.location.href = "/admin";
        this.modalToggle();
    };

    // setButtonColor = () => {
    //     if (this.props.savedResource.length >= 1) {
    //         return styles["header__saved-resources--blue"];
    //     }
    // }

    buttonBadge = () => {
        const savedResources = this.props.savedResource;
        if (savedResources.length >= 1) {
            return (
                <Badge>{savedResources.length}</Badge>
            );
        }
    }

    render() {
        return (
            <>
                <Navbar>
                    <NavbarBrand onClick={this.modalOpen}>
                        <h3>Community Connect</h3>
                    </NavbarBrand>
                    <Route path='/admin' render={() =>
                            <>
                                <NavbarToggler onClick={this.toggleNavbar} />
                                <Collapse isOpen={!this.state.collapsed}>
                                    <Nav>
                                        <Button
                                            onClick={() => this.props.toggleSavedResourcesPane()}>
                                            Saved Resources {this.buttonBadge()}
                                        </Button>
                                    </Nav>
                                </Collapse>
                            </>
                        }
                    />
                </Navbar>
                <AdminModal
                    isOpen={this.state.modal}
                    toggle={this.modalToggle}
                />
            </>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        savedResource: state.savedResource
    }
}

export const Header = connect(mapStateToProps)(HeaderClass);
