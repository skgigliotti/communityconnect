import Tabletop from 'tabletop';

const revere_key = '1QolGVE4wVWSKdiWeMaprQGVI6MsjuLZXM5XQ6mTtONA';

type GoogleSheetResource = {
    name: string;
    tags: string[] | string;
    twitterUrl: string;
    twitterurl: string;
    facebookurl: string;
    facebookUrl: string;
    instagramurl: string;
    instagramUrl: string;
    hashCoordinates: string;
    latitude: string;
    longitude: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    serviceprovided: string;
    city: string;
    state: string;
    zipcode: string;
    address: string;
    location: string;
    combinedaddress: string;
}
function normalizeHeaders(element: GoogleSheetResource) {
    element["name"] = element["name"];
    element["tags"] = String(element["serviceprovided"]).split(", ");
    element["twitterUrl"] = element["twitterurl"];
    element["tags"] = String(element["serviceprovided"]);
    element["facebookUrl"] = element["facebookurl"];
    element["instagramUrl"] = element["instagramurl"];
    element["hashCoordinates"] = element["latitude"] + element["longitude"];
    if (element["latitude"] && element["longitude"]) {
        element["coordinates"] = { lat: parseFloat(element["latitude"]), lng: parseFloat(element["longitude"]) }
    }

    if (element.city || element.address || element.state || element.zipcode) {
        // element.location = element.address+ " " + element.city + ", " + element.state + " " + element.zipcode;
        element.location = element["combinedaddress"];
    } else {
        element.location = "";
    }

}

export let getAllResources = new Promise(function (resolve, reject) {
    Tabletop.init({
        key: revere_key,
        simpleSheet: false,
        prettyColumnNames: false,
        postProcess: normalizeHeaders,
        callback: (data: any, tabletop: any) => {
            let resource = tabletop.sheets("Data").elements;
            let filteredResource = resource.filter(function (resource: any) { return resource.truefalsevetting === 'TRUE' });
            resolve(filteredResource);
        }
    });
})

