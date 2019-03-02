import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CurrentPosition } from "community-connect";
import { OrganizationCard, SortBar } from "../../community-connect-ui/Common";
import SearchBar from '../Header/SearchBar';
import { getDistance } from '../../utils';

type Props = {
    currentPosition: CurrentPosition;
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

    getCloserResource = (a: string, b: string): number => {
        if (a && getDistance(a, this.props.currentPosition)
            > getDistance(b, this.props.currentPosition)) {
            return 1;
        }

        return -1;
    }

    getCloserName = (a: { name: string }, b: { name: string }): number => {
        if (a.name > b.name) return 1
        else if (a.name < b.name) return -1
        else return 0
    }

    sortByAlphabet = () => {
        return this.props.resource && this.props.resource.slice().sort(this.getCloserName);
    }

    sortByDistance = () => {
        return this.props.resource && this.props.resource.slice().sort(this.getCloserResource);
    }

    handleSortChange = (newSort: () => void) => {
        if (this.state.dataSort !== newSort)
            this.setState({
                // Set the dataSort variable to whichever sort function is chosen
                dataSort: newSort,
            });
    }

    render() {
        const sortOptions = [
            { key: 'Alphabetically', sort: this.sortByAlphabet, disabled: false }
            , { key: 'Distance', sort: this.sortByDistance, disabled: !this.props.currentPosition }
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
                    sortedData.map((resource, index) => (
                        <OrganizationCard
                            key={resource.id}
                            index={resource.id}
                            organization={resource}
                            currentPos={this.props.currentPosition}
                            saveItem={() => this.props.saveItem(resource)}
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
