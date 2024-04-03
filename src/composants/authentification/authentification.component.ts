import { Component, OnInit} from '@angular/core';
import { DataBaseConnexionService } from './../../services/dataBaseConnexion/data-base-connexion.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConnectedUser } from '../../interface/connectedUser';
import { map } from 'rxjs';
import { UserDataService } from '../../services/UserData/user-data.service';
import { ChatService } from '../../services/ChatService/chat.service';

@Component({
  selector: 'app-authentification',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers:[DataBaseConnexionService],
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.css'
})

export class AuthentificationComponent implements OnInit{

  isConnected = false; 

  myConnectedUser: ConnectedUser ={
    Id:-1,
    Username:"unconnected",
    password:"unconnected",
    Email:"unconnected"
  }

  connexionForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  createUserForm = new FormGroup({
    New_Email: new FormControl(''),
    New_username: new FormControl(''),
    New_password: new FormControl('')
  });

  constructor(private dbConnexion:DataBaseConnexionService,private userdata:UserDataService,private chatService:ChatService){}

  ngOnInit(): void {
    this.userdata.currentUser.subscribe((newUser) => {
      this.myConnectedUser = newUser;
    });
  }

  getAllUser(){
    this.dbConnexion.getAllUser().subscribe(data => console.log(data));
  }

  submitConnexion(){
    this.dbConnexion.connectThisUserdb(this.connexionForm.value.username??'',this.connexionForm.value.password??'')
    .pipe(
      map(user => {
        try{this.isConnected = user.Id !== -1;} // Update isConnected based on user's Id
        catch(err){
          console.log("Please try again");
        }
        return user;
      })
    )
    .subscribe(user => {
      try{
        this.userdata.changeUser(user.Id,user.Username,user.password,user.Email);
      }catch (err) {
        console.log("user not created !")
      }
    });
    
    this.connexionForm.reset();
  }

  onDisconnection(){
    this.isConnected = false;
    this.userdata.UserReset();
    this.chatService.disconnect();
  }

  CreatUser(){
    if(this.createUserForm.value.New_Email==""||this.createUserForm.value.New_username==""||this.createUserForm.value.New_password==""){
      console.log("you must enter every inputs");
    }else{
      this.dbConnexion.createUser(this.createUserForm.value.New_Email??"",this.createUserForm.value.New_username??"",this.createUserForm.value.New_password??"").subscribe(data=> console.log(data)); 
    }
    this.createUserForm.reset();
  }

  GetMyConversations(){
    
  }
}


