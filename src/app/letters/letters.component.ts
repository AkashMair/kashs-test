import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {IPresent, SessionService} from '../services/session.service'


@Component({
  selector: 'app-letters',
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.css']
})
export class LettersComponent implements OnInit {

  presents: Observable<IPresent[]>;
  constructor(private session:SessionService) {
    this.presents = this.session.presents
   }

   print(){
     window.print()
   }

  ngOnInit() {
  }

}
