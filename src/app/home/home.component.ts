import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MyAuthService } from '../services/my-auth.service';
import { IPresent, SessionService, IPresentID } from '../services/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  presents: Observable<IPresent[]>;
  constructor(private myAuth:MyAuthService, private session:SessionService) {
    this.presents = this.session.presents
  }

  logout(){
    this.myAuth.logout()
  }

  create(presents:IPresent){
    this.session.create(presents)
  }

  delete(presents:IPresentID){
    this.session.delete(presents)
  }

  update(presents:IPresentID){
    this.session.update(presents)
  }

  showInput(presents:IPresentID){
    this.session.showInput(presents)
  }

  ngOnInit() {
  }

}
