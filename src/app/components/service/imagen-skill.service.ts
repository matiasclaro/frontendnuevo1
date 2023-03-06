import { Injectable } from '@angular/core';
import {Storage, getDownloadURL, list, ref, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImagenSkillService {

  urlSkill: string = "";
  
  constructor(private storage: Storage) { }

  public uploadImageSkill($event: any, name: string) {
    const file = $event.target.files[0]
    const imaRef = ref(this.storage, `imagenSkill/`+ name);
    uploadBytes(imaRef, file)
      .then(response => { this.getImagesSkill() })
      .catch(error => console.log(error)
      )
  }
 
  getImagesSkill() {
    const imageRef = ref(this.storage, 'imagenSkill' )
    list(imageRef)
      .then(async response => {
        for (let item of response.items) {
          this.urlSkill = await getDownloadURL(item);
          console.log(" la Url es :" + this.urlSkill)
        }
      })
      .catch(error => console.log(error))
  }

  public clearUrl(){
    this.urlSkill = "";
  }
}




