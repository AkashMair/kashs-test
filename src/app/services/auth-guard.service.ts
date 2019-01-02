import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first, map } from 'rxjs/operators';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private afAuth: AngularFireAuth, private router:Router) { }

  public canActivate(){
    return this.afAuth.authState.pipe(
      map((user) =>{
        if (user) return true;
        else { this.router.navigate(['login'])
                return false
              }
      }),
      first()
    )
  }
}
