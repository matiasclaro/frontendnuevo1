import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from '../model/proyecto';

import { ImagenProyectoService } from '../service/imagen-proyecto.service';
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
      public imagenProyectoService : ImagenProyectoService ,
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

  onUpdateP(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.proyecto.imagenP = this.imagenProyectoService.urlProy;
    this.proyectoService.update(id, this.proyecto).subscribe(
      data => {
        alert("Proyecto modificado");
        this.router.navigate(['']);
      }, err => {
        alert("Error al modificar proyecto");
        this.router.navigate(['']);
      }
    )
  }

  

  uploadImageProy($event: any){
     
     const name = "imagenProy" + Date.now();
    this.imagenProyectoService.uploadImageProy($event, name);
    
  }
  

  }

