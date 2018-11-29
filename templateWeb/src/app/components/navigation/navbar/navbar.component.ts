import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { scrollStateTrigger } from './animation';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
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

  onArticle() {
    this.router.navigateByUrl('/article');
  }

  @HostListener('window:scroll', ['$event'])
  setScrollInfo() {
    if ( window.pageYOffset <= 115 ) {
      this.scrollInfo = 'onTop';
    } else {
      this.scrollInfo = 'inPage';
    }
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }

}
