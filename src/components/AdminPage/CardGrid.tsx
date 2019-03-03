import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Coordinates } from "community-connect";
import { OrganizationCard, SortBar } from "../../community-connect-ui/common";
import SearchBar from '../Header/SearchBar';
import { getCloserName, getCloserResource } from '../../utils';

type Props = {
    currentPosition: Coordinates;
    resource?: {
        id: string
    }[];
    saveItem?: (resource: any) => void;
    handleFilter?: () => void;
};

type State = {
    dataSort: () => string[];
};

export class CardGrid extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            dataSort: this.sortByAlphabet,
        }
    }

    sortByAlphabet = () => {
        return this.props.resource && this.props.resource.slice().sort(getCloserName);
    }

    sortByDistance = () => {
        return this.props.resource && this.props.resource.slice().sort(getCloserResource);
    }

    handleSortChange = (newSort: any) => {
        if (this.state.dataSort !== newSort)
            // Set the dataSort variable to whichever sort function is chosen
            this.setState({
                dataSort: newSort
            });
    }

    render() {
        const sortOptions = [
            { 
                key: 'Alphabetically', 
                sort: this.sortByAlphabet, 
                disabled: false 
            }, 
            { 
                key: 'Distance', 
                sort: this.sortByDistance, 
                disabled: !this.props.currentPosition 
            }
        ];

        // Render will be called every time this.props.data is updated, and every time handleSortChange
        // updates the this.state.dataSort variable.
        // this.state.dataSort() sorts data to feed into the OrganizationCards without modifying the
        // source of data
        const sortedData = this.state.dataSort();

        return (
            <>
                <SearchBar
                    type="text"
                    handleFilter={this.props.handleFilter}
                />
                <SortBar
                    onSortChange={this.handleSortChange}
                    sortOptions={sortOptions}
                />
                {
                    sortedData.map((resource: any) => (
                        <OrganizationCard
                            key={resource.id}
                            index={resource.id}
                            organization={resource}
                            currentPos={this.props.currentPosition}
                            saveItem={() => {
                                if (this.props.saveItem) {
                                    this.props.saveItem(resource)
                                }
                            }}
                            saveable={true}
                        />
                    ))
                }
            </>
        );
    }
};

function mapStateToProps(state: any, ownProps: any) {
    let res = [];
    //Not the most efficient logic, but it works. Will have to optimize this later
    for (let i = 0, len1 = state.searchedResource.length; i < len1; i++) {
        for (let j = 0, len2 = state.filteredResource.length; j < len2; j++) {
            if (state.searchedResource[i].id === state.filteredResource[j].id) {
                res.push(state.searchedResource[i])
            }
        }
    }

    return {
        resource: res
    }
}


export default connect(mapStateToProps)(CardGrid);
