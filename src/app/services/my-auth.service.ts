import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MyAuthService {

  constructor(private afAuth: AngularFireAuth, private router:Router) { }

  register(email:string, password:string){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  }

  login(email:string, password:string){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
  }

  logout(){
    return this.afAuth.auth.signOut()
    .then(()=>this.router.navigate(['login']))
     .catch((error:Error)=>{throw error})
  }

  get user(){
    return this.afAuth.auth.currentUser
  }

  forgotPassword(email:string){
    console.log('reached here' + email);
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
}
