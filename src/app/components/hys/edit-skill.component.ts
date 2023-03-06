import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from '../model/skill';
import { ImagenSkillService } from '../service/imagen-skill.service';
import { SkillService } from '../service/skill.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {
  skill : Skill = null;

  constructor(private skillS : SkillService,
    private router :Router,
    public imagenSkill : ImagenSkillService,
    
    private activatedRouter: ActivatedRoute ){}
 
  
  
  ngOnInit(): void {
    const id= this.activatedRouter.snapshot.params['id'];
    this.skillS.detail(id).subscribe(
      data =>{
        this.skill = data;
      },err=>{
        alert("Error al modificar");
        this.router.navigate(['']);
      }
    )
  } 
  onUpdate(){
    const id= this.activatedRouter.snapshot.params['id'];
    this.skill.imagenS = this.imagenSkill.urlSkill;
    this.skillS.update(id, this.skill).subscribe(
    data=>{
        this.router.navigate(['']);
      },err=>{
        alert("Error al modificar la skill");
        this.router.navigate(['']);
      }
    )
}


uploadImageSkill($event:any) {
    
  const name = "imagenSkill" + Date.now();
  this.imagenSkill.uploadImageSkill($event, name);

}
}
 