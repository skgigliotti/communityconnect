import React from 'react';

import { AdminPageWrapper, CategoryWrapper } from './AdminPageLayout';
import CategoryList from './CategoryList';
import CardGrid from './CardGrid';

const AdminPage = ({currentPosition}) => (
    <AdminPageWrapper>


        <CategoryWrapper>
            <CategoryList />
        </CategoryWrapper>
            
        
        
        <CardGrid currentPos={currentPosition} />
    
        
    </AdminPageWrapper>
)


export default AdminPage;
