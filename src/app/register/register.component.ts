import { Component, OnInit } from '@angular/core';
import { MyAuthService } from '../services/my-auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage='';

  constructor(private router: Router, private myAuth:MyAuthService) { }

  register(details:{email:string, password:string}){
    this.myAuth.register(details.email, details.password)
      .then(()=>this.router.navigate(['']))
        .catch((error:Error)=>{this.errorMessage=error.message})
  }

  ngOnInit() {
  }

}
