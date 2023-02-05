import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from '../model/proyecto';
import { ImageService } from '../service/image.service';
import { ProyectoService } from '../service/proyecto.service';

@Component({
  selector: 'app-new-proyecto',
  templateUrl: './new-proyecto.component.html',
  styleUrls: ['./new-proyecto.component.css']
})
export class NewProyectoComponent implements OnInit  {


  nombreP : string;
  descripcionP : string;
  imgP : string;


  constructor(private proyectoS : ProyectoService, private router : Router ,
     public activatedRouter: ActivatedRoute ,public imagenService : ImageService){

  }
  
  
  ngOnInit(): void {
   
  }
  onCreate(): void {
    const proyecto = new Proyecto(this.nombreP, this.descripcionP, this.imgP);
    
    this.proyectoS.save(proyecto).subscribe(
      data =>{
        alert("Proyecto añadido correctamente");
        this.router.navigate([""]);
      },err =>{
        alert("falló");
        this.router.navigate([""]);
      }
    )
      
    }

    uploadImage($event: any){
      const id = this.activatedRouter.snapshot.params['id']
      const name = "proyecto_" + id;
      this.imagenService.uploadImage($event,name);
      
    }
  }
