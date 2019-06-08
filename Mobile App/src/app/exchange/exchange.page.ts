import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { resolve } from 'path';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.page.html',
  styleUrls: ['./exchange.page.scss'],
})
export class ExchangePage implements OnInit {

  items: Array<any>;

  constructor(
    private firebaseService: FirebaseService,
    public loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.firebaseService.getPartnershipDeals()
    .subscribe(result => {
      this.items = result;
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }

}
