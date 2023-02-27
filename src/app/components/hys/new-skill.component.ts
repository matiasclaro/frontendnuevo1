import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Skill } from '../model/skill';
import { ImagenSkillService } from '../service/imagen-skill.service';
import { SkillService } from '../service/skill.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-new-skill',
  templateUrl: './new-skill.component.html',
  styleUrls: ['./new-skill.component.css']
})
export class NewSkillComponent implements OnInit {
  nombreS: string ;
  porcentajeS : number;
  imagenS : string;
  isLogged = false;
  
  constructor(private skillS : SkillService,
     private router :Router,
     public imagenSkill : ImagenSkillService,
     private tokenService : TokenService ){}
  
  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

    this.imagenSkill.clearUrl();

  }

  onCreate(): void{
    this.imagenS = this.imagenSkill.urlSkill;
    const skill = new Skill(this.nombreS, this.porcentajeS, this.imagenS);
    this.skillS.save(skill).subscribe(
      data =>{
        alert("Skill creada correctamente.");
        this.router.navigate(['']);
      }, err=>{
        alert("Fallo al añadir skill.");
        this.router.navigate(['']);
      }
    )

    }
     
    uploadImageSkill($event:any) {
    
      const name = "imagenSkill" + Date.now();
      this.imagenSkill.uploadImageSkill($event, name);
  
    }
}
