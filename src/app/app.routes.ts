import { Routes } from '@angular/router';
import { ConversationComponent } from '../composants/Conversation/conversation.component';
import { PublicConversationComponent } from '../composants/public-conversation/public-conversation.component';

export const routes: Routes = [
    {path: "Conversation", component: ConversationComponent},
    {path: "Public_Conversation", component: PublicConversationComponent}
];
