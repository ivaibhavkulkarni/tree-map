
export interface Tree {
  id: number;
  species: string;
  scientificName: string;
  age: number;
  height: number;
  health: "Good" | "Fair" | "Poor";
  lastMaintenance: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    area: string;
  };
}

export const hyderabadTrees: Tree[] = [
  {
    id: 1,
    species: "Neem Tree",
    scientificName: "Azadirachta indica",
    age: 15,
    height: 12,
    health: "Good",
    lastMaintenance: "March 10, 2023",
    location: {
      lat: 17.385044,
      lng: 78.486671,
      address: "Near Hussain Sagar Lake",
      area: "Tank Bund",
    },
  },
  {
    id: 2,
    species: "Gulmohar",
    scientificName: "Delonix regia",
    age: 8,
    height: 9,
    health: "Good",
    lastMaintenance: "April 22, 2023",
    location: {
      lat: 17.415501,
      lng: 78.426054,
      address: "KBR Park Entrance",
      area: "Jubilee Hills",
    },
  },
  {
    id: 3,
    species: "Banyan Tree",
    scientificName: "Ficus benghalensis",
    age: 45,
    height: 20,
    health: "Good",
    lastMaintenance: "January 15, 2023",
    location: {
      lat: 17.406487,
      lng: 78.47525,
      address: "Public Gardens",
      area: "Nampally",
    },
  },
  {
    id: 4,
    species: "Peepal Tree",
    scientificName: "Ficus religiosa",
    age: 30,
    height: 18,
    health: "Fair",
    lastMaintenance: "February 8, 2023",
    location: {
      lat: 17.361623,
      lng: 78.47489,
      address: "Near Charminar",
      area: "Old City",
    },
  },
  {
    id: 5,
    species: "Tamarind Tree",
    scientificName: "Tamarindus indica",
    age: 25,
    height: 14,
    health: "Good",
    lastMaintenance: "May 5, 2023",
    location: {
      lat: 17.437328,
      lng: 78.44812,
      address: "Secunderabad Junction",
      area: "Secunderabad",
    },
  },
  {
    id: 6,
    species: "Rain Tree",
    scientificName: "Samanea saman",
    age: 20,
    height: 16,
    health: "Fair",
    lastMaintenance: "March 25, 2023",
    location: {
      lat: 17.423134,
      lng: 78.538642,
      address: "ECIL Main Road",
      area: "Habsiguda",
    },
  },
  {
    id: 7,
    species: "Mango Tree",
    scientificName: "Mangifera indica",
    age: 12,
    height: 10,
    health: "Good",
    lastMaintenance: "April 10, 2023",
    location: {
      lat: 17.395957,
      lng: 78.382542,
      address: "University of Hyderabad",
      area: "Gachibowli",
    },
  },
  {
    id: 8,
    species: "Ashoka Tree",
    scientificName: "Saraca asoca",
    age: 7,
    height: 8,
    health: "Good",
    lastMaintenance: "May 15, 2023",
    location: {
      lat: 17.441263,
      lng: 78.391106,
      address: "Hitech City Main Road",
      area: "Madhapur",
    },
  },
  {
    id: 9,
    species: "Teak Tree",
    scientificName: "Tectona grandis",
    age: 18,
    height: 15,
    health: "Fair",
    lastMaintenance: "February 20, 2023",
    location: {
      lat: 17.369084,
      lng: 78.529637,
      address: "LB Nagar Junction",
      area: "LB Nagar",
    },
  },
  {
    id: 10,
    species: "Indian Coral Tree",
    scientificName: "Erythrina variegata",
    age: 9,
    height: 11,
    health: "Poor",
    lastMaintenance: "January 5, 2023",
    location: {
      lat: 17.490115,
      lng: 78.399511,
      address: "Kompally Main Road",
      area: "Kompally",
    },
  },
  {
    id: 11,
    species: "Arjuna Tree",
    scientificName: "Terminalia arjuna",
    age: 22,
    height: 17,
    health: "Good",
    lastMaintenance: "March 18, 2023",
    location: {
      lat: 17.349338,
      lng: 78.451097,
      address: "Nehru Zoological Park",
      area: "Bahadurpura",
    },
  },
  {
    id: 12,
    species: "Kadamba Tree",
    scientificName: "Neolamarckia cadamba",
    age: 14,
    height: 13,
    health: "Good",
    lastMaintenance: "April 30, 2023",
    location: {
      lat: 17.416482,
      lng: 78.506479,
      address: "Uppal Main Road",
      area: "Uppal",
    },
  },
  {
    id: 13,
    species: "Jamun Tree",
    scientificName: "Syzygium cumini",
    age: 16,
    height: 12,
    health: "Fair",
    lastMaintenance: "February 12, 2023",
    location: {
      lat: 17.407927,
      lng: 78.549395,
      address: "Nacharam Industrial Area",
      area: "Nacharam",
    },
  },
  {
    id: 14,
    species: "Jackfruit Tree",
    scientificName: "Artocarpus heterophyllus",
    age: 11,
    height: 9,
    health: "Good",
    lastMaintenance: "May 22, 2023",
    location: {
      lat: 17.323924,
      lng: 78.428242,
      address: "Rajendranagar Road",
      area: "Rajendranagar",
    },
  },
  {
    id: 15,
    species: "Sandalwood Tree",
    scientificName: "Santalum album",
    age: 10,
    height: 7,
    health: "Good",
    lastMaintenance: "January 28, 2023",
    location: {
      lat: 17.453531,
      lng: 78.367453,
      address: "BHEL Township",
      area: "Lingampally",
    },
  },
];