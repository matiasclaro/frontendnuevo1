import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from '../model/proyecto';
import { ImagenProyectoService } from '../service/imagen-proyecto.service';
import { ProyectoService } from '../service/proyecto.service';
import { TokenService } from '../service/token.service';


@Component({
  selector: 'app-new-proyecto',
  templateUrl: './new-proyecto.component.html',
  styleUrls: ['./new-proyecto.component.css']
})
export class NewProyectoComponent implements OnInit {

  nombreP: string = '';
  descripcionP: string = '';
  imagenP: string = '';
  linkP: string = "";
  

  constructor(public imagenProyectoService: ImagenProyectoService, 
              private router: Router,
              private proyectoService: ProyectoService,
              private tokenService: TokenService) { }

  isLogged = false;

  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

    this.imagenProyectoService.clearUrl();

  }

  onCreate(): void {
    this.imagenP = this.imagenProyectoService.urlProy;
    const proy = new Proyecto(this.nombreP, this.descripcionP, this.imagenP,this.linkP);
    this.proyectoService.save(proy).subscribe(
      data => {
        alert("Proyecto añadido");
        this.router.navigate(['']);
      }, err => {
        alert("Falló");
        this.router.navigate(['']);
      }
    )

  }

  uploadImageProy($event:any) {
    
    const name = "imagenProy" + Date.now();
    this.imagenProyectoService.uploadImageProy($event, name);

  }








}