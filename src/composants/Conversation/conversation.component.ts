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

  myConnectedUser: ConnectedUser ={ //user détails
    Id:-1,
    Username:"unconnected",
    password:"unconnected",
    Email:"unconnected"
  }

  myConversation: Conversation[] = []; // conversation
  ConversationDetails: Messages[] = [];

  selectedConversation: Conversation = { 
    IdConversation:-1,
    IdUser1:-1,
    IdUser2:-1
  };

  

  newMessageForm = new FormGroup({
    content: new FormControl('')
  });

  constructor(private dbConnexion:DataBaseConnexionService,private userdata:UserDataService) {}
  
  ngOnInit(): void {
    this.userdata.currentUser.subscribe((newUser) => { // get Central user data 
      this.myConnectedUser = newUser;
    });

    this.userdata.currentConversation.subscribe((newConversation)=> { // get central users conversation
      this.myConversation = newConversation;
    });

    this.userdata.currentMessages.subscribe((newConversation)=> { // get central users conversation
      this.ConversationDetails = newConversation;
    });   
  }

  GetMyConversations(){
    this.dbConnexion.getUserConversation(this.myConnectedUser.Id).subscribe(data=>this.myConversation = data);
  }

  getEntireConversation(Conversation:Conversation){
    if (this.myConnectedUser.Id == -1) {
      console.log("Connect yourself before sending any messages");
      
    }else{
      this.selectedConversation = Conversation;
      this.dbConnexion.getConversationWithId(Conversation.IdConversation).subscribe(data=>this.ConversationDetails=data);  
    }
  }

  submitContent(){
    if(this.myConnectedUser.Id!=-1&&this.myConversation.includes(this.selectedConversation)){
      //console.log(this.selectedConversation.IdConversation+ " "+this.myConnectedUser.Id+" "+this.newMessageForm.value.content);
      this.dbConnexion.postNewMessage(this.selectedConversation.IdConversation,this.myConnectedUser.Id,this.newMessageForm.value.content??'').subscribe();
      this.newMessageForm.reset();
      //this.getEntireConversation(this.selectedConversation);
    }else{
      console.log("I don't think so ")
    }
  }
}
