import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from '../model/experiencia';
import { ImagenExpService } from '../service/imagen-exp.service';
import { SExperienciaService } from '../service/s-experiencia.service';


@Component({
  selector: 'app-edit-experiencia',
  templateUrl: './edit-experiencia.component.html',
  styleUrls: ['./edit-experiencia.component.css']
})
export class EditExperienciaComponent implements OnInit {
  expLab: Experiencia = null;

  constructor(private sExperiencia: SExperienciaService,
    private activatedRouter: ActivatedRoute,
    public imagenExpService: ImagenExpService,
    private router: Router) { }

  ngOnInit(): void {
   
    const id = this.activatedRouter.snapshot.params['id'];
   
    this.sExperiencia.detail(id).subscribe(
      data => {
        this.expLab = data;
      }, err => {
        alert("Error al modificar experiencia");
        this.router.navigate(['']);
      }
    )
    this.imagenExpService.clearUrl();
  }

  onUpdate(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.expLab.imgE=this.imagenExpService.urlExp;
    this.sExperiencia.update(id, this.expLab).subscribe(
      data => {
        alert("Experiencia modificada");
        this.router.navigate(['']);

      }, err => {
        alert("Error al modificar experiencia");
        this.router.navigate(['']);
      }
    )
  }
  uploadImageExp($event: any) {

    const name = "imagenExp" + Date.now();
    this.imagenExpService.uploadImageExp($event, name);

  }
}
