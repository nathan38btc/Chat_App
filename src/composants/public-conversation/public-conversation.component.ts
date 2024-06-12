import { Component, OnInit } from '@angular/core';
import { Conversation } from '../../interface/conversation';
import { DataBaseConnexionService } from '../../services/dataBaseConnexion/data-base-connexion.service';

@Component({
  selector: 'app-public-conversation',
  standalone: true,
  imports: [],
  templateUrl: './public-conversation.component.html',
  styleUrl: './public-conversation.component.css'
})
export class PublicConversationComponent implements OnInit{
  
  UneDeCouverture: Conversation[] = [];

  constructor(private dbServices: DataBaseConnexionService){}

  ngOnInit(): void {
      this.getPublicConv();
  }

  getPublicConv(){
    this.dbServices.getPublicConversation().subscribe(data=> this.UneDeCouverture = data);
    
  }
  
}
