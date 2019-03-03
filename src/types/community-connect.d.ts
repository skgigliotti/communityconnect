declare module "community-connect" {
    type Coordinates = {
        coordinates: {
            lat: number;
            lng: number;
        }
    }
    type History = {
        pathname: string;
        search: string;
        push: (params: { 
            pathname: string; 
            search: string;
        }) => void;
    }
    type Organization = {
        id: string;
        name: string; 
        categoryAutoSortScript: any;
        overview: any;
        location: any;
        website: string; 
        facebookUrl: string;
        instagramUrl: string; 
        twitterUrl: string;
        phone: string; 
        latitude: string; 
        longitude: string;
        coordinates: CurrentPosition;
        distance: string;
        distanceElement: string;
        removeItem: () => void;
    }
    type Resource = {
        id?: string;
        hashCoordinates?: any;
        coordinates: Coordinates;
        filter: (Resource) => {
            map: (any) => React.ReactNode;
        };
        showInfo: boolean;
        name?: string;
    }
    type SortOptions = {
        e?: {
            target: {
                value: any;
            }
        }
        key?: string;
        disabled?: boolean;
        map?: (a: any, index: number) => void;
        sort?: () => void;
    }
}
