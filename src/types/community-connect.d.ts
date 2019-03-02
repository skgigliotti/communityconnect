declare module "community-connect" {
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
    }
    type History = {
        pathname: string;
        search: string;
        push: (params: { 
            pathname: string; 
            search: string;
        }) => void;
    }
    type CurrentPosition = {
        coordinates: {
            lat: string;
            lng: string;
        }
    }
}
