import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Proyecto } from '../model/proyecto';

import { ProyectoService } from '../service/proyecto.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyecto: Proyecto[] = [];

  constructor(private proyectoS: ProyectoService, private tokenService: TokenService,
     public activatedRouter: ActivatedRoute ) { }
  
     isLogged = false;

  ngOnInit(): void {
    this.cargarProyecto();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarProyecto(): void{
    this.proyectoS.lista().subscribe(
      data =>{
        this.proyecto = data;
      }
    )
  }

  delete(id?: number){
    if( id != undefined){
      this.proyectoS.delete(id).subscribe(
        data => {
          this.cargarProyecto();
        }, err => {
          alert("No se pudo eliminar");
        }
      )
    }
  }

 

}

