import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConnectedUser } from '../../interface/connectedUser';
import { Conversation } from '../../interface/conversation';
import { Messages } from '../../interface/messages';
import { json } from 'stream/consumers';

@Injectable({
  providedIn: "root"
})

export class UserDataService {

  myConnectedUser: ConnectedUser ={ // User data
    Id:-1,
    Username:"unconnected",
    password:"unconnected",
    Email:"unconnected"
  }

  user:any;

  myConversation: Conversation[] = []; // conversation data
  selectedConversation: Conversation = { 
    IdConversation:-1,
    IdUser1:-1,
    IdUser2:-1
  };

  ConversationDetails: Messages[] = [];

  userSource = new BehaviorSubject<ConnectedUser>(this.myConnectedUser);
  currentUser = this.userSource.asObservable();  // subscribe for User Data

  conversationSource = new BehaviorSubject<Conversation[]>(this.myConversation);
  currentConversation = this.conversationSource.asObservable();  // subscribe for Conversation Liste

  MessagesSource = new BehaviorSubject<Messages[]>(this.ConversationDetails);
  currentMessages = this.MessagesSource.asObservable();  // subscribe for Messages 

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

  UserReset(){
    this.changeUser(-1,"","","");
    var blankConversation: Conversation[] = [];
    this.conversationSource.next(blankConversation);

    var blankMessages: Messages[] = [];
    this.MessagesSource.next(blankMessages);
  }

  getCurrentUserInfo(){
    return this.myConnectedUser;
  }  


  updateCurrentConversation(newCurrentConvrsation:Conversation){
    this.selectedConversation = newCurrentConvrsation;
  }

  getCurrentConversation(){
    return this.selectedConversation;
  }

}
