import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as resourceAction from '../../action/resourceDataAction';
import { Resource } from 'community-connect';

type Props = {
    actions: {
        // filterBySearch: (length: Resource | { map: (any: any) => Resource }) => React.ReactNode,
        filterBySearch: any;
    };
    resource: Resource;
};

type State = {
    searchString: string;
};

export class SearchBar extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.handleFilter = this.handleFilter.bind(this);
        this.state = {
            searchString: ''
        };
    }

    handleFilter(e: any) {
        this.setState({ searchString: e.target.value });
        let searchedResource = this.props.resource.filter(function (index: Resource) {
            return index && index.name && index.name.toLowerCase().match(e.target.value.toLowerCase());
        });
        this.props.actions.filterBySearch(e.target.value.length > 0 ? searchedResource : this.props.resource);
    }


    render() {
        return (
            <input type="text" value={this.state.searchString} onChange={this.handleFilter} placeholder="Search Resources" />
        );
    }
}

function mapStateToProps(state: any, ownProps: any) {
    return {
        resource: state.filteredResource.length > 0 ? state.filteredResource : state.resource
    }
}
function mapDispatchToProps(dispatch: any) {
    return {
        actions: bindActionCreators(resourceAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
