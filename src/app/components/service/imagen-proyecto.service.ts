import { Injectable } from '@angular/core';
import { Storage, ref, getDownloadURL, uploadBytes, list } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImagenProyectoService {

  urlProy: string = "";
  
  constructor(private storage: Storage) { }

  public uploadImageProy($event: any, name: string) {
    const file = $event.target.files[0]
    const imaRef = ref(this.storage, `imagenProyecto/`+ name);
    uploadBytes(imaRef, file)
      .then(response => { this.getImagesProy() })
      .catch(error => console.log(error)
      )
  }
 
  getImagesProy() {
    const imageRef = ref(this.storage, 'imagenProyecto' )
    list(imageRef)
      .then(async response => {
        for (let item of response.items) {
          this.urlProy = await getDownloadURL(item);
          console.log(" la Url es :" + this.urlProy)
        }
      })
      .catch(error => console.log(error))
  }

  public clearUrl(){
    this.urlProy = "";
  }
}
