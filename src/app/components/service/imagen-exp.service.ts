import { Injectable } from '@angular/core';
import {Storage, getDownloadURL, list, ref, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImagenExpService {

  urlExp: string = "";
  
  constructor(private storage: Storage) { }

  public uploadImageExp($event: any, name: string) {
    const file = $event.target.files[0]
    const imaRef = ref(this.storage, `imagenExp/`+ name);
    uploadBytes(imaRef, file)
      .then(response => { this.getImagesExp() })
      .catch(error => console.log(error)
      )
  }
 
  getImagesExp() {
    const imageRef = ref(this.storage, 'imagenExp' )
    list(imageRef)
      .then(async response => {
        for (let item of response.items) {
          this.urlExp = await getDownloadURL(item);
          console.log(" la Url es :" + this.urlExp)
        }
      })
      .catch(error => console.log(error))
  }

  public clearUrl(){
    this.urlExp = "";
  }
}
