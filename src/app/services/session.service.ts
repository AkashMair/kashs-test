import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, finalize } from 'rxjs/operators';
import { MyAuthService } from '../services/my-auth.service';
import {AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable } from 'rxjs';

export interface IPresent {
  giftFrom: string
  giftTo: string
  whatItIs: string
  picture: string
  rating: number
  date: Date
  thankYou: boolean
  userID: string
  hideEdit: boolean
}

export interface IPresentID extends IPresent { id:string }

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  downloadURL;
  ref: AngularFireStorageReference

  constructor( private afs: AngularFirestore, private myAuth:MyAuthService, private storage:AngularFireStorage ) {
    // const id = Math.random().toString(36).substring(2);
    // const ref = this.storage.ref(id);
    // this.downloadURL = this.ref.getDownloadURL(); 
    
  }

  get presentCollection(){
    return this.afs.collection('presents', (ref)=>{
      return ref.where('userID', '==', this.user.uid).orderBy('date', 'desc')
    })
  }

  create(presents:IPresent){
    this.presentCollection.add({userID: this.user.uid,...presents, hideEdit:true,date: new Date(), picture:this.downloadURL.i})
  }

  get presents(){
    return this.presentCollection.snapshotChanges()
      .pipe(map(this.includeCollectionID))
  }

  includeCollectionID(docChangeAction){
    return docChangeAction.map((a)=>{
      const data = a.payload.doc.data()
      const id = a.payload.doc.id
        return { id,...data}
    })
  }

  delete(presents:IPresentID){
    this.presentCollection.doc(presents.id).delete();
  }

  update(presents:IPresentID){
    this.presentCollection.doc(presents.id).update({
    giftFrom: presents.giftFrom,
    giftTo: presents.giftTo,
    whatItIs: presents.whatItIs,
    rating: presents.rating,
    thankYou: presents.thankYou,
    hideEdit: true

    })
  }

  get user(){
    return this.myAuth.user
  }

  showInput(presents:IPresentID){
    this.presentCollection.doc(presents.id).update({
      hideEdit: false
    })
  }

  upload(event){
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const fileRef = this.storage.ref(id);
    const task = this.storage.upload(id, file).then((data)=>{
      console.log('this is what I need',data.ref.getDownloadURL())
       return this.downloadURL=data.ref.getDownloadURL();
    });
  //   task.snapshotChanges().pipe(
  //     finalize(() =>{this.downloadURL = fileRef.getDownloadURL();
  //     console.log('hello', fileRef.getDownloadURL())})
  //  )
  //   .subscribe()
  // console.log('hello part 2', fileRef.getDownloadURL())
    // this.downloadURL = fileRef.getDownloadURL()
  }

}



