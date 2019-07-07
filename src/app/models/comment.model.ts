
export class Comment {
    idUser: number;
    idComment: number;
    idVideo: number;
    avis: string;
    date: Date;

    constructor(idUser: number,
                idComment: number,
                idVideo: number,
                avis: string,
                date: Date){
        this.idUser = idUser;
        this.idComment = idComment;
        this.idVideo = idVideo;
        this.avis = avis;
        this.date = date;
    }
}