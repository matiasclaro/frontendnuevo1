import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from '../model/proyecto';
import { ImageService } from '../service/image.service';
import { ProyectoService } from '../service/proyecto.service';

@Component({
  selector: 'app-edit-proyecto',
  templateUrl: './edit-proyecto.component.html',
  styleUrls: ['./edit-proyecto.component.css']
})
export class EditProyectoComponent implements OnInit {

  proyecto : Proyecto = null;
  
  constructor(private activatedRouter: ActivatedRoute ,
     private proyectoService : ProyectoService,
      public imagenService : ImageService ,
      private router : Router){}
  
  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.proyectoService.detail(id).subscribe(
      data =>{
        this.proyecto = data;
      }, err =>{
         alert("Error al modificar");
         this.router.navigate(['']);
      }
    )
  }

  onUpdate(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.proyecto.imgP = this.imagenService.url
    this.proyectoService.update(id, this.proyecto).subscribe(
      data => {
        this.router.navigate(['']);
      }, err => {
        alert("Error al modificar el proyecto");
        this.router.navigate(['']);
      }
    )
  }

  

  uploadImage($event: any){
    const id = this.activatedRouter.snapshot.params['id']
    const name = "proyecto_" + id;
    this.imagenService.uploadImage($event,name);
    
  }
  
}
