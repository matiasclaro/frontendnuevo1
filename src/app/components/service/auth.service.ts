import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../model/jwt-dto';
import { LoginUsuario } from '../model/login-usuario';
import { NuevoUsuario } from '../model/nuevo-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
<<<<<<< HEAD
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
  //authURL = 'https://backend-c8hy.onrender.com/auth/';
>>>>>>> 5a2868893070e90ac6cd7c8e4ab213e570e547ab
  authURL = 'http://localhost:8080/auth/';
=======
  authURL = 'https://backend-c8hy.onrender.com/auth/';
  //authURL = 'http://localhost:8080/auth/';
>>>>>>> Stashed changes
=======
  authURL = 'https://backend-c8hy.onrender.com/auth/';
  //authURL = 'http://localhost:8080/auth/';
>>>>>>> Stashed changes

  constructor(private httpClient: HttpClient) { }


  public nuevo(nuevoUsuario : NuevoUsuario) : Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevo', nuevoUsuario);
}
public login(loginUsuario: LoginUsuario): Observable<JwtDto>{
  return this.httpClient.post<JwtDto>(this.authURL + 'login', loginUsuario)
}
}



