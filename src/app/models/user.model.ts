
export class User {
    idUser: number;
    mail: string;
    nom: string;
    prenom: string;
    pseudo: string;

    constructor(idUser: number,
                mail: string,
                nom: string,
                prenom: string,
                pseudo: string){
        this.idUser = idUser;
        this.mail = mail;
        this.nom = nom;
        this.prenom = prenom;
        this.pseudo = pseudo;
    }
}