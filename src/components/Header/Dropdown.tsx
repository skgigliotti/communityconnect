import React, { Component } from 'react';
import { DropdownCategory, DropdownItem, DropdownMenu, DropdownToggle } from "../Header";

type Props = {
    handleEvent: (cat: any, name: string) => void;
    category: any;
}

type State = {
    dropdownOpen: boolean;
    value: string;
    activeItem: [];
}
export class Dropdown extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            value: "Categories",
            activeItem: []
        };
    }


    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    handleClick(cat: any, index: any) {
        this.props.handleEvent(cat, "category");
        if (index === -1) this.setState({
            activeItem: []
        });
        this.state.activeItem.includes(index) 
            ? this.setState({
                activeItem: this.state.activeItem.filter(selected => selected !== index)
            })
            : this.state.activeItem.push(index);
    }

    categoryMenuItems() {
        return this.props.category.map((cat, index) =>
            <DropdownItem toggle={false} onClick={() => this.handleClick(cat, index)} key={cat}>
                {this.state.activeItem.includes(index) ? <span>&#10004; {cat}</span> : cat}</DropdownItem>);
    }

    render() {
        return (
            <DropdownCategory toggle={this.toggle} isOpen={this.state.dropdownOpen} inNavbar>
                <DropdownToggle nav caret>Category</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={() => this.handleClick("Clear", -1)} key={"Clear"}>Clear</DropdownItem>
                    <DropdownItem />
                    {this.categoryMenuItems()}
                </DropdownMenu>
            </DropdownCategory>
        );
    }
}
