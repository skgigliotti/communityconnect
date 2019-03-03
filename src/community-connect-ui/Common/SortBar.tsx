import React from 'react';
import { SortOptions } from "community-connect";
import { ButtonGroup } from "./ButtonGroup";

type Props = {
    onSortChange: (newSort: any) => void;
    sortOptions: SortOptions;
}
export class SortBar extends React.Component<Props> {
    handleClick = (e: any) => {
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
                        {
                            this.props.sortOptions.map
                                ? 
                                    this.props.sortOptions.map((sortOption, index) => (
                                        <option key={sortOption.key} value={index} disabled={sortOption.disabled}>
                                            {sortOption.key}
                                        </option>
                                    ))
                                : null
                        }
                    </select>
                </ButtonGroup>
            </>
        );
    }
}
