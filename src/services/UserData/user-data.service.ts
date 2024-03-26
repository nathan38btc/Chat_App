import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConnectedUser } from '../../interface/connectedUser';

@Injectable({
  providedIn: "root"
})

export class UserDataService {

  myConnectedUser: ConnectedUser ={
    Id:-1,
    Username:"unconnected",
    password:"unconnected",
    Email:"unconnected"
  }

  userSource = new BehaviorSubject<ConnectedUser>(this.myConnectedUser);
  currentUser = this.userSource.asObservable();  // other component subscribe to this

  constructor() { }

  changeUser(_Id:number,_username:string,_password:string,_email:string){
    var newConnectedUser: ConnectedUser = {
      Id:_Id,
      Username:_username,
      password:_password,
      Email:_email
    }
    this.userSource.next(newConnectedUser);
  } 
}
