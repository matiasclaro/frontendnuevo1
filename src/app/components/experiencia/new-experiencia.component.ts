import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experiencia } from '../model/experiencia';
import { ImagenExpService } from '../service/imagen-exp.service';
import { SExperienciaService } from '../service/s-experiencia.service';
import { TokenService } from '../service/token.service';



@Component({
  selector: 'app-new-experiencia',
  templateUrl: './new-experiencia.component.html',
  styleUrls: ['./new-experiencia.component.css']
})



export class NewExperienciaComponent implements OnInit {
  nombreE: string = '';
  descripcionE: string = '';
  imgE: string = '';
  
   



  constructor(private sExperiencia: SExperienciaService,
              private router: Router,
              public imagenExpService: ImagenExpService,
              private tokenService : TokenService) { }

              isLogged = false;

              ngOnInit(): void {
            
                if (this.tokenService.getToken()) {
                  this.isLogged = true;
                } else {
                  this.isLogged = false;
                }
                this.imagenExpService.clearUrl();
              }

  onCreate(): void {
    this.imgE = this.imagenExpService.urlExp;
    const expe = new Experiencia(this.nombreE, this.descripcionE,this.imgE);
    this.sExperiencia.save(expe).subscribe(
      data => {
        alert("Experiencia añadida");
        this.router.navigate(['']);
      }, err => {
        alert("Falló");
        this.router.navigate(['']);
      }
    )
  }
  uploadImageExp($event:any) {
    
    const name = "imagenExp" + Date.now();
    this.imagenExpService.uploadImageExp($event, name);

  }
 
}
