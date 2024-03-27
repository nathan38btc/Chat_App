import { Component } from '@angular/core';
import { DataBaseConnexionService } from '../../services/dataBaseConnexion/data-base-connexion.service';
import { ConnectedUser } from '../../interface/connectedUser';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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

  constructor(private dbServices:DataBaseConnexionService){

  }


  fetchUser(){
    this.dbServices.getUserWithUsername(this.userToLookFor.value.usernameToLookFor??'').subscribe(data=> this.userList =data);
    this.userToLookFor.reset();
  }
}
