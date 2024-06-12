import { Component , OnInit} from '@angular/core';
import { DataBaseConnexionService } from '../../services/dataBaseConnexion/data-base-connexion.service';
import { UserDataService } from '../../services/UserData/user-data.service';
import { ConnectedUser } from '../../interface/connectedUser';
import { Conversation } from '../../interface/conversation';
import { Messages } from '../../interface/messages';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChatService } from '../../services/ChatService/chat.service';

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers:[DataBaseConnexionService,ChatService],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.css'
})

export class ConversationComponent implements OnInit{

  myConnectedUser: ConnectedUser ={ //user details
    Id:-1,
    Username:"unconnected",
    password:"unconnected",
    Email:"unconnected"
  }

  myConversations: Conversation[] = []; // conversation
  ConversationDetails: Messages[] = [];

  selectedConversation: Conversation = { 
    IdConversation:-1,
    IdUser1:-1,
    IdUser2:-1,
    topicTitles:""
  };

  newMessageForm = new FormGroup({
    content: new FormControl('')
  });

  constructor(private dbConnexion:DataBaseConnexionService,private userdata:UserDataService, private chatService: ChatService) {} //
  
  ngOnInit(): void {
    this.userdata.currentUser.subscribe((newUser) => { // get Central user data 
      this.myConnectedUser = newUser;
    });

    this.userdata.currentConversation.subscribe((newConversation)=> { // get central users conversation
      this.myConversations = newConversation;
    });

    this.userdata.currentMessages.subscribe((newConversation)=> { // get central users conversation
      this.ConversationDetails = newConversation;
    }); 

    
    this.GetMyConversations();
  }

  GetMyConversations(){
    this.dbConnexion.getUserConversation(this.myConnectedUser.Id).subscribe(data=>this.myConversations = data);

    // creation du socket et connexion
    this.InitConnexion();

    this.chatService.getMessages().subscribe((data)=>this.dbConnexion.getConversationWithId(this.selectedConversation.IdConversation).subscribe(data=>this.ConversationDetails=data)); // we reSubscirbe to the event of incoming messages
  }

  getEntireConversation(Conversation:Conversation){
    
    try{ // deconnection of used Socked to connect the new one with IdConversation updated
      this.chatService.disconnect(); 
      this.InitConnexion();

      this.selectedConversation = Conversation;
      }catch(err){
      console.log(" error during disconnection : " + err);
    }

    if (this.myConnectedUser.Id == -1) {
      console.log("Connect yourself before sending any messages");
    }else{
      this.dbConnexion.getConversationWithId(Conversation.IdConversation).subscribe(data=>this.ConversationDetails=data);
    }
  }

  submitContent(){
    if(this.myConnectedUser.Id!=-1&&this.myConversations.includes(this.selectedConversation)){
      //console.log(this.selectedConversation.IdConversation+ " "+this.myConnectedUser.Id+" "+this.newMessageForm.value.content);
      //this.dbConnexion.postNewMessage(this.selectedConversation.IdConversation,this.myConnectedUser.Id,this.newMessageForm.value.content??'').subscribe();

      //this.getEntireConversation(this.selectedConversation);
      //envoie du message au socket

      var messageToSend:Messages = {
        IdConversation:this.selectedConversation.IdConversation,
        IdUser:this.myConnectedUser.Id,
        SendAt:"",
        Message:this.newMessageForm.value.content??''
      }
      this.ConversationDetails.push(messageToSend); // get rid of that : both user should be listening to serveur events
      this.chatService.sendMessage(messageToSend);
      this.newMessageForm.reset();
    }else{
      console.log("I don't think so ")
      this.newMessageForm.reset();
    }
  }

  InitConnexion(){
    this.chatService.initiateSocket(this.selectedConversation.IdConversation.toString(),this.myConnectedUser.Id.toString());
    this.chatService.getMessages().subscribe((data)=>this.dbConnexion.getConversationWithId(this.selectedConversation.IdConversation).subscribe(data=>this.ConversationDetails=data)); // we reSubscirbe to the event of incoming messages
  }
}
