import { Component , OnInit} from '@angular/core';
import { DataBaseConnexionService } from '../../services/dataBaseConnexion/data-base-connexion.service';
import { UserDataService } from '../../services/UserData/user-data.service';
import { ConnectedUser } from '../../interface/connectedUser';
import { Conversation } from '../../interface/conversation';
import { Messages } from '../../interface/messages';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers:[DataBaseConnexionService],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.css'
})
export class ConversationComponent implements OnInit{

  myConnectedUser: ConnectedUser ={
    Id:-1,
    Username:"unconnected",
    password:"unconnected",
    Email:"unconnected"
  }

  myConversation: Conversation[] = [];

  ConversationDetails: Messages[] = [];

  newMessageForm = new FormGroup({
    content: new FormControl('')
  });

  constructor(private dbConnexion:DataBaseConnexionService,private userdata:UserDataService) {}
  
  ngOnInit(): void {
    this.userdata.currentUser.subscribe((newUser) => {
      this.myConnectedUser = newUser;
    });
  }

  GetMyConversations(){
    this.dbConnexion.getUserConversation(this.myConnectedUser.Id).subscribe(data=>this.myConversation = data);
  }

  getEntireConversation(IdConversation:number){
    this.dbConnexion.getConversationWithId(IdConversation).subscribe(data=>this.ConversationDetails=data);
  }

  submitContent(){
    // on est là
  }
}
