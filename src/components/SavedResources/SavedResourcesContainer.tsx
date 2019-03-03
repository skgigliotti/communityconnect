import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Coordinates} from "community-connect";
import { SavedResource } from '../SavedResources';

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    // padding: grid * 2,
    // margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    // background: isDragging ? 'lightgrey' : 'white',

    // styles we need to apply on draggables
    ...draggableStyle,
});

// const getliststyle = isdraggingover: any => ({
//     background: isdraggingover ? 'lightblue' : 'white',
//     padding: grid,
//     width: 250,
// });

type Result = {
    destination: {
        index: number;
    };
    source: {
        index: number;
    };
};

type Item = {
    id: number;
};

type Props = {
    data: [];
    currentPosition: Coordinates;
    removeItem: (item: Item) => void;
};

type State = {
    data: [];
}

class SavedResourcesContainerClass extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            data: Object.assign([], this.props.data)
        }
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    //Using deprecated function necessary to update data with store's data
    componentWillReceiveProps(nextProps: Props) {
        this.setState({ data: Object.assign([], nextProps.data) });
    }
    onDragEnd(result: Result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        this.orderResources(
            result.source.index,
            result.destination.index
        );
    }

    orderResources = (sourceIndex: number, destinationIndex: number) => {
        let newSavedResources = this.props.data.slice();

        let movedResource = newSavedResources[sourceIndex];
        newSavedResources.splice(sourceIndex, 1);
        newSavedResources.splice(destinationIndex, 0, movedResource);

        this.setState({
            data: newSavedResources,
        })
    }
    render() {
        // Render will be called every time this.props.data is updated, and every time handleSortChange
        // updates the this.state.dataSort variable.
        // this.state.dataSort() sorts data to feed into the OrganizationCards without modifying the
        // source of data

        const { data } = this.state;
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided: any, snapshot: any) => (
                        <div
                            ref={provided.innerRef}
                            // style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {data.map((item: Item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided: any, snapshot: any) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            <SavedResource
                                                key={item.id}
                                                ref={item.id}
                                                // cardClick={this.props.cardClick}
                                                history={history} // this needs to be tested
                                                organization={item}
                                                currentPosition={this.props.currentPosition}
                                                removeItem={() => this.props.removeItem(item)}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

function mapStateToProps(state: any, ownProps: any) {
    return {
        data: state.savedResource
    }
}

export const SavedResourcesContainer = connect(mapStateToProps)(SavedResourcesContainerClass);
