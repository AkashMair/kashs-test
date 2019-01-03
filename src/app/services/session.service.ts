import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { MyAuthService } from '../services/my-auth.service'

export interface IPresent {
  giftFrom: string
  giftTo: string
  whatItIs: string
  picture
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

  constructor( private afs: AngularFirestore, private myAuth:MyAuthService) { 
    
  }

  get presentCollection(){
    return this.afs.collection('presents', (ref)=>{
      return ref.where('userID', '==', this.user.uid)
    })
  }

  create(presents:IPresent){
    this.presentCollection.add({userID: this.user.uid,...presents, hideEdit:true,date: new Date() })
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

}
