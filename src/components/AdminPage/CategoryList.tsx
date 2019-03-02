import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as resourceAction from '../../action/resourceDataAction';

import { Form, FormGroup, Input, Label } from "../../community-connect-ui/common";

type Props = {
    resource: any;
    actions: any;
    categories: any;
};

type State = {
    selectedCategory: any[];
};

export class CategoryList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            selectedCategory: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(selected: any) {
        let { selectedCategory } = this.state;
        let index = selectedCategory.indexOf(selected);
        index !== -1 ? selectedCategory.splice(index, 1) : selectedCategory.push(selected);
        let filteredResource = this.props.resource.filter((resource: any) => {
            return this.state.selectedCategory.some(searchCategory => (
                resource.categoryAutoSortScript.split(',').map((item: any) => ( 
                    item.trim()).includes(searchCategory)
                )
            ));
        });
        this.props.actions.filterByCategories(selectedCategory.length > 0 ? filteredResource : this.props.resource);
    }

    categoryMenuItems() {
        return this.props.categories.map((cat: any) =>
            <FormGroup key={cat}>
                <Input type="checkbox" key={cat} onChange={() => this.handleChange(cat)} />{cat}
            </FormGroup>);
    }
    render() {
        return (
            <Form>
                <Label>Filter by Category</Label>
                {this.categoryMenuItems()}
            </Form>
        )
    }
}

function mapStateToProps(state: any, ownProps: any) {
    return {
        categories: state.categories,
        resource: state.resource
    }
}
function mapDispatchToProps(dispatch: any) {
    return {
        actions: bindActionCreators(resourceAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
