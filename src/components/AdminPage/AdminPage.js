import React from 'react';

import CategoryList from './CategoryList';
import CardGrid from './CardGrid';

const AdminPage = ({currentPosition}) => (
    <>
        <CategoryList/>
        <CardGrid
            currentPos={currentPosition}
        />
    </>
)

export default AdminPage;
