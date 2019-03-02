declare module "community-connect" {
    type CurrentPosition = {
        coordinates: {
            lat: string;
            lng: string;
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
        id: number;
        name: string; 
        categoryautosortscript: any;
        overview: any;
        location: any;
        website: string; 
        facebookUrl: string;
        instagramUrl: string; 
        twitterUrl: string;
        phone: string; 
        latitude: string; 
        longitude: string;
        coordinates: string;
        distance: string;
        distanceElement: string;
        removeItem: () => void;
    }
}
