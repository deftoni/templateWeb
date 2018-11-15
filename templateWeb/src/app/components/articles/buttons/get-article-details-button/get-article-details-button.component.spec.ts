import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetArticleDetailsButtonComponent } from './get-article-details-button.component';

describe('GetArticleDetailsButtonComponent', () => {
  let component: GetArticleDetailsButtonComponent;
  let fixture: ComponentFixture<GetArticleDetailsButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetArticleDetailsButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetArticleDetailsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
