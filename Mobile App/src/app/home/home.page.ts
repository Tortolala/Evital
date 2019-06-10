import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  userInfo;

  constructor(
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
  ) {}

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let userId = route.paramMap.get('id');
      this.firebaseService.getScore()
      .subscribe(
        data => {
          resolve(data);
          console.log(data.payload.doc.data().name);
        }
      );
    })
  }


  ngOnInit() {
    if (this.route && this.route.data) {
      this.getData();
    }
  }

  getData() {
    this.firebaseService.getScore()
    .subscribe(result => {
      this.userInfo = result;
      console.log(this.userInfo);
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  logout(){
    this.authService.doLogout()
    .then(res => {
      this.router.navigate(["/login"]);
    }, err => {
      console.log(err);
    })
  }

}
