import qs from 'qs-lite';

import * as types from '../action/actionType';
import initialState from './initialState';


export function resource(state = initialState.resource, action: any) {
    switch (action.type) {
        case types.LOAD_RESOURCE_DATA_SUCCESS:
            return Object.assign([], state, action.resource);
        default: return state;
    }
}

export function isFetchingResource(state = initialState.isFetchingResource, action: any) {
    switch (action.type) {
        case types.LOAD_RESOURCE_DATA_START:
            return true;
        case types.LOAD_RESOURCE_DATA_SUCCESS:
            return false;
        default: return state;
    }
}

export function categories(state = initialState.categories, action: any) {
    switch (action.type) {
        case types.LOAD_RESOURCE_DATA_SUCCESS:
            const categories = {};
            for (let data of action.resource) {
                let category = data.categoryAutoSortScript.split(',');
                category.forEach((cat: any) => categories[cat] = cat.trim());
            }
            const categoryList = [...(new Set(Object.values(categories)))];
            let index = categoryList.indexOf("");
            if (index > -1) {
                categoryList.splice(index, 1);
            }

            return Object.assign([], state, categoryList);

        default:
            return state;
    }
}

export function filteredResource(state = initialState.filteredResource, action: any) {
    switch (action.type) {
        case types.LOAD_RESOURCE_DATA_SUCCESS:
            return Object.assign([], state, action.resource);
        case types.FILTER_RESOURCE_BY_CATEGORIES:
            return action.filteredResource;
        default:
            return state;
    }
}

export function searchedResource(state = initialState.searchedResource, action: any) {
    switch (action.type) {
        case types.LOAD_RESOURCE_DATA_SUCCESS:
            return Object.assign([], state, action.resource);
        case types.FILTER_RESOURCE_BY_SEARCH:
            return action.searchedResource;
        default:
            return state;
    }
}

export function savedResource(state = initialState.savedResource, action: any) {
    switch (action.type) {
        case types.LOAD_RESOURCE_DATA_SUCCESS:
            const query = qs.parse(window.location.search.replace('?', ''));
            let selectedResourceIds = [];
            if (query.resources) {
                selectedResourceIds = query.resources.split(',');
            }

            const selectedResources: any[] = [];
            selectedResourceIds.forEach(selectedResourceId => {
                action.resource.forEach((resource: { id: string }) => {
                    if (resource.id === selectedResourceId) {
                    selectedResources.push(resource);
                    }
                });
            })

            return Object.assign([], state, selectedResources);
        case types.ADD_SAVED_RESOURCE:
            return [
                ...state,
                Object.assign([], state, action.savedResource)
            ];
        case types.REMOVE_SAVED_RESOURCE:
            return state.filter((resource: { id: number }) => action.savedResourceIndex !== resource.id);
        default:
            return state;
    }
}

