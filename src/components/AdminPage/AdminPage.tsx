import React from 'react';
import { CurrentPosition } from "community-connect";

import { CardGrid, CategoryList } from "../AdminPage";

type Props = {
    currentPosition: CurrentPosition
};

const AdminPage: React.FC<Props> = ({ currentPosition }) => (
    <>
        <CategoryList/>
        <CardGrid
            currentPosition={currentPosition}
        />
    </>
)

export default AdminPage;
