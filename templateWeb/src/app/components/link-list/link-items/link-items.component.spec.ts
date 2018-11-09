import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkItemsComponent } from './link-items.component';

describe('LinkItemsComponent', () => {
  let component: LinkItemsComponent;
  let fixture: ComponentFixture<LinkItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
