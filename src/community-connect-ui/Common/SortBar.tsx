import React from 'react';
import { ButtonGroup } from "./ButtonGroup";

type Props = {
    onSortChange: (newSort) => void;
    sortOptions: {
        e: {
            target: {
                value: number | string;
            }
        }
    }
}
export class SortBar extends React.Component<Props> {
    handleClick = (e) => {
        // Get new sort based on index of sortOption array
        let newSort = this.props.sortOptions[e.target.value].sort;
        this.props.onSortChange(newSort);
    }

    render() {
        return (
            <>
                <p>Sort By:</p>
                <ButtonGroup>
                    <select onChange={this.handleClick}>
                        {this.props.sortOptions.map((sortOption, i) =>
                            <option key={sortOption.key} value={i} disabled={sortOption.disabled}>
                                {sortOption.key}
                            </option>
                        )}
                    </select>
                </ButtonGroup>
            </>
        );
    }
}
