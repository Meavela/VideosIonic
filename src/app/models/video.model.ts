
export class Video {
    idVideo: number;
    titre: string;
    type: string;
    genre: string;
    date: Date;
    description: string;
    idUser: number;
    idUtilisateur: string;
    image: string;

    constructor(titre: string,
                type: string,
                genre: string,
                description: string,
                image: string,
                date: Date,
                idUtilisateur: string,
                idUser: number,
                idVideo: number){
        this.idVideo = idVideo;
        this.titre = titre;
        this.type = type;
        this.genre = genre;
        this.date = date;
        this.description = description;
        this.idUtilisateur = idUtilisateur;
        this.idUser = idUser;
        this.image = image;
    }
}