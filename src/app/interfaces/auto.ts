export interface Auto {
    id : number;
    brand : string;
    model : string;
    price : number;
    power : number;
    photo : string;
    availability : number;
    description? : string; // optionnelle : sert à afficher le détail d'une voiture
}
