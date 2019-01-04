import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MyAuthService } from '../services/my-auth.service';
import { IPresent, SessionService, IPresentID } from '../services/session.service';
import { HttpClient } from '@angular/common/http';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  selectedFile : File;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;

  presents: Observable<IPresent[]>;
  constructor(private myAuth:MyAuthService, private session:SessionService, private http:HttpClient, private storage:AngularFireStorage, private router:Router) {
    this.presents = this.session.presents
    this.downloadURL=this.session.downloadURL
    
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

  upload(event){
    // this.selectedFile = event.target.files[0];
    // this.storage.upload('presents', event.target.files[0]);
  //     const id = Math.random().toString(36).substring(2);
  //     // this.ref = this.storage.ref(id);
  //     // this.task = this.ref.put(event.target.files[0]);
  //     // this.downloadURL = this.
  //   //   const file = event.target.files[0];
  //   // const filePath = 'name-your-file-path-here';
  //   // const fileRef = this.storage.ref(filePath) // Add this line to get the path as a ref
  //   // const task = this.storage.upload(filePath, file);
  //   // this.downloadURL = fileRef.getDownloadURL() // And this one to actually grab the URL from the Ref
  //   const file = event.target.files[0];
  //   // const filePath = 'name-your-file-path-here';
  //   const fileRef = this.storage.ref(id);
  //   const task = this.storage.upload(id, file);
  //   // get notified when the download URL is available
  //   task.snapshotChanges().pipe(
  //       finalize(() => this.downloadURL = fileRef.getDownloadURL() )
  //    )
  //   .subscribe()
      this.session.upload(event)
  }
    

  // onUpload() {
  // //     //Upload file here send a binary data
  //     this.http.post('gs://test-f3015.appspot.com', this.selectedFile)
  //     .subscribe(…);

  // }


  ngOnInit() {
  }

  sendLetters(){
    this.router.navigate(['letters'])
  }

}
