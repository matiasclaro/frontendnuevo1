import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Educacion } from '../model/educacion';
import { EducacionService } from '../service/educacion.service';
import { ImagenEduService } from '../service/imagen-edu.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-neweducacion',
  templateUrl: './neweducacion.component.html',
  styleUrls: ['./neweducacion.component.css']
})
export class NeweducacionComponent implements OnInit  {
  nombreEdu : string;
  descripcionEdu : string;
  imgEdu : string;


  constructor(private educacionS : EducacionService, 
                      private router : Router, 
                      public imagenEduService : ImagenEduService,
                      private tokenService : TokenService) {

  }
  
  isLogged = false;

  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    this.imagenEduService.clearUrl();
  }
  onCreate(): void {
    this.imgEdu = this.imagenEduService.urlEdu;
    const educacion = new Educacion(this.nombreEdu, this.descripcionEdu, this.imgEdu);
    this.educacionS.save(educacion).subscribe(
      data =>{
        alert("Educacion añadida correctamente");
        this.router.navigate([""]);
      },err =>{
        alert("falló");
        this.router.navigate([""]);
      }
    )
      }

      uploadImageEdu($event:any) {
    
        const name = "imagenEdu" + Date.now();
        this.imagenEduService.uploadImageEdu($event, name);
    
      }
}
