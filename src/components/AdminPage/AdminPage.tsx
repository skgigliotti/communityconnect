import React from 'react';
import { Coordinates } from "community-connect";

import { CardGrid, CategoryList } from "../AdminPage";

type Props = {
    currentPosition: Coordinates
    resource?: any;
    actions?: any;
    categories?: any;
};

export const AdminPage: React.FC<Props> = ({ currentPosition, resource, actions, categories }) => (
    <>
        <CategoryList
            resource={resource}
            actions={actions}
            categories={categories}
        />
        <CardGrid
            currentPosition={currentPosition}
        />
    </>
)
