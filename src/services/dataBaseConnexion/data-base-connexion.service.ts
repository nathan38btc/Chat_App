import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { ConnectedUser } from '../../interface/connectedUser';
import { Conversation } from '../../interface/conversation';
import { Messages } from '../../interface/messages';


@Injectable({
  providedIn: 'root'
})

export class DataBaseConnexionService {

  backEndUrl = "http://localhost:8000/";

  constructor(private http:HttpClient) { }

  getAllUser(){
    return this.http.get(this.backEndUrl + "user-list");
  }

  connectThisUserdb(username:string, password:string){ 

    var customParams = new HttpParams().set("username", username); // creates the parameters of the request
    customParams = customParams.append("password",password);
    const options = { params: customParams };
    
    return this.http.get<ConnectedUser>(this.backEndUrl + "user-connexion",options);
  }

  getUserConversation(userId:number){
    const customParams = new HttpParams().set("UserId",userId);

    const options = {params:customParams};
    return this.http.get<Conversation[]>(this.backEndUrl+"my-conversations",options);
  }

  getConversationWithId(IdConversation:number){
    const customParams = new HttpParams().set("IdConversation",IdConversation);
    const options = {params:customParams};

    return this.http.get<Messages[]>(this.backEndUrl+"my-conversation",options);    
  }

  postNewMessage(IdConversation:number,IdUser:number,Message:string){

    var customParams = new HttpParams().set("IdConversation", IdConversation); // creates the parameters of the request
    customParams = customParams.append("IdUser",IdUser);
    customParams = customParams.append("Message",Message);
    const options = { params: customParams };
    

    return this.http.post(this.backEndUrl + "message",{},options);
  }
}
