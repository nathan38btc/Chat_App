import { Component } from '@angular/core';
import { newTopics } from '../../interface/newTopic';

@Component({
  selector: 'app-public-conversation',
  standalone: true,
  imports: [],
  templateUrl: './public-conversation.component.html',
  styleUrl: './public-conversation.component.css'
})
export class PublicConversationComponent {
  UneDeCouverture: newTopics[] = [] 
}
