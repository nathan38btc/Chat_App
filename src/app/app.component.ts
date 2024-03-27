import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthentificationComponent } from './../composants/authentification/authentification.component';
import { ConversationComponent } from '../composants/Conversation/conversation.component';
import { UserDataService } from '../services/UserData/user-data.service';
import { SearchBarComponent } from '../composants/search-bar/search-bar.component';

@Component({
  selector: 'app-root', // pour la partie css 
  standalone: true,
  imports: [RouterOutlet,AuthentificationComponent,ConversationComponent,SearchBarComponent], // ajouter les modules, composants que le composant utilise
  providers: [], // ajouter les services que le composants utilise
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'Chat_App';
  constructor (private userData:UserDataService){}
}
