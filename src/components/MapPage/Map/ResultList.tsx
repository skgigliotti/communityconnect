import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CurrentPosition } from "community-connect";
import { OrganizationCard, SortBar } from "../../../community-connect-ui/Common";
import { getDistance } from '../../../utils';
import * as resourceAction from '../../../action/resourceDataAction';

type Props = {
    currentPosition: CurrentPosition;
    savedResource: any;
}
export class ResultList extends Component<Props> {

    constructor(props: Props) {
        super(props)

        this.state = {
            dataSort: this.sortByAlphabet,
        }

        this.sortByAlphabet = this.sortByAlphabet.bind(this);
        this.sortByDistance = this.sortByDistance.bind(this);
        this.getCloserName = this.getCloserName.bind(this);
        this.getCloserResource = this.getCloserResource.bind(this);
        this.listRef = React.createRef()
    }

    scrollToElement = (index: any) => {
        this.refs[parseInt(index) + 1].getRef()
    }

    getCloserResource = (a: any, b: any) => {
        if (getDistance({ a, this.props.currentPosition })
            > getDistance({ b, this.props.currentPosition })) {
            return 1;
        }

        return -1;
    }

    getCloserName = (a: { name: string }, b: { name: string }) => {
        if (a.name > b.name) return 1
        else if (a.name < b.name) return -1
        else return 0
    }


    sortByAlphabet = () => {
        return this.props.savedResource.slice().sort(this.getCloserName);
    }

    sortByDistance = () => {
        return this.props.savedResource.slice().sort(this.getCloserResource);
    }

    handleSortChange = (newSort) => {
        if (this.state.dataSort !== newSort)
            this.setState({
                // Set the dataSort variable to whichever sort function is chosen
                dataSort: newSort,
            })
    }

    cardClick = (id: any) => {
        this.props.savedResource.findIndex(resource => {
            return resource.id === id;
        })

    }
    saveResource = (resource: any) => {
        if (!this.props.savedResource.some(r => r.id === resource.id)) {
            this.props.actions.addSavedResource(this.props.savedResource.slice())
        }
    }

    render() {
        const sortOptions = [
            { key: 'Alphabetically', sort: this.sortByAlphabet, disabled: false }
            , { key: 'Distance', sort: this.sortByDistance, disabled: !this.props.currentPos }
        ];

        // Render will be called every time this.props.data is updated, and every time handleSortChange
        // updates the this.state.dataSort variable.
        // this.state.dataSort() sorts data to feed into the OrganizationCards without modifying the
        // source of data
        const sortedData = this.state.dataSort();
        return (
            <>
                <SortBar
                    onSortChange={this.handleSortChange}
                    sortOptions={sortOptions}
                />
                <React.Fragment ref={this.listRef}>
                    {
                        sortedData.map((resource, index) =>
                            <OrganizationCard
                                key={resource.id}
                                ref={resource.id}
                                index={resource.id}
                                cardClick={this.cardClick}
                                organization={resource}
                                currentPos={this.props.currentPos}
                                saveItem={() => this.props.saveItem(resource)}
                            />
                        )
                    }
                </React.Fragment>
            </>
        );

    }
}

function mapStateToProps(state, ownProps) {
    return {
        savedResource: state.savedResource.length > 0 ? state.savedResource : state.resource
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(resourceAction, dispatch),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ResultList);