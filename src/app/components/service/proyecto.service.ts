import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../model/proyecto';
import { Storage, ref, uploadBytes, list,getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  //URL = 'https://backend-c8hy.onrender.com/proyectos/';
  URL = 'http://localhost:8080/proyectos/';

  urlP: string = "";
 
  constructor(private httpClient: HttpClient , private storage : Storage) { }


  public lista(): Observable<Proyecto[]> {
    return this.httpClient.get<Proyecto[]>(this.URL + 'lista');
  }

  public detail(id: number): Observable<Proyecto> {

    return this.httpClient.get<Proyecto>(this.URL + `detail/${id}`);
  }

  public save(proyecto: Proyecto): Observable<any> {
    return this.httpClient.post<any>(this.URL + 'create', proyecto);
  }

  public update(id: number, proyecto: Proyecto): Observable<any> {

    return this.httpClient.put<any>(this.URL + `update/${id}`, proyecto);
  }
  public delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.URL + `delete/${id}`);
  }



  public uploadImagenPnew($event: any, name: string){
    const file = $event.target.files[0]
    const imaRef = ref(this.storage, 'imagenP/' + name)
    uploadBytes(imaRef, file)
      .then(response => { this.getImagenPnew() })
      .catch(error => console.log(error)
      )
  }

  /*public uploadImagenPnew2(file: any, name: string){
    const imaRef = ref(this.storage, 'imagenP/' + name)
    uploadBytes(imaRef, file)
      .then(response => { this.getImagenPnew()      
        console.log("uploadImagenPnew2: " + this.urlP);
        return this.urlP;
      })
      .catch(error => console.log(error)
      )
      return "";
  }*/

  public uploadImagenPnew2(file: any, name: string){
    const imaRef = ref(this.storage, 'imagenP/' + name)
    uploadBytes(imaRef, file)
      .then(async response => { await this.getImagenPnew()      
        //console.log("uploadImagenPnew2: " + this.urlP );
        //return this.urlP;
      })
      .catch(error => console.log(error)
      )
     
  }
 
  public getImagenPnew() {
    const imageRef = ref(this.storage, 'imagenP')
    list(imageRef)
      .then(async response => {
        for (let item of response.items) {
          this.urlP = await getDownloadURL(item);
          console.log(" la Url es :" + this.urlP)
          
          
        }
      })
      .catch(error => console.log(error))
  }

  public getURLP() {    
    console.log("getURLP: " + this.urlP);
  
  }
 
  public clearUrlP(){
    this.urlP = "";
  }

  public uploadImagenPnew3($event: any, name: string){
    const file = $event.target.files[0]
    const imaRef = ref(this.storage, 'imagenP/' + name)
    uploadBytes(imaRef, file)
      .then(response => { this.getImagenPnew3() })
      .catch(error => console.log(error)
      )
  }

  getImagenPnew3() {
    const imageRef = ref(this.storage, 'imagenP')
    list(imageRef)
      .then(async response => {
        for (let item of response.items) {
          this.urlP = await getDownloadURL(item);
          console.log(" la Url es :" + this.urlP)
        }
      })
      .catch(error => console.log(error))
  }
}
