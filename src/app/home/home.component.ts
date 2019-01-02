import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MyAuthService } from '../services/my-auth.service';
import { IPresent, SessionService, IPresentID } from '../services/session.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedFile = null;

  presents: Observable<IPresent[]>;
  constructor(private myAuth:MyAuthService, private session:SessionService, private http:HttpClient) {
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
  picUploaded(event) {
    this.selectedFile = event.target.files[0]
  }

  onUpload() {

    this.http.post('my-backend.com/file-upload', this.selectedFile)
      .subscribe(...);
  }

}
