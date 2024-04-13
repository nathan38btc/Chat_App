import { Component, OnInit } from '@angular/core';
import { DataBaseConnexionService } from '../../services/dataBaseConnexion/data-base-connexion.service';
import { ConnectedUser } from '../../interface/connectedUser';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserDataService } from '../../services/UserData/user-data.service';
import { Console } from 'console';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  userList: ConnectedUser[] = [];

  userToLookFor = new FormGroup({
    usernameToLookFor: new FormControl('')
  });

  constructor(private dbServices:DataBaseConnexionService,private userdata:UserDataService){}


  fetchUser(){
    if(this.userToLookFor.value.usernameToLookFor == null){
      this.userList = [];
    }else{
      this.dbServices.getUserWithUsername(this.userToLookFor.value.usernameToLookFor??'').subscribe(data=> this.userList =data);
      this.userToLookFor.reset();
    }

  }

  createConversation(userChosen:number){
    this.dbServices.createConversation(this.userdata.getCurrentUserInfo().Id,userChosen);
  }
}
