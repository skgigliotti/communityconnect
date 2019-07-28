import React from 'react';

import { AdminPageWrapper, CardWrapper } from './AdminPageLayout';
import CategoryList from './CategoryList';
import CardGrid from './CardGrid';

const AdminPage = ({currentPosition}) => (
    <AdminPageWrapper>

        <CategoryList />
        <CardWrapper>
            <CardGrid currentPos={currentPosition} />
        </CardWrapper>
        
    </AdminPageWrapper>
)


export default AdminPage;
