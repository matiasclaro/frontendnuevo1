import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Educacion } from '../model/educacion';
import { EducacionService } from '../service/educacion.service';
import { ImagenEduService } from '../service/imagen-edu.service';


@Component({
  selector: 'app-editeducacion',
  templateUrl: './editeducacion.component.html',
  styleUrls: ['./editeducacion.component.css']
})
export class EditeducacionComponent implements OnInit {
  educacion: Educacion = null;

  constructor(
    private educacionS: EducacionService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    public imagenEduService: ImagenEduService
  ) { }

  ngOnInit(): void {

    const id = this.activatedRouter.snapshot.params['id'];
    this.educacionS.detail(id).subscribe(

      data => {

        this.educacion = data;
      }, err => {
        alert("Error al modificar");
        this.router.navigate(['']);
      }
    )
    this.imagenEduService.clearUrl();
    
  }

  onUpdate(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.educacion.imgEdu = this.imagenEduService.urlEdu;
    this.educacionS.update(id, this.educacion).subscribe(
      data => {
        this.router.navigate(['']);
      }, err => {
        alert("Error al modificar la educacion");
        this.router.navigate(['']);
      }
    )
    
  }

  uploadImageEdu($event: any) {

    const name = "imagenEdu" + Date.now();
    this.imagenEduService.uploadImageEdu($event, name);

  }
}
