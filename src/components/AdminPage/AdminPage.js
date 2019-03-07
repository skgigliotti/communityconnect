// @flow
import React from 'react';

import CategoryList from './CategoryList';
import CardGrid from './CardGrid';

import type { Coordinates } from "../../types";

const AdminPage = ({currentPosition} : {currentPosition: Coordinates}) => {

    return (
        <div className="container-fluid pb-sm-5">
            <div className="row">
                <div className="col-sm-4">
                    <CategoryList/>
                </div>
                <div className="col-sm-8">
                    <CardGrid
                        currentPos={currentPosition}
                    />
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
