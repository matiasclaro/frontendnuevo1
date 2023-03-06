import { Injectable } from '@angular/core';
import {Storage, getDownloadURL, list, ref, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImagenEduService {

  urlEdu: string = "";
  
  constructor(private storage: Storage) { }

  public uploadImageEdu($event: any, name: string) {
    const file = $event.target.files[0]
    const imaRef = ref(this.storage, `imagenEdu/`+ name);
    uploadBytes(imaRef, file)
      .then(response => { this.getImagesEdu() })
      .catch(error => console.log(error)
      )
  }
 
  getImagesEdu() {
    const imageRef = ref(this.storage, 'imagenEdu' )
    list(imageRef)
      .then(async response => {
        for (let item of response.items) {
          this.urlEdu = await getDownloadURL(item);
          console.log(" la Url es :" + this.urlEdu)
        }
      })
      .catch(error => console.log(error))
  }

  public clearUrl(){
    this.urlEdu = "";
  }
}
