export class Educacion {
    id : number;
    nombreEdu : string;
    descripcionEdu : string;
    imgEdu: string;

    constructor(nombreEdu: string, descripcionEdu: string, imgEdu: string) {
        this.nombreEdu = nombreEdu;
        this.descripcionEdu = descripcionEdu;
        this.imgEdu = imgEdu;
    }

}
