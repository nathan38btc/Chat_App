import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicConversationComponent } from './public-conversation.component';

describe('PublicConversationComponent', () => {
  let component: PublicConversationComponent;
  let fixture: ComponentFixture<PublicConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicConversationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
