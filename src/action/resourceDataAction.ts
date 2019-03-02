import * as types from './actionType';
import {getAllResources} from '../api/googlesheetApi';

const loadResourceDataStart = () => ({ type: types.LOAD_RESOURCE_DATA_START, isFetchingResource: true })
const loadResourceDataSuccess = (resource: any) => ({ type: types.LOAD_RESOURCE_DATA_SUCCESS, resource, isFetchingResource: false })
const loadResourceDataFailure = (error: any) => ({ type: types.LOAD_RESOURCE_DATA_FAILURE, error })

export function loadCategories(){
    return { type: types.LOAD_CATEGORIES }
}


export function loadResources(){
    return function (dispatch: any) {
        dispatch(loadResourceDataStart());
        return getAllResources.then(resources => {
            dispatch(loadResourceDataSuccess(resources));
        }).catch(error => {
            dispatch(loadResourceDataFailure(error));
        });
    }
}

export function filterByCategories(filteredResource: any){
    return { type: types.FILTER_RESOURCE_BY_CATEGORIES, filteredResource }
}

export function filterBySearch(searchedResource: any){
    return { type: types.FILTER_RESOURCE_BY_SEARCH, searchedResource }
}

export function addSavedResource(savedResource: any){
    return { type: types.ADD_SAVED_RESOURCE, savedResource }
}

export function removeSavedResource(savedResourceIndex: any){
    return { type: types.REMOVE_SAVED_RESOURCE, savedResourceIndex }
}
