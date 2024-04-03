import { Injectable } from '@angular/core';
import { Socket, io} from 'socket.io-client';
import { Observable } from 'rxjs';
import { Messages } from '../../interface/messages';
import { UserDataService } from '../UserData/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socket: any;
  constructor(private userdata:UserDataService) {}

  initiateSocket(IdConversation:string,IdUser:string){
    this.socket = io("http://localhost:8000/",{
      extraHeaders: {
        "IdConversation": IdConversation,
        "IdUser": IdUser
      }
    });
  }

  sendMessage(msg: Messages) {
    this.socket.emit('new_message', msg);
  }
 
  getMessages() {
    let observable = new Observable<String>(observer => {
      this.socket.on('new_mesage_from_server', (data:String) => {
        console.log(data);
        observer.next(data);
      });
      return () => { this.socket.disconnect(); };
    });
    return observable;
  }

  disconnect(){
    this.socket.emit("forced_clientSide_disconnection");
  }
}
