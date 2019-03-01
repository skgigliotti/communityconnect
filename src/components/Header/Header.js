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
} from "../Common";
import { AdminModal } from "./";

class Header extends Component {
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

    // btnColor = () => {
    //     if (this.props.savedResource.length >= 1) {
    //         return styles["header__saved-resources--blue"];
    //     }
    // }

    btnBadge = () => {
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
                <Navbar color="light" light expand="md">
                    <NavbarBrand className="Logo" onClick={this.modalOpen}>
                        <h3>Community Connect</h3>
                    </NavbarBrand>
                    <Route path='/admin' render={() =>
                            <>
                                <NavbarToggler onClick={this.toggleNavbar} />
                                <Collapse isOpen={!this.state.collapsed} navbar>
                                    <Nav>
                                        <Button
                                            className={this.btnColor()}
                                            onClick={() => this.props.toggleSavedResourcesPane()}>
                                            Saved Resources {this.btnBadge()}
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
                    onClosed={this.toggle}
                    >
                </AdminModal>
            </>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        savedResource: state.savedResource
    }
}

export default connect(mapStateToProps)(Header);
