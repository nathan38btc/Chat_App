import { Component, OnInit } from '@angular/core';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
import { AuthentificationComponent } from '../composants/authentification/authentification.component';
import { ConversationComponent } from '../composants/Conversation/conversation.component';
import { UserDataService } from '../services/UserData/user-data.service';
import { SearchBarComponent } from '../composants/search-bar/search-bar.component';

@Component({
  selector: 'app-root', // pour la partie css 
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,AuthentificationComponent,ConversationComponent,SearchBarComponent], // ajouter les modules, composants que le composant utilise
  providers: [UserDataService], // ajouter les services que le composants utilise
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit{

  isConnected = false;
  title = 'Chat_App';
  constructor (private userData:UserDataService){}

  ngOnInit(): void {
      this.userData.currentisConnected.subscribe(newState => this.isConnected = newState);
  }

}
