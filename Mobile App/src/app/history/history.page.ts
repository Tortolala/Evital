import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  items: Array<any>;

  constructor(
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.firebaseService.getBehaviorHistory()
    .subscribe(result => {
      this.items = result;
    })
  }

}
