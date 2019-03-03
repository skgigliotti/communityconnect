import React, { Component, AnchorHTMLAttributes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Coordinates, Resource, SortOptions } from "community-connect";
import { OrganizationCard, SortBar } from "../../community-connect-ui/common";
import { getCloserName, getCloserResource } from '../../utils';
import * as resourceAction from '../../action/resourceDataAction';

type Props = {
    currentPosition: Coordinates;
    savedResource?: any;
    actions?: any;
    saveItem?: (resource: any) => void;
    fullWidth?: boolean;
}

type State = {
    // dataSort: () => void;
    dataSort: any; 
    listRef: any;
}
export class ResultList extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            dataSort: this.sortByAlphabet,
            listRef: React.createRef()
        }

        this.sortByAlphabet = this.sortByAlphabet.bind(this);
        this.sortByDistance = this.sortByDistance.bind(this);
    }

    scrollToElement = (index: any) => {
        this.refs[parseInt(index) + 1].getRef()
    }

    sortByAlphabet = () => {
        return this.props.savedResource.slice().sort(getCloserName);
    }

    sortByDistance = () => {
        return this.props.savedResource.slice().sort(getCloserResource);
    }

    handleSortChange = (newSort: () => void) => {
        if (this.state.dataSort !== newSort)
            this.setState({
                // Set the dataSort variable to whichever sort function is chosen
                dataSort: newSort,
            })
    }

    cardClick = (id: any) => {
        this.props.savedResource.findIndex((resource: any) => {
            return resource.id === id;
        })

    }
    saveResource = (resource: any) => {
        if (!this.props.savedResource.some((r: Resource) => r.id === resource.id)) {
            this.props.actions.addSavedResource(this.props.savedResource.slice())
        }
    }

    render() {
        const sortOptions: SortOptions[] = [
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
                <SortBar
                    onSortChange={this.handleSortChange}
                    sortOptions={sortOptions}
                />
                <div ref={this.state.listRef}>
                    {
                        sortedData.map((resource: any) =>
                            <OrganizationCard
                                key={resource.id}
                                ref={resource.id}
                                index={resource.id}
                                cardClick={this.cardClick}
                                organization={resource}
                                currentPos={this.props.currentPosition}
                                saveItem={() => {
                                    if (this.props.saveItem) {
                                        this.props.saveItem(resource)
                                    }
                                }}
                            />
                        )
                    }
                </div>
            </>
        );
    }
}

function mapStateToProps(state: any, ownProps: any) {
    return {
        savedResource: state.savedResource.length > 0 ? state.savedResource : state.resource
    }
}
function mapDispatchToProps(dispatch: any) {
    return {
        actions: bindActionCreators(resourceAction, dispatch),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ResultList);