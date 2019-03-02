import React from 'react';

import { CardGrid, CategoryList } from "../AdminPage";

type Props = {
    currentPosition: string;
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
