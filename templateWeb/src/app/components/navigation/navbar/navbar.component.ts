import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('scrollState', [
      state('onTop', style({
        backgroundColor: 'red'
      })),
      state('inPage', style({
        backgroundColor: 'black'
      })),
      transition('onTop <=> inPage', animate('500ms 0ms ease-in'))
    ])
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSub: Subscription;
  scrollInfo = 'onTop';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getAuthStatus();
    this.authListenerSub = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  onLogin() {
    this.router.navigateByUrl('/login');
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }

  @HostListener('window:scroll', ['$event'])
  doSomething(event) {
    console.log('scroll positionY', window.pageYOffset );
    if ( window.pageYOffset <= 115 ) {
      this.scrollInfo = 'onTop';
    } else {
      this.scrollInfo = 'inPage';
    }
  }

}
