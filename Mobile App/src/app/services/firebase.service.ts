import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private snapshotChangesSubscription: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ){}

  getTasks(){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if(currentUser){
          this.snapshotChangesSubscription = this.afs.collection('rewards').snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      })
    })
  }

  getTask(taskId){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if(currentUser){
          this.snapshotChangesSubscription = this.afs.doc<any>('people/' + currentUser.uid + '/tasks/' + taskId).valueChanges()
          .subscribe(snapshots => {
            resolve(snapshots);
          }, err => {
            reject(err)
          })
        }
      })
    });
  }

  unsubscribeOnLogOut(){
    //remember to unsubscribe from the snapshotChanges
    this.snapshotChangesSubscription.unsubscribe();
  }

  // updateTask(taskKey, value){
  //   return new Promise<any>((resolve, reject) => {
  //     let currentUser = firebase.auth().currentUser;
  //     this.afs.collection('people').doc(currentUser.uid).collection('tasks').doc(taskKey).set(value)
  //     .then(
  //       res => resolve(res),
  //       err => reject(err)
  //     )
  //   })
  // }

  // deleteTask(taskKey){
  //   return new Promise<any>((resolve, reject) => {
  //     let currentUser = firebase.auth().currentUser;
  //     this.afs.collection('people').doc(currentUser.uid).collection('tasks').doc(taskKey).delete()
  //     .then(
  //       res => resolve(res),
  //       err => reject(err)
  //     )
  //   })
  // }

  createTask(value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection('tasks').add({
        title: value.title,
        description: value.description,
        image: value.image
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  getUserInformation() {

  }

  updateScore(value) {

    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).set(value)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })

  }

  getBehaviorHistory() {
    return new Promise<any>((resolve) => {
      this.afAuth.user.subscribe(currentUser => {
        if(currentUser){
          this.snapshotChangesSubscription = this.afs.collection('people').doc(currentUser.uid).collection('history').snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      })
    })
  }

  getPartnershipDeals() {
    // return new Promise<any>((resolve) => {
    //   this.afAuth.user.subscribe(currentUser => {
    //     if(currentUser){
    //       this.snapshotChangesSubscription = this.afs.collection('rewards').snapshotChanges();
    //       resolve(this.snapshotChangesSubscription);
    //     }
    //   })
    // })
    return this.afs.collection('rewards').snapshotChanges();
  }

}
